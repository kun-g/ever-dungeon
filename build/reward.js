(function() {
  var rearragenPrize;

  require('./define');

  exports.getRewardModifier = function(type) {
    var modifier, _ref, _ref1;
    modifier = (_ref = this.envReward_modifier[type]) != null ? _ref : 0;
    return modifier + ((_ref1 = this.reward_modifier[type]) != null ? _ref1 : 0);
  };

  rearragenPrize = function(prize) {
    var k, lastElem, res, v;
    if (!Array.isArray(prize)) {
      prize = [prize];
    }
    prize.sort(function(a, b) {
      if (a.type === b.type && a.type === PRIZETYPE_ITEM) {
        return a.value > b.value;
      } else {
        return a.type > b.type;
      }
    });
    res = [];
    lastElem = null;
    for (k in prize) {
      v = prize[k];
      if (lastElem && lastElem.type === v.type) {
        if (v.type !== PRIZETYPE_ITEM || lastElem.value === v.value) {
          lastElem.count += v.count;
          continue;
        }
      }
      res.push(v);
      lastElem = v;
    }
    return res;
  };

  exports.generateReward = function(config, dropInfo, rand) {
    var res;
    if (!rand) {
      rand = Math.random;
    }
    if (!config) {
      return [];
    }
    res = dropInfo.reduce(((function(_this) {
      return function(r, p) {
        return r.concat(config[p]);
      };
    })(this)), []).filter((function(_this) {
      return function(p) {
        return p && rand() < p.rate;
      };
    })(this)).map((function(_this) {
      return function(g) {
        var e, k, r, v;
        e = {};
        r = selectElementFromWeightArray(g.prize, rand());
        for (k in r) {
          v = r[k];
          if (k !== 'weight') {
            e[k] = v;
          }
        }
        return e;
      };
    })(this));
    return rearragenPrize(res);
  };

  exports.generateDungeonReward = function(dungeon) {
    var cfg, dropInfo, e, gr, iPrize, infiniteLevel, p, prize, result, wr, xr, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    result = dungeon.result;
    cfg = dungeon.config;
    if (result === DUNGEON_RESULT_DONE || (cfg == null)) {
      return [];
    }
    dropInfo = dungeon.killingInfo.reduce((function(r, e) {
      if (e && e.dropInfo) {
        return r.concat(e.dropInfo);
      }
      return r;
    }), []);
    if (result === DUNGEON_RESULT_WIN && dungeon.isSweep) {
      if (cfg.dropID) {
        dropInfo = dropInfo.concat(cfg.dropID);
      }
    }
    gr = result === DUNGEON_RESULT_WIN ? (_ref = cfg.goldRate) != null ? _ref : 1 : 0.5;
    xr = result === DUNGEON_RESULT_WIN ? (_ref1 = cfg.xpRate) != null ? _ref1 : 1 : 0.5;
    wr = result === DUNGEON_RESULT_WIN ? (_ref2 = cfg.wxpRate) != null ? _ref2 : 1 : 0.5;
    prize = this.generateReward(queryTable(TABLE_DROP), dropInfo);
    prize = prize.concat(dungeon.prizeInfo);
    if (!dungeon.isSweep) {
      if (cfg.prizeGold) {
        prize.push({
          type: PRIZETYPE_GOLD,
          count: Math.floor(gr * cfg.prizeGold)
        });
      }
      if (cfg.prizeXp) {
        prize.push({
          type: PRIZETYPE_EXP,
          count: Math.floor(xr * cfg.prizeXp)
        });
      }
      if (cfg.prizeWxp) {
        prize.push({
          type: PRIZETYPE_WXP,
          count: Math.floor(wr * cfg.prizeWxp)
        });
      }
    }
    infiniteLevel = dungeon.infiniteLevel;
    if ((infiniteLevel != null) && cfg.infinityPrize && result === DUNGEON_RESULT_WIN) {
      _ref3 = cfg.infinityPrize;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        p = _ref3[_i];
        if (p.level === infiniteLevel) {
          iPrize = p;
        }
      }
      if (iPrize != null) {
        iPrize = {
          type: iPrize.type,
          value: iPrize.value,
          count: iPrize.count
        };
        if (iPrize.type === PRIZETYPE_GOLD) {
          prize.push({
            type: PRIZETYPE_GOLD,
            count: iPrize.count
          });
        } else {
          prize.push(iPrize);
        }
      }
    }
    if ((dungeon.PVP_Pool != null) && dungeon.result === DUNGEON_RESULT_WIN) {
      this.updatePkInof(dungeon);
      prize = prize.concat(this.getPKReward(dungeon));
    }
    for (_j = 0, _len1 = prize.length; _j < _len1; _j++) {
      e = prize[_j];
      switch (e.type) {
        case PRIZETYPE_GOLD:
          e.count *= 1 + this.getRewardModifier('dungeon_gold');
          break;
        case PRIZETYPE_EXP:
          e.count *= 1 + this.getRewardModifier('dungeon_exp');
          break;
        case PRIZETYPE_WXP:
          e.count *= 1 + this.getRewardModifier('dungeon_wxp');
          break;
        case PRIZETYPE_ITEM:
          e.count *= 1 + this.getRewardModifier('dungeon_item_count');
      }
      if (e.count) {
        e.count = Math.floor(e.count);
      }
    }
    return rearragenPrize(prize);
  };

  exports.claimDungeonReward = function(dungeon, isSweep) {
    var prize, quests, result, ret, rewardMessage;
    if (dungeon == null) {
      return [];
    }
    ret = [];
    if (dungeon.revive > 0) {
      ret = this.inventory.removeById(ItemId_RevivePotion, dungeon.revive, true);
      if (!ret || ret.length === 0) {
        this.inventoryVersion++;
        return {
          NTF: Event_DungeonReward,
          arg: {
            res: DUNGEON_RESULT_FAIL
          }
        };
      }
      ret = this.doAction({
        id: 'ItemChange',
        ret: ret,
        version: this.inventoryVersion
      });
    }
    quests = dungeon.quests;
    if (quests) {
      this.updateQuest(quests);
      this.questVersion++;
    }
    prize = this.generateDungeonReward(dungeon);
    rewardMessage = {
      NTF: Event_DungeonReward,
      arg: {
        res: dungeon.result
      }
    };
    ret = ret.concat([rewardMessage]);
    if (dungeon.result !== DUNGEON_RESULT_FAIL) {
      ret = ret.concat(this.completeStage(dungeon.stage));
    }
    result = 'Lost';
    if (dungeon.result === DUNGEON_RESULT_WIN) {
      result = 'Win';
    }
    prize = prize.filter(function(e) {
      return !((e.count != null) && e.count === 0);
    });
    if (prize.length > 0) {
      rewardMessage.arg.prize = prize.filter(function(f) {
        return f.type !== PRIZETYPE_FUNCTION;
      });
    }
    ret = ret.concat(this.claimPrize(prize, false));
    if (isSweep) {

    } else {
      this.log('finishDungeon', {
        stage: dungeon.getInitialData().stage,
        result: result,
        reward: prize
      });
      this.releaseDungeon();
    }
    return ret;
  };

  exports.config = {
    reward_modifier: {
      dungeon_gold: 0,
      dungeon_exp: 0,
      dungeon_wxp: 0,
      dungeon_item_count: 0
    }
  };

}).call(this);
