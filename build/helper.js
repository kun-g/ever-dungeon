(function() {
  var actCampaign, conditionCheck, currentTime, diffDate, initCampaign, moment, tap, tapObject, updateLockStatus;

  conditionCheck = require('./trigger').conditionCheck;

  tap = function(obj, key, callback) {
    var theCB;
    if (typeof obj[key] === 'function') {
      return false;
    }
    if (obj.reactDB == null) {
      Object.defineProperty(obj, 'reactDB', {
        enumerable: false,
        configurable: false,
        value: {}
      });
    }
    if (obj.reactDB[key] == null) {
      obj.reactDB[key] = {
        value: obj[key],
        hooks: [callback]
      };
      theCB = function(val) {
        var cb, _i, _len, _ref;
        _ref = obj.reactDB[key].hooks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          if (cb != null) {
            cb(key, val);
          }
        }
        return obj.reactDB[key].value = val;
      };
      Object.defineProperty(obj, key, {
        get: function() {
          return obj.reactDB[key].value;
        },
        set: theCB,
        enumerable: true,
        configurable: true
      });
      if (typeof obj[key] === 'object') {
        return tapObject(obj[key], theCB);
      }
    } else {
      return obj.reactDB[key].hooks.push(callback);
    }
  };

  tapObject = function(obj, callback) {
    var config, k, tabNewProperty, theCallback, v;
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
      configurable: false,
      writable: false
    };
    Object.defineProperty(obj, 'newProperty', config);
    if (Array.isArray(obj)) {
      return Object.defineProperty(obj, 'push', {
        value: function(val) {
          return this.newProperty(this.length, val);
        }
      });
    }
  };

  exports.tap = tap;

  exports.initLeaderboard = function(config) {
    var cfg, generateHandler, k, key, localConfig, v;
    localConfig = {};
    generateHandler = function(dbKey, cfg) {
      return function(name, value) {
        return require('./dbWrapper').updateLeaderboard(dbKey, name, value);
      };
    };
    for (key in config) {
      cfg = config[key];
      localConfig[key] = {
        func: generateHandler(key, cfg)
      };
      for (k in cfg) {
        v = cfg[k];
        localConfig[key][k] = v;
      }
    }
    exports.assignLeaderboard = function(player) {
      var obj, tmp, _ref, _results;
      _results = [];
      for (k in config) {
        v = config[k];
        if (!(player.type === v.type)) {
          continue;
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
        _results.push(tap(obj, key, function(dummy, value) {
          return localConfig[k].func(player.name, value);
        }));
      }
      return _results;
    };
    return exports.getPositionOnLeaderboard = function(board, name, cb) {
      return require('./dbWrapper').getPositionOnLeaderboard(board, name, localConfig[board].reverse, cb);
    };
  };

  moment = require('moment');

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

  initCampaign = function(me, allCampaign, abIndex) {
    var diamondCount, e, evt, flag, goldCount, key, quest, ret, _ref;
    ret = [];
    for (key in allCampaign) {
      e = allCampaign[key];
      if (!(me.getType() === e.storeType)) {
        continue;
      }
      if ((e.prev != null) && (me[e.prev] != null) && me[e.prev].status !== 'Done') {
        delete me[key];
        return [];
      }
      if (me.flags == null) {
        me.attrSave('flags', {});
      }
      if ((e.flag != null) && !me.flags[e.flag]) {
        delete me[key];
        return [];
      }
      if (e.daily && (((_ref = me[key]) != null ? _ref.date : void 0) != null) && diffDate(me[key].date, currentTime()) !== 0) {
        delete me[key];
      }
      flag = false;
      if (me[key] == null) {
        me.attrSave(key, {});
        flag = true;
      }
      if (e.daily) {
        if (!me[key].date || diffDate(me[key].date, currentTime()) !== 0) {
          me[key].status = 'Ready';
          me[key].date = currentTime();
          flag = true;
          if (key === 'event_daily') {
            me[key].rank = me.battleForce / 24 - 3;
            if (me[key].rank < 1) {
              me[key].rank = 1;
            }
            me[key].reward = [
              {
                type: PRIZETYPE_GOLD,
                count: Math.floor(me[key].rank * 18)
              }
            ];
          }
        }
      }
      if (e.quest && Array.isArray(e.quest) && (me[key].quest == null)) {
        me[key].quest = shuffle(e.quest, Math.random()).slice(0, e.steps);
        me[key].step = 0;
        goldCount = Math.ceil(me[key].rank * 6);
        diamondCount = Math.ceil(me[key].rank / 10);
        goldCount = Math.floor(me[key].rank * 6);
        me[key].stepPrize = [
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
        ];
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
            return ret.concat(initCampaign(me, allCampaign, abIndex));
          }
          break;
        case 'Ready':
          if (quest != null) {
            if (me.isQuestAchieved(quest)) {
              me[key].status = 'Complete';
            } else if (!me.quests[quest]) {
              ret = ret.concat(me.acceptQuest(quest));
            }
          }
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
        ret = [];
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
    }
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
