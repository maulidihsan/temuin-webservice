// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    chai,
    chaiHttp,
    ioClient,
    profile,
    app,
} = require('../common');

const holder = require('../authentication/authentication');

describe('Send Ack', () => {
    
    const options = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'x-temuin-token': holder.Token,
                },
            },
        },
        transports: ['websocket'],
        'force new connection': true,
    };

    

    // beforeEach((done) => { // eslint-disable-line
    //     // start the server
    //     server = app;
    //     done();
    // });

    it('send ack', (done) => {
        const client = ioClient.connect('http://localhost:3001', options);
        client.once("connect", function () {
            console.log('berhasil');
            client.disconnect(); 
            done();
        });
    });
});