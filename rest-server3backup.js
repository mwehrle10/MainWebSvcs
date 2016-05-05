var express = require('express'),
    app     = express();
    url     = require('url'),
    moment  = require('moment'),
    p404    = require('./routes/p404'),
    enter   = require('./routes/ingress'),
    dogs    = require('./routes/dog');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use('/dog', dogs);
app.use('/dog/:id', dogs);
app.use('/ingress',  enter);
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