import services

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Form
from fastapi.security import HTTPBearer, OAuth2PasswordRequestForm

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from typing import List
from database import db_manager

from models import Quizz
from schemas import QuizCreate, Quiz, Answer, QuizLogin

app = FastAPI(title='Keber_PES')
router = APIRouter(prefix='/api')
http_bearer = HTTPBearer(auto_error=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@router.post(
    path="/quiz/register/",
    response_model=Quiz,
    description="Создать векторины",
)
async def create_quez(
    quiz_create: QuizCreate,
    session: AsyncSession = Depends(db_manager.session_dependency),
):
    return await services.create_quiz(
        session=session, quiz_create=quiz_create
    )


@router.post(
    path="/quiz/answer/",
    response_model=Answer,
    description="Проверка ответа",
)
async def answer_quiz(
    question: str = Form(),
    answer: str = Form(),
    session: AsyncSession = Depends(db_manager.session_dependency)
):
    quiz_question = QuizLogin(question=question, answer=answer)
    return await services.login_quiz(session, quiz_question)  # Исправлено на правильную функцию


@router.get(
    path="/quizes/",
    response_model=List[Quiz],
    description="Все Quiz",
)
async def get_quiz(
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    return await services.get_all_quiz(session)


@router.delete(
    path="/quizes",
    response_model=Quiz,
    description='Удаление векторины'
)
async def delete_quiz(
        quiz_id: int,
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    quiz = await services.get_quiz_by_id(session, quiz_id)
    return await services.delete_quiz(session, quiz)


app.include_router(router)