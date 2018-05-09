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
describe('[GET] /users/timeline', () => {
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
                AccessToken = res.body.data.accessToken;
                done();
            });
    });
    it('it should get the timeline', (done) => {
        chai.request(app)
            .get('/timeline?lat=40.7143528&lng=-74.0059731&radius=2')
            .set('x-temuin-token', AccessToken )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('array');
                // res.body.data.should.have.property('lokasi').and.to.be.a('object');
                done();
            });
    });
});

describe('[GET] /users/location', () => {
    it('it should get the user location', (done) => {
        chai.request(app)
            .get('/users/location?lat=40.7143528&lng=-74.0059731')
            .set('x-temuin-token', AccessToken)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                res.body.data.should.have.property('lastLocation').and.to.be.a('object');
                done();
            });
    });
});