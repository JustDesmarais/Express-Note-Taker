// build router
const router = require('express').Router();

// router to send user's requests to /notes endpoint
const notesRouter = require('./notes');

// activate route to /notes
router.use('/notes', notesRouter);

module.exports = router;