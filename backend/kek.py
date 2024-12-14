from datetime import datetime, timedelta
import json

from fastapi import FastAPI, File, Depends, Body, HTTPException, status, Response, APIRouter
import uvicorn

from typing import Dict

from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np
import requests
from urllib.parse import unquote

from PIL import Image
from io import BytesIO

import uuid

from ml.ml import REMOVE_INFOGRAPHICS, REMOVE_BACKGR

from db_init import *
from db.schemas import user as user_dto, token as token_dto #, product, image, collection
from db.models import user as user_model, token as token_model
from db.services import user_service
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from fastapi import Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()


class PromptRequest(BaseModel):
    url: str
    prompt: str


class ActionRequest(BaseModel):
    url: str
    type: str


app = FastAPI()

Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/source")
async def source(files: str, credentials: HTTPAuthorizationCredentials = Security(security)):
    access_token = credentials.credentials
    claims = user_model.parse_claims(access_token)
    if claims is None or not user_model.validate_claims(claims):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token"
        )
    print(json.loads(unquote(files)))
    return JSONResponse([
        {
            "id": 8800553535,
            "url": "https://pofoto.club/uploads/posts/2022-08/1660343110_37-pofoto-club-p-zimorodok-foto-zimoi-44.jpg",
            "generated": [
                {
                    "id": 101,
                    "url": "https://pofoto.club/uploads/posts/2022-08/1660343110_37-pofoto-club-p-zimorodok-foto-zimoi-44.jpg"
                },
            ]
        },
    ])


@app.post("/prompt")
async def prompt(prompt_images: PromptRequest):
    return [
        {
            "id": 8800553535,
            "url": "https://pofoto.club/uploads/posts/2022-08/1660343110_37-pofoto-club-p-zimorodok-foto-zimoi-44.jpg"
        },
    ]


@app.post("/action")
async def action(action_images: ActionRequest):
    saved_id = str(uuid.uuid4())
    if action_images.type == "info":
        resp = requests.get(action_images.url, stream=True).raw
        image = np.asarray(bytearray(resp.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        no_info = REMOVE_INFOGRAPHICS(image)
        cv2.imwrite(f"images/{saved_id}.png", no_info)
    if action_images.type == "white":
        response = requests.get(action_images.url)
        img = Image.open(BytesIO(response.content)).convert('RGB')
        no_info = REMOVE_BACKGR(img)
        cv2.imwrite(f"images/{saved_id}.png", no_info)
    return [
        {
            "id": 8800553535,
            "url": f"http://localhost:8000/{saved_id}.png"
        },
    ]


@app.post("/user/register", response_model=user_dto.CreateUserSchema)
def signup(
        payload: user_dto.CreateUserSchema = Body(),
        session: Session = Depends(get_db)
):
    user: user_model.User = user_service.get_user(session=session, email=payload.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    payload.password = user_model.User.hash_password(payload.password)
    return user_service.create_user(session, user=payload)


@app.post("/user/login", response_model=Dict)
def login(
        payload: user_dto.UserLoginSchema = Body(),
        session: Session = Depends(get_db),
        response: Response = None
):
    try:
        user: user_model.User = user_service.get_user(session=session, email=payload.email)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user credentials"
        )

        # Validate password and generate tokens directly in the method
    tokens = user.validate_password(payload.password)
    access_token = tokens["access_token"]
    refresh_token = tokens["refresh_token"]

    session.add(token_model.Token(user_id=user.id, refresh_token=refresh_token))
    session.commit()

    expires = datetime.utcnow() + timedelta(days=60)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        domain="localhost",
        samesite="lax",
        expires=int(expires.timestamp())
    )

    # response.headers["Authorization"] = f"Bearer {tokens['access_token']}"

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")