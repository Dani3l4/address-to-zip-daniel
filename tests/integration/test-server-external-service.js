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
        startZipCodeServerMock();
    });

    after( () => {
        closeLocalServer();
    });

    describe('External service', () => {
        it('Should return zipcode from given address', () => {
            return externalService.getZipCode('Hasadnaot 8, Herzliya, Israel')
            .then((zipcode, err) => {
                expect(zipcode).to.equal('1234');
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

function startZipCodeServerMock(){
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

