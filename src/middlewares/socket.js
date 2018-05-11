const UserModel = require('../models/UserModel');
const jwtoken = require('jsonwebtoken');
const { jwt: { secret: key } } = require('../../config').get(process.env.NODE_ENV || 'development');

let IO;
module.exports = (io) => {
  IO = io;
  io.use((socket, next) => {
    // console.log('SOCKET:', socket.handshake.headers);
    const header = socket.handshake.headers['x-temuin-token'];
    jwtoken.verify(header, key, (err, decoded) => {
      if(err) { console.log(err)}
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
    socket.emit('berhasil', 'ok')
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
