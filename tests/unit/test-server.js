var nock = require('nock');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;
var assert = chai.assert;
var server;

describe('Test server', () => {

    var serverBaseUrl = 'http://localhost:3000';

    beforeEach( () => {
        startLocalServer();
    });

    after( () => {
        closeLocalServer();
    });


});

function startLocalServer(){
    server = require("../../server");
};

function closeLocalServer(){
    server.close();
};

function sendRequestTo(serverUrl, restUrl){
    return new Promise((resolve, reject) => {
        chai.request(serverUrl)
        .get(restUrl)
        .end((err, res) => {
            if (err) {
                reject(err); 
            }
            resolve(res);
        });
    })
};

