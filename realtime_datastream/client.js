var http = require('http');
var fs = require('fs');

const Blob = require('node-blob')

var fileSaver = require('file-saver')

var options = {

    hostname : '192.168.0.26',
    port : '8000',
    path : '/download/test_sample'
};

var req = http.get(options, function(response){

    var serverData = '';
    response.on('data', function(chunk){
        serverData += chunk;
    });
    response.on('end', function(){

        console.log(serverData);

        console.log('RX Complete')
        /*
        var hexstring = new ArrayBuffer(serverData.length);

        for(var i = 0; i < serverData.length; i++){

            hexstring[i] = parseInt(serverData[i], 16)
        }
        */
        var ws = fs.createWriteStream('Client RX binary result');
        ws.write(new Buffer(serverData, 'binary'));
        ws.end();
    });

});