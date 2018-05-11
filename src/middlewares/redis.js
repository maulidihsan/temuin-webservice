import redis from 'redis';
import promise from 'bluebird';

const config = require('../../config.js').get(process.env.NODE_ENV || 'development');

const REDIS_URL = config.redis;

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);

exports.client = () => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    const connector = redis.createClient(REDIS_URL);

    connector.on('error', () => {
      reject(new Error('Redis Connection failed'));
    });

    connector.on('connect', () => {
      resolve(connector);
    });
  });
};
