from datetime import datetime

from pydantic import BaseModel, ConfigDict
from enum import Enum


class RoleEnum(str, Enum):
    student = 'Студент'
    applicant = 'Абитуриент'


class UserCreate(BaseModel):
    login: str
    password: str
    role: RoleEnum


class UserLogin(BaseModel):
    login: str
    password: str



class User(BaseModel):
    id: int
    login: str
    role: RoleEnum
    model_config = ConfigDict(from_attributes=True)