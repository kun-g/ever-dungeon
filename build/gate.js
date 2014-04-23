(function() {
  var SimpleProtocolDecoder, SimpleProtocolEncoder, async, net, _ref;

  _ref = require('./requestStream'), SimpleProtocolDecoder = _ref.SimpleProtocolDecoder, SimpleProtocolEncoder = _ref.SimpleProtocolEncoder;

  require('./define');

  async = require('async');

  net = require('net');

  require('nodetime').profile({
    accountKey: 'c82d52d81e9ed18e8550b58bf36f49d47e50a792',
    appName: 'Gate'
  });

  initGlobalConfig(null, function() {
    var gServerConfig, gServerID, startTcpServer;
    startTcpServer = function(servers, port) {
      var appNet, getAliveConnection;
      appNet = {};
      appNet.server = net.createServer(function(c) {
        c.decoder = new SimpleProtocolDecoder();
        c.encoder = new SimpleProtocolEncoder();
        c.encoder.setFlag('size');
        c.pipe(c.decoder);
        c.server = appNet.createConnection(c);
        if (c.server == null) {
          return;
        }
        c.encoder.pipe(c.server);
        c.server.pipe(c);
        c.decoder.on('request', function(request) {
          if (request) {
            if (request.CMD === 101) {
              console.log({
                request: request,
                ip: c.remoteAddress
              });
            }
            return c.encoder.writeObject(request);
          } else {
            c.destroy();
            return c = null;
          }
        });
        return c.on('error', function(error) {
          c.destroy();
          return c = null;
        });
      });
      appNet.backends = servers.map(function(s, id) {
        return {
          ip: s.ip,
          port: s.port,
          alive: false
        };
      });
      getAliveConnection = function() {
        var count, i, server, _i;
        count = appNet.backends.length;
        servers = appNet.backends;
        for (i = _i = 1; 1 <= count ? _i <= count : _i >= count; i = 1 <= count ? ++_i : --_i) {
          if (!servers[(i + appNet.currIndex) % count].alive) {
            continue;
          }
          server = servers[(i + appNet.currIndex) % count];
          appNet.currIndex = (appNet.currIndex + 1) % count;
          return server;
        }
        return null;
      };
      appNet.createConnection = function(socket) {
        var c, server;
        server = getAliveConnection();
        if (server != null) {
          c = net.connect(server.port, server.ip);
          c.on('error', function(err) {
            c.destroy();
            socket.destroy();
            return c = null;
          });
          c.on('end', function(err) {
            c.destroy();
            socket.destroy();
            return c = null;
          });
        } else {
          socket.destroy();
        }
        return c;
      };
      setInterval((function() {
        return appNet.backends.forEach(function(e) {
          var s;
          if (!e.alive) {
            s = net.connect(e.port, e.ip);
            s.on('connect', function() {
              e.alive = true;
              return console.log('Connection On', e);
            });
            s.on('error', function(err) {
              return e.alive = false;
            });
            s.on('end', function(err) {
              e.alive = false;
              return console.log('Connection Lost', e);
            });
            return s = null;
          }
        });
      }), 10000);
      appNet.currIndex = 0;
      appNet.server.listen(port, console.log);
      return appNet.server.on('error', console.log);
    };
    gServerID = queryTable(TABLE_CONFIG, 'ServerID');
    gServerConfig = queryTable(TABLE_CONFIG, 'ServerConfig')[gServerID];
    return startTcpServer(gServerConfig.Gate, 7757);
  });

}).call(this);
