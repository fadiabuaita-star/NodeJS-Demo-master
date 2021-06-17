const url = require('url');
const fs = require('fs');
const supportedFileExtentions = ['.html','.css','.js','.jpg','.jpeg','.png','.svg'];
//
module.exports.hasSupportedFileExtention = function (url){
    if (url.includes('.')) {      
      for (let index = 0; index < supportedFileExtentions.length; index++) {
        if (url.includes(supportedFileExtentions[index]))
          return true;
      }
    }
    return false;
}
//
module.exports.getFileContentType = function (filename) {
    if (filename.includes('.html'))
      return { 'Content-Type': 'text/html' };
    else if (filename.includes('.png'))
      return { 'Content-Type': 'image/png' };
    else if (filename.includes('.jpg'))
      return { 'Content-Type': 'image/jpeg' };
    else if (filename.includes('.svg'))
      return { 'Content-Type': 'image/svg+xml' };
    else if (filename.includes('.css'))
      return { 'Content-Type': 'text/css' };
    else if (filename.includes('.js'))
      return { 'Content-Type': 'text/javascript' };
  }
  //
  module.exports.handleFileRequest = function (req,res){
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, module.exports.getFileContentType(filename));
      res.write(data);
      return res.end();
    });
  }
  //
  module.exports.log = function(message){
      console.log(new Date().toLocaleTimeString() + ':' + message);
  }