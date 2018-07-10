var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 8080;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});


app.post('/', function (req, res, next) {
//var response= res.json(body)
var userName = req.body.user_name;
var txt = req.body.text;
var depType = req.body.trigger_word;
//var finaltxt = txt.substr(6,txt.length);
var tmpVar = null;
var request = require('request');

if (depType === 'build') { tmpVar = 'built';}
else if (depType === 'build-deploy') { tmpVar = 'built & deployed'; }
else { tmpVar = 'deployed' ;}

//post back to jenkins
if ( depType === 'deploy' ) {
var finaltxt = txt.substr(7,txt.length);
request.post(
//    'http://52.79.92.144:8080/generic-webhook-trigger/invoke?token=deploy_tkn',
    { json: { 'svcName': finaltxt, 'depType': depType } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}
else if (depType === 'build') { 
var finaltxt = txt.substr(6,txt.length);
request.post(
//    'http://52.79.92.144:8080/generic-webhook-trigger/invoke?token=build_tkn',
    { json: { 'svcName': finaltxt, 'depType': depType } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}
else {
var finaltxt = txt.substr(13,txt.length);
request.post(
//    'http://52.79.92.144:8080/generic-webhook-trigger/invoke?token=build_tkn',
    { json: { 'svcName': finaltxt, 'depType': depType } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}
var botPa =
{
    text : 'Hello ' + userName +', ' +  finaltxt + ' service will be ' + tmpVar 
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPa);
} else {
    return res.status(200).end();
}
});
