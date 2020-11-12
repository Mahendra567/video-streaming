var http = require('http');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var express = require('express');
require('dotenv').load();


// Create Express webapp.
var app = express();

app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
});

// app.get('/', function (request, response) {
//   response.status(200).json({ status: "sucess", body: "App is running" })
// })

/*******************************************************************************
 * Generate an Access Token for a chat application user provided via the url   *
 *******************************************************************************/
app.get('/token', function (request, response) {
  var identity = request.query['identity'];
  if (!identity) {
    return response.status(400).send({
      body: "An identity is needed"
    })
  }
  // Create an access token which we will sign and return to the client,

  var token = new AccessToken(
    "AC4d77c4e42048a723eace394ed8e109f0",
    "SK181883c00b451fcdc87bb500e871f623",
    "lbK41PNWpNVQippCFtSvC68NpEFijJ2e"
  );
  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Sending token to client
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});






// some hard coded user details
// const users = [
//   { identity: "user1", role: "user" },
//   { identity: "user2", role: "user" },
//   { identity: "user3", role: "user" },
//   { identity: "user4", role: "user" },
//   { identity: "user5", role: "user" },
//   { identity: "admin", role: "host" }
// ]

// app.get('/getUser', function (request, response) {

//   const identity = request.query.identity
//   console.log(identity,"identity")
//   if (!identity) {
//     return response.status(400).send({
//       status: "error",
//       body: "identity is required..."
//     })
//   }

//   const user = users.find(user => user.identity === identity)
//   if (!user) {
//     return response.status(400).send({
//       status: "error",
//       body: "identity not found"
//     })
//   }

//   return response.status(200).send({
//     status: "success",
//     data: user
//   })
// });




/************Creating Server***************/
var server = http.createServer(app);
var port = process.env.PORT || 4000;
server.listen(port, function () {
  console.log('Twilio server running on :' + port);
});
