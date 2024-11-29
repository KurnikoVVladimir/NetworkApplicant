const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Указываем путь к статическим файлам
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для корневого URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game-home.html'));
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});