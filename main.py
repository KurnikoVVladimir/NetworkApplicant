import uvicorn
import services

from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from database import db_manager
from models import *
from typing import List
from schemas import User, UserCreate, UserLogin

app = FastAPI(title='Keber_PES')
router = APIRouter(prefix='/api')


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
    path="/user/",
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


app.include_router(router)