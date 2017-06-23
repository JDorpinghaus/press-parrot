// Import express and request modules
var express = require('express');
var request = require('request');

var credentials = require('./credentials');
var app = express();
const PORT=4390;

//Start server
app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT);
});

//Request to a /oauth endpoint for handling the logic of the Slack oAuth process
app.get('/oauth', function(req, res) {

        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: credentials.clientId, client_secret: credentials.clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);
            }
        })
    }
});

//Get current Diplomacy stats
app.post('/stats', function(req, res) {
  res.send("Hit stats endpoint.");
});

//Check server status
app.post('/healthz', function(req, res) {
    res.send('Server is here.');
});