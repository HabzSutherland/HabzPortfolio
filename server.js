const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in Render
});

// 🧠 POST /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Optional root route for testing
app.get('/', (req, res) => {
  res.send('ChatGPT API is live!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
