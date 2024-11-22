# database.py
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    declared_attr,
)

class Base(DeclarativeBase):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{cls.__name__.lower()}s"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)


class DatabaseManager:
    def __init__(self):
        url = f"sqlite+aiosqlite:///database.db"  # Исправлено на правильное имя базы данных
        self.engine = create_async_engine(url=url, echo=False)
        self.session_maker = async_sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
            expire_on_commit=False,
        )

    async def session_dependency(self) -> AsyncSession:
        async with self.session_maker() as session:
            yield session
            await session.close()

    async def initialize_database(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)


db_manager = DatabaseManager()