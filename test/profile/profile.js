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
} = require('../common');

let AccessToken;
chai.use(chaiHttp);
// Our parent block
describe('[GET] /users/profile', () => {
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
                ({ accessToken: AccessToken } = res.body.data);
                done();
            });
    });
    it('it should get the profile info', (done) => {
        chai.request(app)
            .get('/users/profile')
            .set('authorization', `Bearer ${AccessToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('it should change the profile info', (done) => {
        const User = {
            data: {
                nama: 'Jajang Fauzi',
            },  
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('authorization', `Bearer ${AccessToken}`)
            .send(User)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
});