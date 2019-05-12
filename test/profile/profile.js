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
describe('[GET] /users/profile [POST] /users/profile/update', () => {
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
    it('it should get the profile info', (done) => {
        chai.request(app)
            .get('/users/profile')
            .set('x-temuin-token', AccessToken)
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
            .set('x-temuin-token', AccessToken)
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
    it('it should not change the profile info', (done) => {
        const User = {
            data: {
                nama: 'Jajang Fauzi',
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .send(User)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('blank name in string', (done) => {
        const User = {
            data: {
                nama: '',
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
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
    it('without user data', (done) => {
        const User = {
            
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
            .send(User)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('with integer data', (done) => {
        const User = {
            data: {
                ttl: 19980807,                
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
            .send(User)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('with boolean data', (done) => {
        const User = {
            data: {
                ttl: true,                
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
            .send(User)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('with floating data', (done) => {
        const User = {
            data: {
                ttl: 8.0,                
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
            .send(User)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
    it('no such data in profile', (done) => {
        const User = {
            data: {
                hobi: 'main komputer',                
            },
        };
        chai.request(app)
            .post('/users/profile/update')
            .set('x-temuin-token', AccessToken)
            .send(User)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('data').and.to.be.a('object');
                done();
            });
    });
});
