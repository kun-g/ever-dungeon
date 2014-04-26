(function() {
  var SimpleProtocolDecoder, SimpleProtocolEncoder, async, db, dbClient, net, redis, sqlite3, startTcpServer, _ref;

  _ref = require('./requestStream'), SimpleProtocolDecoder = _ref.SimpleProtocolDecoder, SimpleProtocolEncoder = _ref.SimpleProtocolEncoder;

  async = require('async');

  redis = require('redis');

  net = require('net');

  sqlite3 = require('sqlite3').verbose();

  db = new sqlite3.Database('./game.db');

  db.run("CREATE TABLE IF NOT EXISTS data (key text PRIMARY KEY, value TEXT);");

  dbClient = redis.createClient();

  startTcpServer = function(port) {
    var appNet;
    appNet = {};
    appNet.server = net.createServer(function(c) {
      var decoder, encoder;
      c.pendingRequest = new Buffer(0);
      decoder = new SimpleProtocolDecoder();
      encoder = new SimpleProtocolEncoder();
      encoder.setFlag('size');
      c.pipe(decoder);
      c.decoder = decoder;
      c.encoder = encoder;
      encoder.pipe(c);
      decoder.on('request', function(request) {
        if (request) {
          if (request.CMD === 'set') {
            return dbClient.get(request.key, function(err, value) {
              return db.parallelize(function() {
                var stmt;
                db.exec('BEGIN;');
                stmt = db.prepare("INSERT OR REPLACE INTO data VALUES (?, ?);");
                stmt.run(request.key, value);
                stmt.finalize();
                return db.exec('END;');
              });
            });
          } else if (request.CMD === 'get') {
            return db.get("SELECT value FROM data where key = '" + request.key + "';", function(err, data) {
              console.log(err, data);
              return encoder.writeObject(data);
            });
          }
        } else {
          return c.destroy();
        }
      });
      return c.on('error', function(error) {
        console.log(error);
        return c.destroy();
      });
    });
    appNet.server.listen(port, console.log);
    return appNet.server.on('error', console.log);
  };

  startTcpServer(7760);

}).call(this);
