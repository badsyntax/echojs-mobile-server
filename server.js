var restify = require('restify');
var pkg = require('./package.json');

var LamernewsAPI = require("lamernews-api");
var api = new LamernewsAPI("http://echojs.com/api/");

var DEBUG = process.env.NODE_ENV !== 'production';
var port = DEBUG ? 7000 : 80;

var server = restify.createServer({
  name: pkg.name,
  version: pkg.version
});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/list/:sort/:start/:count', function (req, res, next) {

  var signature = '/api/getnews/' + [
    req.params.sort,
    req.params.start,
    req.params.count
  ].join('/');

  api.query(signature, function onDone(err, response) {
    res.send(response);
    next();
  });
});

server.get('/comments/:newsId', function (req, res, next) {
  var signature = '/api/getcomments/' + req.params.newsId;
  api.query(signature, function onDone(err, response) {
    if (err) throw err;
    res.send(response.comments);
    next();
  });
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
