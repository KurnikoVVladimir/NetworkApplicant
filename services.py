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

from models import User
from schemas import UserCreate, UserLogin, Token, User as UserSchema

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




async def get_user_by_id(
    session: AsyncSession, user_id: int
):
    stmt = select(User).where(User.id == user_id)
    result: Result = await session.execute(stmt)
    user = result.scalars().one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User с ID ({user_id}) не найдена",
        )
    return user


async def create_user(
    session: AsyncSession, user_create: UserCreate
):
    stmt = select(User).where(User.login==user_create.login)
    result: Result = await session.execute(stmt)
    user = result.scalars().one_or_none()
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User с логином ({user_create.login}) уже существует",
        )
    login_hash = hash_string(user_create.login)
    user = User(login = user_create.login,password = user_create.password,login_hash = login_hash)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user



async def delete_user(
     session: AsyncSession, user: User
):
     await session.delete(user)
     await session.commit()
     return user


async def get_all_users(session: AsyncSession) -> List[User]:
    stmt = select(User)
    result: Result = await session.execute(stmt)
    users = result.scalars().all()
    return list(users)



async def login_user(
    session: AsyncSession, user_login: UserLogin
):
    stmt = select(User).where(
        (User.login == user_login.login) &
        (User.password == user_login.password)
    )
    result: Result = await session.execute(stmt)
    user = result.scalars().one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Не верный логин или пароль.",
        )
    return Token(token=user.login_hash)


async def auth(
        session: AsyncSession = Depends(db_manager.session_dependency),
        token: str = Depends(oauth2_scheme),
)->UserSchema:
    stmt = select(User).where(
        (User.login_hash == token)
    )
    result: Result = await session.execute(stmt)
    user = result.scalars().one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Пользователь не аутентифицирован.",
        )
    return user
