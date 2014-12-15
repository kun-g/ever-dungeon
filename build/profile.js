(function() {
  "use strict";
  var async, createTest, dbLib, host, ids, net, parseLib, start, totalCount, _i, _j, _results, _results1;

  require('./define');

  net = require('net');

  parseLib = require('./requestStream');

  async = require('async');

  host = 'localhost';

  totalCount = 0;

  createTest = function(id, cb) {
    var decoder, encoder, makeRPC, rpcCounter, rpcMap, server;
    decoder = new parseLib.SimpleProtocolDecoder();
    encoder = new parseLib.SimpleProtocolEncoder();
    rpcMap = {};
    rpcCounter = 0;
    makeRPC = function(req, callback) {
      totalCount++;
      req.REQ = rpcCounter;
      rpcMap[rpcCounter] = {
        cb: callback,
        tm: new Date()
      };
      rpcCounter++;
      return encoder.writeObject(req);
    };
    return server = net.connect({
      host: host,
      port: 7756
    }, function() {
      var counter, registerHandler;
      counter = id - 2;
      encoder.pipe(server);
      encoder.setFlag('size');
      server.pipe(decoder);
      decoder.on('request', function(request) {
        var req, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = request.length; _i < _len; _i++) {
          req = request[_i];
          if (req.REQ != null) {
            if (rpcMap[req.REQ]) {
              rpcMap[req.REQ].cb(req);
              _results.push(rpcMap[req.REQ].delay = (new Date()) - rpcMap[req.REQ].tm);
            } else {
              _results.push(void 0);
            }
          } else {

          }
        }
        return _results;
      });
      registerHandler = function(ret) {
        if (ret.RET === RET_OK) {
          server.destroy();
          return cb();
        } else {
          makeRPC({
            CMD: 101,
            arg: {
              nam: counter.toString(),
              cid: rand() % 3,
              gen: rand() % 2,
              hst: 0,
              hcl: 0
            }
          }, registerHandler);
          return counter++;
        }
      };
      return makeRPC({
        CMD: 100,
        arg: {
          tp: 1,
          id: id.toString(),
          tk: '1',
          bv: '1.0.3',
          rv: 98
        }
      }, function(ret) {
        if (ret.RET === RET_OK) {
          server.destroy();
          return cb();
        } else {
          return registerHandler(ret);
        }
      });
    });
  };

  ids = (function() {
    _results = [];
    for (_i = 0; _i <= 1000; _i++){ _results.push(_i); }
    return _results;
  }).apply(this);

  start = new Date();

  ids = (function() {
    _results1 = [];
    for (_j = 0; _j <= 100000; _j++){ _results1.push(_j); }
    return _results1;
  }).apply(this);

  GLOBAL['dbPrefix'] = 'Local.';

  dbLib = require('./db');

  dbLib.initializeDB({
    "Account": {
      "IP": "localhost",
      "PORT": 6379
    },
    "Role": {
      "IP": "localhost",
      "PORT": 6379
    },
    "Publisher": {
      "IP": "localhost",
      "PORT": 6379
    },
    "Subscriber": {
      "IP": "localhost",
      "PORT": 6379
    }
  });

  setTimeout((function() {
    return initGlobalConfig(function() {
      return async.map(ids, (function(id, cb) {
        return dbLib.createNewPlayer(id, 'S', 'A' + id, cb);
      }), function() {
        return console.log('Done', new Date() - start);
      });
    });
  }), 100);

}).call(this);
