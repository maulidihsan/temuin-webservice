// During the test the env variable is set to test
/* eslint indent: "error" */
/* global describe */
/* global beforeEach */
/* global it */
process.env.NODE_ENV = 'test';

const Userdata = require('../src/models/UserModel');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);
// Our parent block
describe('Registers', () => {
    beforeEach((done) => { // Before each test we empty the database
        Userdata.remove({}, (err) => { // eslint-disable-line no-unused-vars
            done();
        });
    });
    describe('/POST register', () => {
        it('it should not POST a register without complete field', (done) => {
            const User = {
                username: 'Suntut',
                nama: 'Jajang Fauzi',
                ttl: '1998-07-05',
                jenisKelamin: 'Laki-Laki',
            };
            chai.request(app)
                .post('/users/registration')
                .send(User)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.should.have.property('status');
                    res.body.should.have.property('success');
                    done();
                });
        });
        it('it should POST a register ', (done) => {
            const User = {
                email: 'mauliiid.ihsan@gmail.com',
                username: 'mlssdihsn',
                nama: 'Maulid Ihsan',
                ttl: '1998-07-05',
                password: 'coba',
                jenisKelamin: 'Laki-Laki',
            };
            chai.request(app)
                .post('/users/registration')
                .send(User)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('status');
                    done();
                });
        });
    });
});
