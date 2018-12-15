const token = require('express').Router();
const validation = require('../../../middlewares/shared-validator');

token.post('/', validation.saveToken, require('./saveToken'));

module.exports = token;
