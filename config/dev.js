const dev = {
  database: 'mongodb://developer:s3cur3pwd!@159.65.15.106:27017/temuin-dev?ssl=false&authSource=admin',
  redis: 'redis://admin:JEQJSXMYPPBWPWMG@sl-aus-syd-1-portal.1.dblayer.com:18408',
  jwt: {
    secret: 'temuin-dev-very-secret',
  },
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
