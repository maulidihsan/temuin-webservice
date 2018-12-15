const prod = require('./config/production.js');
const dev = require('./config/dev.js');
const tes = require('./config/test.js');

const config = {
  production: prod,
  development: dev,
  test: tes,
};

exports.get = function get(env) {
  return config[env] || config.test;
};
