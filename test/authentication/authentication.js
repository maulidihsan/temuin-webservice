// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    chai,
    chaiHttp,
    app,
    expect,
    profile,
} = require('../common');

let RefreshToken;
chai.use(chaiHttp);
// Our parent block
describe('[POST] /users/authenticate', () => {
    it('it should not login without complete field', (done) => {
        const User = {
            usernameOrEmail: profile.password,
        };
        chai.request(app)
            .post('/users/authentication')
            .send(User)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('status');
                // res.header.location.should.include('/users/authentication');
                done();
            });
    });
    it('it should not login without the right password', (done) => {
        const User = {
            usernameOrEmail: profile.username,
            password: 'wrongpassword',
        };
        chai.request(app)
            .post('/users/authentication')
            .send(User)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('msg').and.to.be.a('string');
                expect(res.body.msg).to.be.equal('Password Salah');
                done();
            });
    });
    it('it should authenticate with the right credentials', (done) => {
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
                done();
            });
    });
    it('it should authenticate with email ', (done) => {
        const User = {
            usernameOrEmail: profile.email,
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
                ({ refreshToken: RefreshToken } = res.body.data);
                done();
            });
    });
    it('it should NOT refresh access token without the right refresh token', (done) => {
        const Data = {
            usernameOrEmail: profile.email,
            refreshToken: 'randomrefeadawdjajwdajdada',
        };
        chai.request(app)
            .post('/users/authentication/refresh')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('msg').and.to.be.a('string');
                done();
            });
    });
    it('it should refresh access token with the right refresh token', (done) => {
        const Data = {
            usernameOrEmail: profile.email,
            refreshToken: RefreshToken,
        };
        chai.request(app)
            .post('/users/authentication/refresh')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('accessToken').and.to.be.a('string');
                done();
            });
    });
});
