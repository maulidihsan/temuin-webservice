// During the test the env variable is set to test
/* global describe, it */
/* eslint indent: "error" */
// Require the dev-dependencies
const {
    should, // eslint-disable-line no-unused-vars
    ioClient,
} = require('../common');

const tokenakses = require('../authentication/authentication');

describe('TEST Websocket', () => {
    it('Send token as ack on connect', (done) => {
        const options = {
            extraHeaders: {
                'x-temuin-token': tokenakses.Token,
            },
        };
        const client = ioClient.connect('http://localhost:3001', options);
        client.on('connect', () => {
        })
        done();
    });
});