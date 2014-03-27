(function() {
  var SimpleProtocolDecoder, SimpleProtocolEncoder, async, net, startTcpServer, _ref;

  _ref = require('./requestStream'), SimpleProtocolDecoder = _ref.SimpleProtocolDecoder, SimpleProtocolEncoder = _ref.SimpleProtocolEncoder;

  async = require('async');

  net = require('net');

  startTcpServer = function(servers, port) {
    var appNet;
    appNet = {};
    appNet.server = net.createServer(function(c) {
      var decoder, encoder;
      console.log('New Connection', c.remoteAddress);
      appNet.aliveConnections.push(c);
      c.connectionIndex = appNet.aliveConnections.length - 1;
      c.pendingRequest = new Buffer(0);
      c.on('end', function() {
        var name;
        require("./router").peerOffline(c);
        name = c.playerName;
        return delete appNet.aliveConnections[c.connectionIndex];
      });
      decoder = new SimpleProtocolDecoder();
      encoder = new SimpleProtocolEncoder();
      encoder.setFlag('size');
      c.pipe(decoder);
      c.decoder = decoder;
      c.encoder = encoder;
      c.server = appNet.createConnection();
      encoder.pipe(c.server);
      decoder.on('request', function(request) {
        if (request) {
          console.log(request);
          return encoder.writeObject(request);
        } else {
          return c.destroy();
        }
      });
      return c.on('error', function(error) {
        console.log(error);
        return c.destroy();
      });
    });
    appNet.backends = servers.map(function(s, id) {
      return {
        ip: s.ip,
        port: s.port,
        alive: false
      };
    });
    appNet.createConnection = function() {
      var server;
      server = appNet.aliveServers[appNet.currIndex];
      appNet.currIndex = appNet.currIndex + 1 % appNet.aliveServers.length;
      return net.connect(server.ip, server.port);
    };
    setInterval((function() {
      return async.map(appNet.backends, function(e, cb) {
        var s;
        s = net.connect(e.ip, e.port, function() {
          e.alive = true;
          s.destroy();
          return cb(null, e);
        });
        return s.on('error', function() {
          e.alive = false;
          s.destroy();
          return cb(null, e);
        });
      }, function(err, result) {
        return appNet.aliveServers = result.filter(function(e) {
          return e.alive;
        });
      });
    }), 3000);
    appNet.currIndex = 0;
    appNet.aliveConnections = [];
    appNet.server.listen(port, console.log);
    return appNet.server.on('error', console.log);
  };

  startTcpServer([
    {
      ip: 'localhost',
      port: 7756
    }
  ], 7757);

}).call(this);
