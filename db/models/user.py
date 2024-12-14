from datetime import datetime, timedelta
from typing import Dict

from fastapi import HTTPException, status
import jwt
from sqlalchemy import (
    Column,
    String,
    BigInteger
)

from backend import settings
from backend.db_init import Base
import bcrypt

class User(Base):
    __tablename__ = "user"

    id = Column(BigInteger, nullable=False, primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)

    @staticmethod
    def hash_password(password) -> str:
        """Transforms password from it's raw textual form to
        cryptographic hashes
        """
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode('utf-8')

    def validate_password(self, password: str) -> Dict[str, str]:
        """Confirms password validity and generates access and refresh tokens."""
        if bcrypt.checkpw(password.encode(), self.password.encode()):
            access_token = self.generate_access_token()
            refresh_token = self.generate_refresh_token()
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid user credentials"
            )

    def generate_access_token(self) -> str:
        """Generate access token for user."""
        exp = datetime.utcnow() + timedelta(hours=1)  # Access token expires in 1 hour
        token = jwt.encode(
            {
                "sub": self.email,
                "full_name": self.name,
                "exp": exp
            },
            settings.SECRET_KEY,
            algorithm="HS256"
        )
        return token

    def generate_refresh_token(self) -> str:
        """Generate refresh token for user."""
        exp = datetime.utcnow() + timedelta(days=7)  # Refresh token expires in 7 days
        token = jwt.encode(
            {
                "sub": self.email,
                "exp": exp
            },
            settings.SECRET_KEY,
            algorithm="HS256"
        )
        return token

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<User {name!r}>".format(name=self.name)

def parse_claims(token: str):
    try:
        claims = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return claims
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def validate_claims(claims):
    print(claims["sub"], claims["full_name"], claims["exp"])
    return (
            claims["sub"] is not None and  # Проверяем наличие subject
            claims["full_name"] is not None and  # Проверяем наличие issued at
            claims["exp"] is not None and  # Проверяем наличие expiration
            datetime.fromtimestamp(claims["exp"]) > datetime.utcnow()  # Проверяем, что токен не истек
    )