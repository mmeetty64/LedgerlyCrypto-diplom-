const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Настройка CORS для разрешения соединений с фронтенда
app.use(cors());

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // добавление уникального имени файла
  }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки файла
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    res.json({ filePath: `${req.file.filename}` });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
