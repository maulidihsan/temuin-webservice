// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    chai,
    chaiHttp,
    app,
    newpost,
    ioClient,
} = require('../common');

const tokenakses = require('../authentication/authentication');

let client;
chai.use(chaiHttp);

describe('Real-time new post', () => {
    it('Connect to host', (done) => {
        const options = {
            extraHeaders: {
                'x-temuin-token': tokenakses.Token,
            },
        };
        client = ioClient.connect('http://localhost:3001', options);
        client.on('connect', () => {
            done();
        });
    });
    it('Client post new data to timeline and retrieve them via socket', (done) => {
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
            .set('x-temuin-token', tokenakses.Token)
            .send(lostpost)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').and.to.be.a('number');
                res.body.should.have.property('success').and.to.be.a('boolean');
                // res.header.location.should.include('/users/authentication');
                client.on('new_post', (data) => {
                    data.should.be.a('object');
                    done();
                });
            });
    });
});
