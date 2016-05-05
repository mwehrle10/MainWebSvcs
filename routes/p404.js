var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
      res.writeHead(404, {"Content-Type": "text/html"});
      res.write("404 Not Found\n");
      res.end();
      return;
});

router.post('/', function(req, res) {
  res.send('POST handler for /dogs route.');
});

module.exports = router;