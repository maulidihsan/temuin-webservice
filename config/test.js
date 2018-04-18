const test = {
  database: 'mongodb://tester:s3cur3pwdd@159.65.15.106:27017/temuin-test?ssl=false&authSource=test',
  app: {
    port: 3001,
    morgan: {
      type: 'tiny',
      options: {},
    },
  },
};

module.exports = test;
