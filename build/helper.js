(function() {
  var actCampaign, conditionCheck, currentTime, dbLib, dbWrapper, diffDate, genCampaignUtil, initCampaign, initDailyEvent, matchDate, moment, updateLockStatus;

  conditionCheck = require('./trigger').conditionCheck;

  moment = require('moment');

  dbLib = require('./db');

  dbWrapper = require('./dbWrapper');

  exports.initLeaderboard = function(config) {
    var cfg, generateHandler, k, key, localConfig, srvCfg, tickLeaderboard, v;
    localConfig = [];
    srvCfg = {};
    generateHandler = function(dbKey, cfg) {
      return function(name, value) {
        return dbWrapper.updateLeaderboard(dbKey, name, value, function(err) {
          if (err != null) {
            return logError({
              action: 'updateLeaderboard',
              type: 'DB_ERR',
              error: err
            });
          }
        });
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
    exports.assignLeaderboard = function(player, leaderboardID) {
      var field, obj, tmp, val, _ref;
      v = localConfig[leaderboardID];
      if (!((v != null) && player.type === v.type)) {
        return false;
      }
      if (v.key == null) {
        val = typeof v.initialValue === ('number' != null) ? v.initialValue : null;
        return dbLib.tryAddLeaderboardMember(v.name, player.name, val);
      } else {
        tmp = v.key.split('.');
        field = tmp.pop();
        obj = player;
        if (tmp.length) {
          obj = (_ref = require('./trigger').doGetProperty(player, tmp.join('.'))) != null ? _ref : player;
        }
        if ((v.initialValue != null) && !(typeof obj[field] !== 'undefined' && obj[field])) {
          if (typeof v.initialValue === 'number') {
            obj[field] = v.initialValue;
          }
        }
        return v.func(player.name, obj[field]);
      }
    };
    tickLeaderboard = function(board, cb) {
      cfg = localConfig[board];
      if (cfg.resetTime && matchDate(srvCfg[cfg.name], currentTime(), cfg.resetTime)) {
        dbWrapper.removeLeaderboard(cfg.name, cb);
        srvCfg[cfg.name] = currentTime();
        return dbLib.setServerConfig('Leaderboard', JSON.stringify(srvCfg));
      }
    };
    return exports.getPositionOnLeaderboard = function(board, name, from, to, cb) {
      var reverse;
      tickLeaderboard(board);
      cfg = localConfig[board];
      reverse = cfg.reverse ? 1 : 0;
      return dbLib.queryLeaderboard(cfg.name, reverse, name, from, to, function(err, result) {
        result.board = result.board.reduce((function(r, l, i) {
          if (i % 2 === 0) {
            r.name.push(l);
          } else {
            r.score.push(l);
          }
          return r;
        }), {
          name: [],
          score: []
        });
        return cb(err, result);
      });
    };
  };

  exports.array2map = function(keys, value) {
    var size;
    size = keys.length;
    return value.reduce((function(r, l, i) {
      var keyIdx;
      keyIdx = i % size;
      r[keys[keyIdx]].push(l);
      return r;
    }), {});
  };

  exports.warpRivalLst = function(lst) {
    return lst.reduce((function(r, l, i) {
      if (l.length === 2) {
        r.name.push(l[0]) && r.rnk.push(+l[1]);
      }
      return r;
    }), {
      name: [],
      rnk: []
    });
  };

  currentTime = function(needObject) {
    var obj;
    obj = moment();
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
      date = moment(date).startOf('day');
    }
    today = moment(today).startOf('day');
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
    date = moment(date);
    today = moment(today);
    if (rule.weekday != null) {
      date = date.weekday(rule.weekday);
    } else if (rule.monthday != null) {
      date = date.date(rule.monthday);
    }
    if (rule.month) {
      date = date.month(rule.month);
    }
    if (rule.day) {
      date = date.add('day', rule.day);
    }
    date = date.set('hour', (_ref = rule.hour) != null ? _ref : 0);
    date = date.set('minute', (_ref1 = rule.minute) != null ? _ref1 : 0);
    date = date.set('second', (_ref2 = rule.second) != null ? _ref2 : 0);
    return date <= today;
  };

  exports.matchDate = matchDate;

  exports.dateInRange = function(date, ranges) {
    var monthOfDate, range, _i, _len;
    if (!date) {
      return false;
    }
    monthOfDate = moment(date).date();
    for (_i = 0, _len = ranges.length; _i < _len; _i++) {
      range = ranges[_i];
      if (monthOfDate >= range.from && monthOfDate <= range.to) {
        return true;
      }
    }
    return false;
  };

  genCampaignUtil = function() {
    return {
      diffDay: function(date, today) {
        return (date == null) || diffDate(date, today, 'day') !== 0;
      },
      currentTime: currentTime,
      today: moment(),
      serverObj: gServerObject
    };
  };

  exports.genUtil = genCampaignUtil;

  initCampaign = function(me, allCampaign, abIndex) {
    var actived, count, e, evt, key, ret, util, _ref;
    ret = [];
    util = genCampaignUtil();
    for (key in allCampaign) {
      e = allCampaign[key];
      if (me.getType() === e.storeType) {
        if (key === 'event_daily') {
          ret = ret.concat(initDailyEvent(me, 'event_daily', e));
        } else {
          if (typeof e.canReset === "function" ? e.canReset(me, util) : void 0) {
            e.reset(me, util);
          }
          if (e.id != null) {
            actived = e.actived;
            if (typeof actived === 'function') {
              actived = actived(me, util);
            }
            evt = {
              NTF: Event_BountyUpdate,
              arg: {
                bid: e.id,
                sta: actived
              }
            };
            count = (_ref = me.counters[key]) != null ? _ref : 0;
            if (e.count) {
              evt.arg.cnt = e.count - count;
            }
            if (key === 'hunting') {
              if (!moment().isSame(gHuntingInfo.timestamp, 'day') || (gHuntingInfo.timestamp == null)) {
                gHuntingInfo.timestamp = currentTime();
                gHuntingInfo.stage = e.stages[rand() % e.stages.length];
                dbLib.setServerConfig('huntingInfo', JSON.stringify(gHuntingInfo));
              }
              evt.arg.stg = +gHuntingInfo.stage;
            }
            ret.push(evt);
          }
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
        e.quest.forEach(function(q) {
          return delete me.quests[q];
        });
        me[key]['status'] = 'Init';
        me[key]['date'] = currentTime();
        if (key === 'event_daily') {
          me[key]['rank'] = Math.ceil(me.battleForce * 0.04);
          if (me[key].rank < 1) {
            me[key].rank = 1;
          }
          me[key]['reward'] = [
            {
              type: PRIZETYPE_DIAMOND,
              count: 50
            }
          ];
        }
      }
    }
    if (e.quest && Array.isArray(e.quest) && me[key].status === 'Init') {
      me[key].quest = shuffle(e.quest, Math.random()).slice(0, e.steps);
      me[key].step = 0;
      goldCount = Math.ceil(me.battleForce);
      diamondCount = Math.ceil(me[key].rank / 10);
      me[key]['stepPrize'] = [
        [
          {
            type: PRIZETYPE_ITEM,
            value: 538,
            count: 1
          }
        ], [
          {
            type: PRIZETYPE_GOLD,
            count: goldCount
          }
        ], [
          {
            type: PRIZETYPE_ITEM,
            value: 871,
            count: 3
          }
        ], [
          {
            type: PRIZETYPE_DIAMOND,
            count: 10
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
        }
        return ret.concat(initDailyEvent(me, key, e));
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
    goblin: {
      storeType: "player",
      id: 0,
      actived: 1,
      count: 3,
      canReset: function(obj, util) {
        return util.diffDay(obj.timestamp.goblin, util.today);
      },
      reset: function(obj, util) {
        obj.timestamp['goblin'] = util.currentTime();
        return obj.counters['goblin'] = 0;
      }
    },
    enhance: {
      storeType: "player",
      id: 1,
      actived: 1,
      count: 3,
      canReset: function(obj, util) {
        return (util.diffDay(obj.timestamp.enhance, util.today)) && (util.today.weekday() === 2 || util.today.weekday() === 4 || util.today.weekday() === 6 || util.today.weekday() === 0);
      },
      reset: function(obj, util) {
        obj.timestamp['enhance'] = util.currentTime();
        return obj.counters['enhance'] = 0;
      }
    },
    weapon: {
      storeType: "player",
      id: 2,
      actived: 1,
      count: 3,
      canReset: function(obj, util) {
        return (util.diffDay(obj.timestamp.weapon, util.today)) && (util.today.weekday() === 1 || util.today.weekday() === 3 || util.today.weekday() === 5 || util.today.weekday() === 0);
      },
      reset: function(obj, util) {
        obj.timestamp['weapon'] = util.currentTime();
        return obj.counters['weapon'] = 0;
      }
    },
    infinite: {
      storeType: "player",
      id: 3,
      actived: function(obj, util) {
        if (exports.dateInRange(util.today, [
          {
            from: 1,
            to: 6
          }, {
            from: 14,
            to: 20
          }, {
            from: 28,
            to: 28
          }
        ])) {
          return 1;
        } else {
          return 0;
        }
      },
      canReset: function(obj, util) {
        return util.today.hour() >= 8 && diffDate(obj.timestamp.infinite, util.today) >= 7;
      },
      reset: function(obj, util) {
        obj.timestamp['infinite'] = util.currentTime();
        obj.stage[120]['level'] = 0;
        return obj.notify('stageChanged', {
          stage: 120
        });
      }
    },
    hunting: {
      storeType: "player",
      id: 4,
      actived: function(obj, util) {
        if (exports.dateInRange(util.today, [
          {
            from: 7,
            to: 13
          }, {
            from: 21,
            to: 27
          }
        ])) {
          return 1;
        } else {
          return 0;
        }
      },
      stages: [121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132],
      canReset: function(obj, util) {
        return diffDate(obj.timestamp.hunting, util.today) >= 7;
      },
      reset: function(obj, util) {
        var s, stages, _i, _len;
        obj.timestamp.hunting = util.currentTime();
        stages = [121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132];
        for (_i = 0, _len = stages.length; _i < _len; _i++) {
          s = stages[_i];
          if (obj.stage[s]) {
            obj.stage[s].level = 0;
          }
        }
        return obj.modifyCounters('monster', {
          value: 0,
          notify: {
            name: 'countersChanged',
            arg: {
              type: 'monster'
            }
          }
        });
      }
    },
    monthCard: {
      storeType: "player",
      id: -1,
      actived: function(obj, util) {
        if (!obj.counters.monthCard) {
          return 0;
        }
        if (!obj.timestamp.monthCard) {
          return 1;
        }
        if (moment().isSame(obj.timestamp.monthCard, 'day')) {
          return 0;
        }
        return 1;
      }
    },
    pkCounter: {
      storeType: "player",
      id: 6,
      actived: 1,
      canReset: function(obj, util) {
        return util.diffDay(obj.timestamp.currentPKCount, util.today);
      },
      reset: function(obj, util) {
        obj.timestamp.currentPKCount = util.currentTime();
        obj.counters.currentPKCount = 0;
        return obj.flags.rcvAward = false;
      }
    }
  };

  exports.intervalEvent = {
    infinityDungeonPrize: {
      time: {
        minite: 59
      },
      func: function(libs) {
        var cfg;
        cfg = [
          {
            from: 0,
            to: 0,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 50
                }, {
                  type: 0,
                  value: 869,
                  count: 1
                }
              ],
              tit: "铁人试炼排行奖励",
              txt: "恭喜你成为铁人试炼冠军，点击领取奖励。"
            }
          }, {
            from: 1,
            to: 4,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 20
                }, {
                  type: 0,
                  value: 868,
                  count: 1
                }
              ],
              tit: "铁人试炼排行奖励",
              txt: "恭喜你进入铁人试炼前五，点击领取奖励。"
            }
          }, {
            from: 5,
            to: 9,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 10
                }, {
                  type: 0,
                  value: 867,
                  count: 1
                }
              ],
              tit: "铁人试炼排行奖励",
              txt: "恭喜你进入铁人试炼前十，点击领取奖励。"
            }
          }
        ];
        return cfg.forEach(function(e) {
          return libs.helper.getPositionOnLeaderboard(exports.LeaderboardIdx.InfinityDungeon, 'nobody', e.from, e.to, function(err, result) {
            return result.board.name.forEach(function(name, idx) {
              e.mail = e.mail + ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.score[idx];
              return libs.db.deliverMessage(name, e.mail);
            });
          });
        });
      }
    },
    killMonsterPrize: {
      time: {
        minite: 59
      },
      func: function(libs) {
        var cfg;
        cfg = [
          {
            from: 0,
            to: 0,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 50
                }, {
                  type: 0,
                  value: 866,
                  count: 1
                }
              ],
              tit: "狩猎任务排行奖励",
              txt: "恭喜你成为狩猎任务冠军，点击领取奖励。"
            }
          }, {
            from: 1,
            to: 4,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 20
                }, {
                  type: 0,
                  value: 865,
                  count: 1
                }
              ],
              tit: "狩猎任务排行奖励",
              txt: "恭喜你进入狩猎任务前五，点击领取奖励。"
            }
          }, {
            from: 5,
            to: 9,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                {
                  type: 2,
                  count: 10
                }, {
                  type: 0,
                  value: 864,
                  count: 1
                }
              ],
              tit: "狩猎任务排行奖励",
              txt: "恭喜你进入狩猎任务前十，点击领取奖励。"
            }
          }
        ];
        return cfg.forEach(function(e) {
          return libs.helper.getPositionOnLeaderboard(exports.LeaderboardIdx.KillingMonster, 'nobody', e.from, e.to, function(err, result) {
            return result.board.name.forEach(function(name, idx) {
              e.mail = e.mail + ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.score[idx];
              return libs.db.deliverMessage(name, e.mail);
            });
          });
        });
      }
    },
    worldBoss: {
      time: {
        weekday: 2
      },
      func: function(libs) {
        var cfg, stageId, _base;
        stageId = '133';
        if ((_base = libs.sObj.counters)[stageId] == null) {
          _base[stageId] = 0;
        }
        if (libs.sObj.counters[stageId] >= 1000) {
          cfg = [
            {
              from: 0,
              to: 0,
              mail: {
                type: MESSAGE_TYPE_SystemReward,
                src: MESSAGE_REWARD_TYPE_SYSTEM,
                prize: [
                  {
                    type: 2,
                    count: 50
                  }, {
                    type: 0,
                    value: 869,
                    count: 1
                  }
                ],
                tit: "#TODO title",
                txt: "#TODO txt"
              }
            }
          ];
        }
        return async.series([
          function(cb) {
            cfg.forEach(function(e) {
              return libs.helper.getPositionOnLeaderboard(exports.LeaderboardIdx.WorldBoss, 'nobody', e.from, e.to, function(err, result) {
                return result.board.name.forEach(function(name, idx) {
                  e.mail = e.mail + ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.score[idx];
                  return libs.db.deliverMessage(name, e.mail);
                });
              });
            });
            return cb();
          }
        ], function(err, ret) {
          sObj.notify('countersChanged', {
            type: stageId,
            delta: -libs.sObj.counters[stageId]
          });
          return libs.sObj.counters[stageId] = 0;
        });
      }
    }
  };

  exports.splicePrize = function(prize) {
    var count, goldPrize, id, itemFlag, otherPrize, wxPrize, xpPrize;
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
    itemFlag = {};
    otherPrize = [];
    prize.forEach(function(p) {
      if (p == null) {
        return [];
      }
      switch (p.type) {
        case PRIZETYPE_WXP:
          return wxPrize.count += p.count;
        case PRIZETYPE_EXP:
          return xpPrize.count += p.count;
        case PRIZETYPE_GOLD:
          return goldPrize.count += p.count;
        case PRIZETYPE_ITEM:
          if (!itemFlag[p.value]) {
            itemFlag[p.value] = 0;
          }
          return itemFlag[p.value] += p.count;
        default:
          return otherPrize.push(p);
      }
    });
    for (id in itemFlag) {
      count = itemFlag[id];
      otherPrize.push({
        type: PRIZETYPE_ITEM,
        value: +id,
        count: +count
      });
    }
    return {
      goldPrize: goldPrize,
      xpPrize: xpPrize,
      wxPrize: wxPrize,
      otherPrize: otherPrize
    };
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

  exports.LeaderboardIdx = {
    BattleForce: 0,
    InfinityDungeon: 1,
    KillingMonster: 2,
    Arena: 3,
    WorldBoss: 4
  };

  exports.observers = {
    heroxpChanged: function(obj, arg) {
      return obj.onCampaign('Level');
    },
    battleForceChanged: function(obj, arg) {
      exports.assignLeaderboard(obj, exports.LeaderboardIdx.BattleForce);
      return obj.updateMercenaryInfo();
    },
    countersChanged: function(obj, arg) {
      if (obj.getType() === 'server') {
        return dbClient.hincrby(makeDBKey([serverObjectPrefix, 'counters']), arg.type, arg.delta, function(err, result) {});
      } else {
        if (arg.type === 'monster') {
          return exports.assignLeaderboard(obj, exports.LeaderboardIdx.KillingMonster);
        }
      }
    },
    stageChanged: function(obj, arg) {
      if (arg.stage === 120) {
        return exports.assignLeaderboard(obj, exports.LeaderboardIdx.InfinityDungeon);
      }
    },
    winningAnPVP: function(obj, arg) {
      return exports.assignLeaderboard(obj, exports.LeaderboardIdx.Arena);
    },
    onRestWorldBossCounter: function(obj, arg) {}
  };

  exports.initObserveration = function(obj) {
    obj.observers = {};
    obj.installObserver = function(event) {
      return obj.observers[event] = exports.observers[event];
    };
    obj.removeObserver = function(event) {
      return obj.observers[event] = null;
    };
    return obj.notify = function(event, arg) {
      var ob;
      ob = obj.observers[event];
      if (ob) {
        return ob(obj, arg);
      }
    };
  };

  exports.dbScripts = {
    searchRival: " local board, name = ARGV[1], ARGV[2];\n local key = 'Leaderboard.'..board;\n local config = {\n     {base=0.95, delta=0.02, rand= ARGV[3]},\n     {base=0.85, delta=0.03, rand= ARGV[4]},\n     {base=0.50, delta=0.05, rand= ARGV[5]},\n   };\n local count = 3;\n local rank = redis.call('ZRANK', key, name);\n\n local rivalLst = {};\n if rank <= count then\n   for index = 0, rank-1 do \n     table.insert(rivalLst,redis.call('zrange', key, index, index, 'withscores'));\n   end\n   for index = rank+1, count do \n     table.insert(rivalLst,redis.call('zrange', key, index, index, 'withscores'));\n   end\nelse\n   rank = rank - 1;\n   for i, c in ipairs(config) do\n     local from = math.ceil(rank * (c.base-c.delta));\n     local to = math.ceil(rank * (c.base+c.delta));\n     local index = from\n     if  to ~=  from then \n       index = index + c.rand%(to - from);\n     end\n     index = math.ceil(index);\n     rivalLst[count - i + 1] = redis.call('zrange', key, index, index, 'withscores');\n     rank = index - 1;\n   end\n end\n\n return rivalLst;",
    getMercenary: "local myName, count, range = ARGV[1], ARGV[2], ARGV[3];\nlocal delta, rand, names, retrys = ARGV[4], ARGV[5], ARGV[6], ARGV[7];\nlocal key = 'Leaderboard.battleforce';\nlocal myRange = redis.call('ZRANK', key, myName);\nredis.log(redis.LOG_WARNING, myName, 'my',myRange,'ran',range,'???');\nlocal from = myRange - range;\nlocal to = myRange + range;\nlocal nameMask = {}\n\nwhile string.len(names) > 0 do\n  local index = string.find(names, ',');\n  if index == nil then\n    nameMask[names] = 1;\n    break;\n  end\n  local v = string.sub(names, 1, index-1)\n  nameMask[v] = 1;\n  names = string.sub(names, index+1, -1);\nend\n\nlocal ret = {};\nwhile true do\n  local list = redis.call('zrange', key, from, to);\n  local mercenarys = {};\n  for i, name in ipairs(list) do\n    if nameMask[name] ~= 1 then table.insert(mercenarys, name); end\n  end\n\n  local length = table.getn(mercenarys);\n  if length > 0 then\n    local name = mercenarys[rand%length + 1];\n    table.insert(ret, name);\n    nameMask[name] = 1;\n  end\n\n  if table.getn(ret) >= tonumber(count) then break; end\n\n  from = from - delta;\n  if from < 0 then from = 0; end\n  to = to + delta;\n  retrys = retrys - 1;\n  if retrys == 0 then return {err='Fail'}; end\nend\n\nreturn ret;",
    exchangePKRank: "local board, champion, second = ARGV[1], ARGV[2], ARGV[3]; \nlocal key = 'Leaderboard.'..board; \nlocal championRank = redis.call('ZRANK', key, champion); \nlocal secondRank = redis.call('ZRANK', key, second); \nif championRank > secondRank then \n  redis.call('ZADD', key, championRank, second); \n  redis.call('ZADD', key, secondRank, champion); \n  championRank = secondRank;\nend \nreturn championRank;",
    tryAddLeaderboardMember: "local board, name, value = ARGV[1], ARGV[2], ARGV[3];\nlocal key = 'Leaderboard.'..board;\nlocal score = redis.call('ZSCORE', key, name)\nif score == false then\n  score = value;\n  if value == 'null' then\n    score = redis.call('ZCARD', key)\n  end\n  redis.call('ZADD', key, score, name);\nend\nreturn score"
  };

}).call(this);
