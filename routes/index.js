const wikiRouter = require('./wiki.js');
const userRouter = require('./user.js'); // implement way later
const express = require('express');
const router = express.Router();

router.use('/wiki', wikiRouter);

module.exports = router;
