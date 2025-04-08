const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🧠 POST /api/chat
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with OpenRouter' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ OpenRouter Chat API is live!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
