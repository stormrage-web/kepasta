from sqlalchemy.orm import Session
from sqlalchemy import select

from db.models.user import User
from db.schemas.user import CreateUserSchema


def create_user(session: Session, user: CreateUserSchema):
    db_user = User(**user.dict())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user(session: Session, email:str):
    return session.query(User).filter(User.email == email).one()


