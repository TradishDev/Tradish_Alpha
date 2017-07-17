//Version 1.0

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()


var server = require('http').createServer(app);

//local development 
//var hostname ='52.144.25.144.8'
var hostname = '127.0.0.1'; 
var port = 4000;

server.listen(port, hostname, function () {
    console.log(`Listening to http//${hostname}:${port}/`);
    //console.log('listenning to port 3000');
});


//mounting the directly. 
app.use(express.static('public'));
//app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

app.get('/', function (req, res) {
  console.log('Server Hit')
  //res.sendFile('index.html',{root: __dirname});
});

app.get('/testroute', function (req, res) {
  console.log('Server testroute Hit')
 // res.sendFile('index.html')
  res.sendFile('index.html',{root: __dirname});
});
//local path 

app.post('/', function (req, res) {
  res.send('Input Received')
  console.log('Server Hit')
  console.log(req.text)
})
