const production = {
  database: 'mongodb://admin:3lli0t!!@159.65.15.106:27017/temuin-prod?ssl=false&authSource=admin',
  app: {
    port: 8080,
    morgan: {
      type: 'dev',
      options: {
        skip: (req, res) => (res.statusCode < 400),
      },
    },
    session: {
      secret: 't3mu1npr0d',
    },
  },
};
module.exports = production;
