const mongoose = require('mongoose');
const validator = require('validator');
const UserModel = require('./UserModel');

const PostSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    username: {
      type: String,
    },
    urlFoto: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  deskripsi: {
    type: String,
    required: true,
  },
  urlGambar: {
    type: String,
    required: true,
  },
  lokasi: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] },
  },
  namaLokasi: {
    type: String,
  },
  support: {
    type: Number,
  },
  kategori: {
    type: String,
    validate: value => validator.isIn(value, ['lost', 'found']), // eslint-disable-line
  },
  created: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
});
PostSchema.index({ lokasi: '2dsphere' });
PostSchema.pre('save', function (next) {
  UserModel.findOne({ username: this.user.username })
    .then((data) => {
      if (data.urlFoto) {
        this.user.urlFoto = data.urlFoto;
      }
    });
  this.created = new Date();
  next();
});

PostSchema.pre('findOneAndUpdate', function (next) {
  this.lastUpdate = new Date();
  next();
});
module.exports = mongoose.model('Post', PostSchema, 'posts');
