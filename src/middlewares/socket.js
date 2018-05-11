const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { jwt: { secret: key } } = require('../../config.js').get(process.env.NODE_ENV || 'development');

let IO;
module.exports = (io) => {
  IO = io;
  io.use((socket, next) => {
    const header = socket.handshake.headers['x-temuin-token'];
    console.log('Header', header);
    jwt.verify(header, key, (err, decoded) => {
      socket.username = decoded.username; // eslint-disable-line
      UserModel.findOneAndUpdate(
        { username: decoded.username },
        { $addToSet: { sockets: socket.id } },
      )
        .then(() => next())
        .catch(error => console.log(error));
    });
    return next(new Error('authentication error'));
  });
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      UserModel.findOneAndUpdate(
        { username: socket.username },
        { $pull: { sockets: socket.id } },
      )
        .then(() => console.log('User disconnected'))
        .catch(error => console.log(error));
    });
  });
};

module.exports.notif_new_post = (data) => {
  UserModel.find({
    lastLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: data.lokasi.coordinates,
        },
        $maxDistance: 1000,
      },
    },
  })
    .then((users) => {
      users.map(user => user.sockets.map(client => IO.to(client).emit('new_post', data)));
    })
    .catch(err => console.log(err));
};
