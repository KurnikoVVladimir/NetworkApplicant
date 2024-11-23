from typing import List
import hashlib

from database import db_manager
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends
from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

from models import Quizz  # Импортируйте модели SQLAlchemy
from schemas import Quiz, QuizCreate, QuizLogin, Answer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login/")

def serialize_sqlalchemy_model(model):
    dct = {}
    for key, value in model.__dict__.items():
        if key.startswith("_"):
            continue
        dct[key] = value
    return dct


def hash_string(input_string):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(input_string.encode('utf-8'))
    return sha256_hash.hexdigest()



async def get_quiz_by_id(
    session: AsyncSession, quiz_id: int
):
    stmt = select(Quizz).where(Quizz.id == quiz_id)
    result: Result = await session.execute(stmt)
    quiz = result.scalars().one_or_none()

    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quiz с ID ({quiz_id}) не найден",
        )
    return quiz

async def create_quiz(
    session: AsyncSession, quiz_create: QuizCreate
):
    stmt = select(Quizz).where(Quizz.question == quiz_create.question)  # Используйте Quizz
    result: Result = await session.execute(stmt)
    quiz = result.scalars().one_or_none()
    if quiz is not None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Вопрос ({quiz_create.question}) уже существует",
        )
    question_hash = hash_string(quiz_create.question)
    quiz = Quizz(question=quiz_create.question, answer=quiz_create.answer, question_hash=question_hash)
    session.add(quiz)
    await session.commit()
    await session.refresh(quiz)
    return Quiz.model_validate(quiz)  # Возвращаем Pydantic модель

async def login_quiz(
    session: AsyncSession, quiz_login: QuizLogin
):
    stmt = select(Quizz).where(
        (Quizz.question == quiz_login.question) &
        (Quizz.answer == quiz_login.answer)
    )
    result: Result = await session.execute(stmt)
    quiz = result.scalars().one_or_none()
    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Не верный ответ.",
        )
    return Answer(answer="Правильный ответ")

async def get_all_quiz(session: AsyncSession) -> List[Quiz]:
    stmt = select(Quizz)
    result: Result = await session.execute(stmt)
    quizes = result.scalars().all()
    return [Quiz.model_validate(quiz) for quiz in quizes]


async def delete_quiz(
        session: AsyncSession, quiz: Quiz
):
    await session.delete(quiz)
    await session.commit()
    return quiz