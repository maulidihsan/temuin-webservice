const users = require('express').Router();

users.use('/registration', require('./registration'));
users.use('/authentication', require('./authentication'));
users.use('/location', require('./location'));
users.use('/profile', require('./profile'));
users.use('/token', require('./token'));

module.exports = users;
