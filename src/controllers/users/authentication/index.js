const authentication = require('express').Router();
const validation = require('../../../middlewares/shared-validator');

authentication.post('/', validation.auth, require('./auth'));
authentication.post('/refresh', validation.refreshToken, require('./refresh'));

module.exports = authentication;
