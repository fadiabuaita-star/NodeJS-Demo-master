const http = require('http');
const url = require('url');
const fs = require('fs');
const utils = require('./utils');
//
var message = JSON.parse('{"id":1,"text":"started server","data":""}')
//
utils.log(message.text);
//
http.createServer(function (req, res) {
    utils.log('started to handle request!');
    //
    if (utils.hasSupportedFileExtention(req.url)) {
      utils.handleFileRequest(req,res);
    }
    else{
      message.text = 'Hello!'    
      const accpetHeader = req.headers['accept'];
      if(accpetHeader && accpetHeader.includes('json'))  {
        res.writeHead(200, {'Content-Type': 'application/json'});
      }
      else{
        res.writeHead(200, {'Content-Type': 'text/html'});
      }
      res.end(JSON.stringify(message));
    }
    //
    utils.log('finished to handle request');
  }).listen(8080);
//
message.text ='closed server';
utils.log(message.text);
//
