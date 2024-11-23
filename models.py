from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from typing import List
from database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id"), primary_key=True)
    score: Mapped[int] = mapped_column(default=0)  # Добавляем значение по умолчанию

    user: Mapped["User"] = relationship("User", back_populates="progress")
    quiz: Mapped["Quizz"] = relationship("Quizz", back_populates="progress")

# Добавьте связь в существующие модели
class User(Base):
    __tablename__ = "users"

    login: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column()
    login_hash: Mapped[str] = mapped_column()

    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="user")

class Quizz(Base):
    __tablename__ = "quizzes"

    question: Mapped[str] = mapped_column()
    answer: Mapped[str] = mapped_column()
    question_hash: Mapped[str] = mapped_column()

    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="quiz")