from datetime import datetime

from pydantic import BaseModel, ConfigDict
from enum import Enum



class UserCreate(BaseModel):
    login: str
    password: str


class UserLogin(BaseModel):
    login: str
    password: str



class User(BaseModel):
    id: int
    login: str
    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    token: str
    model_config = ConfigDict(from_attributes=True)