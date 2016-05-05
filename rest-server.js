var express = require('express'),
    app     = express(),
    url     = require('url'),
    moment  = require('moment'),
    p404    = require('./routes/p404'),
    vParams = [];

vParams[0] = "id";

app.set("env", "dev");


app.use(function(req, res, next) {
  console.log(moment().format('lll') + "   " + req.ip + "   " + req.originalUrl);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.param(vParams, function(req, res, next){
    console.log(vParams + " was added to the uri");
    next();
});

app.use('/',  p404);

app.get('/ingress', function (req, res, next) {
   res.send('GET request to /ingress');
});


app.get('/ingress/:apps', function (req, res, next) {
  var fmapkey = req.params.apps;
   //res.send('GET request to /ingress/' + fmapkey + " second route..");
var results = {};
    results.status = "Ok";
    results.msg = "";
    results.hdrs = ["id", "fname", "lname", "dept"];
    results.data = ["38887", "John", "Public", "I.T."];
    var rtn = JSON.stringify(results);
    res.send(rtn);

});









app.listen(8082,function(){
  console.log(moment().format('lll') + "  REST Server Listening On 8082 : ");
})

