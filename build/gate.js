(function() {
  var SimpleProtocolDecoder, SimpleProtocolEncoder, async, net, _ref;

  _ref = require('./requestStream'), SimpleProtocolDecoder = _ref.SimpleProtocolDecoder, SimpleProtocolEncoder = _ref.SimpleProtocolEncoder;

  require('./define');

  async = require('async');

  net = require('net');

  initGlobalConfig(null, function() {
    var gServerConfig, gServerID, startTcpServer;
    startTcpServer = function(servers, port) {
      var appNet;
      appNet = {};
      appNet.server = net.createServer(function(c) {
        var decoder, encoder;
        appNet.aliveConnections.push(c);
        c.connectionIndex = appNet.aliveConnections.length - 1;
        c.pendingRequest = new Buffer(0);
        c.on('end', function() {
          return delete appNet.aliveConnections[c.connectionIndex];
        });
        decoder = new SimpleProtocolDecoder();
        encoder = new SimpleProtocolEncoder();
        encoder.setFlag('size');
        c.pipe(decoder);
        c.decoder = decoder;
        c.encoder = encoder;
        c.server = appNet.createConnection(c);
        encoder.pipe(c.server);
        c.server.pipe(c);
        decoder.on('request', function(request) {
          if (request) {
            if (request.CMD === 101) {
              console.log({
                request: request,
                ip: c.remoteAddress
              });
            }
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
      appNet.createConnection = function(socket) {
        var c, server;
        server = appNet.aliveServers[appNet.currIndex];
        appNet.currIndex = appNet.currIndex + 1 % appNet.aliveServers.length;
        c = net.connect(server.port, server.ip);
        c.on('error', function(err) {
          c.destroy();
          return socket.destroy();
        });
        c.on('end', function(err) {
          c.destroy();
          return socket.destroy();
        });
        return c;
      };
      setInterval((function() {
        return async.map(appNet.backends, function(e, cb) {
          var s;
          if (!e.alive) {
            s = net.connect(e.port, e.ip, function() {
              e.alive = true;
              s.destroy();
              return cb(null, e);
            });
            return s.on('error', function(err) {
              console.log('Error', err, e);
              e.alive = false;
              s.destroy();
              return cb(null, e);
            });
          }
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
    gServerID = queryTable(TABLE_CONFIG, 'ServerID');
    gServerConfig = queryTable(TABLE_CONFIG, 'ServerConfig')[gServerID];
    return startTcpServer(queryTable(TABLE_CONFIG, gServerConfig.Gate), 7757);
  });

}).call(this);
