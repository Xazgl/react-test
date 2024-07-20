const express = require('express');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// инициализация призмы
const db = new PrismaClient();

// создаем объект приложения
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Включаем CORS

const port = process.env.PORTDB || 5000;

app.get('/', (req, res) => {
  res.send('Тест');
});


app.get('/comments', async (req, res) => {
  console.log('1')
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;

    for (const comment of comments) {
      await db.comments.create({
        data: {
          id_comment: comment.id.toString(),
          post_id: comment.postId.toString(),
          name: comment.name,
          email: comment.email,
          body: comment.body,
        },
      });
    }
   res.json('Данные успешно сохранены');
  } catch (error) {
    res.status(500).json({ error: `Ошибка при получении данных ${error}` });
  }
});

app.get('/commentsAll', async (req, res) => {
  try {
    const { page = 1, limit = 10, filter = '' } = req.query;
    
    const comments = await db.comments.findMany({
      skip: (page - 1) * limit,
      take: +limit,
      where: {
        OR: [
          { name: { contains: filter, mode: 'insensitive' } },
          { email: { contains: filter, mode: 'insensitive' } },
          { body: { contains: filter, mode: 'insensitive' } },
        ],
      },
    });
    const total = await db.comments.count({
      where: {
        OR: [
          { name: { contains: filter, mode: 'insensitive' } },
          { email: { contains: filter, mode: 'insensitive' } },
          { body: { contains: filter, mode: 'insensitive' } },
        ],
      },
    });
    res.json({ comments, total });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});


app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await db.comments.findUnique({
      where: { id: id },
    });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Комментарий не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
