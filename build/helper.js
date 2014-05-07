(function() {
  var actCampaign, conditionCheck, currentTime, destroyReactDB, diffDate, genCampaignUtil, initCampaign, initDailyEvent, matchDate, moment, tap, tapObject, updateLockStatus;

  conditionCheck = require('./trigger').conditionCheck;

  moment = require('moment');

  destroyReactDB = function(obj) {
    var k, v;
    if (!obj) {
      return false;
    }
    for (k in obj) {
      v = obj[k];
      if (!(typeof v === 'object')) {
        continue;
      }
      destroyReactDB(v);
      delete obj[k];
    }
    if (obj.destroyReactDB) {
      obj.destroyReactDB();
    }
    if (obj.newProperty) {
      obj.newProperty = null;
    }
    if (obj.push) {
      obj.push = null;
    }
    return obj.destroyReactDB = null;
  };

  exports.destroyReactDB = destroyReactDB;

  tap = function(obj, key, callback, invokeFlag) {
    var theCB;
    if (invokeFlag == null) {
      invokeFlag = false;
    }
    if (typeof obj[key] === 'function') {
      return false;
    }
    if (obj.reactDB == null) {
      Object.defineProperty(obj, 'reactDB', {
        enumerable: false,
        configurable: true,
        value: {}
      });
      Object.defineProperty(obj, 'destroyReactDB', {
        enumerable: false,
        configurable: true,
        value: function() {
          var k, v, _ref;
          if (!(obj != null ? obj.reactDB : void 0)) {
            return null;
          }
          _ref = obj.reactDB;
          for (k in _ref) {
            v = _ref[k];
            v.value = null;
            v.hooks = null;
          }
          obj.reactDB = null;
          return obj = null;
        }
      });
    }
    if (obj.reactDB[key] == null) {
      obj.reactDB[key] = {
        value: obj[key],
        hooks: [callback]
      };
      theCB = function(val) {
        var cb, _i, _len, _ref, _ref1, _ref2;
        if (((_ref = obj.reactDB) != null ? (_ref1 = _ref[key]) != null ? _ref1.hooks : void 0 : void 0) == null) {
          return null;
        }
        _ref2 = obj.reactDB[key].hooks;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          cb = _ref2[_i];
          if (cb != null) {
            cb(key, val);
          }
        }
        return obj.reactDB[key].value = val;
      };
      Object.defineProperty(obj, key, {
        get: function() {
          var _ref;
          if ((obj != null ? (_ref = obj.reactDB) != null ? _ref[key] : void 0 : void 0) == null) {
            return null;
          }
          return obj.reactDB[key].value;
        },
        set: theCB,
        enumerable: true,
        configurable: true
      });
      if (typeof obj[key] === 'object') {
        tapObject(obj[key], theCB);
      }
    } else {
      obj.reactDB[key].hooks.push(callback);
    }
    if (invokeFlag) {
      return callback(key, obj[key]);
    }
  };

  tapObject = function(obj, callback) {
    var config, k, tabNewProperty, theCallback, v;
    if (obj == null) {
      return false;
    }
    theCallback = function() {
      return callback(obj);
    };
    tabNewProperty = function(key, val) {
      obj[key] = val;
      tap(obj, key, theCallback);
      return callback(obj);
    };
    for (k in obj) {
      v = obj[k];
      tap(obj, k, theCallback);
    }
    config = {
      value: tabNewProperty,
      enumerable: false,
      configurable: true,
      writable: false
    };
    if (obj.newProperty == null) {
      Object.defineProperty(obj, 'newProperty', config);
      if (Array.isArray(obj)) {
        return Object.defineProperty(obj, 'push', {
          value: function(val) {
            return this.newProperty(this.length, val);
          }
        });
      }
    }
  };

  exports.tap = tap;

  exports.initLeaderboard = function(config) {
    var cfg, dbLib, generateHandler, k, key, localConfig, srvCfg, tickLeaderboard, v;
    localConfig = [];
    srvCfg = {};
    generateHandler = function(dbKey, cfg) {
      return function(name, value) {
        return require('./dbWrapper').updateLeaderboard(dbKey, name, value);
      };
    };
    for (key in config) {
      cfg = config[key];
      localConfig[key] = {
        func: generateHandler(cfg.name, cfg)
      };
      for (k in cfg) {
        v = cfg[k];
        localConfig[key][k] = v;
      }
    }
    dbLib = require('./db');
    dbLib.getServerConfig('Leaderboard', function(err, arg) {
      if (arg) {
        srvCfg = JSON.parse(arg);
      }
      for (key in config) {
        cfg = config[key];
        if (!srvCfg[cfg.name]) {
          srvCfg[cfg.name] = currentTime();
        }
      }
      return dbLib.setServerConfig('Leaderboard', JSON.stringify(srvCfg));
    });
    exports.assignLeaderboard = function(player) {
      return localConfig.forEach(function(v) {
        var obj, tmp, _ref;
        if (player.type !== v.type) {
          return false;
        }
        tmp = v.key.split('.');
        key = tmp.pop();
        obj = player;
        if (tmp.length) {
          obj = (_ref = require('./trigger').doGetProperty(player, tmp.join('.'))) != null ? _ref : player;
        }
        if (obj[key] == null) {
          obj[key] = v.initialValue;
        }
        v.func(player.name, obj[key]);
        return tap(obj, key, function(dummy, value) {
          return v.func(player.name, value);
        });
      });
    };
    tickLeaderboard = function(board, cb) {
      cfg = localConfig[board];
      if (cfg.resetTime && matchDate(srvCfg[cfg.name], currentTime(), cfg.resetTime)) {
        return require('./dbWrapper').removeLeaderboard(cfg.name, cb);
      }
    };
    return exports.getPositionOnLeaderboard = function(board, name, from, to, cb) {
      tickLeaderboard(board);
      cfg = localConfig[board];
      return require('./db').queryLeaderboard(cfg.name, name, from, to, cb);
    };
  };

  currentTime = function(needObject) {
    var obj;
    obj = moment().zone("+08:00");
    if (needObject) {
      return obj;
    } else {
      return obj.format(time_format);
    }
  };

  exports.currentTime = currentTime;

  diffDate = function(date, today, flag) {
    var duration;
    if (flag == null) {
      flag = 'day';
    }
    if (!date) {
      return null;
    }
    if (date) {
      date = moment(date).zone("+08:00").startOf('day');
    }
    today = moment(today).zone("+08:00").startOf('day');
    duration = moment.duration(today.diff(date));
    switch (flag) {
      case 'second':
        return duration.asSeconds();
      case 'minite':
        return duration.asMinites();
      case 'hour':
        return duration.asHours();
      case 'day':
        return duration.asDays();
      case 'month':
        return duration.asMonths();
      case 'year':
        return duration.asYears();
    }
  };

  exports.diffDate = diffDate;

  matchDate = function(date, today, rule) {
    var _ref, _ref1, _ref2;
    if (!date) {
      return false;
    }
    date = moment(date).zone("+08:00");
    today = moment(today).zone("+08:00");
    if (rule.weekday != null) {
      date = date.weekday(rule.weekday);
    } else if (rule.monthday != null) {
      date = date.date(rule.monthday);
    }
    if (rule.month) {
      date = date.month(rule.month);
    }
    if (rule.day) {
      date = date.day(rule.day);
    }
    date = date.hour((_ref = rule.hour) != null ? _ref : 0);
    date = date.minute((_ref1 = rule.minute) != null ? _ref1 : 0);
    date = date.second((_ref2 = rule.second) != null ? _ref2 : 0);
    return date <= today;
  };

  exports.matchDate = matchDate;

  genCampaignUtil = function() {
    return {
      sameDay: diffDate,
      currentTime: currentTime,
      today: moment()
    };
  };

  exports.genUtil = genCampaignUtil;

  initCampaign = function(me, allCampaign, abIndex) {
    var count, e, key, ret, util, _ref;
    ret = [];
    util = genCampaignUtil();
    for (key in allCampaign) {
      e = allCampaign[key];
      if (me.getType() === e.storeType) {
        if (key === 'event_daily') {
          ret = ret.concat(initDailyEvent(me, 'event_daily', e));
        } else {
          if (e.canReset(me, util)) {
            e.reset(me, util);
          }
          count = (_ref = me.counters[key]) != null ? _ref : 0;
          ret.push({
            NTF: Event_BountyUpdate,
            arg: {
              bid: e.id,
              sta: e.actived,
              cnt: e.count - count
            }
          });
        }
      }
    }
    return ret;
  };

  initDailyEvent = function(me, key, e) {
    var diamondCount, evt, goldCount, quest, ret;
    ret = [];
    if ((e.prev != null) && (me[e.prev] != null) && me[e.prev].status !== 'Done') {
      return [];
    }
    if ((e.flag != null) && (me.flags[e.flag] == null)) {
      return [];
    }
    if (me[key] == null) {
      me[key] = {};
      me.attrSave(key, true);
    }
    if (e.daily) {
      if (!me[key].date || diffDate(me[key].date, currentTime()) !== 0) {
        me[key].newProperty('status', 'Init');
        me[key].newProperty('date', currentTime());
        if (key === 'event_daily') {
          me[key].newProperty('rank', me.battleForce / 24 - 3);
          if (me[key].rank < 1) {
            me[key].rank = 1;
          }
          me[key].newProperty('reward', [
            {
              type: PRIZETYPE_GOLD,
              count: Math.floor(me[key].rank * 18)
            }
          ]);
        }
      }
    }
    if (e.quest && Array.isArray(e.quest) && me[key].status === 'Init') {
      me[key].newProperty('quest', shuffle(e.quest, Math.random()).slice(0, e.steps));
      me[key].newProperty('step', 0);
      goldCount = Math.ceil(me[key].rank * 6);
      diamondCount = Math.ceil(me[key].rank / 10);
      goldCount = Math.floor(me[key].rank * 6);
      me[key].newProperty('stepPrize', [
        [
          {
            type: PRIZETYPE_GOLD,
            count: goldCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 0,
            count: diamondCount
          }
        ], [
          {
            type: PRIZETYPE_GOLD,
            count: goldCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 0,
            count: diamondCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 534,
            count: 5
          }
        ], [
          {
            type: PRIZETYPE_GOLD,
            count: goldCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 0,
            count: diamondCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 535,
            count: 2
          }
        ], [
          {
            type: PRIZETYPE_GOLD,
            count: goldCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 0,
            count: diamondCount
          }, {
            type: PRIZETYPE_ITEM,
            value: 536,
            count: 1
          }
        ]
      ]);
    }
    quest = me[key].quest;
    if (Array.isArray(quest)) {
      quest = quest[me[key].step];
    }
    switch (me[key].status) {
      case 'Claimed':
        if (quest != null) {
          delete me.quests[quest];
        }
        me[key].step++;
        if (me[key].step === e.steps) {
          me[key].status = 'Complete';
        } else if (me[key].step > e.steps) {
          me[key].status = 'Done';
        } else {
          me[key].status = 'Ready';
          quest = me[key].quest;
          if (Array.isArray(quest)) {
            quest = quest[me[key].step];
          }
          if (quest != null) {
            delete me.quests[quest];
          }
          return ret.concat(initDailyEvent(me, key, e));
        }
        break;
      case 'Init':
        me[key].status = 'Ready';
        return ret.concat(initDailyEvent(me, key, e));
      case 'Ready':
      case 'Complete':
      case 'Done':
        if (quest != null) {
          if (me.isQuestAchieved(quest)) {
            me[key].status = 'Complete';
          } else if (!me.quests[quest]) {
            ret = ret.concat(me.acceptQuest(quest));
          }
        }
        evt = {
          NTF: Event_UpdateDailyQuest,
          arg: {
            stp: me.event_daily.step,
            prz: me.event_daily.reward
          }
        };
        if (me.event_daily.quest[me.event_daily.step] != null) {
          evt.arg.qst = me.event_daily.quest[me.event_daily.step];
        }
        if (me.event_daily.stepPrize[me.event_daily.step] != null) {
          evt.arg.cpz = me.event_daily.stepPrize[me.event_daily.step];
        }
        ret.push(evt);
    }
    return ret;
  };

  exports.initCampaign = initCampaign;

  exports.initCalcDungeonBaseRank = function(me) {
    var modifier;
    if ((me.event_daily != null) && me.event_daily.step < 4) {
      modifier = [0.8, 1, 1, 1.2];
      return me.event_daily.rank * modifier[me.event_daily.step];
    }
  };

  actCampaign = function(me, key, config, handler) {
    var prize, quest, ret, stage, _ref;
    initCampaign(me, config);
    if (me[key] == null) {
      return [false, 'NoData'];
    }
    switch (me[key].status) {
      case 'Ready':
        quest = me[key].quest;
        if (Array.isArray(quest)) {
          quest = quest[me[key].step];
        }
        stage = (_ref = queryTable(TABLE_QUEST, quest).stage) != null ? _ref : 1;
        if (stage != null) {
          return me.startDungeon(stage, true, handler);
        }
        break;
      case 'Complete':
        if (me[key].step < config[key].steps) {
          prize = me[key].stepPrize[me[key].step];
        } else {
          if (me[key].reward) {
            prize = me[key].reward;
          } else if (config[key].reward) {
            prize = config[key].reward;
          }
        }
        ret = me.claimPrize(prize);
        me[key].status = 'Claimed';
        ret = ret.concat(initCampaign(me, config));
        break;
      case 'Done':
        ret = [].concat(ret);
        break;
      default:
        throw Error('WrongCampainStatus' + me[key].status);
    }
    if (handler) {
      return handler(null, ret);
    } else {
      return ret;
    }
  };

  exports.proceedCampaign = actCampaign;

  exports.events = {
    "event_daily": {
      "flag": "daily",
      "resetTime": {
        hour: 8
      },
      "storeType": "player",
      "daily": true,
      "reward": [
        {
          "prize": {
            "type": 0,
            "value": 33,
            "count": 1
          },
          "weight": 1
        }, {
          "prize": {
            "type": 0,
            "value": 34,
            "count": 1
          },
          "weight": 1
        }, {
          "prize": {
            "type": 0,
            "value": 35,
            "count": 1
          },
          "weight": 1
        }, {
          "prize": {
            "type": 0,
            "value": 36,
            "count": 1
          },
          "weight": 1
        }, {
          "prize": {
            "type": 0,
            "value": 37,
            "count": 1
          },
          "weight": 1
        }
      ],
      "steps": 4,
      "quest": [128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151]
    },
    event_robbers: {
      storeType: "player",
      id: 0,
      actived: 1,
      count: 3,
      canReset: function(obj, util) {
        return !util.sameDay(obj.timestamp.goblin, util.today) && util.today.hour() >= 8;
      },
      reset: function(obj, util) {
        obj.timestamp.goblin = util.currentTime();
        return obj.counters.newProperty('goblin', 0);
      }
    }
  };

  exports.splicePrize = function(prize) {
    var goldPrize, otherPrize, wxPrize, xpPrize;
    goldPrize = {
      type: PRIZETYPE_GOLD,
      count: 0
    };
    xpPrize = {
      type: PRIZETYPE_EXP,
      count: 0
    };
    wxPrize = {
      type: PRIZETYPE_WXP,
      count: 0
    };
    otherPrize = [];
    prize.forEach(function(p) {
      switch (p.type) {
        case PRIZETYPE_WXP:
          return wxPrize.count += p.count;
        case PRIZETYPE_EXP:
          return xpPrize.count += p.count;
        case PRIZETYPE_GOLD:
          return goldPrize.count += p.count;
        default:
          return otherPrize.push(p);
      }
    });
    return {
      goldPrize: goldPrize,
      xpPrize: xpPrize,
      wxPrize: wxPrize,
      otherPrize: otherPrize
    };
  };

  exports.generatePrize = function(cfg, dropInfo) {
    var reward;
    if (cfg == null) {
      return [];
    }
    return reward = dropInfo.reduce((function(r, p) {
      return r.concat(cfg[p]);
    }), []).filter(function(p) {
      return p && Math.random() < p.rate;
    }).map(function(g) {
      var e;
      e = selectElementFromWeightArray(g.prize, Math.random());
      return e;
    });
  };

  updateLockStatus = function(curStatus, target, config) {
    var cfg, id, ret, unlockable;
    if (!curStatus) {
      return [];
    }
    ret = [];
    for (id in config) {
      cfg = config[id];
      unlockable = true;
      if (cfg.cond != null) {
        unlockable = unlockable && conditionCheck(cfg.cond, target);
      }
      if (unlockable && (curStatus[id] == null)) {
        ret.push(+id);
      }
    }
    return ret;
  };

  exports.updateLockStatus = updateLockStatus;

  exports.calculateTotalItemXP = function(item) {
    var cfg, i, levelTable, upgrade, xp;
    if (item.xp == null) {
      return 0;
    }
    levelTable = [0, 1, 2, 3, 4];
    upgrade = queryTable(TABLE_UPGRADE);
    xp = item.xp;
    for (i in upgrade) {
      cfg = upgrade[i];
      if ((levelTable[item.quality] <= i && i < item.rank)) {
        xp += cfg.xp;
      }
    }
    return xp;
  };

}).call(this);
