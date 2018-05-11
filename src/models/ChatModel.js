const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  participant: {
    type: [String],
    required: true,
  },
  participant_detail: {
    type: [{
      username: { type: String },
      nama: { type: String },
      urlFoto: { type: String },
    }],
    required: true,
  },
  messages: {
    type: [{
      timestamp: { type: Number },
      messages: { type: String },
    }],
  },
  lastUpdate: { type: Number },
});

ChatSchema.pre('save', function (next) {
  this.lastUpdate = new Date();
  next();
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  this.lastUpdate = new Date();
  next();
});

module.exports = mongoose.model('Chat', ChatSchema, 'chat');
