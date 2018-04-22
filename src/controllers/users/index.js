const users = require('express').Router();

users.use('/registration', require('./registration'));
users.use('/authentication', require('./authentication'));
users.use('/profile', require('./profile'));

module.exports = users;
