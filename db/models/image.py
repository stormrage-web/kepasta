from sqlalchemy import (
    Column,
    BigInteger,
    String,
    PrimaryKeyConstraint
)
from backend.db_init import Base

class Image(Base):
    __tablename__ = "image"
    id = Column(BigInteger, nullable=False, primary_key=True)
    link = Column(BigInteger, nullable=False)
    product_id = Column(String(255), nullable=False, unique=True)

    PrimaryKeyConstraint("id", name="image_pkey")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<Image {id!r}>".format(id=self.id)