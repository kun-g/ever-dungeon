(function() {
  var DBWrapper, Serializer, async, dbLib, gLoadingRecord, getPlayerHero, makeDBKey, moment, registerConstructor, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./globals');

  dbLib = require('./db');

  moment = require('moment');

  async = require('async');

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  gLoadingRecord = [];

  DBWrapper = (function(_super) {
    __extends(DBWrapper, _super);

    function DBWrapper() {
      DBWrapper.__super__.constructor.apply(this, arguments);
    }

    DBWrapper.prototype.setDBKeyName = function(keyName) {
      this.dbKeyName = keyName;
      return this.attrSave('dbKeyName', true);
    };

    DBWrapper.prototype.getDBKeyName = function() {
      return this.dbKeyName;
    };

    DBWrapper.prototype.save = function(handler) {
      var data, k, v;
      data = this.dumpChanged();
      if (data) {
        for (k in data) {
          v = data[k];
          if (typeof v === 'object') {
            data[k] = JSON.stringify(v);
          }
        }
        return dbClient.hmset(this.getDBKeyName(), data, (function(_this) {
          return function(err, e) {
            if (handler != null) {
              return handler(err, _this);
            }
          };
        })(this));
      }
    };

    DBWrapper.prototype.load = function(handler) {
      if (gLoadingRecord[this.getDBKeyName()] != null) {
        return gLoadingRecord[this.getDBKeyName()].push(handler);
      }
      gLoadingRecord[this.getDBKeyName()] = [handler];
      return dbClient.hgetall(this.getDBKeyName(), (function(_this) {
        return function(err, attr) {
          var attributes, cb, error, k, ret, v, _i, _len, _ref1;
          ret = null;
          if (attr != null) {
            attributes = {};
            for (k in attr) {
              v = attr[k];
              try {
                attributes[k] = JSON.parse(v);
              } catch (_error) {
                error = _error;
                attributes[k] = v;
              }
            }
            _this.restore(attributes);
            ret = _this;
          }
          _ref1 = gLoadingRecord[_this.getDBKeyName()];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            cb = _ref1[_i];
            if (cb != null) {
              cb(err, ret);
            }
          }
          return delete gLoadingRecord[_this.getDBKeyName()];
        };
      })(this));
    };

    return DBWrapper;

  })(Serializer);

  exports.DBWrapper = DBWrapper;

  exports.getReceipt = function(receipt, handler) {
    var dbKey;
    dbKey = makeDBKey([receipt], ReceiptPrefix);
    return accountDBClient.hgetall(dbKey, handler);
  };

  getPlayerHero = function(name, callback) {
    var playerLib;
    playerLib = require('./player');
    return async.waterfall([
      function(cb) {
        return dbClient.hget(sharedPrefix + name, "blueStar", cb);
      }, function(blueStar, cb) {
        return dbClient.hmget(playerPrefix + name, 'hero', 'rmb', function(err, h) {
          return cb(err, h[0], +h[1], blueStar);
        });
      }, function(hero, rmb, blueStar, cb) {
        var e, err, vip;
        try {
          vip = playerLib.getVip(rmb);
          hero = JSON.parse(hero);
          hero.vipLevel = +vip.level;
          return hero.blueStar = +blueStar;
        } catch (_error) {
          e = _error;
          err = e;
          return hero = null;
        } finally {
          if (callback) {
            callback(err, hero);
          }
          cb();
        }
      }
    ]);
  };

  exports.getPlayerHero = getPlayerHero;

  exports.getMercenaryMember = function(name, count, range, delta, names, handler) {
    var heros;
    heros = [];
    return dbLib.findMercenary(name, count, range, delta, names, (function(_this) {
      return function(err, heroNames) {
        if (heroNames) {
          return async.eachSeries(heroNames, function(e, cb) {
            return getPlayerHero(e, wrapCallback(this, function(err, heroData) {
              heros = heros.concat(heroData);
              return cb();
            }));
          }, function() {
            return handler(err, heros);
          });
        }
      };
    })(this));
  };

  exports.removeMercenaryMember = function(battleForce, member, handler) {
    return mercenaryDel(battleForce, member, handler);
  };

  exports.addMercenaryMember = function(battleForce, member, handler) {
    return mercenaryAdd(battleForce, member, handler);
  };

  exports.demoteMercenaryMember = function(battleForce, member, handler) {
    return mercenaryDemote(battleForce, member, handler);
  };

  exports.updateMercenaryMember = function(preBattleForce, battleForce, member, handler) {
    mercenaryDel(preBattleForce, member);
    return mercenaryAdd(battleForce, member, handler);
  };

  makeDBKey = function(keys, prefix) {
    prefix = prefix != null ? prefix : dbPrefix;
    return [prefix].concat(keys).join(dbSeparator);
  };

  exports.updateLeaderboard = function(board, member, score, callback) {
    return dbClient.zadd(makeDBKey([board], LeaderboardPrefix), score, member, callback);
  };

  exports.removeLeaderboard = function(board, callback) {
    return dbClient.del(makeDBKey([board], LeaderboardPrefix), callback);
  };

  exports.getPositionOnLeaderboard = function(board, member, rev, callback) {
    var key;
    key = makeDBKey([board], LeaderboardPrefix);
    if (rev) {
      return dbClient.zrevrank(key, member, callback);
    } else {
      return dbClient.zrank(key, member, callback);
    }
  };

}).call(this);
