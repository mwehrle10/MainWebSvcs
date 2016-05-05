var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('GET handler for /ingress route.');
});

router.post('/', function(req, res) {
  res.send('POST handler for /ingress route.');
});

module.exports = router;