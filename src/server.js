const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/datetime', (req, res) => {
  const now = new Date();
  res.status(200).json({
    date: now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true
    }),
    iso: now.toISOString(),
    timestamp: now.getTime()
  });
});

const server = app.listen(PORT, () => {
  console.log(`Clock server running on port ${PORT}`);
});

module.exports = { app, server };
