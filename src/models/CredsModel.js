const mongoose = require('mongoose');
const validator = require('validator');

const CredentialSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    validate: value => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Credential', CredentialSchema, 'credentials');
