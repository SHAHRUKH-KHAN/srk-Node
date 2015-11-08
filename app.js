//start of the file needs to include the express module using a require statement
//ref: http://blog.modulus.io/nodejs-and-express-create-rest-api
var express = require('express');
var app = express();

//this is require to resolve the path to project
var path = require('path');

//For compiling LESS to CSS
var lessMiddleware = require('less-middleware');


/*In order to get the body from a POST in express we have to add a 
piece of middleware to our application. This is done using bodyParser middleware.*/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//options for static which will be usd for images,styling, etc files
var options = {};

app.use(express.static(__dirname+'/node_modules', options));
app.use(express.static(__dirname+'/images', options));

//this will compile your less files to css file and store in folder tmp
app.use(lessMiddleware(path.join(__dirname, 'styles'),{
	dest: path.join(__dirname,'tmp')
}));

app.use(express.static(__dirname+'/tmp', options));

//using the srcipts in my application
app.use(express.static(__dirname+'/myAppScripts',options));

//using veiws for my application
app.use(express.static(__dirname+'/views', options));

//below code is for getting a random quote
//explain usage of "response.json"

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];


//below code is for getting a quote with id
//explain usage of "request"

app.get('/quote/:id', function(request, response){
  	var q = quotes[request.params.id];
	response.json(q);
	response.end();
});


//below is how to add a HTML file - here it will land
app.get('/', function(request, response){
	console.log(__dirname);
	response.sendFile(path.join(__dirname,'/views/index.html'));
});



//explain usage of "request" ,adding a new quote
app.post('/inputForm', function(request, response){
	if(!request.body.hasOwnProperty('author') || !request.body.hasOwnProperty('text')) {
    	response.statusCode = 400;
    	return response.send('Error 400: Post syntax incorrect.');
  	} 
	  newQuote1 = {
	  	author : request.body.author,
	    text : request.body.text
	  };
 
	quotes.push(newQuote1);
  	response.send(quotes);
  	response.end();
});

//The final thing we need to do in this simple example is have the app listen for incoming requests.
console.log('Server is running at port 8080');
app.listen(8080);