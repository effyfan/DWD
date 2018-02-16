var express = require('express');
var app = express();
var mongojs = require('mongojs');
var config = require('./config.js');
console.log(config);
var db = mongojs(config.username+":"+config.password+"@ds229648.mlab.com:29648/testing0208", ["submissions"]);


app.set('view engine', 'ejs');

// all defined routes
app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/see', function (req, res) {
  // // mockup data:
  // let data = [
  //   {
  //     name: "Effy",
  //     message: "Welcome back <3",
  //     secret: "zoo"
  //   },
  //   {
  //     name: "Peter",
  //     message: "I don't know you",
  //     secret: "banana"
  //   }
  // ]


  db.submissions.find({}, function(err, saved) {
  if (err || !saved) {
  	console.log("No results");
  }
  else {

    res.render("results.ejs", {"data": saved});

  	/* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
	*/
  }
});

});


let d = {
  Leon: "Get out of here",
  Effy: "Welcome back <3"
}
// route for form results
app.get('/processit', function (req, res) {
  let clientName = req.query.textfield;
  let clientSecret = req.query.secret;
  let messageToClient = d[clientName];
  if(messageToClient == null){
    messageToClient = "I don't know you";
  }
  let data = {name: clientName, message: messageToClient, secret: clientSecret}
  // push data to database!
  db.submissions.save(data, function(err, saved) {
    if( err || !saved ) console.log("Not saved");
    else console.log("Saved");
  });

  res.render("greeting.ejs", data);
});


// everything else will be checked whether it is
// in the public folder
app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
