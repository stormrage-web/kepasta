from pydantic import BaseModel, Field, EmailStr


class UserBaseSchema(BaseModel):
    email: EmailStr
    name: str


class CreateUserSchema(UserBaseSchema):
    password: str


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserSchema(UserBaseSchema):
    id: int

    class Config:
        orm_mode = True
