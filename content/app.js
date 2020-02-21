let port = process.env.PORT || 8080;

const express = require('express'),
      app = express(),
      promClient = require('prom-client'),
      server = require('http').createServer(app);

const kittysProvided = new promClient.Counter({ 
      name: 'kittys_provided', 
      help: 'Number of Hello Kitty! strings provided.' 
});

const httpRequestDurationMicroseconds = new promClient.Histogram({
      name: 'http_request_duration_ms',
      help: 'Duration of HTTP requests in ms',
      labelNames: ['route'],
      buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

const responseTimeInMs = Date.now();

app.get('/', function (req, res) {
  kittysProvided.inc();
  httpRequestDurationMicroseconds
    .labels(req.route.path)
    .observe(responseTimeInMs);
  res.send('Hello Kitty!');
  console.log("Received request from " + req.connection.remoteAddress);
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

server.listen(port);

console.log('HTTP server starting, port: ' + port);

promClient.collectDefaultMetrics();

module.exports = server;
