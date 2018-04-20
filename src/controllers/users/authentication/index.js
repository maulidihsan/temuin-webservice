const authentication = require('express').Router();
const path = require('path');
const validation = require('../../../middlewares/shared-validator');

authentication.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(global.BASE_DIR, 'index.html'));
});
authentication.post('/', validation.auth, require('./auth'));


module.exports = authentication;
