app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    // Detailed logging
    console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
    
    // Respond with detailed error message for debugging (remove or sanitize this in production)
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});
