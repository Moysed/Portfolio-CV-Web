const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve your HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add more routes as needed
// For example:
// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});