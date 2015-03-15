var restify = require('restify');
var pkg = require('./package.json');

var lamer = require('lamernews-client');
var client = lamer.createClient({ api: 'http://www.echojs.com' });


var server = restify.createServer({
  name: pkg.name,
  version: pkg.version
});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/list/:sort/:start/:count', function (req, res, next) {
  client.list({
    sort: req.params.sort,
    start: parseInt(req.params.start, 10),
    count: parseInt(req.params.count, 10)
  }, function(err, body) {
    res.send(body);
    next();
  });
});

server.listen(9000, function () {
  console.log('%s listening at %s', server.name, server.url);
});