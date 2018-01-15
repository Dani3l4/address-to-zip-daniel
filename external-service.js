var request = require('request');

class ExternalService {

    constructor(){};
    
    getZipCode(address){
        return new Promise((resolve, reject) => {

            var url = "http://api.zipcodes.io/zipcode/";

            request.get(url, (error, response, body) => {
                try{
                    if(error){
                        reject(error);
                    }
                    resolve(JSON.parse(body).zipcode);
                }
                catch(e){
                    reject(e);
                }
            });
        });
    };

};

module.exports = new ExternalService();