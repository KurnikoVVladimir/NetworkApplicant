from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column

from database import Base

class Quizz(Base):
    __tablename__ = "quizzes"

    question: Mapped[str] = mapped_column()
    answer: Mapped[str] = mapped_column()
    question_hash: Mapped[str] = mapped_column()