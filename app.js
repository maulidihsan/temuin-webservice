/* Dependencies */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = require('express')();
const controllers = require('./src/controllers');
const config = require('./config.js').get(process.env.NODE_ENV || 'development');

const port = process.env.PORT || config.app.port;

global.BASE_DIR = __dirname; // eslint-disable-line no-underscore-dangle
app.use(morgan(config.app.morgan.type, config.app.morgan.options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database, {useNewUrlParser: true}).then(
  () => { console.log('Database connection succeeded.'); },
  (err) => { console.log(err); },
);
app.use('/', controllers);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(err);
  fs.appendFileSync('log.txt', '\r\n', err);
  res.status(500).json({ success: false, status: 500, message: err });
});

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

server.listen(port, () => {
  console.log('server started on port', port);
});
require('./src/middlewares/socket')(io);

process.on('uncaughtException', (err) => {
  console.error(err);
  fs.appendFileSync('log.txt', '\r\n', err);
  console.log('Node NOT Exiting...');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});
module.exports = app;
