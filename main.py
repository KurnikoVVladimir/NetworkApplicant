import services

from fastapi import FastAPI, APIRouter, Depends, Form, Request
from fastapi.staticfiles import StaticFiles
from starlette.responses import HTMLResponse
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import db_manager
from fastapi.templating import Jinja2Templates

from models import User, Quizz
from schemas import UserCreate, UserLogin, Token, User as UserSchema, QuizCreate, Quiz, Answer, QuizLogin



app = FastAPI(title='Keber_PES')
router = APIRouter(prefix='/api')
http_bearer = HTTPBearer(auto_error=False)
templates = Jinja2Templates(directory="static")
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить доступ с любого домена
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить любые методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить любые заголовки
)

@app.on_event("startup")
async def startup_event():
    await db_manager.initialize_database()


@router.get(
    path="/users/me/",
    response_model=UserSchema,  # Используйте схему Pydantic
    description="Текущий пользователь",
    dependencies=[Depends(http_bearer)]
)
async def current_user(
        user: UserSchema = Depends(services.auth)
):
    return user

@router.get(
    path="/users/{user_id}/",
    response_model=UserSchema,  # Используйте схему Pydantic
    description="Чел по айди",
)
async def get_user_by_id(
        user_id: int,
        session: AsyncSession = Depends(db_manager.session_dependency),
):
    return await services.get_user_by_id(session=session, user_id=user_id)

@router.post(
    path="/user/register/",
    response_model=UserSchema,  # Используйте схему Pydantic
    description="Создать юзера",
)
async def create_user(
        user_create: UserCreate,
        session: AsyncSession = Depends(db_manager.session_dependency),
):
    return await services.create_user(
        session=session, user_create=user_create
    )

@router.get(
    path="/users/",
    response_model=List[UserSchema],  # Используйте схему Pydantic
    description="Все User",
)
async def get_users(
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    return await services.get_all_users(session)

@router.delete(
    path="/users/",
    response_model=UserSchema,  # Используйте схему Pydantic
    description='Vova user'
)
async def delete_user(
        user_id: int,
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    user = await services.get_user_by_id(session, user_id)
    return await services.delete_user(session, user)

@router.post(
    path="/users/login/",
    response_model=Token,  # Используйте схему Pydantic
    description="Вход в систему",
)
async def login_user(
        username: str = Form(),
        password: str = Form(),
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    user_login = UserLogin(login=username, password=password)
    return await services.login_user(session, user_login)

@router.post(
    path="/quiz/register/",
    response_model=Quiz,  # Используйте Pydantic модель Quiz
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
    response_model=Answer,  # Используйте схему Pydantic
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
    path="/quizes/",
    response_model=Quiz,
    description='Удаление векторины'
)
async def delete_quiz(
        quiz_id: int,
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    quiz = await services.get_quiz_by_id(session, quiz_id)
    return await services.delete_quiz(session, quiz)


@app.get("/", response_class=HTMLResponse)
async def front(request: Request):
    return templates.TemplateResponse(
        "home.html", {"request": request}
    )


@app.get("/game/", response_class=HTMLResponse)
async def front(request: Request):
    return templates.TemplateResponse(
        "game-home.html", {"request": request}
    )


app.include_router(router)
