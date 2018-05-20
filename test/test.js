/* global describe, before */
const common = require('./common');

const importTest = (name, path) => {
  describe(name, () => {
    require(path); // eslint-disable-line global-require, import/no-dynamic-require
  });
};

describe('Starting Unit Testing\n', () => {
  before((done) => {
    const { mongoose } = common;
    mongoose.connection.on('connected', () => {
      mongoose.connection.db.dropDatabase();
      // const i = mongoose.connection.collections;
      // Object.keys(i).map(key => i[key].remove(() => {}));
      done();
    });
  });
  importTest('1. Registration', './registration/registration');
  importTest('2. Authentication', './authentication/authentication');
  importTest('3. Profile', './profile/profile');
  importTest('4. Timeline', './timeline/timeline');
  importTest('5. Post Item', './post/post');
  importTest('6. Timeline-Socket', './timeline/websocket');
  importTest('7. Chat feature', './chat/chat');
});
