(function() {
  var DBWrapper, Serializer, async, dbLib, gLoadingRecord, getPlayerHero, makeDBKey, mercenaryAdd, mercenaryDel, mercenaryDemote, mercenaryGet, mercenaryKeyList, moment, registerConstructor, _ref,
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
      return this.attrSave('dbKeyName', keyName);
    };

    DBWrapper.prototype.getDBKeyName = function() {
      return this.dbKeyName;
    };

    DBWrapper.prototype.save = function(handler) {
      var data, k, v;
      data = this.dumpChanged();
      if (data != null) {
        for (k in data) {
          v = data[k];
          if (typeof v === 'object') {
            data[k] = JSON.stringify(v);
          }
        }
        logInfo('Savvvvvvvv', data);
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

  exports.updateReceipt = function(receipt, state, handler) {
    var dbKey;
    dbKey = makeDBKey([ReceiptPrefix, receipt]);
    return accountDBClient.hgetall(dbKey, function(err, ret) {
      if (err) {
        return handler(err);
      }
      return accountDBClient.hmset(dbKey, {
        time: moment().format('YYYYMMDDHHMMSS'),
        state: state
      }, handler);
    });
  };

  exports.getReceipt = function(receipt, handler) {
    var dbKey;
    dbKey = makeDBKey([ReceiptPrefix, receipt]);
    return accountDBClient.hgetall(dbKey, handler);
  };

  mercenaryKeyList = function(callback) {
    return dbClient.smembers(mercenaryPrefix + 'Keys', callback);
  };

  mercenaryGet = function(key, count, callback) {
    return dbClient.zrange(mercenaryPrefix + key, 0, count, callback);
  };

  mercenaryDel = function(battleForce, member, callback) {
    return async.series([
      function(cb) {
        return dbClient.zrem(mercenaryPrefix + battleForce, member, cb);
      }, function(cb) {
        return mercenaryGet(battleForce, -1, cb);
      }
    ], function(err, result) {
      var list;
      if (!err) {
        list = result[1];
        if (!list || list.length <= 0) {
          dbClient.srem(mercenaryPrefix + 'Keys', battleForce, callback);
          return dbClient.del(mercenaryPrefix + battleForce);
        }
      } else {
        if (callback) {
          return callback(err, result);
        }
      }
    });
  };

  mercenaryAdd = function(battleForce, member, callback) {
    dbClient.zadd(mercenaryPrefix + battleForce, 0, member, callback);
    return dbClient.sadd(mercenaryPrefix + 'Keys', battleForce);
  };

  mercenaryDemote = function(key, member, callback) {
    return dbClient.zincrby(mercenaryPrefix + key, 1, member, callback);
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

  exports.getMercenaryMember = function(names, rangeFrom, rangeTo, count, handler) {
    var actions, doFindMercenary, i, selectRange, _i;
    selectRange = function(list) {
      var selector, trys;
      selector = [];
      trys = 30;
      while (selector.length <= 0 && trys > 0) {
        selector = list.filter(function(e) {
          return e <= rangeTo && e >= rangeFrom;
        });
        rangeFrom -= 30;
        rangeTo += 30;
        trys -= 1;
      }
      return selector;
    };
    doFindMercenary = function(list, cb) {
      var battleForce, selector;
      if (list.length <= 0) {
        return cb(new Error('Empty mercenarylist'));
      } else {
        selector = selectRange(list);
        battleForce = selector[rand() % selector.length];
        list = list.filter(function(i) {
          return i !== battleForce;
        });
        return mercenaryGet(battleForce, count, function(err, mList) {
          var selectedName;
          if (mList === null) {
            dbClient.srem(mercenaryPrefix + 'Keys', battleForce, callback);
            dbClient.del(mercenaryPrefix + battleForce);
            mList = [];
          }
          mList = mList.filter(function(key) {
            var name, _i, _len;
            for (_i = 0, _len = names.length; _i < _len; _i++) {
              name = names[_i];
              if (key === name) {
                return false;
              }
            }
            return true;
          });
          if (mList.length === 0) {
            return cb(null, list);
          } else {
            selectedName = mList[rand() % mList.length];
            return getPlayerHero(selectedName, function(err, hero) {
              if (hero) {
                return cb(new Error('Done'), hero);
              } else {
                logError({
                  action: 'RemoveInvalidMercenary',
                  error: err,
                  name: selectedName
                });
                return mercenaryDel(battleForce, selectedName, function(err) {
                  return cb(null, list);
                });
              }
            });
          }
        });
      }
    };
    actions = [
      function(cb) {
        return mercenaryKeyList(cb);
      }
    ];
    for (i = _i = 0; _i <= 50; i = ++_i) {
      actions.push(doFindMercenary);
    }
    return async.waterfall(actions, handler);
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
    return dbClient.zadd(makeDBKey([LeaderboardPrefix, board]), score, member, callback);
  };

  exports.getPositionOnLeaderboard = function(board, member, rev, callback) {
    var key;
    key = makeDBKey([LeaderboardPrefix, board]);
    if (rev) {
      return dbClient.zrevrank(key, member, callback);
    } else {
      return dbClient.zrank(key, member, callback);
    }
  };

}).call(this);
