/* Dependencies */
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('express')();
const controllers = require('./controllers');
const config = require('../config.js').get(process.env.NODE_ENV || 'development');

const port = process.env.PORT || config.app.port;

app.use(morgan(config.app.morgan.type, config.app.morgan.options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.database).then(
  () => { console.log('Database connection succeeded.'); },
  (err) => { console.log(err); },
);

app.use('/', controllers);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({ success: false, status: 500, message: error });
});
app.listen(port, () => {
  console.log('Server started on', port);
});

module.exports = app;
