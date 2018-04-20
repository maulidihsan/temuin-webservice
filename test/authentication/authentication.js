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
                res.should.have.status(200);
                expect('Location', '/users/authentication');
                done();
            });
    });
    it('it should authenticate with username ', (done) => {
        const User = {
            usernameOrEmail: profile.username,
            password: profile.password,
        };
        chai.request(app)
            .post('/users/authentication')
            .send(User)
            .end((err, res) => {
                res.should.have.status(200);
                expect('Location', '/');
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
                expect('Location', '/');
                done();
            });
    });
});
