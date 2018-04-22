const test = {
  database: 'mongodb://tester:s3cur3pwdd@159.65.15.106:27017/temuin-test?ssl=false&authSource=test',
  jwt: {
    secret: 'temuin-test-very-secret',
  },
  app: {
    port: 3001,
    morgan: {
      type: 'tiny',
      options: {},
    },
    session: {
      secret: 't3sttt',
    },
  },
};

module.exports = test;
