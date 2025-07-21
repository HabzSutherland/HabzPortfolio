const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // ✅ DEFINE APP
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const reply = `I'd love to chat! 🟢 <a href="https://wa.me/919567962392" target="_blank">Click here to WhatsApp me</a>`;
  res.json({ reply });
});

app.get('/', (req, res) => {
  res.send('✅ WhatsApp ChatBot API is live!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
