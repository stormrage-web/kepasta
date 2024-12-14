from sqlalchemy import (
    Integer,
    Column,
    BigInteger,
    PrimaryKeyConstraint
)
from backend.db_init import Base

class Product(Base):
    __tablename__ = "product"
    id = Column(BigInteger, nullable=False, primary_key=True)
    head_img_id = Column(BigInteger, nullable=False)
    collection_id = Column(BigInteger, nullable=False)
    img_count = Column(Integer, nullable=False)

    PrimaryKeyConstraint("id", name="product_pkey")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<Product {id!r}>".format(id=self.id)