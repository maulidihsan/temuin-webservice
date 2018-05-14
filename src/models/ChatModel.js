const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  nama: { type: String },
  urlFoto: { type: String },
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
    type: String,
    required: true,
  },
  messages: {
    type: [{
      from: { type: String },
      timestamp: { type: Number },
      body: { type: String },
    }],
  },
  lastUpdate: { type: Number },
});

ChatSchema.pre('save', function (next) {
  UserModel.findOne({ username: this.owner })
    .then((owner) => {
      this.owner_detail.username = owner.username;
      this.owner_detail.nama = owner.nama;
      this.owner_detail.urlFoto = owner.urlFoto;
    })
    .then(() => UserModel.findOne({ username: this.sender }))
    .then((sender) => {
      this.sender_detail.username = sender.username;
      this.sender_detail.nama = sender.nama;
      this.sender_detail.urlFoto = sender.urlFoto;
    })
    .catch(err => next(new Error(err)));
  this.lastUpdate = new Date();
  next();
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  this.lastUpdate = new Date();
  next();
});

module.exports = mongoose.model('Chat', ChatSchema, 'chat');
