const controllers = require('express').Router();
const path = require('path');
const users = require('./users');
const timeline = require('./timeline');

controllers.use('/users', users);
controllers.use('/timeline', timeline);
controllers.get('/', (req, res) => {
  res.sendFile(path.join(global.BASE_DIR, 'index.html'));
});
module.exports = controllers;
