from pydantic import BaseModel


class ImageBaseSchema(BaseModel):
    link: int
    product_id: int


class ImageSchema(ImageBaseSchema):
    id: int

    class Config:
        orm_mode = True
