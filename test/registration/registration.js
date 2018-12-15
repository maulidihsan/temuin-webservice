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


chai.use(chaiHttp);

describe('[POST] /users/registration', () => {
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
                res.body.should.have.property('errors').and.to.be.a('array');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                done();
            });
    });
    it('it should POST a register with complete field', (done) => {
        chai.request(app)
            .post('/users/registration')
            .send(profile)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                done();
            });
    });
});
