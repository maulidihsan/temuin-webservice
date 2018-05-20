const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const jwt = require('jsonwebtoken');
const { jwt: { secret: key } } = require('../../config.js').get(process.env.NODE_ENV || 'development');
const fcm = require('../middlewares/fcm');

let IO;
module.exports = (io) => {
  IO = io;
  io.use((socket, next) => {
    // console.log('SOCKET:', socket.handshake.headers);
    const header = socket.handshake.headers['x-temuin-token'];
    jwt.verify(header, key, (err, decoded) => {
      if (!err) {
        socket.username = decoded.username; // eslint-disable-line
        next();
      }
      return next(new Error('authentication error'));
    });
    return next(new Error('authentication error'));
  });
  io.on('connection', (socket) => {
    UserModel.findOne({ username: socket.username })
      .then((data) => {
        // lengkapi data user
        socket.nama = data.nama; // eslint-disable-line
        socket.urlFoto = data.urlFoto; // eslint-disable-line
        // subscribe to user chatbox
        socket.join(socket.username);
      })
      .catch(error => console.log(error));
    socket.on('send_msg', (data, cb) => {
      const senderData = { username: socket.username, nama: socket.nama, urlFoto: socket.urlFoto };
      data.sender = senderData; // eslint-disable-line
      if (data.to) {
        ChatModel.findOneAndUpdate(
          { owner: senderData.username, sender: data.to },
          {
            $push: {
              messages: {
                $each: [{
                  sender: senderData.username,
                  timestamp: Date.now(),
                  body: data.message,
                }],
                $position: 0,
              },
            },
          },
          { upsert: true, new: true },
        )
          .then(() => ChatModel.findOneAndUpdate(
            { owner: data.to, sender: senderData.username },
            {
              $push: {
                messages: {
                  $each: [{
                    sender: senderData.username,
                    timestamp: Date.now(),
                    body: data.message,
                  }],
                  $position: 0,
                },
              },
            },
            { upsert: true, new: true },
          ))
          .then(() => {
            io.to(data.to).emit('new_msg', data);
            fcm.sendToDevice(data.to, data.message)
              .then((response) => {
                if (response) {
                  cb('Sent with FCM');
                }
              })
              .catch(() => cb('Sent with socket'));
          })
          .catch((error) => { console.log('error ya', error); cb('Failed to send'); });
      }
    });
    // socket.on('disconnect', () => {
    //   UserModel.findOneAndUpdate(
    //     { username: socket.username },
    //     { $pull: { sockets: socket.id } },
    //   )
    //     .then(() => console.log('User disconnected'))
    //     .catch(error => console.log(error));
    // });
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
      users.map((user) => {
        IO.to(user.username).emit('new_post', data);
        return fcm.sendToDevice(user.username, data);
      });
    })
    .catch(err => console.log(err));
};
