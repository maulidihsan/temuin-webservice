/* global describe, before */
const common = require('./common');

const importTest = (name, path) => {
  describe(name, () => {
    require(path); // eslint-disable-line global-require, import/no-dynamic-require
  });
};

describe('Starting Unit Testing', () => {
  before((done) => {
    const { mongoose } = common;
    mongoose.connection.on('connected', () => {
      mongoose.connection.db.dropDatabase();
      // const i = mongoose.connection.collections;
      // Object.keys(i).map(key => i[key].remove(() => {}));
      done();
    });
  });
  importTest('Registration', './registration/registration');
  importTest('Authentication', './authentication/authentication');
});
