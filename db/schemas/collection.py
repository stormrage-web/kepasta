from pydantic import BaseModel


class CollectionBaseSchema(BaseModel):
    user_id: int
    name: str


class CollectionSchema(CollectionBaseSchema):
    id: int
    create_dt: str

    class Config:
        orm_mode = True
