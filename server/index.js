const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint ดึงคำคมทั้งหมดจาก Database
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Endpoint เพิ่มคำคมใหม่ลง Database
app.post('/api/quotes', async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = await prisma.quote.create({
      data: { text, author },
    });
    res.json(newQuote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add quote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
});