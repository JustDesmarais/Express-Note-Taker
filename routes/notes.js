// create router and import helper functions from fsUtils.js file
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// npm library to create unique ID for each note submitted via POST
const { v4: uuidv4 } = require('uuid');

// Returns contents of db.json as JSON following GET request
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST method to add notes to db.json
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.info(req.body);

    // Deconstruct body of POST request
    const {title, text} = req.body;

    // Verify both "title" and "text" are defined
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
  
      // read and rewrite db.json with new notes
      readAndAppend(newNote, './db/db.json')
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
})


module.exports = notes;