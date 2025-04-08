const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './key.env' });
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI Error:', err.response?.data || err.message);
    res.status(500).send('Something went wrong with OpenAI.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
