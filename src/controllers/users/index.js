const users = require('express').Router();

users.use('/registration', require('./registration'));
users.use('/authentication', require('./authentication'));

module.exports = users;
