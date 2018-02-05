var express = require('express')
// app is the server we will be running
var app = express()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);


app.get('/textfile', function (req, res) {
  res.send('Hello friend')
  console.log('new vistor!!!!!');
})

app.get('/htmlfile', function (req, res) {
  console.log('new html request')
  var fileToSend = "index.html";
	res.sendfile(fileToSend, {root: './public'});
})

app.use(express.static('public'));




////////////body-parser/////////////////
app.get('/yourform', function (req, res) {
 var fileToSend = "/form.html";
 res.sendfile(fileToSend, {root: './'});
 console.log("They submitted:" + req.query.textfield);
});

app.post('/formpost', function(req, res) {
    var textvalue = req.body.textfield;
    res.send("You submitted: " + textvalue);
});





app.listen(3000, function () {
  console.log('Effy is listening on port 3000!')
})
