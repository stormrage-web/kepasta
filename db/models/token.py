from sqlalchemy import (
    LargeBinary,
    Column,
    String,
    BigInteger,
    UniqueConstraint,
    PrimaryKeyConstraint
)
from backend.db_init import Base

class Token(Base):
    __tablename__ = "token"
    id = Column(BigInteger, nullable=False, primary_key=True)
    user_id = Column(BigInteger, nullable=False, primary_key=True)
    refresh_token = Column(String(255), nullable=False)

    PrimaryKeyConstraint("id", "user_id", name="token_pkey")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<Token {id!r}>".format(id=self.id)