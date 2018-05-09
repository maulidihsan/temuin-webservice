// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    chai,
    ioClient,
    app,
} = require('../common');

const AccessToken = require('../authentication/authentication');


describe('Send Ack', () => {
    const options = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'x-temuin-token': AccessToken,
                },
            },
        },
        transports: ['websocket'],
        'force new connection': true,
    };

    beforeEach((done) => { // eslint-disable-line
        // start the server
        const server = app.server;
        done();
    });

    it('send ack', (done) => {
        const client = ioClient.connect('http://localhost:3001', options);
        client.once("connect", function () {
            client.once("whois", function (message, callback) {
                callback()
            });
            client.disconnect();
            done();
        });
    });
});