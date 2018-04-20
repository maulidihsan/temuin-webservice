const dev = {
  database: 'mongodb://developer:s3cur3pwd!@159.65.15.106:27017/temuin-dev?ssl=false&authSource=admin',
  app: {
    port: 3000,
    morgan: {
      type: 'dev',
      options: {},
    },
    session: {
      secret: 'developm3nt',
    },
  },
};

module.exports = dev;
