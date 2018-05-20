var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.argv[2] || 5000;

server.listen(port, function(){
  console.log('Server listening at port %d', port);
  console.log('Server dirname : ', __dirname);
});

var bodyParser = require('body-parser'); //
app.use(express.static(__dirname + '/public'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('info.json', 'utf8'));

console.log('Answer: '+ obj['금동신발']['재질']); //// debugging

//app.all('/', function(req, res){
//app.get('/', function(req, res){
app.post('/', function(req, res){
  console.log('req: \n' + JSON.stringify(req.body));
  //var item = req.body.result.parameters['item'];
  var item = req.body.queryResult.parameters['item'];
  var material = req.body.queryResult.parameters['material'];
  var size = req.body.queryResult.parameters['size'];
  var discover_time = req.body.queryResult.parameters['discover_time'];

  var output = "답변드립니다. " + obj[item][material];

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'speech': output, 'displayText': output}));
})

/////////////////////////////////////////
//var path = require('path');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
/////////////////////////////////////////
