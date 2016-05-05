"use strict";
var express = require('express');
var app = express();
var fs = require('fs');
var jsonResp = "";


app.get('/', function (req, res) {
   var pg404 = fs.readFileSync('404.html');
   res.writeHead(404, {'Content-Type': 'text/html', 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding'});
   res.end(pg404);
})

app.get('test/:name', function(req, res) {
    /*------debug------*/
        console.log("test reached");
    /*------debug------*/   
    var fmapkey = req.params.name;    
    var resHeaders = {'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding'};   
    jsonResp = "{results:'success', val1:('quick', 'brown', 'fox')}";
    response.send(jsonResp);

    //res.writeHead(200, resHeaders);
   // res.end(jsonResp);
}); //app.get('css/:name', function(req, res)

app.get('lib/:name', function(req, res) {

    /*------debug------*/
        console.log("test reached");
    /*------debug------*/ 

    var fmapkey = req.params.name;
    var alpaca = fs.readFileSync('lib/alpaca/alpaca_1_5_17.min.js');
    var kendo = fs.readFileSync('lib/kendo/kendo-ui-core-2016.1.412.js');
    var jquery = fs.readFileSync('lib/jquery_233/jquery.v233.min.js');    
    var resHeaders = {'Content-Type': 'application/javascript', 'Cache-Control': 'no-store', 
                      'Access-Control-Allow-Origin': '*', 'Vary': 'Accept-Encoding'};
   
    switch(fmapkey) {
        case alpaca:
             res.writeHead(200, resHeaders);
             res.end(alpaca);
             break;
        case kendo:
             res.writeHead(200, resHeaders);
             res.end(kendo);            
             break;
        case jquery:
             res.writeHead(200, resHeaders);
             res.end(jquery);            
             break;
        default:
             res.writeHead(404, resHeaders);
    }

     //res.send('{"id": 1,"name":"Matt",
     //"band":"BBQ Brawlers"}');

}); //app.get('/css/:name', function(req, res)




app.get('/ingress', function (req, res) {
   
   res.send('Hello From The Default Portal');
})


app.post('/ingress', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("PTMI REST Server listening at http://%s:%s", host, port)

})