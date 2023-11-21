const express = require('express');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const notesData = require('./db/db.json');

const PORT = 3001

app.use(express.json());
app.use(express.static('public'));

//app.get('*', (req, res) =>
//  res.sendFile(path.join(__dirname, 'public/index.html'))
//);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.info(req.body);

    const {title, text} = req.body;

    if (title && text) {
      const newNote = {
        title, 
        text, 
        id: uuidv4()
      };
      
      const response = {
        status: 'success',
        body: newNote,
      };
  
      readAndAppend(newNote, './db/db.json')
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
})




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);