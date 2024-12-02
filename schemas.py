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

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    token: str
    model_config = ConfigDict(from_attributes=True)
    model_config = ConfigDict(from_attributes=True)


class QuizCreate(BaseModel):
    question: str
    answer: str

class Quiz(BaseModel):
    id: int
    question: str
    answer: str
    question_hash: str

    model_config = ConfigDict(from_attributes=True)

class QuizLogin(BaseModel):
    question: str
    answer: str

class Answer(BaseModel):
    answer: str

