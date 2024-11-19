from typing import List

from fastapi import HTTPException
from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

from models import User
from schemas import UserCreate, UserLogin



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
    user = User(**user_create.model_dump())
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
    return user
