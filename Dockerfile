# Используем базовый образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы проекта
COPY . .

# Задаем переменные окружения
ENV DATABASE_URL=sqlite+aiosqlite:///database.db

# Запускаем приложение
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
C:\Users\Vladimir Kurnikov\PycharmProjects\NetworkApplicant\Dockerfile