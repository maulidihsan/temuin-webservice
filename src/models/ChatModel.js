const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  nama: { type: String },
  urlFoto: { type: String },
});

const MessageSchema = new mongoose.Schema({
  from: { type: String },
  timestamp: { type: Number },
  body: { type: String },
});

const ChatSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  owner_detail: {
    type: UserSchema,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  sender_detail: {
    type: UserSchema,
    required: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  lastUpdate: { type: Number },
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  const self = this;
  UserModel.findOne({ username: self.getQuery().owner })
    .then((owner) => {
      if (owner) {
        self._update.$set = { // eslint-disable-line
          owner_detail: {
            username: owner.username,
            nama: owner.nama,
            urlFoto: owner.urlFoto,
          },
        };
        return next();
      }
      return next(new Error('user not found'));
    })
    .catch(err => next(new Error(err)));
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  const self = this;
  UserModel.findOne({ username: self.getQuery().sender })
    .then((sender) => {
      if (sender) {
        self._update.$set.sender_detail = { // eslint-disable-line
          username: sender.username,
          nama: sender.nama,
          urlFoto: sender.urlFoto,
        };
        return next();
      }
      return next(new Error('user not found'));
    })
    .catch(err => next(new Error(err)));
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  this._update.$set.lastUpdate = new Date(); // eslint-disable-line
  next();
});

module.exports = mongoose.model('Chat', ChatSchema, 'chat');
