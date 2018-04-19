const authentication = require('express').Router();
const validation = require('../../../middlewares/shared-validator');

authentication.post('/', validation.auth, require('./auth'));

module.exports = authentication;
