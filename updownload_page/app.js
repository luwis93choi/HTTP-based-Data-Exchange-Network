/*
Reference : [Node.js File Download Page]
            https://m.blog.naver.com/PostView.nhn?blogId=hyoun1202&logNo=220675944242&proxyReferer=https:%2F%2Fwww.google.com%2F
*/
var express = require('express')
var util  = require('util')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var app = express();

app.get('/', function(req, res){

  fs.readFile('./index.html', function(error, data){

    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
  })
})

app.get('/download/:fileid', function(req, res){

  var fileid = req.params.fileid;
  var origFileName, savedFileName, savedPath, fileSize;

  if(fileid == '1'){
    origFileName = 'test1.txt';
    savedFileName = 'test1.txt';
    savedPath = './download'
  }

  else if(fileid == '2'){
    origFileName = 'test2.txt';
    savedFileName = 'test2.txt';
    savedPath = './download'
  }

  else if(fileid == '3'){
    origFileName = 'test3.txt';
    savedFileName = 'test3.txt';
    savedPath = './download'
  }

  else if(fileid == 'b1'){
    origFileName = 'binary_sample';
    savedFileName = 'binary_sample';
    savedPath = './download'
  }

  var file = savedPath + '/' + savedFileName

  mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment;filename=' + origFileName);
  res.setHeader('Content-type', mimetype)

  var filestream = fs.createReadStream(file);

  filestream.pipe(res);
})

app.listen(8000, function(){

  console.log('Port 8000 open')
})