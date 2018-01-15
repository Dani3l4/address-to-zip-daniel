var externalService = require('./external-service');
var express = require('express')
var app = express()
 
var server = {};

app.get('/', (req, res) => {
  res.status(200).send("server is up");
});

app.get('/v1/:address', (req, res) => {
    externalService.getZipCode(req.params.address)
    .then((zipcode, err) => {
        if(err){
            res.status(500).send("Bad address");;
        }
        res.status(200).send(zipcode);
    });

});

app.set('port', 3000);

var server = app.listen(app.get('port'), () => {
    // console.log('Server started on port ' + app.get('port'));
});

module.exports = server;

