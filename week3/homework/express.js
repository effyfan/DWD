var express = require('express')
// app is the server we will be running
var app = express()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.set('view engine', 'ejs');

var mongojs = require('mongojs');
var db = mongojs(config.username:config.password@example.com:port/mydb, ["mycollection"]);

var config = require('./config.js');
someFunctionThatRequiresPassword(config.username, config.password);

app.use(express.static('public'));


/////////////Express Template/////////////
app.get('/templatetest', function(req, res) {
	// var data = {person: {name: "Shawn", other: "blah"}};
   var data = {people: [{name: "Shawn", other: "blah"}, {name: "Joe", other: "No"}]};
    res.render('template.ejs', data);
});

//////////////MongoDB/////////////////////
// insert a record to database
db.mycollection.save({"attribute_to_save":"value_to_save"}, function(err, saved) {
  if( err || !saved ) console.log("Not saved");
  else console.log("Saved");
});
//pull records from database
db.mycollection.find({}, function(err, saved) {
  if (err || !saved) {
  	console.log("No results");
  }
  else {
  	saved.forEach(function(record) {
    	console.log(record);
  	});

  	/* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
	*/
  }
});
//search for records
db.mycollection.find({"attribute":"value_to_search_for"}, function(err, saved) {
  if( err || !saved) console.log("No results");
  else saved.forEach( function(record) {
    console.log(record);
  } );
});

////////////body-parser/////////////////
var scores =[];

app.post('/formpost', function(req, res) {
    var textvalue = Number(req.body.score);
    scores.push(textvalue);
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
      sum += scores[i];
    }
    var averageValue = (sum / scores.length);

    console.log("They submitted: " + textvalue);
    res.send("You submitted: " + textvalue + ",   " + "The average score is: " + averageValue);
});

app.listen(3000, function () {
  console.log('Effy is listening on port 3000!')
})
