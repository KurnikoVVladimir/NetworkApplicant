from datetime import datetime
from pydantic import BaseModel, ConfigDict
from enum import Enum


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