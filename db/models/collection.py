from sqlalchemy import (
    Integer,
    Column,
    BigInteger,
    String,
    PrimaryKeyConstraint,
    UniqueConstraint
)
from backend.db_init import Base

class Collection(Base):
    __tablename__ = "collection"
    id = Column(BigInteger, nullable=False, primary_key=True)
    user_id = Column(BigInteger, nullable=False)
    name = Column(String(255), nullable=False, unique=True)
    create_dt = Column(String(20), nullable=False)

    UniqueConstraint("name", name="uq_name")
    PrimaryKeyConstraint("id", name="collection_pkey")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<Collection {id!r}>".format(id=self.id)