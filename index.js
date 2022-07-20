const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express()
const port = 8080

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var credentials = {
  key: key,
  cert: cert
};

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log("Https server listing on port : " + port)
});