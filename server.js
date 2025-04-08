const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug: Check if API Key is loaded
console.log('🧪 OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Found' : '❌ Missing');

// OpenAI Initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in Render under Environment
});

// 🧠 POST /api/chat
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OpenAI API key is not set');
    return res.status(500).json({ error: 'OpenAI API key not set in environment.' });
  }

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('🚨 OpenAI Error:', error?.message || error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API' });
  }
});

// ✅ Optional root route
app.get('/', (req, res) => {
  res.send('✅ ChatGPT API is live on Render!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
