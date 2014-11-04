(function() {
  var Bag, Card, CardStack, CommandStream, DBWrapper, Dungeon, DungeonCommandStream, DungeonEnvironment, Environment, Hero, Item, Player, PlayerEnvironment, Serializer, addMercenaryMember, async, createItem, createUnit, currentTime, dbLib, diffDate, genUtil, getMercenaryMember, getPlayerHero, getVip, helperLib, itemLib, moment, playerCSConfig, playerCommandStream, playerMessageFilter, registerConstructor, updateMercenaryMember, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./define');

  require('./shop');

  moment = require('moment');

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  _ref1 = require('./dbWrapper'), DBWrapper = _ref1.DBWrapper, getMercenaryMember = _ref1.getMercenaryMember, updateMercenaryMember = _ref1.updateMercenaryMember, addMercenaryMember = _ref1.addMercenaryMember, getPlayerHero = _ref1.getPlayerHero;

  _ref2 = require('./unit'), createUnit = _ref2.createUnit, Hero = _ref2.Hero;

  _ref3 = require('./item'), Item = _ref3.Item, Card = _ref3.Card;

  _ref4 = require('./commandStream'), CommandStream = _ref4.CommandStream, Environment = _ref4.Environment, DungeonEnvironment = _ref4.DungeonEnvironment, DungeonCommandStream = _ref4.DungeonCommandStream;

  Dungeon = require('./dungeon').Dungeon;

  _ref5 = require('./container'), Bag = _ref5.Bag, CardStack = _ref5.CardStack;

  _ref6 = require('./helper'), diffDate = _ref6.diffDate, currentTime = _ref6.currentTime, genUtil = _ref6.genUtil;

  helperLib = require('./helper');

  dbLib = require('./db');

  async = require('async');

  Player = (function(_super) {
    __extends(Player, _super);

    function Player(data) {
      var cfg, now, versionCfg;
      this.type = 'player';
      now = new Date();
      cfg = {
        dbKeyName: '',
        name: '',
        questTableVersion: -1,
        stageTableVersion: -1,
        event_daily: {},
        globalPrizeFlag: {},
        timestamp: {},
        counters: {},
        flags: {},
        globalPrizeFlag: {},
        inventory: Bag(InitialBagSize),
        gold: 0,
        diamond: 0,
        equipment: {},
        heroBase: {},
        heroIndex: -1,
        hero: {},
        stage: [],
        quests: {},
        energy: ENERGY_MAX,
        energyTime: now.valueOf(),
        mercenary: [],
        dungeonData: {},
        runtimeID: -1,
        rmb: 0,
        spendedDiamond: 0,
        tutorialStage: 0,
        purchasedCount: {},
        lastLogin: currentTime(),
        creationDate: now.valueOf(),
        isNewPlayer: true,
        loginStreak: {
          count: 0
        },
        accountID: -1,
        campaignState: {},
        infiniteTimer: currentTime(),
        inventoryVersion: 1,
        heroVersion: 1,
        stageVersion: 1,
        questVersion: 1,
        energyVersion: 1,
        abIndex: rand()
      };
      versionCfg = {
        inventoryVersion: ['gold', 'diamond', 'inventory', 'equipment'],
        heroVersion: ['heroIndex', 'hero', 'heroBase'],
        stageVersion: 'stage',
        questVersion: 'quests',
        energyVersion: ['energy', 'energyTime']
      };
      Player.__super__.constructor.call(this, data, cfg, versionCfg);
    }

    Player.prototype.setName = function(name) {
      this.name = name;
      return this.dbKeyName = playerPrefix + this.name;
    };

    Player.prototype.logout = function(reason) {
      if (this.socket && this.socket.encoder) {
        this.socket.encoder.writeObject({
          NTF: Event_ExpiredPID,
          err: reason
        });
      }
      this.onDisconnect();
      dbLib.unsubscribe(PlayerChannelPrefix + this.name);
      return this.destroied = true;
    };

    Player.prototype.onReconnect = function(socket) {
      return this.fetchMessage(wrapCallback(this, function(err, newMessage) {
        if (socket != null) {
          return socket.encoder.writeObject(newMessage);
        }
      }), true);
    };

    Player.prototype.logError = function(action, msg) {
      return this.log(action, msg, 'error');
    };

    Player.prototype.log = function(action, msg, type) {
      if (msg == null) {
        msg = {};
      }
      msg.name = this.name;
      msg.action = action;
      if (type && type === 'error') {
        return logError(msg);
      } else {
        return logUser(msg);
      }
    };

    Player.prototype.isEquiped = function(slot) {
      var e, equipment, i;
      equipment = (function() {
        var _ref7, _results;
        _ref7 = this.equipment;
        _results = [];
        for (i in _ref7) {
          e = _ref7[i];
          _results.push(e);
        }
        return _results;
      }).call(this);
      return equipment.indexOf(+slot) !== -1;
    };

    Player.prototype.migrate = function() {
      var cfg, enhanceID, flag, item, lv, p, prize, slot, _i, _ref7, _ref8;
      flag = false;
      _ref7 = this.inventory.container;
      for (slot in _ref7) {
        item = _ref7[slot];
        if (item != null) {
          if (item.transPrize != null) {
            if (this.isEquiped(slot)) {
              lv = 0;
              if (item.enhancement && item.enhancement.length > 0) {
                lv = item.enhancement.reduce((function(r, i) {
                  return r + i.level;
                }), 0);
              }
              cfg = require('./transfer').data;
              if (cfg[item.id]) {
                p = cfg[item.id].filter((function(_this) {
                  return function(e) {
                    return isClassMatch(_this.hero["class"], e.classLimit);
                  };
                })(this));
                item.id = p[0].value;
              }
              enhanceID = queryTable(TABLE_ITEM, item.id).enhanceID;
              if ((enhanceID != null) && lv >= 0) {
                item.enhancement = [
                  {
                    id: enhanceID,
                    level: lv
                  }
                ];
              }
              continue;
            }
            flag = true;
            this.sellItem(slot);
          }
        }
      }
      prize = (_ref8 = queryTable(TABLE_ROLE, this.hero["class"])) != null ? _ref8.initialEquipment : void 0;
      for (slot = _i = 0; _i <= 5; slot = ++_i) {
        if (!(this.equipment[slot] == null)) {
          continue;
        }
        flag = true;
        if (prize != null) {
          this.claimPrize(prize[slot]);
        }
      }
      return flag;
    };

    Player.prototype.onDisconnect = function() {
      this.socket = null;
      gPlayerDB[this.name] = null;
      return delete this.messages;
    };

    Player.prototype.getType = function() {
      return 'player';
    };

    Player.prototype.getTotalPkTimes = function() {
      return this.getPrivilege('pkCount');
    };

    Player.prototype.claimPkPrice = function(callback) {
      var me;
      me = this;
      return helperLib.getPositionOnLeaderboard(helperLib.LeaderboardIdx.Arena, this.name, 0, 0, function(err, result) {
        var prize, ret;
        prize = arenaPirze(result.position + 1);
        ret = me.claimPrize(prize);
        return callback(ret);
      });
    };

    Player.prototype.submitCampaign = function(campaign, handler) {
      var event;
      event = this[campaign];
      if (event != null) {
        helperLib.proceedCampaign(this, campaign, helperLib.events, handler);
        return this.log('submitCampaign', {
          event: campaign,
          data: event
        });
      } else {
        return this.logError('submitCampaign', {
          reason: 'NoEventData',
          event: campaign
        });
      }
    };

    Player.prototype.syncEvent = function() {
      return helperLib.initCampaign(this, helperLib.events);
    };

    Player.prototype.onLogin = function() {
      var flag, itemsNeedRemove, key, prize, ret, s, _i, _len, _ref7;
      if (!this.lastLogin) {
        return [];
      }
      if (diffDate(this.lastLogin) > 0) {
        this.purchasedCount = {};
      }
      this.lastLogin = currentTime();
      if (typeof gGlobalPrize !== "undefined" && gGlobalPrize !== null) {
        for (key in gGlobalPrize) {
          prize = gGlobalPrize[key];
          if (!(!this.globalPrizeFlag[key])) {
            continue;
          }
          dbLib.deliverMessage(this.name, prize);
          this.globalPrizeFlag[key] = true;
        }
      }
      if (!moment().isSame(this.infiniteTimer, 'week')) {
        this.infiniteTimer = currentTime();
        _ref7 = this.stage;
        for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
          s = _ref7[_i];
          if (s && (s.level != null)) {
            s.level = 0;
          }
        }
      }
      flag = true;
      if (this.loginStreak.date && moment().isSame(this.loginStreak.date, 'month')) {
        if (moment().isSame(this.loginStreak.date, 'day')) {
          flag = false;
        }
      } else {
        this.loginStreak.count = 0;
      }
      this.log('onLogin', {
        loginStreak: this.loginStreak.count,
        date: this.lastLogin
      });
      this.onCampaign('RMB');
      ret = [
        {
          NTF: Event_CampaignLoginStreak,
          day: this.loginStreak.count,
          claim: flag
        }
      ];
      itemsNeedRemove = this.inventory.filter(function(item) {
        if ((item != null ? item.expiration : void 0) == null) {
          return false;
        }
        if (item.date == null) {
          return true;
        }
        return helperLib.matchDate(item.date, helperLib.currentTime(), item.expiration);
      });
      ret = itemsNeedRemove.reduce((function(_this) {
        return function(pValue, e) {
          return pValue.concat(_this.removeItem(null, null, _this.queryItemSlot(e)));
        };
      })(this), ret);
      this.createHero();
      return ret;
    };

    Player.prototype.sweepStage = function(stage, multiple) {
      var cfg, count, dungeon, energyCost, i, itemCost, itemCostRet, k, p, prize, r, ret, ret_result, stgCfg, v, _i;
      stgCfg = queryTable(TABLE_STAGE, stage, this.abIndex);
      if (!stgCfg) {
        return {
          code: RET_DungeonNotExist,
          ret: []
        };
      }
      cfg = queryTable(TABLE_DUNGEON, stgCfg.dungeon, this.abIndex);
      if (!cfg) {
        return {
          code: RET_DungeonNotExist,
          ret: []
        };
      }
      dungeon = {
        team: [],
        quests: [],
        revive: 0,
        result: DUNGEON_RESULT_WIN,
        killingInfo: [],
        currentLevel: cfg.levelCount,
        getConfig: function() {
          return cfg;
        },
        isSweep: true
      };
      count = 1;
      if (multiple) {
        count = 5;
      }
      ret_result = RET_OK;
      prize = [];
      ret = [];
      energyCost = stgCfg.cost * count;
      itemCost = {
        id: 871,
        num: count
      };
      if (this.stage[stage].state !== STAGE_STATE_PASSED) {
        ret_result = RET_StageIsLocked;
      } else if (multiple && this.vipLevel() < Sweep_Vip_Level) {
        ret_result = RET_VipLevelIsLow;
      } else if (this.energy < energyCost) {
        ret_result = RET_NotEnoughEnergy;
      } else if ((stgCfg.sweepPower == null) && stgCfg.sweepPower > this.createHero().calculatePower()) {
        ret_result = RET_SweepPowerNotEnough;
      } else {
        itemCostRet = this.claimCost({
          id: itemCost.id
        }, itemCost.num);
        if (itemCostRet == null) {
          ret_result = RET_NotEnoughItem;
        } else {
          this.costEnergy(energyCost);
          ret = ret.concat(itemCostRet);
          for (i = _i = 1; 1 <= count ? _i <= count : _i >= count; i = 1 <= count ? ++_i : --_i) {
            p = this.generateDungeonAward(dungeon, true);
            r = [];
            for (k in p) {
              v = p[k];
              r = r.concat(v);
            }
            r = r.filter((function(_this) {
              return function(e) {
                return !(e.type >= PRIZETYPE_GOLD && e.type <= PRIZETYPE_WXP && e.count <= 0);
              };
            })(this));
            prize.push(r);
            ret = ret.concat(this.claimPrize(r));
          }
          this.log('sweepDungeon', {
            stage: stage,
            multiple: multiple,
            reward: prize
          });
          ret = ret.concat(this.syncEnergy());
        }
      }
      return {
        code: ret_result,
        prize: prize,
        ret: ret
      };
    };

    Player.prototype.claimLoginReward = function() {
      var dis, ret, reward;
      if (this.loginStreak.date) {
        dis = diffDate(this.loginStreak.date);
        if (dis === 0) {
          this.logError('claimLoginReward', {
            prev: this.loginStreak.date,
            today: currentTime()
          });
          return {
            ret: RET_Unknown
          };
        }
      }
      this.loginStreak['date'] = currentTime(true).valueOf();
      this.log('claimLoginReward', {
        loginStreak: this.loginStreak.count,
        date: currentTime()
      });
      reward = queryTable(TABLE_DP)[this.loginStreak.count].prize;
      ret = this.claimPrize(reward.filter((function(_this) {
        return function(e) {
          return !e.vip || _this.vipLevel() >= e.vip;
        };
      })(this)));
      this.loginStreak.count += 1;
      if (this.loginStreak.count >= queryTable(TABLE_DP).length) {
        this.loginStreak.count = 0;
      }
      return {
        ret: RET_OK,
        res: ret
      };
    };

    Player.prototype.onMessage = function(msg) {
      switch (msg.action) {
        case 'RemovedFromFriendList':
          this.removeFriend(msg.name);
          return this.updateFriendInfo(wrapCallback(this, function(err, ret) {
            if (this.socket != null) {
              return this.socket.encoder.writeObject(ret);
            }
          }));
      }
    };

    Player.prototype.initialize = function() {
      dbLib.subscribe(PlayerChannelPrefix + this.name, wrapCallback(this, (function(_this) {
        return function(msg) {
          var err;
          if (_this.socket == null) {
            return false;
          }
          if (msg === 'New Message') {
            return _this.fetchMessage(wrapCallback(_this, function(err, newMessage) {
              return this.socket.encoder.writeObject(newMessage);
            }));
          } else if (msg === 'New Friend') {
            return _this.updateFriendInfo(wrapCallback(_this, function(err, ret) {
              return this.socket.encoder.writeObject(ret);
            }));
          } else {
            try {
              msg = JSON.parse(msg);
              return _this.onMessage(msg);
            } catch (_error) {
              err = _error;
              return logError({
                type: 'Subscribe',
                err: err,
                msg: msg
              });
            }
          }
        };
      })(this)));
      helperLib.initObserveration(this);
      this.installObserver('heroxpChanged');
      this.installObserver('battleForceChanged');
      this.installObserver('countersChanged');
      this.installObserver('stageChanged');
      this.installObserver('winningAnPVP');
      helperLib.assignLeaderboard(this, helperLib.LeaderboardIdx.Arena);
      if (this.counters['worldBoss'] == null) {
        this.counters['worldBoss'] = {};
      }
      if (this.isNewPlayer) {
        this.isNewPlayer = false;
      }
      this.inventory.validate();
      if (this.hero != null) {
        this.updateMercenaryInfo();
      }
      if (this.questTableVersion !== queryTable(TABLE_VERSION, 'quest')) {
        this.updateQuestStatus();
        this.questTableVersion = queryTable(TABLE_VERSION, 'quest');
      }
      if (this.stageTableVersion !== queryTable(TABLE_VERSION, 'stage')) {
        this.updateStageStatus();
        this.stageTableVersion = queryTable(TABLE_VERSION, 'stage');
      }
      return this.loadDungeon();
    };

    Player.prototype.handleReceipt = function(payment, tunnel, cb) {
      var cfg, flag, myReceipt, productList, rec, ret;
      productList = queryTable(TABLE_IAP, 'list');
      myReceipt = payment.receipt;
      rec = unwrapReceipt(myReceipt);
      cfg = productList[rec.productID];
      flag = true;
      this.log('charge', {
        rmb: cfg.price,
        diamond: cfg.gem,
        tunnel: tunnel,
        action: 'charge',
        match: flag,
        receipt: myReceipt
      });
      if (flag) {
        ret = [
          {
            NTF: Event_InventoryUpdateItem,
            arg: {
              dim: this.addDiamond(cfg.gem)
            }
          }
        ];
        if (rec.productID === MonthCardID) {
          this.counters['monthCard'] = 30;
          ret = ret.concat(this.syncEvent());
        }
        this.rmb += cfg.price;
        this.onCampaign('RMB', rec.productID);
        ret.push({
          NTF: Event_PlayerInfo,
          arg: {
            rmb: this.rmb,
            mcc: this.counters.monthCard
          }
        });
        ret.push({
          NTF: Event_RoleUpdate,
          arg: {
            act: {
              vip: this.vipLevel()
            }
          }
        });
        postPaymentInfo(this.createHero().level, myReceipt, payment.paymentType);
        this.saveDB();
        return dbLib.updateReceipt(myReceipt, RECEIPT_STATE_CLAIMED, rec.id, rec.productID, rec.serverID, rec.tunnel, function(err) {
          return cb(err, ret);
        });
      } else {
        return cb(Error(RET_InvalidPaymentInfo));
      }
    };

    Player.prototype.handlePayment = function(payment, handle) {
      var myReceipt, postResult;
      this.log('handlePayment', {
        payment: payment
      });
      postResult = (function(_this) {
        return function(error, result) {
          if (error) {
            logError({
              name: _this.name,
              receipt: myReceipt,
              type: 'handlePayment',
              error: error,
              result: result
            });
            return handle(null, []);
          } else {
            return handle(null, result);
          }
        };
      })(this);
      switch (payment.paymentType) {
        case 'AppStore':
          return this.handleReceipt(payment, 'AppStore', postResult);
        case 'PP25':
        case 'ND91':
        case 'KY':
        case 'Teebik':
          myReceipt = payment.receipt;
          return async.waterfall([
            function(cb) {
              return dbWrapper.getReceipt(myReceipt, function(err, receipt) {
                if ((receipt != null) && receipt.state !== RECEIPT_STATE_DELIVERED) {
                  return cb(Error(RET_Issue37));
                } else {
                  return cb(null, myReceipt, payment.paymentType);
                }
              });
            }, (function(_this) {
              return function(receipt, tunnel, cb) {
                return _this.handleReceipt(payment, tunnel, cb);
              };
            })(this)
          ], postResult);
      }
    };

    Player.prototype.updateStageStatus = function() {
      var ret, s, _i, _len, _ref7;
      ret = [];
      _ref7 = updateStageStatus(this.stage, this, this.abIndex);
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        s = _ref7[_i];
        ret = ret.concat(this.changeStage(s, STAGE_STATE_ACTIVE));
      }
      return ret;
    };

    Player.prototype.updateQuestStatus = function() {
      var q, _i, _len, _ref7, _results;
      _ref7 = updateQuestStatus(this.quests, this, this.abIndex);
      _results = [];
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        q = _ref7[_i];
        _results.push(this.acceptQuest(q));
      }
      return _results;
    };

    Player.prototype.loadDungeon = function() {
      if (this.dungeonData.stage != null) {
        this.dungeon = new Dungeon(this.dungeonData);
        return this.dungeon.initialize();
      }
    };

    Player.prototype.releaseDungeon = function() {
      delete this.dungeon;
      return this.dungeonData = {};
    };

    Player.prototype.getPurchasedCount = function(id) {
      var _ref7;
      return (_ref7 = this.purchasedCount[id]) != null ? _ref7 : 0;
    };

    Player.prototype.addPurchasedCount = function(id, count) {
      if (this.purchasedCount[id] == null) {
        this.purchasedCount[id] = 0;
      }
      return this.purchasedCount[id] += count;
    };

    Player.prototype.createPlayer = function(arg, account, cb) {
      var p, prize, _i, _len, _ref7;
      this.setName(arg.nam);
      this.accountID = account;
      this.initialize();
      this.createHero({
        name: arg.nam,
        "class": arg.cid,
        gender: arg.gen,
        hairStyle: arg.hst,
        hairColor: arg.hcl
      });
      prize = (_ref7 = queryTable(TABLE_ROLE, arg.cid)) != null ? _ref7.initialEquipment : void 0;
      for (_i = 0, _len = prize.length; _i < _len; _i++) {
        p = prize[_i];
        this.claimPrize(p);
      }
      logUser({
        name: arg.nam,
        action: 'register',
        "class": arg.cid,
        gender: arg.gen,
        hairStyle: arg.hst,
        hairColor: arg.hcl
      });
      return this.saveDB(cb);
    };

    Player.prototype.putOnEquipmentAfterSwitched = function(heroClass) {
      var equipmentList, p, prize, ret, _i, _len, _ref7, _ref8, _results;
      equipmentList = this.inventory.filter(function(item) {
        console.log(item, '-------------------');
        return (item != null) && item["class"] === heroClass;
      });
      if (equipmentList.length === 0) {
        prize = (_ref7 = queryTable(TABLE_ROLE, heroData["class"])) != null ? _ref7.initialEquipment : void 0;
        _results = [];
        for (_i = 0, _len = prize.length; _i < _len; _i++) {
          p = prize[_i];
          ret = this.claimPrize(p);
          _results.push((_ref8 = ret.itm) != null ? _ref8.forEach(function(item) {
            return this.useItem(item.sid);
          }) : void 0);
        }
        return _results;
      } else {
        return this.equipment = equipmentList;
      }
    };

    Player.prototype.createHero = function(heroData, isSwitch) {
      var bag, bf, e, equip, hero, i, _ref7;
      if (heroData != null) {
        if ((this.heroBase[heroData["class"]] != null) && heroData["class"] === this.hero["class"]) {
          return null;
        }
        if (isSwitch) {
          heroData.xp = this.hero.xp;
          heroData.equipment = [];
          this.heroBase[heroData["class"]] = heroData;
          this.switchHero(heroData["class"]);
        } else {
          heroData.xp = 0;
          heroData.equipment = [];
          this.heroBase[heroData["class"]] = heroData;
          this.switchHero(heroData["class"]);
          this.putOnEquipmentAfterSwitched(heroData["class"]);
        }
        return this.createHero();
      } else if (this.hero) {
        bag = this.inventory;
        equip = [];
        _ref7 = this.equipment;
        for (i in _ref7) {
          e = _ref7[i];
          if (bag.get(e) != null) {
            equip.push({
              cid: bag.get(e).classId,
              eh: bag.get(e).enhancement
            });
          }
        }
        this.hero['equipment'] = equip;
        hero = new Hero(this.hero);
        bf = hero.calculatePower();
        if (bf !== this.battleForce) {
          this.battleForce = bf;
          this.notify('battleForceChanged');
        }
        this.save();
        return hero;
      } else {
        throw 'NoHero';
      }
    };

    Player.prototype.switchHero = function(hClass) {
      var k, v, _ref7, _ref8, _results;
      if (this.heroBase[hClass] == null) {
        return false;
      }
      if (this.hero != null) {
        this.heroBase[this.hero["class"]] = {};
        _ref7 = this.hero;
        for (k in _ref7) {
          v = _ref7[k];
          this.heroBase[this.hero["class"]][k] = JSON.parse(JSON.stringify(v));
        }
      }
      _ref8 = this.heroBase[hClass];
      _results = [];
      for (k in _ref8) {
        v = _ref8[k];
        _results.push(this.hero[k] = JSON.parse(JSON.stringify(v)));
      }
      return _results;
    };

    Player.prototype.addMoney = function(type, point) {
      if (!point) {
        return this[type];
      }
      if (point + this[type] < 0) {
        return false;
      }
      this[type] = Math.floor(this[type] + point);
      if (type === 'diamond') {
        this.costedDiamond += point;
      }
      return this[type];
    };

    Player.prototype.addDiamond = function(point) {
      return this.addMoney('diamond', point);
    };

    Player.prototype.addGold = function(point) {
      return this.addMoney('gold', point);
    };

    Player.prototype.addHeroExp = function(point) {
      var currentLevel, prevLevel;
      if (point) {
        prevLevel = this.createHero().level;
        this.hero.xp = Math.floor(this.hero.xp + point);
        currentLevel = this.createHero().level;
        this.notify('heroxpChanged', {
          xp: this.hero.xp,
          delta: point,
          prevLevel: prevLevel,
          currentLevel: currentLevel
        });
        this.log('levelChange', {
          prevLevel: prevLevel,
          newLevel: currentLevel
        });
      }
      return this.hero.xp;
    };

    Player.prototype.costEnergy = function(point) {
      var incPoint, incTime, now;
      now = new Date();
      if ((this.energyTime != null) && this.energy < this.energyLimit()) {
        incTime = now - this.energyTime;
        incPoint = incTime / ENERGY_RATE;
        this.energy += incPoint;
        if (this.energy > this.energyLimit()) {
          this.energy = this.energyLimit();
        }
      }
      this.energyTime = now.valueOf();
      if (point) {
        if (this.energy < point) {
          return false;
        }
        this.energy -= point;
      }
      return true;
    };

    Player.prototype.saveDB = function(handler) {
      return this.save(handler);
    };

    Player.prototype.modifyCounters = function(propertyName, arg) {
      this.counters[propertyName] = typeof arg.value === "function" ? arg.value(0) : void 0;
      if (arg.notify != null) {
        return this.notify(arg.notify.name, arg.notify.arg);
      }
    };

    Player.prototype.stageIsUnlockable = function(stage) {
      var stageConfig;
      if (getPowerLimit(stage) > this.createHero().calculatePower()) {
        return false;
      }
      stageConfig = queryTable(TABLE_STAGE, stage, this.abIndex);
      if (stageConfig.condition) {
        return stageConfig.condition(this, genUtil());
      }
      if (stageConfig.event) {
        return (this[stageConfig.event] != null) && this[stageConfig.event].status === 'Ready';
      }
      return this.stage[stage] && this.stage[stage].state !== STAGE_STATE_INACTIVE;
    };

    Player.prototype.changeStage = function(stage, state) {
      var arg, chapter, flag, operation, ret, stg;
      stg = queryTable(TABLE_STAGE, stage);
      this.stageVersion++;
      if (stg) {
        chapter = stg.chapter;
        if (this.stage[stage] == null) {
          this.stage[stage] = {};
        }
        flag = false;
        arg = {
          chp: chapter,
          stg: stage,
          sta: state
        };
        if (stg.isInfinite) {
          if (this.stage[stage].level == null) {
            this.stage[stage]['level'] = 0;
          }
          if (state === STAGE_STATE_PASSED) {
            this.stage[stage].level += 1;
            this.notify('stageChanged', {
              stage: stage
            });
            if (this.stage[stage].level % 5 === 0) {
              dbLib.broadcastEvent(BROADCAST_INFINITE_LEVEL, {
                who: this.name,
                where: stage,
                many: this.stage[stage].level
              });
            }
          }
          arg.lvl = this.stage[stage].level;
          flag = true;
        }
        operation = 'unlock';
        if (state === STAGE_STATE_PASSED) {
          operation = 'complete';
        }
        ret = [];
        if (this.stage[stage].state !== state) {
          if ((stg.tutorial != null) && state === STAGE_STATE_PASSED) {
            this.tutorialStage = stg.tutorial;
            ret.push({
              NTF: Event_TutorialInfo,
              arg: {
                tut: this.tutorialStage
              }
            });
          }
          this.stage[stage].state = state;
          flag = true;
        }
        if (flag) {
          ret.push({
            NTF: Event_UpdateStageInfo,
            arg: {
              syn: this.stageVersion,
              stg: [arg]
            }
          });
        }
        this.log('stage', {
          operation: operation,
          stage: stage
        });
        return ret;
      }
    };

    Player.prototype.dungeonAction = function(action) {
      var ret;
      if (this.dungeon == null) {
        return [
          {
            NTF: Event_Fail,
            arg: 'Dungeon not exist.'
          }
        ];
      }
      ret = [].concat(this.dungeon.doAction(action));
      if (this.dungeon.result != null) {
        ret = ret.concat(this.claimDungeonAward(this.dungeon));
      }
      return ret;
    };

    Player.prototype.startDungeon = function(stage, startInfoOnly, pkr, handler) {
      var dungeonConfig, stageConfig;
      if (pkr == null) {
        pkr = null;
      }
      stageConfig = queryTable(TABLE_STAGE, stage, this.abIndex);
      dungeonConfig = queryTable(TABLE_DUNGEON, stageConfig.dungeon, this.abIndex);
      if (!((stageConfig != null) && (dungeonConfig != null))) {
        this.logError('startDungeon', {
          reason: 'InvalidStageConfig',
          stage: stage,
          stageConfig: stageConfig != null,
          dungeonConfig: dungeonConfig != null
        });
        return handler(null, RET_ServerError);
      }
      return async.waterfall([
        (function(_this) {
          return function(cb) {
            if (_this.dungeonData.stage != null) {
              return cb('OK');
            } else {
              return cb();
            }
          };
        })(this), (function(_this) {
          return function(cb) {
            if (_this.stageIsUnlockable(stage)) {
              return cb();
            } else {
              return cb(RET_StageIsLocked);
            }
          };
        })(this), (function(_this) {
          return function(cb) {
            if (_this.costEnergy(stageConfig.cost)) {
              return cb();
            } else {
              return cb(RET_NotEnoughEnergy);
            }
          };
        })(this), (function(_this) {
          return function(cb) {
            return _this.requireMercenary(function(team) {
              return cb(null, team);
            });
          };
        })(this), (function(_this) {
          return function(mercenary, cb) {
            var level, team, teamCount, _ref7;
            teamCount = (_ref7 = stageConfig.team) != null ? _ref7 : 3;
            if ((_this.stage[stage] != null) && (_this.stage[stage].level != null)) {
              level = _this.stage[stage].level;
              if (level % 10 === 0) {
                teamCount = 1;
              } else if (level % 5 === 0) {
                teamCount = 2;
              }
            }
            team = [_this.createHero()];
            if (stageConfig.teammate != null) {
              team = team.concat(stageConfig.teammate.map(function(hd) {
                return new Hero(hd);
              }));
            }
            if (teamCount > team.length) {
              if (mercenary.length >= teamCount - team.length) {
                team = team.concat(mercenary.splice(0, teamCount - team.length));
                _this.mercenary = [];
              } else {
                _this.costEnergy(-stageConfig.cost);
                return cb(RET_NeedTeammate);
              }
            }
            return cb(null, team, level);
          };
        })(this), (function(_this) {
          return function(team, level, cb) {
            var blueStar;
            blueStar = team.reduce(wrapCallback(_this, function(r, l) {
              if (l.leftBlueStar == null) {
                return r;
              }
              if (l.leftBlueStar >= 0) {
                return this.getBlueStarCost() + r;
              } else {
                dbLib.incrBluestarBy(l.name, -l.leftBlueStar, function() {
                  return {};
                });
                return this.getBlueStarCost() + r + l.leftBlueStar;
              }
            }), 0);
            return cb(null, team, level, blueStar);
          };
        })(this), (function(_this) {
          return function(team, level, blueStar, cb) {
            var qid, qst, quest, _ref7;
            quest = {};
            _ref7 = _this.quests;
            for (qid in _ref7) {
              qst = _ref7[qid];
              if (!qst.complete) {
                quest[qid] = qst;
              }
            }
            return cb(null, team, level, blueStar, quest);
          };
        })(this), (function(_this) {
          return function(team, level, blueStar, quest, cb) {
            _this.dungeonData = {
              stage: stage,
              initialQuests: quest,
              infiniteLevel: level,
              blueStar: blueStar,
              abIndex: _this.abIndex,
              team: team.map(getBasicInfo)
            };
            _this.dungeonData.randSeed = rand();
            if (stageConfig.event === 'event_daily') {
              _this.dungeonData.baseRank = helperLib.initCalcDungeonBaseRank(_this);
            }
            return cb();
          };
        })(this), (function(_this) {
          return function(cb) {
            if ((stageConfig.pvp != null) && (pkr != null)) {
              return getPlayerHero(pkr, wrapCallback(_this, function(err, heroData) {
                this.dungeonData.PVP_Pool = heroData != null ? [getBasicInfo(heroData)] : void 0;
                return cb('OK');
              }));
            } else {
              return cb('OK');
            }
          };
        })(this)
      ], (function(_this) {
        return function(err) {
          var msg, ret;
          msg = [];
          if (err !== 'OK') {
            ret = err;
            err = new Error(err);
          } else {
            _this.loadDungeon();
            if (_this.dungeon != null) {
              if (stageConfig.initialAction) {
                stageConfig.initialAction(_this, genUtil);
              }
              if (stageConfig.eventName) {
                msg = _this.syncEvent();
              }
              _this.log('startDungeon', {
                dungeonData: _this.dungeonData,
                err: err
              });
              ret = startInfoOnly ? _this.dungeon.getInitialData() : _this.dungeonAction({
                CMD: RPC_GameStartDungeon
              });
            } else {
              _this.logError('startDungeon', {
                reason: 'NoDungeon',
                err: err,
                data: _this.dungeonData,
                dungeon: _this.dungeon
              });
              _this.releaseDungeon();
              err = new Error(RET_Unknown);
              ret = RET_Unknown;
            }
          }
          if (handler != null) {
            return handler(err, ret, msg);
          }
        };
      })(this));
    };

    Player.prototype.acceptQuest = function(qid) {
      var i, quest;
      if (this.quests[qid]) {
        return [];
      }
      quest = queryTable(TABLE_QUEST, qid, this.abIndex);
      this.quests[qid] = {
        counters: (function() {
          var _i, _len, _ref7, _results;
          _ref7 = quest.objects;
          _results = [];
          for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
            i = _ref7[_i];
            _results.push(0);
          }
          return _results;
        })()
      };
      this.onEvent('gold');
      this.onEvent('diamond');
      this.onEvent('item');
      this.questVersion++;
      return packQuestEvent(this.quests, qid, this.questVersion);
    };

    Player.prototype.rearragenPrize = function(prize) {
      var itemPrize, otherPrize, p, _i, _len;
      if (!Array.isArray(prize)) {
        prize = [prize];
      }
      itemPrize = [];
      otherPrize = [];
      for (_i = 0, _len = prize.length; _i < _len; _i++) {
        p = prize[_i];
        if (p != null) {
          if (p.type === PRIZETYPE_ITEM) {
            if (p.count > 0) {
              itemPrize.push(p);
            }
          } else {
            otherPrize.push(p);
          }
        }
      }
      if (itemPrize.length > 1) {
        itemPrize = [
          {
            type: PRIZETYPE_ITEM,
            value: itemPrize.map(function(e) {
              return {
                item: e.value,
                count: e.count
              };
            }),
            count: 0
          }
        ];
      }
      return itemPrize.concat(otherPrize);
    };

    Player.prototype.claimCost = function(cost, count) {
      var cfg, haveEnoughtMoney, p, prize, ret, retRM, _i, _len;
      if (count == null) {
        count = 1;
      }
      if (typeof cost === 'object') {
        cfg = {
          material: [
            {
              type: 0,
              value: cost.id,
              count: 1
            }
          ]
        };
      } else {
        cfg = queryTable(TABLE_COSTS, cost);
      }
      if (cfg == null) {
        return null;
      }
      prize = this.rearragenPrize(cfg.material);
      haveEnoughtMoney = prize.reduce((function(_this) {
        return function(r, l) {
          if (l.type === PRIZETYPE_GOLD && _this.gold < l.count * count) {
            return false;
          }
          if (l.type === PRIZETYPE_DIAMOND && _this.diamond < l.count * count) {
            return false;
          }
          return r;
        };
      })(this), true);
      if (!haveEnoughtMoney) {
        return null;
      }
      ret = [];
      for (_i = 0, _len = prize.length; _i < _len; _i++) {
        p = prize[_i];
        if (!(p != null)) {
          continue;
        }
        this.inventoryVersion++;
        switch (p.type) {
          case PRIZETYPE_ITEM:
            retRM = this.inventory.remove(p.value, p.count * count, null, true);
            if (!(retRM && retRM.length > 0)) {
              return null;
            }
            ret = this.doAction({
              id: 'ItemChange',
              ret: retRM,
              version: this.inventoryVersion
            });
            break;
          case PRIZETYPE_GOLD:
            ret.push({
              NTF: Event_InventoryUpdateItem,
              arg: {
                syn: this.inventoryVersion,
                god: this.addGold(-p.count * count)
              }
            });
            break;
          case PRIZETYPE_DIAMOND:
            ret.push({
              NTF: Event_InventoryUpdateItem,
              arg: {
                syn: this.inventoryVersion,
                dim: this.addDiamond(-p.count * count)
              }
            });
        }
      }
      return ret;
    };

    Player.prototype.claimPrize = function(prize, allOrFail) {
      var e, equipUpdate, i, k, p, ret, _i, _len, _ref7;
      if (allOrFail == null) {
        allOrFail = true;
      }
      if (prize == null) {
        return [];
      }
      prize = this.rearragenPrize(prize);
      ret = [];
      for (_i = 0, _len = prize.length; _i < _len; _i++) {
        p = prize[_i];
        if (!(p != null)) {
          continue;
        }
        this.inventoryVersion++;
        switch (p.type) {
          case PRIZETYPE_ITEM:
            ret = this.aquireItem(p.value, p.count, allOrFail);
            if (!(ret && ret.length > 0)) {
              return [];
            }
            break;
          case PRIZETYPE_GOLD:
            if (p.count > 0) {
              ret.push({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  god: this.addGold(p.count)
                }
              });
            }
            break;
          case PRIZETYPE_DIAMOND:
            if (p.count > 0) {
              ret.push({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  dim: this.addDiamond(p.count)
                }
              });
            }
            break;
          case PRIZETYPE_EXP:
            if (p.count > 0) {
              ret.push({
                NTF: Event_RoleUpdate,
                arg: {
                  syn: this.heroVersion,
                  act: {
                    exp: this.addHeroExp(p.count)
                  }
                }
              });
            }
            break;
          case PRIZETYPE_WXP:
            if (!p.count) {
              continue;
            }
            equipUpdate = [];
            _ref7 = this.equipment;
            for (i in _ref7) {
              k = _ref7[i];
              e = this.getItemAt(k);
              if (e == null) {
                logError({
                  action: 'claimPrize',
                  reason: 'equipmentNotExist',
                  name: this.name,
                  equipSlot: k,
                  index: i
                });
                delete this.equipment[k];
                continue;
              }
              e.xp = e.xp + p.count;
              equipUpdate.push({
                sid: k,
                xp: e.xp
              });
            }
            if (equipUpdate.length > 0) {
              ret.push({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  itm: equipUpdate
                }
              });
            }
            break;
          case PRIZETYPE_FUNCTION:
            switch (p.func) {
              case "setFlag":
                this.flags[p.flag] = p.value;
                ret = ret.concat(this.syncFlags(true)).concat(this.syncEvent());
                break;
              case "countUp":
                if (p.target === 'server') {
                  if (gServerObject.counters[p.counter] == null) {
                    gServerObject.counters[p.counter] = 0;
                  }
                  gServerObject.counters[p.counter]++;
                  gServerObject.notify('countersChanged', {
                    type: p.counter,
                    delta: 1
                  });
                } else {
                  this.counters[p.counter]++;
                  this.notify('countersChanged', {
                    type: p.counter
                  });
                  ret = ret.concat(this.syncCounters(true)).concat(this.syncEvent());
                }
                break;
              case "updateLeaderboard":
                if (this.counters['worldBoss'][p.counter] == null) {
                  this.counters['worldBoss'][p.counter] = 0;
                }
                this.counters['worldBoss'][p.counter] += p.delta;
                helperLib.assignLeaderboard(this, p.boardId);
            }
        }
      }
      return ret;
    };

    Player.prototype.isQuestAchieved = function(qid) {
      var c, i, quest, _ref7;
      if (this.quests[qid] == null) {
        return false;
      }
      quest = queryTable(TABLE_QUEST, qid, this.abIndex);
      _ref7 = this.quests[qid].counters;
      for (i in _ref7) {
        c = _ref7[i];
        if (quest.objects[i].count > c) {
          return false;
        }
      }
      return true;
    };

    Player.prototype.claimQuest = function(qid) {
      var obj, prize, quest, ret, _i, _len, _ref7;
      quest = queryTable(TABLE_QUEST, qid, this.abIndex);
      ret = [];
      if (!((quest != null) && (this.quests[qid] != null) && !this.quests[qid].complete)) {
        return RET_Unknown;
      }
      this.checkQuestStatues(qid);
      if (!this.isQuestAchieved(qid)) {
        return RET_Unknown;
      }
      prize = this.claimPrize(quest.prize.filter((function(_this) {
        return function(e) {
          return isClassMatch(_this.hero["class"], e.classLimit);
        };
      })(this)));
      if (!prize || prize.length === 0) {
        return RET_InventoryFull;
      }
      ret = ret.concat(prize);
      this.questVersion++;
      _ref7 = quest.objects;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        obj = _ref7[_i];
        if (obj.consume) {
          switch (obj.type) {
            case QUEST_TYPE_GOLD:
              ret = ret.concat({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  god: this.addGold(-obj.count)
                }
              });
              break;
            case QUEST_TYPE_DIAMOND:
              ret = ret.concat({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  dim: this.addDiamond(-obj.count)
                }
              });
              break;
            case QUEST_TYPE_ITEM:
              ret = ret.concat(this.removeItem(obj.value, obj.count));
          }
        }
      }
      this.log('claimQuest', {
        id: qid
      });
      this.quests[qid] = {
        complete: true
      };
      return ret.concat(this.updateQuestStatus());
    };

    Player.prototype.checkQuestStatues = function(qid) {
      var i, objective, quest, _ref7, _results;
      quest = queryTable(TABLE_QUEST, qid, this.abIndex);
      if (!((this.quests[qid] != null) && quest)) {
        return false;
      }
      _ref7 = quest.objects;
      _results = [];
      for (i in _ref7) {
        objective = _ref7[i];
        switch (objective.type) {
          case QUEST_TYPE_GOLD:
            this.quests[qid].counters[i] = this.gold;
            break;
          case QUEST_TYPE_DIAMOND:
            this.quests[qid].counters[i] = this.diamond;
            break;
          case QUEST_TYPE_ITEM:
            this.quests[qid].counters[i] = this.inventory.filter(function(e) {
              return e.id === objective.collect;
            }).reduce((function(r, l) {
              return r + l.count;
            }), 0);
            break;
          case QUEST_TYPE_LEVEL:
            this.quests[qid].counters[i] = this.createHero().level;
            break;
          case QUEST_TYPE_POWER:
            this.quests[qid].counters[i] = this.createHero().calculatePower();
        }
        if (this.quests[qid].counters[i] > objective.count) {
          _results.push(this.quests[qid].counters[i] = objective.count);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Player.prototype.onEvent = function(eventID) {
      switch (eventID) {
        case 'Equipment':
          return this.createHero();
      }
    };

    Player.prototype.queryItemSlot = function(item) {
      return this.inventory.queryItemSlot(item);
    };

    Player.prototype.getItemAt = function(slot) {
      return this.inventory.get(slot);
    };

    Player.prototype.useItem = function(slot) {
      var equip, item, myClass, prize, prz, ret, tmp;
      item = this.getItemAt(slot);
      myClass = this.hero["class"];
      if (item == null) {
        return {
          ret: RET_ItemNotExist
        };
      }
      if (!isClassMatch(myClass, item.classLimit)) {
        return {
          ret: RET_RoleClassNotMatch
        };
      }
      this.log('useItem', {
        slot: slot,
        id: item.id
      });
      switch (item.category) {
        case ITEM_USE:
          switch (item.subcategory) {
            case ItemUse_ItemPack:
              prize = this.claimPrize(item.prize);
              if (!prize) {
                return {
                  ret: RET_InventoryFull
                };
              }
              ret = this.removeItem(null, 1, slot);
              return {
                ret: RET_OK,
                ntf: ret.concat(prize)
              };
            case ItemUse_TreasureChest:
              if ((item.dropKey != null) && !this.haveItem(item.dropKey)) {
                return {
                  ret: RET_NoKey
                };
              }
              prz = generatePrize(queryTable(TABLE_DROP), [item.dropId]);
              prize = this.claimPrize(prz);
              if (!prize) {
                return {
                  ret: RET_InventoryFull
                };
              }
              this.log('openTreasureChest', {
                type: 'TreasureChest',
                id: item.id,
                prize: prize,
                drop: e.drop
              });
              ret = prize.concat(this.removeItem(null, 1, slot));
              if (item.dropKey != null) {
                ret = ret.concat(this.removeItemById(item.dropKey, 1, true));
              }
              return {
                prize: prz,
                res: ret
              };
            case ItemUse_Function:
              ret = this.removeItem(null, 1, slot);
              switch (item["function"]) {
                case 'recoverEnergy':
                  this.costEnergy(-item.argument);
                  ret = ret.concat(this.syncEnergy());
              }
              return {
                ret: RET_OK,
                ntf: ret
              };
          }
          break;
        case ITEM_EQUIPMENT:
          if ((item.rank != null) && this.createHero().level < item.rank) {
            return {
              ret: RET_RoleLevelNotMatch
            };
          }
          ret = {
            NTF: Event_InventoryUpdateItem,
            arg: {
              syn: this.inventoryVersion,
              itm: []
            }
          };
          equip = this.equipment[item.subcategory];
          tmp = {
            sid: slot,
            sta: 0
          };
          if (equip === slot) {
            delete this.equipment[item.subcategory];
          } else {
            if (equip != null) {
              ret.arg.itm.push({
                sid: equip,
                sta: 0
              });
            }
            this.equipment[item.subcategory] = slot;
            tmp.sta = 1;
          }
          ret.arg.itm.push(tmp);
          if (ret.arg.itm.length < 1) {
            delete ret.arg.itm;
          }
          this.onEvent('Equipment');
          return {
            ret: RET_OK,
            ntf: [ret]
          };
      }
      logError({
        action: 'useItem',
        reason: 'unknow',
        catogory: item.category,
        subcategory: item.subcategory,
        id: item.id
      });
      return {
        ret: RET_Unknown
      };
    };

    Player.prototype.doAction = function(routine) {
      var cmd;
      cmd = new playerCommandStream(routine, this);
      cmd.process();
      return cmd.translate();
    };

    Player.prototype.aquireItem = function(item, count, allOrFail) {
      return this.doAction({
        id: 'AquireItem',
        item: item,
        count: count,
        allorfail: allOrFail
      });
    };

    Player.prototype.removeItemById = function(id, count, allorfail) {
      return this.doAction({
        id: 'RemoveItem',
        item: id,
        count: count,
        allorfail: allorfail
      });
    };

    Player.prototype.removeItem = function(item, count, slot) {
      return this.doAction({
        id: 'RemoveItem',
        item: item,
        count: count,
        slot: slot
      });
    };

    Player.prototype.extendInventory = function(delta) {
      return this.inventory.size(delta);
    };

    Player.prototype.transformGem = function(tarID, count) {
      var cfg, ret;
      cfg = queryTable(TABLE_ITEM, tarID);
      if (cfg == null) {
        return {
          ret: RET_Unknown
        };
      }
      ret = this.claimCost(cfg.synthesizeID, count);
      if (ret == null) {
        return {
          ret: RET_InsufficientIngredient
        };
      }
      ret = ret.concat(this.aquireItem(tarID, count));
      return {
        res: ret
      };
    };

    Player.prototype.levelUpItem = function(slot) {
      var cost, eh, exp, item, k, newItem, ret, s, upConfig, _ref7;
      item = this.getItemAt(slot);
      if (item == null) {
        return {
          ret: RET_ItemNotExist
        };
      }
      if (!((item.upgradeTarget != null) && this.createHero().level > item.rank)) {
        return {
          ret: RET_EquipCantUpgrade
        };
      }
      upConfig = queryTable(TABLE_UPGRADE, item.rank, this.abIndex);
      if (!upConfig) {
        return {
          ret: RET_EquipCantUpgrade
        };
      }
      exp = upConfig.xp;
      cost = upConfig.cost;
      if (!((exp != null) && (cost != null))) {
        return {
          ret: RET_EquipCantUpgrade
        };
      }
      if (item.xp < exp) {
        return {
          ret: RET_InsufficientEquipXp
        };
      }
      if (this.gold < cost) {
        return {
          ret: RET_NotEnoughGold
        };
      }
      _ref7 = this.equipment;
      for (k in _ref7) {
        s = _ref7[k];
        if (s === slot) {
          delete this.equipment[k];
        }
      }
      this.addGold(-cost);
      ret = this.removeItem(null, 1, slot);
      newItem = new Item(item.upgradeTarget);
      newItem.enhancement = item.enhancement;
      ret = ret.concat(this.aquireItem(newItem));
      eh = newItem.enhancement.map(function(e) {
        return {
          id: e.id,
          lv: e.level
        };
      });
      ret = ret.concat({
        NTF: Event_InventoryUpdateItem,
        arg: {
          syn: this.inventoryVersion,
          god: this.gold,
          itm: [
            {
              sid: this.queryItemSlot(newItem),
              stc: 1,
              eh: eh,
              xp: newItem.xp
            }
          ]
        }
      });
      this.log('levelUpItem', {
        slot: slot,
        id: item.id,
        level: item.rank
      });
      if (newItem.rank >= 8) {
        dbLib.broadcastEvent(BROADCAST_ITEM_LEVEL, {
          who: this.name,
          what: item.id,
          many: newItem.rank
        });
      }
      this.onEvent('Equipment');
      return {
        out: {
          cid: newItem.id,
          sid: this.queryItemSlot(newItem),
          stc: 1,
          sta: 1,
          eh: eh
        },
        res: ret
      };
    };

    Player.prototype.upgradeItemQuality = function(slot) {
      var eh, enhance, item, newItem, ret;
      item = this.getItemAt(slot);
      enhance = item.enhancement;
      ret = this.craftItem(slot);
      newItem = ret.newItem;
      if (newItem) {
        ret.newItem.enhancement = enhance;
        ret.newItem.xp = item.xp;
        eh = newItem.enhancement.map(function(e) {
          return {
            id: e.id,
            lv: e.level
          };
        });
        ret.res.push({
          NTF: Event_InventoryUpdateItem,
          arg: {
            syn: this.inventoryVersion,
            itm: [
              {
                sid: this.queryItemSlot(newItem),
                eh: eh,
                xp: newItem.xp
              }
            ]
          }
        });
      }
      return ret;
    };

    Player.prototype.craftItem = function(slot) {
      var newItem, recipe, ret;
      recipe = this.getItemAt(slot);
      if (recipe == null) {
        return {
          ret: RET_NeedReceipt
        };
      }
      ret = this.claimCost(recipe.forgeID);
      if (ret == null) {
        return {
          ret: RET_InsufficientIngredient
        };
      }
      if (recipe.forgeTarget == null) {
        return {
          ret: RET_Unknown
        };
      }
      newItem = new Item(recipe.forgeTarget);
      ret = ret.concat(this.aquireItem(newItem));
      ret = ret.concat({
        NTF: Event_InventoryUpdateItem,
        arg: {
          syn: this.inventoryVersion,
          god: this.gold
        }
      });
      this.log('craftItem', {
        slot: slot,
        id: recipe.id
      });
      if (newItem.rank >= 8) {
        dbLib.broadcastEvent(BROADCAST_CRAFT, {
          who: this.name,
          what: newItem.id
        });
      }
      return {
        out: {
          type: PRIZETYPE_ITEM,
          value: newItem.id,
          count: 1
        },
        res: ret,
        newItem: newItem
      };
    };

    Player.prototype.enhanceItem = function(itemSlot) {
      var eh, enhance, equip, level, ret;
      equip = this.getItemAt(itemSlot);
      if (!equip) {
        return {
          ret: RET_ItemNotExist
        };
      }
      if (equip.enhancement[0] == null) {
        equip.enhancement[0] = {
          id: equip.enhanceID,
          level: -1
        };
      }
      level = equip.enhancement[0].level + 1;
      if (!(level < 40 && (equip.enhanceID != null))) {
        return {
          ret: RET_EquipCantUpgrade
        };
      }
      enhance = queryTable(TABLE_ENHANCE, equip.enhanceID);
      ret = this.claimCost(enhance.costList[level]);
      if (ret == null) {
        return {
          ret: RET_Unknown
        };
      }
      equip.enhancement[0].level = level;
      this.log('enhanceItem', {
        itemId: equip.id,
        level: level,
        itemSlot: itemSlot
      });
      this.onEvent('Equipment');
      if (level >= 32) {
        dbLib.broadcastEvent(BROADCAST_ENHANCE, {
          who: this.name,
          what: equip.id,
          many: level + 1
        });
      }
      eh = equip.enhancement.map(function(e) {
        return {
          id: e.id,
          lv: e.level
        };
      });
      ret = ret.concat({
        NTF: Event_InventoryUpdateItem,
        arg: {
          syn: this.inventoryVersion,
          itm: [
            {
              sid: itemSlot,
              eh: eh
            }
          ]
        }
      });
      return {
        out: {
          cid: equip.id,
          sid: itemSlot,
          stc: 1,
          eh: eh,
          xp: equip.xp
        },
        res: ret
      };
    };

    Player.prototype.sellItem = function(slot) {
      var count, item, ret;
      if (this.isEquiped(slot)) {
        return {
          ret: RET_Unknown
        };
      }
      item = this.getItemAt(slot);
      if (item == null) {
        return {
          ret: RET_Unknown
        };
      }
      count = item.count;
      if ((item != null ? item.transPrize : void 0) || (item != null ? item.sellprice : void 0)) {
        ret = this.removeItem(null, null, slot);
        if (item != null ? item.transPrize : void 0) {
          ret = ret.concat(this.claimPrize(item.transPrize));
        } else if (item != null ? item.sellprice : void 0) {
          this.addGold(item.sellprice * count);
        }
        this.log('sellItem', {
          itemId: item.id,
          price: item.sellprice,
          count: count,
          slot: slot
        });
        return {
          ret: RET_OK,
          ntf: [
            {
              NTF: Event_InventoryUpdateItem,
              arg: {
                syn: this.inventoryVersion,
                'god': this.gold
              }
            }
          ].concat(ret)
        };
      } else {
        return {
          ret: RET_Unknown
        };
      }
    };

    Player.prototype.haveItem = function(itemID) {
      var itemConfig, matchedItems;
      itemConfig = queryTable(TABLE_ITEM, itemID, this.abIndex);
      if (itemConfig == null) {
        return false;
      }
      matchedItems = this.inventory.filter(function(item) {
        return (item != null) && item.id === itemID;
      });
      if (matchedItems.length > 0) {
        return true;
      } else if (itemConfig.upgradeTarget) {
        return this.haveItem(itemConfig.upgradeTarget);
      } else {
        return false;
      }
    };

    Player.prototype.generateDungeonAward = function(dungeon) {
      var cfg, dropInfo, gr, iPrize, infiniteLevel, p, percentage, prize, result, wr, xr, _i, _len, _ref10, _ref7, _ref8, _ref9;
      result = dungeon.result;
      cfg = dungeon.getConfig();
      if (result === DUNGEON_RESULT_DONE || (cfg == null)) {
        return helperLib.splicePrize([]);
      }
      dropInfo = dungeon.killingInfo.reduce((function(r, e) {
        if (e && e.dropInfo) {
          return r.concat(e.dropInfo);
        }
        return r;
      }), []);
      percentage = 1;
      if (result === DUNGEON_RESULT_WIN) {
        if (dungeon.isSweep != null) {
          if (cfg.dropID) {
            dropInfo = dropInfo.concat(cfg.dropID);
          }
        }
      } else {
        percentage = (dungeon.currentLevel / cfg.levelCount) * 0.5;
      }
      gr = ((_ref7 = cfg.goldRate) != null ? _ref7 : 1) * percentage;
      xr = ((_ref8 = cfg.xpRate) != null ? _ref8 : 1) * percentage;
      wr = ((_ref9 = cfg.wxpRate) != null ? _ref9 : 1) * percentage;
      prize = generatePrize(queryTable(TABLE_DROP), dropInfo);
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
      }
      if (cfg.prizeWxp) {
        prize.push({
          type: PRIZETYPE_WXP,
          count: Math.floor(wr * cfg.prizeWxp)
        });
      }
      infiniteLevel = dungeon.infiniteLevel;
      if ((infiniteLevel != null) && cfg.infinityPrize && result === DUNGEON_RESULT_WIN) {
        _ref10 = cfg.infinityPrize;
        for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
          p = _ref10[_i];
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
      return helperLib.splicePrize(prize);
    };

    Player.prototype.updateQuest = function(quests) {
      var k, objective, qid, qst, quest, _results;
      _results = [];
      for (qid in quests) {
        qst = quests[qid];
        if (!(((qst != null ? qst.counters : void 0) != null) && this.quests[qid])) {
          continue;
        }
        quest = queryTable(TABLE_QUEST, qid, this.abIndex);
        _results.push((function() {
          var _ref7, _results1;
          _ref7 = quest.objects;
          _results1 = [];
          for (k in _ref7) {
            objective = _ref7[k];
            if (objective.type === QUEST_TYPE_NPC && (qst.counters[k] != null) && (this.quests[qid].counters != null)) {
              _results1.push(this.quests[qid].counters[k] = qst.counters[k]);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Player.prototype.claimDungeonAward = function(dungeon, isSweep) {
      var goldPrize, otherPrize, prize, quests, result, ret, rewardMessage, wxPrize, xpPrize, _ref7;
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
      _ref7 = this.generateDungeonAward(dungeon), goldPrize = _ref7.goldPrize, xpPrize = _ref7.xpPrize, wxPrize = _ref7.wxPrize, otherPrize = _ref7.otherPrize;
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
      otherPrize.push(goldPrize);
      otherPrize.push(xpPrize);
      otherPrize.push(wxPrize);
      prize = otherPrize.filter(function(e) {
        return !((e.count != null) && e.count === 0);
      });
      if (prize.length > 0) {
        rewardMessage.arg.prize = prize.filter(function(f) {
          return f.type !== PRIZETYPE_FUNCTION;
        });
      }
      ret = ret.concat(this.claimPrize(prize, false));
      this.updatePkInof(dungeon);
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

    Player.prototype.updatePkInof = function(dungeon) {
      var myName, rivalName;
      if (dungeon.PVP_Pool != null) {
        myName = this.name;
        rivalName = dungeon.PVP_Pool[0].nam;
        if (dungeon.result === DUNGEON_RESULT_WIN) {
          return dbLib.saveSocre(myName, rivalName, function(err, result) {});
        }
      }
    };

    Player.prototype.whisper = function(name, message, callback) {
      var myName;
      myName = this.name;
      return dbLib.deliverMessage(name, {
        type: Event_ChatInfo,
        src: myName,
        mType: MESSAGETYPE_WHISPER,
        text: message,
        timeStamp: (new Date()).valueOf(),
        vip: this.vipLevel(),
        "class": this.hero["class"],
        power: this.battleForce
      }, (function(_this) {
        return function(err, result) {
          _this.log('whisper', {
            to: name,
            err: err,
            text: message
          });
          if (callback) {
            return callback(err, result);
          }
        };
      })(this));
    };

    Player.prototype.inviteFriend = function(name, id, callback) {
      var msg;
      msg = {
        type: MESSAGE_TYPE_FriendApplication,
        name: this.name
      };
      return async.series([
        function(cb) {
          if (id != null) {
            return dbLib.getPlayerNameByID(id, function(err, theName) {
              if (theName) {
                name = theName;
              }
              return cb(err);
            });
          } else {
            return cb(null);
          }
        }, (function(_this) {
          return function(cb) {
            if (name === _this.name) {
              return cb(new Error(RET_CantInvite));
            } else {
              return cb(null);
            }
          };
        })(this), (function(_this) {
          return function(cb) {
            if ((_this.contactBook != null) && _this.contactBook.book.indexOf(name) !== -1) {
              return cb(new Error(RET_OK));
            } else {
              return cb(null);
            }
          };
        })(this), function(cb) {
          return dbLib.playerExistenceCheck(name, cb);
        }, function(cb) {
          return dbLib.deliverMessage(name, msg, cb);
        }
      ], function(err, result) {
        if (err == null) {
          err = new Error(RET_OK);
        }
        if (callback) {
          return callback(err);
        }
      });
    };

    Player.prototype.removeFriend = function(name) {
      this.log('removeFriend', {
        tar: name
      });
      dbLib.removeFriend(this.name, name);
      return RET_OK;
    };

    Player.prototype.vipOperation = function(op) {
      var cfg, level, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref7, _ref8, _ref9;
      _ref7 = getVip(this.rmb), level = _ref7.level, cfg = _ref7.cfg;
      switch (op) {
        case 'vipLevel':
          return level;
        case 'chest_vip':
          return (_ref8 = cfg != null ? (_ref9 = cfg.privilege) != null ? _ref9.chest_vip : void 0 : void 0) != null ? _ref8 : 0;
        case 'ContinuousRaids':
          return (_ref10 = cfg != null ? (_ref11 = cfg.privilege) != null ? _ref11.ContinuousRaids : void 0 : void 0) != null ? _ref10 : false;
        case 'pkCount':
          return (_ref12 = cfg != null ? (_ref13 = cfg.privilege) != null ? _ref13.pkCount : void 0 : void 0) != null ? _ref12 : 5;
        case 'tuHaoCount':
          return (_ref14 = cfg != null ? (_ref15 = cfg.privilege) != null ? _ref15.tuHaoCount : void 0 : void 0) != null ? _ref14 : 3;
        case 'EquipmentRobbers':
          return (_ref16 = cfg != null ? (_ref17 = cfg.privilege) != null ? _ref17.EquipmentRobbers : void 0 : void 0) != null ? _ref16 : 3;
        case 'EvilChieftains':
          return (_ref18 = cfg != null ? (_ref19 = cfg.privilege) != null ? _ref19.EvilChieftains : void 0 : void 0) != null ? _ref18 : 3;
        case 'blueStarCost':
          return (_ref20 = cfg != null ? cfg.blueStarCost : void 0) != null ? _ref20 : 0;
        case 'goldAdjust':
          return (_ref21 = cfg != null ? cfg.goldAdjust : void 0) != null ? _ref21 : 0;
        case 'expAdjust':
          return (_ref22 = cfg != null ? cfg.expAdjust : void 0) != null ? _ref22 : 0;
        case 'wxpAdjust':
          return (_ref23 = cfg != null ? cfg.wxpAdjust : void 0) != null ? _ref23 : 0;
        case 'energyLimit':
          return ((_ref24 = cfg != null ? cfg.energyLimit : void 0) != null ? _ref24 : 0) + ENERGY_MAX;
      }
    };

    Player.prototype.vipLevel = function() {
      return this.vipOperation('vipLevel');
    };

    Player.prototype.getBlueStarCost = function() {
      return this.vipOperation('blueStarCost');
    };

    Player.prototype.goldAdjust = function() {
      return this.vipOperation('goldAdjust');
    };

    Player.prototype.expAdjust = function() {
      return this.vipOperation('expAdjust');
    };

    Player.prototype.wxpAdjust = function() {
      return this.vipOperation('wxpAdjust');
    };

    Player.prototype.energyLimit = function() {
      return this.vipOperation('energyLimit');
    };

    Player.prototype.getPrivilege = function(name) {
      return this.vipOperation(name);
    };

    Player.prototype.hireFriend = function(name, handler) {
      var myIndex;
      if (handler == null) {
        return false;
      }
      if (this.contactBook.book.indexOf(name) === -1) {
        return handler(RET_Unknown);
      }
      myIndex = this.mercenary.reduce(function(r, e, index) {
        if (e.name === name) {
          return index;
        }
        return r;
      }, -1);
      this.log('hireFriend', {
        tar: name
      });
      if (myIndex !== -1) {
        return dbLib.incrBluestarBy(name, this.getBlueStarCost(), wrapCallback(this, function(err, left) {
          this.mercenary.splice(myIndex, 1);
          return this.requireMercenary(handler);
        }));
      } else {
        return dbLib.incrBluestarBy(name, -this.getBlueStarCost(), wrapCallback(this, function(err, left) {
          return getPlayerHero(name, wrapCallback(this, function(err, heroData) {
            var hero;
            hero = new Hero(heroData);
            hero.isFriend = true;
            hero.leftBlueStar = left;
            this.mercenary.splice(0, 0, hero);
            return this.requireMercenary(handler);
          }));
        }));
      }
    };

    Player.prototype.getCampaignState = function(campaignName) {
      if (!this.campaignState) {
        return null;
      }
      if (this.campaignState[campaignName] == null) {
        if (campaignName === 'Charge' || campaignName === 'DuanwuCharge') {
          this.campaignState[campaignName] = {};
        } else {
          this.campaignState[campaignName] = 0;
        }
      }
      return this.campaignState[campaignName];
    };

    Player.prototype.setCampaignState = function(campaignName, val) {
      return this.campaignState[campaignName] = val;
    };

    Player.prototype.getCampaignConfig = function(campaignName) {
      var cfg;
      cfg = queryTable(TABLE_CAMPAIGN, campaignName, this.abIndex);
      if (cfg != null) {
        if ((cfg.date != null) && moment(cfg.date).format('YYYYMMDD') - moment().format('YYYYMMDD') < 0) {
          return {
            config: null
          };
        }
        if ((this.getCampaignState(campaignName) != null) && this.getCampaignState(campaignName) === false) {
          return {
            config: null
          };
        }
        if ((this.getCampaignState(campaignName) != null) && (cfg.level != null) && this.getCampaignState(campaignName) >= cfg.level.length) {
          return {
            config: null
          };
        }
        if (campaignName === 'LevelUp' && cfg.timeLimit * 1000 <= moment() - this.creationDate) {
          return {
            config: null
          };
        }
      } else {
        return {
          config: null
        };
      }
      if (cfg.level) {
        return {
          config: cfg,
          level: cfg.level[this.getCampaignState(campaignName)]
        };
      } else {
        return {
          config: cfg,
          level: cfg.objective
        };
      }
    };

    Player.prototype.onCampaign = function(state, data) {
      var config, level, o, r, reward, rmb, _i, _len, _ref10, _ref11, _ref12, _ref13, _ref14, _ref7, _ref8, _ref9, _results;
      reward = [];
      switch (state) {
        case 'Friend':
          _ref7 = this.getCampaignConfig('Friend'), config = _ref7.config, level = _ref7.level;
          if ((config != null) && (level != null) && this.contactBook.book.length >= level.count) {
            reward.push({
              cfg: config,
              lv: level
            });
            this.setCampaignState('Friend', 1);
          }
          break;
        case 'RMB':
          _ref8 = this.getCampaignConfig('Charge'), config = _ref8.config, level = _ref8.level;
          if ((config != null) && (level != null)) {
            rmb = data;
            state = this.getCampaignState('Charge');
            o = level[rmb];
            if (!state[rmb] && (o != null)) {
              reward.push({
                cfg: config,
                lv: o
              });
              state[rmb] = true;
              this.setCampaignState('Charge', state);
            }
          }
          _ref9 = this.getCampaignConfig('DuanwuCharge'), config = _ref9.config, level = _ref9.level;
          if ((config != null) && (level != null)) {
            rmb = data;
            state = this.getCampaignState('DuanwuCharge');
            o = level[rmb];
            if (!state[rmb] && (o != null)) {
              reward.push({
                cfg: config,
                lv: o
              });
              state[rmb] = true;
              this.setCampaignState('DuanwuCharge', state);
            }
          }
          _ref10 = this.getCampaignConfig('TotalCharge'), config = _ref10.config, level = _ref10.level;
          if ((config != null) && (level != null) && this.rmb >= level.count) {
            if (this.getCampaignState('TotalCharge') != null) {
              this.setCampaignState('TotalCharge', this.getCampaignState('TotalCharge') + 1);
            } else {
              this.setCampaignState('TotalCharge', 0);
            }
            reward.push({
              cfg: config,
              lv: level
            });
          }
          _ref11 = this.getCampaignConfig('FirstCharge'), config = _ref11.config, level = _ref11.level;
          if ((config != null) && (level != null)) {
            rmb = String(data);
            if (level[rmb] != null) {
              reward.push({
                cfg: config,
                lv: level[rmb]
              });
              this.setCampaignState('FirstCharge', false);
            }
          }
          break;
        case 'Level':
          _ref12 = this.getCampaignConfig('LevelUp'), config = _ref12.config, level = _ref12.level;
          if ((config != null) && (level != null) && this.createHero().level >= level.count) {
            if (this.getCampaignState('LevelUp') != null) {
              this.setCampaignState('LevelUp', this.getCampaignState('LevelUp') + 1);
            } else {
              this.setCampaignState('LevelUp', 1);
            }
            reward.push({
              cfg: config,
              lv: level
            });
          }
          break;
        case 'Stage':
          _ref13 = this.getCampaignConfig('Stage'), config = _ref13.config, level = _ref13.level;
          if ((config != null) && (level != null) && data === level.count) {
            this.setCampaignState('Stage', this.getCampaignState('Stage') + 1);
            reward.push({
              cfg: config,
              lv: level
            });
          }
          break;
        case 'BattleForce':
          _ref14 = this.getCampaignConfig('BattleForce'), config = _ref14.config, level = _ref14.level;
          if ((config != null) && (level != null) && this.createHero().calculatePower() >= level.count) {
            this.setCampaignState('BattleForce', this.getCampaignState('BattleForce') + 1);
            reward.push({
              cfg: config,
              lv: level
            });
          }
      }
      _results = [];
      for (_i = 0, _len = reward.length; _i < _len; _i++) {
        r = reward[_i];
        _results.push(dbLib.deliverMessage(this.name, {
          type: MESSAGE_TYPE_SystemReward,
          src: MESSAGE_REWARD_TYPE_SYSTEM,
          prize: r.lv.award,
          tit: r.cfg.mailTitle,
          txt: r.cfg.mailBody
        }));
      }
      return _results;
    };

    Player.prototype.updateFriendInfo = function(handler) {
      return dbLib.getFriendList(this.name, wrapCallback(this, function(err, book) {
        this.contactBook = book;
        this.onCampaign('Friend');
        return async.map(this.contactBook.book, function(contactor, cb) {
          return getPlayerHero(contactor, cb);
        }, function(err, result) {
          var ret;
          ret = {
            NTF: Event_FriendInfo,
            arg: {
              fri: result.map(getBasicInfo),
              cap: book.limit,
              clr: true
            }
          };
          return handler(err, ret);
        });
      }));
    };

    Player.prototype.operateMessage = function(type, id, operation, callback) {
      var me;
      me = this;
      return async.series([
        (function(_this) {
          return function(cb) {
            if ((_this.messages != null) && _this.messages.length > 0) {
              return cb(null);
            } else {
              return _this.fetchMessage(cb);
            }
          };
        })(this), (function(_this) {
          return function(cb) {
            var err, message;
            message = me.messages;
            _this.messages = [];
            if (id != null) {
              message = message.filter(function(m) {
                return (m != null) && m.messageID === id;
              });
              _this.messages = message.filter(function(m) {
                return m.messageID !== id;
              });
            }
            if (type != null) {
              message = message.filter(function(m) {
                return (m != null) && m.type === type;
              });
              _this.messages = message.filter(function(m) {
                return m.type !== type;
              });
            }
            err = null;
            return cb(err, message);
          };
        })(this)
      ], (function(_this) {
        return function(err, results) {
          var friendFlag;
          friendFlag = false;
          return async.map(results[1], function(message, cb) {
            var ret;
            switch (message.type) {
              case MESSAGE_TYPE_FriendApplication:
                if (operation === NTFOP_ACCEPT) {
                  dbLib.makeFriends(me.name, message.name, function(err) {
                    return cb(err, []);
                  });
                } else {
                  cb(null, []);
                }
                friendFlag = true;
                _this.log('operateMessage', {
                  type: 'friend',
                  op: operation
                });
                return dbLib.removeMessage(_this.name, message.messageID);
              case MESSAGE_TYPE_SystemReward:
                ret = _this.claimPrize(message.prize);
                _this.log('operateMessage', {
                  type: 'reward',
                  src: message.src,
                  prize: message.prize,
                  ret: ret
                });
                if (ret) {
                  cb(null, ret);
                  return dbLib.removeMessage(_this.name, message.messageID);
                } else {
                  return cb(RET_InventoryFull, ret);
                }
            }
          }, function(err, result) {
            if (friendFlag) {
              return _this.updateFriendInfo(callback);
            }
            if (callback) {
              return callback(err, result.reduce((function(r, l) {
                if (l) {
                  return r.concat(l);
                } else {
                  return r;
                }
              }), []));
            }
          });
        };
      })(this));
    };

    Player.prototype.fetchMessage = function(callback, allMessage) {
      var me, myName;
      if (allMessage == null) {
        allMessage = false;
      }
      myName = this.name;
      me = this;
      return dbLib.fetchMessage(myName, wrapCallback(this, function(err, messages) {
        var newMessage;
        if (this.messages == null) {
          this.messages = [];
        }
        if (allMessage) {
          newMessage = messages;
        } else {
          newMessage = playerMessageFilter(this.messages, messages, myName);
        }
        this.messages = this.messages.concat(newMessage);
        newMessage = newMessage.filter(function(m) {
          return m != null;
        });
        return async.map(newMessage, function(msg, cb) {
          var ret;
          if (msg.type === MESSAGE_TYPE_SystemReward) {
            ret = {
              NTF: Event_SystemReward,
              arg: {
                sid: msg.messageID,
                typ: msg.src,
                prz: msg.prize
              }
            };
            if (msg.tit) {
              ret.arg.tit = msg.tit;
            }
            if (msg.txt) {
              ret.arg.txt = msg.txt;
            }
            return cb(null, ret);
          } else if (msg.type === Event_ChatInfo) {
            dbLib.removeMessage(myName, msg.messageID);
            return cb(null, {
              NTF: Event_ChatInfo,
              arg: {
                typ: msg.mType,
                src: msg.src,
                txt: msg.text,
                tms: Math.floor(msg.timeStamp / 1000),
                vip: msg.vip,
                cla: msg["class"],
                pow: msg.power
              }
            });
          } else if (msg.type === MESSAGE_TYPE_FriendApplication) {
            return getPlayerHero(msg.name, wrapCallback(function(err, hero) {
              return cb(err, {
                NTF: Event_FriendApplication,
                arg: {
                  sid: msg.messageID,
                  act: getBasicInfo(hero)
                }
              });
            }));
          } else if (msg.type === MESSAGE_TYPE_ChargeDiamond) {
            dbLib.removeMessage(me.name, msg.messageID);
            return me.handlePayment(msg, cb);
          } else {
            return cb(err, msg);
          }
        }, function(err, msg) {
          var m, ret, _i, _len;
          ret = [];
          for (_i = 0, _len = msg.length; _i < _len; _i++) {
            m = msg[_i];
            if (Array.isArray(m)) {
              ret = ret.concat(m);
            } else {
              ret.push(m);
            }
          }
          if (callback != null) {
            return callback(err, ret);
          }
        });
      }));
    };

    Player.prototype.completeStage = function(stage) {
      var ret, thisStage;
      thisStage = queryTable(TABLE_STAGE, stage, this.abIndex);
      if (this.stage[stage] === null || thisStage === null) {
        return [];
      }
      ret = this.changeStage(stage, STAGE_STATE_PASSED);
      this.onCampaign('Stage');
      return ret.concat(this.updateStageStatus());
    };

    Player.prototype.requireMercenary = function(callback) {
      var filtedName, me;
      me = this;
      if (!callback) {
        return;
      }
      if (this.mercenary.length >= MERCENARYLISTLEN) {
        return callback(this.mercenary.map(function(h) {
          return new Hero(h);
        }));
      } else {
        filtedName = [this.name];
        filtedName = filtedName.concat(this.mercenary.map(function(m) {
          return m.name;
        }));
        if (this.contactBook != null) {
          filtedName = filtedName.concat(this.contactBook.book);
        }
        return getMercenaryMember(this.name, 2, 30, 1, filtedName, function(err, heroData) {
          if (heroData) {
            me.mercenary = me.mercenary.concat(heroData);
            return me.requireMercenary(callback);
          } else {
            return callback(null);
          }
        });
      }
    };

    Player.prototype.recycleItem = function(slot) {
      var equip, err, item, k, recyclableEnhance, recycleConfig, ret, reward, rewardEvt, xp, _ref7;
      recyclableEnhance = queryTable(TABLE_CONFIG, 'Global_Recyclable_Enhancement', this.abIndex);
      recycleConfig = queryTable(TABLE_CONFIG, 'Global_Recycle_Config', this.abIndex);
      item = this.getItemAt(slot);
      _ref7 = this.equipment;
      for (k in _ref7) {
        equip = _ref7[k];
        if (!(equip === slot)) {
          continue;
        }
        delete this.equipment[k];
        break;
      }
      ret = [];
      try {
        if (item === null) {
          throw RET_ItemNotExist;
        }
        xp = helperLib.calculateTotalItemXP(item) * 0.8;
        ret = ret.concat(this.removeItem(null, null, slot));
        reward = item.enhancement.map(function(e) {
          var cfg;
          if (recyclableEnhance.indexOf(e.id) !== -1) {
            cfg = recycleConfig[e.level];
            return {
              type: PRIZETYPE_ITEM,
              value: queryTable(TABLE_CONFIG, 'Global_Enhancement_GEM_Index', this.abIndex)[e.id],
              count: cfg.minimum + rand() % cfg.delta
            };
          } else {
            return null;
          }
        });
        if (queryTable(TABLE_CONFIG, 'Global_Material_ID').length > item.quality) {
          reward.push({
            type: PRIZETYPE_ITEM,
            value: queryTable(TABLE_CONFIG, 'Global_Material_ID')[item.quality],
            count: 2 + rand() % 2
          });
        }
        reward = reward.filter(function(e) {
          return e != null;
        });
        rewardEvt = this.claimPrize(reward);
        ret = ret.concat(rewardEvt);
      } catch (_error) {
        err = _error;
        logError(err);
      }
      return {
        out: reward,
        res: ret
      };
    };

    Player.prototype.injectWXP = function(slot, bookSlot) {
      var book, equip, ev, ret, retRM;
      equip = this.getItemAt(slot);
      book = this.getItemAt(bookSlot);
      if (!(equip && book)) {
        return {
          ret: RET_ItemNotExist
        };
      }
      retRM = this.inventory.removeItemAt(bookSlot, 1, true);
      if (retRM) {
        equip.xp += book.wxp;
        ret = this.doAction({
          id: 'ItemChange',
          ret: retRM,
          version: this.inventoryVersion
        });
        ev = {
          NTF: Event_InventoryUpdateItem,
          arg: {
            itm: [
              {
                cid: equip.id,
                sid: this.queryItemSlot(equip),
                stc: 1,
                xp: equip.xp
              }
            ]
          }
        };
        ret.push(ev);
        return {
          res: ret
        };
      } else {
        return {
          ret: RET_NoEnhanceStone
        };
      }
    };

    Player.prototype.replaceMercenary = function(id, handler) {
      var filtedName, me, myName, _ref7;
      me = this;
      myName = this.name;
      filtedName = [this.name];
      filtedName = filtedName.concat(this.mercenary.map(function(m) {
        return m.name;
      }));
      if (((_ref7 = this.contactBook) != null ? _ref7.book : void 0) != null) {
        filtedName = filtedName.concat(this.contactBook.book);
      }
      return getMercenaryMember(myName, 1, 30, 1, filtedName, function(err, heroData) {
        if (heroData) {
          me.mercenary.splice(id, 1, heroData[0]);
        } else {
          heroData = me.mercenary[id];
        }
        return handler(heroData[0]);
      });
    };

    Player.prototype.updateMercenaryInfo = function(isLogin) {
      var newBattleForce;
      newBattleForce = this.createHero().calculatePower();
      if (newBattleForce !== this.battleForce) {
        updateMercenaryMember(this.battleForce, newBattleForce, this.name);
        this.battleForce = newBattleForce;
      }
      if (isLogin) {
        return addMercenaryMember(this.battleForce, this.name);
      }
    };

    Player.prototype.syncFriend = function(forceUpdate) {};

    Player.prototype.syncBag = function(forceUpdate) {
      var bag, ev, items;
      bag = this.inventory;
      items = bag.container.map(wrapCallback(this, (function(_this) {
        return function(e, index) {
          var equip, i, ret, _ref7;
          if (!((e != null) && (bag.queryItemSlot(e) != null))) {
            return null;
          }
          ret = {
            sid: bag.queryItemSlot(e),
            cid: e.id,
            stc: e.count
          };
          if (e.xp != null) {
            ret.xp = e.xp;
          }
          _ref7 = _this.equipment;
          for (i in _ref7) {
            equip = _ref7[i];
            if (equip === index) {
              ret.sta = 1;
            }
          }
          if (e.enhancement) {
            ret.eh = e.enhancement.map(function(e) {
              return {
                id: e.id,
                lv: e.level
              };
            });
          }
          if (e.date) {
            ret.ts = e.date;
          }
          return ret;
        };
      })(this))).filter(function(e) {
        return e !== null;
      });
      ev = {
        NTF: Event_InventoryUpdateItem,
        arg: {
          cap: bag.limit,
          dim: this.diamond,
          god: this.gold,
          syn: this.inventoryVersion,
          itm: items
        }
      };
      if (forceUpdate) {
        ev.arg.clr = true;
      }
      return ev;
    };

    Player.prototype.syncStage = function(forceUpdate) {
      var cfg, chapter, ev, k, stg, v, _ref7;
      stg = [];
      _ref7 = this.stage;
      for (k in _ref7) {
        v = _ref7[k];
        if (this.stage[k]) {
          cfg = queryTable(TABLE_STAGE, k, this.abIndex);
          if (cfg == null) {
            delete this.stage[k];
            continue;
          }
          chapter = cfg.chapter;
          if (this.stage[k].level != null) {
            stg.push({
              stg: k,
              sta: this.stage[k].state,
              chp: chapter,
              lvl: this.stage[k].level
            });
          } else {
            stg.push({
              stg: k,
              sta: this.stage[k].state,
              chp: chapter
            });
          }
        }
      }
      ev = {
        NTF: Event_UpdateStageInfo,
        arg: {
          syn: this.stageVersion,
          stg: stg
        }
      };
      if (forceUpdate) {
        ev.arg.clr = true;
      }
      return ev;
    };

    Player.prototype.syncEnergy = function(forceUpdate) {
      this.costEnergy();
      return {
        NTF: Event_UpdateEnergy,
        arg: {
          eng: this.energy,
          tim: Math.floor(this.energyTime.valueOf() / 1000)
        }
      };
    };

    Player.prototype.syncHero = function(forceUpdate) {
      var ev;
      ev = {
        NTF: Event_RoleUpdate,
        arg: {
          syn: this.heroVersion,
          act: getBasicInfo(this.createHero())
        }
      };
      if (forceUpdate) {
        ev.arg.clr = true;
      }
      return ev;
    };

    Player.prototype.syncDungeon = function(forceUpdate) {
      var dungeon, ev;
      dungeon = this.dungeon;
      if (dungeon === null) {
        return [];
      }
      ev = {
        NTF: Event_UpdateDungeon,
        arg: {
          pat: this.team,
          stg: dungeon.stage
        }
      };
      if (forceUpdate) {
        ev.arg.clr = true;
      }
      return ev;
    };

    Player.prototype.syncCampaign = function(forceUpdate) {
      var all, campaign, cfg, config, level, r, ret, _ref7;
      all = queryTable(TABLE_CAMPAIGN);
      ret = {
        NTF: Event_CampaignUpdate,
        arg: {
          act: [],
          syn: 0
        }
      };
      for (campaign in all) {
        cfg = all[campaign];
        if (!cfg.show) {
          continue;
        }
        _ref7 = this.getCampaignConfig(campaign), config = _ref7.config, level = _ref7.level;
        if (config == null) {
          continue;
        }
        r = {
          title: config.title,
          desc: config.description,
          banner: config.banner
        };
        if (config.dateDescription != null) {
          r.date = config.dateDescription;
        }
        if (level.award) {
          r.prz = level.award;
        }
        ret.arg.act.push(r);
      }
      return [ret];
    };

    Player.prototype.syncFlags = function(forceUpdate) {
      var arg, key, val, _ref7;
      arg = {
        clr: true
      };
      _ref7 = this.flags;
      for (key in _ref7) {
        val = _ref7[key];
        arg[key] = val;
      }
      return {
        NTF: Event_UpdateFlags,
        arg: arg
      };
    };

    Player.prototype.syncCounters = function(forceUpdate) {
      return [];
    };

    Player.prototype.syncQuest = function(forceUpdate) {
      var ret;
      ret = packQuestEvent(this.quests, null, this.questVersion);
      if (forceUpdate) {
        ret.arg.clr = true;
      }
      return ret;
    };

    Player.prototype.notifyVersions = function() {
      var translateTable, versions;
      translateTable = {
        inventoryVersion: 'inv',
        heroVersion: 'act',
        stageVersion: 'stg',
        questVersion: 'qst'
      };
      versions = grabAndTranslate(this, translateTable);
      return {
        NTF: Event_SyncVersions,
        arg: versions
      };
    };

    return Player;

  })(DBWrapper);

  playerMessageFilter = function(oldMessage, newMessage, name) {
    var friendMap, message, messageIDMap;
    message = newMessage;
    messageIDMap = {};
    friendMap = {};
    if (oldMessage) {
      oldMessage.forEach(function(msg, index) {
        if (msg == null) {
          return false;
        }
        messageIDMap[msg.messageID] = true;
        if (msg.type === MESSAGE_TYPE_FriendApplication) {
          return friendMap[msg.name] = msg;
        }
      });
      message = message.filter(function(msg) {
        if (msg == null) {
          return false;
        }
        if (messageIDMap[msg.messageID]) {
          return false;
        }
        if (msg.type === MESSAGE_TYPE_FriendApplication) {
          if (friendMap[msg.name]) {
            if (name) {
              dbLib.removeMessage(name, msg.messageID);
            }
            return false;
          }
          friendMap[msg.name] = msg;
        }
        return true;
      });
    }
    return message;
  };

  createItem = function(item) {
    var e;
    if (Array.isArray(item)) {
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = item.length; _i < _len; _i++) {
          e = item[_i];
          _results.push({
            item: createItem(e.item),
            count: e.count
          });
        }
        return _results;
      })();
    } else if (typeof item === 'number') {
      return new itemLib.Item(item);
    } else {
      return item;
    }
  };

  itemLib = require('./item');

  PlayerEnvironment = (function(_super) {
    __extends(PlayerEnvironment, _super);

    function PlayerEnvironment(player) {
      this.player = player;
    }

    PlayerEnvironment.prototype.removeItem = function(item, count, slot, allorfail) {
      var k, result, s, _ref7, _ref8;
      result = {
        ret: (_ref7 = this.player) != null ? _ref7.inventory.remove(item, count, slot, allorfail) : void 0,
        version: this.player.inventoryVersion
      };
      if (result.ret !== []) {
        _ref8 = this.player.equipment;
        for (k in _ref8) {
          s = _ref8[k];
          if (s === slot) {
            delete this.player.equipment[k];
          }
        }
      }
      return result;
    };

    PlayerEnvironment.prototype.translateAction = function(cmd) {
      var i, out, ret, routine, _ref7;
      if (cmd == null) {
        return [];
      }
      ret = [];
      out = cmd.output();
      if (out) {
        ret = out;
      }
      _ref7 = cmd.cmdRoutine;
      for (i in _ref7) {
        routine = _ref7[i];
        out = routine != null ? routine.output() : void 0;
        if (out != null) {
          ret = ret.concat(out);
        }
      }
      return ret.concat(this.translateAction(cmd.nextCMD));
    };

    PlayerEnvironment.prototype.translate = function(cmd) {
      return this.translateAction(cmd);
    };

    return PlayerEnvironment;

  })(Environment);

  playerCommandStream = function(cmd, player) {
    var cmdStream, env;
    if (player == null) {
      player = null;
    }
    env = new PlayerEnvironment(player);
    cmdStream = new CommandStream(cmd, null, playerCSConfig, env);
    return cmdStream;
  };

  playerCSConfig = {
    ItemChange: {
      output: function(env) {
        var arg, items, ret;
        ret = env.variable('ret');
        if (!(ret && ret.length > 0)) {
          return [];
        }
        items = ret.map(function(e) {
          var evt, item;
          item = env.player.getItemAt(e.slot);
          evt = {
            sid: Number(e.slot),
            cid: e.id,
            stc: e.count
          };
          if (item != null ? item.date : void 0) {
            evt.ts = item.date;
          }
          return evt;
        });
        arg = {
          syn: env.variable('version')
        };
        arg.itm = items;
        return [
          {
            NTF: Event_InventoryUpdateItem,
            arg: arg
          }
        ];
      }
    },
    UseItem: {
      output: function(env) {
        return env.player.useItem(env.variable('slot')).ntf;
      }
    },
    AquireItem: {
      callback: function(env) {
        var count, e, item, ret, _i, _len, _ref7, _results;
        count = (_ref7 = env.variable('count')) != null ? _ref7 : 1;
        item = createItem(env.variable('item'));
        if (item == null) {
          return showMeTheStack();
        }
        if (item.expiration) {
          item.date = helperLib.currentTime(true).valueOf();
          item.attrSave('date');
        }
        ret = env.player.inventory.add(item, count, true);
        this.routine({
          id: 'ItemChange',
          ret: ret,
          version: env.player.inventoryVersion
        });
        if (ret) {
          _results = [];
          for (_i = 0, _len = ret.length; _i < _len; _i++) {
            e = ret[_i];
            if (env.player.getItemAt(e.slot).autoUse) {
              _results.push(this.next({
                id: 'UseItem',
                slot: e.slot
              }));
            }
          }
          return _results;
        }
      }
    },
    RemoveItem: {
      callback: function(env) {
        var ret, version, _ref7;
        _ref7 = env.removeItem(env.variable('item'), env.variable('count'), env.variable('slot'), true), ret = _ref7.ret, version = _ref7.version;
        return this.routine({
          id: 'ItemChange',
          ret: ret,
          version: version
        });
      }
    }
  };

  getVip = function(rmb) {
    var i, level, levelCfg, lv, tbl, _ref7;
    tbl = queryTable(TABLE_VIP, "VIP", this.abIndex);
    if (tbl == null) {
      return {
        level: 0,
        cfg: {}
      };
    }
    level = -1;
    _ref7 = tbl.requirement;
    for (i in _ref7) {
      lv = _ref7[i];
      if (lv.rmb <= rmb) {
        level = i;
      }
    }
    levelCfg = tbl.levels[level];
    levelCfg.privilege = tbl.requirement[level].privilege;
    return {
      level: level,
      cfg: tbl.levels[level]
    };
  };

  registerConstructor(Player);

  exports.Player = Player;

  exports.playerMessageFilter = playerMessageFilter;

  exports.getVip = getVip;

}).call(this);
