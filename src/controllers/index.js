const controllers = require('express').Router();
const path = require('path');
const chat = require('./chat');
const users = require('./users');
const timeline = require('./timeline');

controllers.use('/users', users);
controllers.use('/chat', chat);
controllers.use('/timeline', timeline);
controllers.get('/', (req, res) => {
  res.sendFile(path.join(global.BASE_DIR, 'index.html'));
});
module.exports = controllers;
