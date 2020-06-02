var http = require('http');
var url = require('url');
var fs = require('fs');

var http = require('http');
 
 
var server = http.createServer();
 
var port = 8000;
server.listen(port, function() {
    console.log('8000 server start');
});
 
server.on('request', function(request, response) {
 
    var parsedURL = url.parse(request.url);
    var resource = parsedURL.pathname;

    if(resource.indexOf('/download/') == 0){

        var hex_sample = '';
        let data = '';

        var filePath = resource.substring(1);
        console.log('filePath = ' + filePath);
        
        var readStream = fs.createReadStream(filePath);
        readStream.setEncoding();
        //readStream.setEncoding('hex');
        readStream.on('data', chunk => (data += chunk));
        readStream.on('end', () => {

            hex_sample = data.toString(); 
            console.log(data.toString());

            response.writeHead(200);
            response.end(hex_sample);
        });
    }
    else{
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.end('404 Page Not Found');
    }
});