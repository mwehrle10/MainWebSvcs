var express = require('express'),
    app     = express(),
    url     = require('url'),
    moment  = require('moment'),
    p404    = require('./routes/p404'),
    ingress = require('./routes/ingress'),
    vEnter  = require('./routes/vEnter'),
    vParams = [];

    vParams[0] = "id";

app.set("env", "dev");

app.param(vParams, function(req, res, next){
    console.log(vParams + " was added to the uri");
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



app.use('/vEnter', vEnter);
app.use('/vEnter/:id', vEnter);
app.use('/ingress',  ingress);
app.use('/',  p404);

app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});


app.listen(8082,function(){
  console.log("REST Server Listening On 8082 : " + moment().format('lll'));
})