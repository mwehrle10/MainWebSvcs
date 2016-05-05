
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    moment = require('moment'),
    mime = require('mime');
    port = process.argv[2] || 8080;


http.createServer(function(request, response) {


  var uri = url.parse(request.url).pathname,
      //process.cwd() <-- directory where nodeJS was launched..
      filename = path.join(process.cwd(), uri),
      ext = "",
      mimetype = "";
   

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/html"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    // if the request is a directory then send back the home page..
    if (fs.statSync(filename).isDirectory()){
      filename += 'index.html';
    } 

    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];

    
    fs.readFile(filename, "binary", function(err, file) {
      
       console.log(moment().format('lll') + "  " + uri);

      if(err) { 
        console.log(err); 
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "  " + uri + "\n");
        response.end();
        return;
      }

      mimetype = mime.lookup(filename);
/*
      response.writeHead(200, {"Content-Type":  "'" + mimetype + "'"});      
      response.writeHead("'Access-Control-Allow-Origin': '*',");
      response.writeHead("'Access-Control-Allow-Methods': 'GET',");
      response.writeHead("'Access-Control-Allow-Headers': 'Content-Type'");
*/  

      response.writeHead(200, {
        "Server" : "Apache/2.2.22 (Debian)",
        "ETag": "1a45b-103e0-52720e640dac0",
        "Keep-Alive" : "timeout=5, max=100",
        "Connection" : "Keep-Alive",
        "Accept-Ranges" : "bytes",
        "Content-Length": fileSizeInBytes,
        "Content-Type": mimetype,
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET",
        "Access-Control-Allow-Headers" : "Content-Type"
      });

      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");