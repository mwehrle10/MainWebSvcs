var express = require('express'),
     router = express.Router(),
       p404 = require('./routes/p404');
  router.get('/', function(req, res) {
    res.send('GET handler for /vEnter route.');

    //console.log(req.originalUrl);
    //console.log(req.params);

    //var v = req.query; // /dogs?n=hello 
    //console.log(v.n); // this will return 'hello'..

});

router.post('/', function(req, res) {
  res.send('POST handler for /vEnter route.');
});



module.exports = router;