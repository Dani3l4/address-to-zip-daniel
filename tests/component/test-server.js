var externalService = require('../../external-service');
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
        startZipCodeServerMoch();
    });

    after( () => {
        closeLocalServer();
    });

    describe('Newly created server', () => {
        it('Should return status 200', () => {
            return sendRequestTo(serverBaseUrl, '/')
            .then( (res, err) => {
                expect(res).to.have.status(200);
            });
        });
    });
    
    describe('Rest API', () => {
        it('Should use external service to get zipcode from recieved address', () => {
            return sendRequestTo(serverBaseUrl, '/v1/Hasadnaot 8, Herzliya, Israel')
            .then((res, err) => {
                expect(res.text).to.equal('1234');
            });
        });
    });
});

function startLocalServer(){
    server = require("../../server");
};

function closeLocalServer(){
    server.close();
};

function startZipCodeServerMoch(){
    nock("http://api.zipcodes.io")
    .get('/zipcode/')
    .reply(200, {
        "status": 200,
        "zipcode": "1234"
    });
}

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

