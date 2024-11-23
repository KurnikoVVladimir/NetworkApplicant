from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from typing import List
from database import Base

class Quizz(Base):
    __tablename__ = "quizzes"

    question: Mapped[str] = mapped_column()
    answer: Mapped[str] = mapped_column()
    question_hash: Mapped[str] = mapped_column()

    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="quiz")