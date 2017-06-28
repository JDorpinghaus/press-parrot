// Import express and request modules
var express = require('express');
var request = require('request');

var credentials = require('./credentials');
var app = express();
const PORT=process.env.port || 8080;
const gameId = '5965397021949952';

//Start server
app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT);
});

//Request to a /oauth endpoint for handling the logic of the Slack oAuth process
app.get('/oauth', function(req, res) {
  if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else
      request({
            url: "https://slack.com/api/oauth.access", //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);
            }
        })
});

//Get current Diplomacy stats
app.post('/stats', function(req, res) {
  url = 'http://www.backstabbr.com/game/' + gameId;
  res.send("Hit stats endpoint.");
});

//Check server status
app.get('/healthz', function(req, res) {
    res.send('Server is here.');
});
