const controllers = require('express').Router();
const users = require('./users');

controllers.use('/users', users);
module.exports = controllers;
