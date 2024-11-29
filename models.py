# models.py
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from typing import List
from database import Base

class Quizz(Base):
    __tablename__ = "quizzes"

    question: Mapped[str] = mapped_column()
    answer: Mapped[str] = mapped_column()
    question_hash: Mapped[str] = mapped_column()

    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="quiz")

class UserProgress(Base):
    __tablename__ = "user_progress"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id"))
    user_id: Mapped[int] = mapped_column()  # Предположим, что у вас есть идентификатор пользователя

    quiz: Mapped["Quizz"] = relationship("Quizz", back_populates="progress")