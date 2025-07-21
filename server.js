app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const reply = `I'd love to chat! 🟢 <a href="https://wa.me/919567962392" target="_blank">Click here to WhatsApp me</a>`;
  res.json({ reply });
});
