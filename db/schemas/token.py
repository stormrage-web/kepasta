from pydantic import BaseModel

class TokenBaseSchema(BaseModel):
    user_id: int
    refresh_token: str

class CreateTokenSchema(TokenBaseSchema):
    pass

class TokenSchema(TokenBaseSchema):
    id: int

    class Config:
        orm_mode = True

class TokenResponseSchema(BaseModel):
    access_token: str
    refresh_token: str

    class Config:
        orm_mode = True