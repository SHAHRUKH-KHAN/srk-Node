// need to import the http module
var http = require('http');

//need a dispatcher to redirect requests
var dispatcher = require('httpdispatcher');

//define a port which you listen too.
const PORT = 8080;


//We need a function which handles requests and send response
/*This is the point of entry for your server application,
 you can reply to requests as per your business logic.*/
function handleRequest(request, response){
	try {
    	//dispatches
    	dispatcher.dispatch(request, response);
	}
	catch(err) {
		console.log(err);
	}
}

// create server and handle the request made
/*Here we are creating a new HTTP Server Object and then asking it to listen on a port.*/
var server = http.createServer(handleRequest);


//callback to be triggered when path of the server is hit.
function callbackToTrigger() {
	console.log('server listening on http://localhost:%s',PORT);
}

//Sample GET request.
dispatcher.onGet("/page1", function(request, response) {
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Page One');
});

//listen(start) your server.
server.listen(PORT, callbackToTrigger());

