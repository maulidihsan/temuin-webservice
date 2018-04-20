process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const UserData = require('../src/models/UserModel');
const Credentials = require('../src/models/CredsModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const profile = {
  email: 'maulid@gmail.com',
  username: 'mldihsn',
  nama: 'Maulid Ihsan',
  ttl: '1998-07-05',
  password: 'coba',
  jenisKelamin: 'Laki-Laki',
};

module.exports.mongoose = mongoose;
module.exports.chai = chai;
module.exports.assert = chai.assert;
module.exports.should = chai.should();
module.exports.expect = chai.expect;
module.exports.chaiHttp = chaiHttp;
module.exports.UserData = UserData;
module.exports.Credentials = Credentials;
module.exports.app = app;
module.exports.profile = profile;
