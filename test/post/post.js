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
    newpost,
} = require('../common');

let AccessToken;
chai.use(chaiHttp);
// Our parent block
describe('[POST] /timeline/post', () => {
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
    it('it should not post the items without complete field', (done) => {
        const lostpost = {
            username: newpost.username,
            deskripsi: '',
            email: newpost.email,
            urlGambar: newpost.urlGambar,
            lokasi: newpost.lokasi,
            kategori: 'lost',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').and.to.be.a('array');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                // res.header.location.should.include('/users/authentication');
                done();
            });
    });
    it('it should not post the items without user field being empty', (done) => {
        const lostpost = {
            username: '',
            deskripsi: '',
            email: '',
            urlGambar: newpost.urlGambar,
            lokasi: newpost.lokasi,
            kategori: 'lost',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').and.to.be.a('array');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                // res.header.location.should.include('/users/authentication');
                done();
            });
    });
    it('it should post the lost items', (done) => {
        const lostpost = {
            username: newpost.username,
            email: newpost.email,
            deskripsi: newpost.deskripsi,
            urlGambar: newpost.urlGambar,
            lokasi: newpost.lokasi,
            kategori: 'lost',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                // res.header.location.should.include('/users/authentication');
                done();
            });
    });
    it('it should post the found items', (done) => {
        const lostpost = {
            username: newpost.username,
            email: newpost.email,
            judul: newpost.judul,
            deskripsi: newpost.deskripsi,
            urlGambar: newpost.urlGambar,
            lokasi: newpost.lokasi,
            kategori: 'found',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                done();
            });
    });
    it('it should reject unknown category', (done) => {
        const lostpost = {
            username: newpost.username,
            email: newpost.email,
            deskripsi: newpost.deskripsi,
            urlGambar: newpost.urlGambar,
            lokasi: newpost.lokasi,
            kategori: 'unknown',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                done();
            });
    });
    it('it should reject post without image', (done) => {
        const lostpost = {
            username: newpost.username,
            email: newpost.email,
            deskripsi: newpost.deskripsi,
            urlGambar: '',
            lokasi: newpost.lokasi,
            kategori: 'found',
        };
        chai.request(app)
            .post('/timeline/new_post')
            .set('x-temuin-token', AccessToken)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                done();
            });
    });
});
