const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to fetch and modify content
app.post('/fetch', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Randomly choose between Rick Roll and Harvard
    const redirectUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.harvard.edu/'
    ];
    const redirectUrl = redirectUrls[Math.floor(Math.random() * redirectUrls.length)];

    return res.json({
      success: true,
      redirect: redirectUrl
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      error: `Failed to process request: ${error.message}` 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Faleproxy server running at http://localhost:${PORT}`);
});
