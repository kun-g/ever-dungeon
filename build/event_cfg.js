var helperLib= require('./helper');
var LeaderboardIdx= helperLib.LeaderboardIdx;
var diffDate = helperLib.diffDate;  
var checkBountyValidate =  helperLib.checkBountyValidate;
var ConstValue = helperLib.ConstValue ;
require('./globals');
require('./define');
var L = function(key) {
 return translate_with("chinese", key);
}
exports.events = {
  "event_daily": {
    "flag": "daily",
    "resetTime": { hour: 8 },
    "storeType": "player",
    "daily": true,
    "reward": [
    { "prize": { "type": 0, "value": 33, "count": 1 }, "weight": 1 }, 
    { "prize": { "type": 0, "value": 34, "count": 1 }, "weight": 1 },
    { "prize": { "type": 0, "value": 35, "count": 1 }, "weight": 1 },
    { "prize": { "type": 0, "value": 36, "count": 1 }, "weight": 1 }, 
    { "prize": { "type": 0, "value": 37, "count": 1 }, "weight": 1 }
    ],
    "steps": 4,
    "quest": [128, 129, 130, 131, 132, 133, 134, 135, 136, 137,
    138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151]
  },
  goblin: {
    storeType: "player",
    id: 0,
    actived: 1,
    count: function(obj, util) {
      return obj.getPrivilege('tuHaoCount');
    },
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
    count: function(obj, util) {
      return obj.getPrivilege('EvilChieftains');
    },
    canReset: function(obj, util) {
      return (util.diffDay(obj.timestamp.enhance, util.today)) 
          && (util.today.weekday() === 2 || util.today.weekday() === 4 || util.today.weekday() === 6 || util.today.weekday() === 0);
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
    count: function(obj, util) {
      return obj.getPrivilege('EquipmentRobbers');
    },
    canReset: function(obj, util) {
      return (util.diffDay(obj.timestamp.weapon, util.today)) 
          && (util.today.weekday() === 1 || util.today.weekday() === 3 || util.today.weekday() === 5 || util.today.weekday() === 0);
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
      if (checkBountyValidate(3, util.today)) {
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
      if (checkBountyValidate(4, util.today)) {
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
              { type: 2, count: 50 },
              { type: 0, value: 869, count: 1 }
            ],
            tit: L("铁人试炼排行奖励"),
            txt: L("恭喜你成为铁人试炼冠军，点击领取奖励。")
          }
        }, {
          from: 1,
          to: 4,
          mail: {
            type: MESSAGE_TYPE_SystemReward,
            src: MESSAGE_REWARD_TYPE_SYSTEM,
            prize: [
              { type: 2, count: 20 },
              { type: 0, value: 868, count: 1 }
            ],
            tit: L("铁人试炼排行奖励"),
            txt: L("恭喜你进入铁人试炼前五，点击领取奖励。")
          }
        }, {
          from: 5,
          to: 9,
          mail: {
            type: MESSAGE_TYPE_SystemReward,
            src: MESSAGE_REWARD_TYPE_SYSTEM,
            prize: [
              { type: 2, count: 10 },
              { type: 0, value: 867, count: 1 }
            ],
            tit: L("铁人试炼排行奖励"),
            txt: L("恭喜你进入铁人试炼前十，点击领取奖励。")
          }
        }
      ];
      return cfg.forEach(function(e) {
        return libs.helper.getPositionOnLeaderboard(LeaderboardIdx.InfinityDungeon, 'nobody', e.from, e.to, function(err, result) {
          return result.board.name.forEach(function(name, idx) {
            var infoStr;
            libs.db.deliverMessage(name, e.mail);
            infoStr = ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.board.score[idx];
            return logInfo({
              action: 'leadboradPrize',
              index: 0,
              msg: infoStr
            });
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
            { type: 2, count: 50 },
            { type: 0, value: 866, count: 1 }
            ],
            tit: L("狩猎任务排行奖励"),
            txt: L("恭喜你成为狩猎任务冠军，点击领取奖励。")
          }
        }, {
          from: 1,
          to: 4,
          mail: {
            type: MESSAGE_TYPE_SystemReward,
            src: MESSAGE_REWARD_TYPE_SYSTEM,
            prize: [
              { type: 2, count: 20 },
              { type: 0, value: 865, count: 1 }
            ],
            tit: L("狩猎任务排行奖励"),
            txt: L("恭喜你进入狩猎任务前五，点击领取奖励。")
          }
        }, {
          from: 5,
          to: 9,
          mail: {
            type: MESSAGE_TYPE_SystemReward,
            src: MESSAGE_REWARD_TYPE_SYSTEM,
            prize: [
              { type: 2, count: 10 }, 
              { type: 0, value: 864, count: 1 }
            ],
            tit: L("狩猎任务排行奖励"),
            txt: L("恭喜你进入狩猎任务前十，点击领取奖励。")
          }
        }
      ];
      return cfg.forEach(function(e) {
        return libs.helper.getPositionOnLeaderboard(LeaderboardIdx.KillingMonster, 'nobody', e.from, e.to, function(err, result) {
          return result.board.name.forEach(function(name, idx) {
            var infoStr;
            libs.db.deliverMessage(name, e.mail);
            infoStr = ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.board.score[idx];
            return logInfo({
              action: 'leadboradPrize',
              index: 1,
              msg: infoStr
            });
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
      if (libs.sObj.counters[stageId] >= ConstValue.WorldBossTimes) {
        cfg = [
          {
            from: 0,
            to: 0,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                { type: 2, count: 100 },
                { type: 0, value: 878, count: 1 }
              ],
              tit: L("邪恶巫师的诡计"),
              txt: L("恭喜你获得《邪恶巫师的诡计》第一名，点击领取奖励")
            }
          }, {
            from: 1,
            to: 9,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                { type: 2, count: 100 }
              ],
              tit: L("邪恶巫师的诡计"),
              txt: L("恭喜你获得《邪恶巫师的诡计》奖励，点击领取")
            }
          }, {
            from: 10,
            to: 29,
            mail: {
              type: MESSAGE_TYPE_SystemReward,
              src: MESSAGE_REWARD_TYPE_SYSTEM,
              prize: [
                { type: 2, count: 50 }
              ],
              tit: L("邪恶巫师的诡计"),
              txt: L("恭喜你获得《邪恶巫师的诡计》奖励，点击领取")
            }
          }
        ];
        return async.series([
          function(cb) {
            cfg.forEach(function(e) {
              return libs.helper.getPositionOnLeaderboard(LeaderboardIdx.WorldBoss, 'nobody', e.from, e.to, function(err, result) {
                return result.board.name.forEach(function(name, idx) {
                  var infoStr;
                  libs.db.deliverMessage(name, e.mail);
                  infoStr = ' from:' + e.from + ' to: ' + e.to + ' rank:' + result.board.score[idx];
                  return logInfo({
                    action: 'leadboradPrize',
                    index: 1,
                    msg: infoStr
                  });
                });
              });
            });
            return cb();
          }
        ], function(err, ret) {
          libs.sObj.notify('countersChanged', {
            type: stageId,
            delta: -libs.sObj.counters[stageId]
          });
          return libs.sObj.counters[stageId] = 0;
        });
      }
    }
  }
};

