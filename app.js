/* Dependencies */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const app = require('express')();
const controllers = require('./src/controllers');
const config = require('./config.js').get(process.env.NODE_ENV || 'development');

const port = process.env.PORT || config.app.port;

app.use(morgan(config.app.morgan.type, config.app.morgan.options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
app.use(session({
  secret: config.app.session.secret,
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database).then(
  () => { console.log('Database connection succeeded.'); },
  (err) => { console.log(err); },
);

app.use('/', controllers);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  fs.appendFileSync('log.txt', '\r\n', err);
  const error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({ success: false, status: 500, message: error });
});
app.listen(port, () => {
  console.log('Server started on', port);
});

process.on('uncaughtException', (err) => {
  console.error(err);
  fs.appendFileSync('log.txt', '\r\n', err);
  console.log('Node NOT Exiting...');
});

module.exports = app;
