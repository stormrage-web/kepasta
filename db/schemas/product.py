from pydantic import BaseModel


class ProductBaseSchema(BaseModel):
    head_img_id: int
    collection_id: int


class ProductSchema(ProductBaseSchema):
    id: int
    img_count: int

    class Config:
        orm_mode = True
