const controllers = require('express').Router();
const path = require('path');
const users = require('./users');

controllers.use('/users', users);
controllers.get('/', (req, res) => {
  res.sendFile(path.join(global.BASE_DIR, 'index.html'));
});
module.exports = controllers;
