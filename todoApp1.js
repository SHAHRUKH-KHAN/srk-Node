var express = require('express');
var http = require('http');
var mysql = require('mysql');

var app = express();



app.get('/', function(request, response){
		response.send('up and running');
		response.end;
})


var connection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'shahrukh',
  	password : 'root',
  	database : 'credentials'
});


connection.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... \n\n");  
	} else {
	    console.log("Error connecting database ... \n\n");  
	}
});

//create a table
/*app.get('/table', function(request, response){
	connection.query('CREATE TABLE Persons
		(
		PersonID int,
		LastName varchar(255),
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255)
		)', function(err, rows, fields){
		connection.end();
		  if (!err)
		    console.log('The solution is: ', rows);
		  else
		    console.log('Error while performing Query.');
		  });
		});	*/	



app.listen('8080');
console.log('server listening to 8080');