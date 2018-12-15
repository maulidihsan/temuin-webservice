const registration = require('express').Router();
const validation = require('../../../middlewares/shared-validator');

registration.post('/', validation.registration, require('./register'));

module.exports = registration;
