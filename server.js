const express = require('express');
const path = require('path');
const api = require('./routes/index')

const app = express();


const PORT = process.env.PORT || 3001;

//middleware for static pages, JSON POST, and api routing
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// '/' sends user to index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// '/notes' sends user to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// wildcard sends users to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// open port for server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);