import uvicorn
import services


from fastapi.security import HTTPBearer
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware


from fastapi import FastAPI, APIRouter, HTTPException, Depends, Form
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from database import db_manager
from models import *
from typing import List
from schemas import User, UserCreate, UserLogin, Token

app = FastAPI(title='Keber_PES')
router = APIRouter(prefix='/api')
http_bearer = HTTPBearer(auto_error=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить доступ с любого домена
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить любые методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить любые заголовки
)

@router.get(
    path="/users/me/",
    response_model=User,
    description="Текущий пользователь",
    dependencies=[Depends(http_bearer)]
)
async def current_user(
        user: User = Depends(services.auth)
):
    return user

@router.get(
    path="/users/{user_id}/",
    response_model=User,
    description="Чел по айди",
)
async def get_user_by_id(
        user_id: int,
        session: AsyncSession = Depends(db_manager.session_dependency),
):
    return await services.get_user_by_id(session=session, user_id=user_id)


@router.post(
    path="/user/register/",
    response_model=User,
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
    response_model=List[User],
    description="Все User",
)
async def get_users(
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    return await services.get_all_users(session)


@router.delete(
    path="/users/",
    response_model=User,
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
    response_model=Token,
    description="Вход в систему",
)

async def login_user(
        username: str = Form(),
        password: str = Form(),
        session: AsyncSession = Depends(db_manager.session_dependency)
):
    user_login = UserLogin(login=username,password=password)
    return await services.login_user(session,user_login)



app.include_router(router)