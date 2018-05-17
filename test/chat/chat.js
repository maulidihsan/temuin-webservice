// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    chai,
    chaiHttp,
    app,
    profile,
    profile2,
    ioClient,
} = require('../common');

chai.use(chaiHttp);
let AccessToken;
let AccessToken2;
let client;
let client2;

describe('Testing chat feautes', () => {
    it('it should register a second account', (done) => {
        chai.request(app)
            .post('/users/registration')
            .send(profile2)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                done();
            });
    });
    it('it should get auth token for profile1', (done) => {
        const User = {
            usernameOrEmail: profile.username,
            password: profile.password,
        };
        chai.request(app)
            .post('/users/authentication')
            .send(User)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                res.body.data.should.have.property('user').and.to.be.a('object');
                res.body.data.should.have.property('accessToken').and.to.be.a('string');
                res.body.data.should.have.property('refreshToken').and.to.be.a('string');
                AccessToken = res.body.data.accessToken;
                done();
            });
    });
    it('it should get auth token for profile2', (done) => {
        const User = {
            usernameOrEmail: profile2.username,
            password: profile2.password,
        };
        chai.request(app)
            .post('/users/authentication')
            .send(User)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                res.body.data.should.have.property('user').and.to.be.a('object');
                res.body.data.should.have.property('accessToken').and.to.be.a('string');
                res.body.data.should.have.property('refreshToken').and.to.be.a('string');
                AccessToken2 = res.body.data.accessToken;
                done();
            });
    });
    it('profile should connect to websocket host', (done) => {
        const options = {
            extraHeaders: {
                'x-temuin-token': AccessToken,
            },
        };
        client = ioClient.connect('http://localhost:3001', options);
        client.on('connect', () => {
            done();
        });
    });
    it('profile2 should connect to websocket host', (done) => {
        const options = {
            extraHeaders: {
                'x-temuin-token': AccessToken2,
            },
        };
        client2 = ioClient.connect('http://localhost:3001', options);
        client2.on('connect', () => {
            done();
        });
    });
    it('it should send message to Profile2', (done) => {
        const payload = {
            to: profile2.username,
            message: 'Halo',
        };
        
        client.emit('send_msg', payload, (ok) => {
            console.log(ok);
        });
        client2.on('new_msg', (data) => {
            console.log(data);
            done();
        });
    });
});
