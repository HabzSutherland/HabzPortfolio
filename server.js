const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in Render dashboard
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log('📩 Received message:', message);

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    console.log('✅ OpenAI response:', response);

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('❌ OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
