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
} = require('../common');


chai.use(chaiHttp);

describe('[POST] /users/registration', () => {
    it('it should not POST a register without email field', (done) => {
        const User = {
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register without password field', (done) => {
        const User = {
            email: 'a@gmail.com',
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
    it('it should not POST a register without username field', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register without nama field', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntut',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register without ttl field', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            password: 'coba',
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
    it('it should not POST a register without jenisKelamin field', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register wrong format email field 1', (done) => {
        const User = {
            email: 'maulid@gmail',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register wrong format email field 2', (done) => {
        const User = {
            email: 'maulid@gmil.',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register wrong format ttl field', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '5 Juli 1998',
            password: 'coba',
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
    it('it should not POST a register when username less than 6 word', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntu',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
    it('it should not POST a register when password less than 6 word', (done) => {
        const User = {
            email: 'maulid@gmail.com',
            username: 'Suntut',
            nama: 'Jajang Fauzi',
            ttl: '1998-07-05',
            password: 'coba',
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
            .send(profile2)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.to.be.a('boolean');
                res.body.should.have.property('status').and.to.be.a('number');
                done();
            });
    });
});
