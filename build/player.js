(function() {
  var Bag, Card, CardStack, CommandStream, DBWrapper, Dungeon, DungeonCommandStream, DungeonEnvironment, Environment, Hero, Item, Player, PlayerEnvironment, Serializer, addMercenaryMember, async, createItem, createUnit, currentTime, dbLib, diffDate, getMercenaryMember, getPlayerHero, getVip, helperLib, itemLib, moment, playerCSConfig, playerCommandStream, playerMessageFilter, registerConstructor, updateMercenaryMember, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./shop');

  moment = require('moment');

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  _ref1 = require('./dbWrapper'), DBWrapper = _ref1.DBWrapper, getMercenaryMember = _ref1.getMercenaryMember, updateMercenaryMember = _ref1.updateMercenaryMember, addMercenaryMember = _ref1.addMercenaryMember, getPlayerHero = _ref1.getPlayerHero;

  _ref2 = require('./unit'), createUnit = _ref2.createUnit, Hero = _ref2.Hero;

  _ref3 = require('./item'), Item = _ref3.Item, Card = _ref3.Card;

  _ref4 = require('./commandStream'), CommandStream = _ref4.CommandStream, Environment = _ref4.Environment, DungeonEnvironment = _ref4.DungeonEnvironment, DungeonCommandStream = _ref4.DungeonCommandStream;

  Dungeon = require('./dungeon').Dungeon;

  _ref5 = require('./container'), Bag = _ref5.Bag, CardStack = _ref5.CardStack;

  _ref6 = require('./helper'), diffDate = _ref6.diffDate, currentTime = _ref6.currentTime;

  helperLib = require('./helper');

  dbLib = require('./db');

  async = require('async');

  Player = (function(_super) {
    __extends(Player, _super);

    function Player(name) {
      var now;
      Player.__super__.constructor.apply(this, arguments);
      this.setDBKeyName(playerPrefix + name);
      if (name != null) {
        this.attrSave('name', name);
      }
      this.attrSave('questTableVersion', -1);
      this.attrSave('stageTableVersion', -1);
      this.attrSave('inventory', Bag(InitialBagSize));
      this.attrSave('gold', 0);
      this.attrSave('diamond', 0);
      this.attrSave('equipment', {});
      this.attrSave('inventoryVersion', 0);
      this.versionControl('inventoryVersion', ['gold', 'diamond', 'inventory', 'equipment']);
      this.attrSave('heroBase', {});
      this.attrSave('heroIndex', -1);
      this.attrSave('hero', {});
      this.versionControl('heroVersion', ['heroIndex', 'hero', 'heroBase']);
      this.attrSave('stage', []);
      this.attrSave('stageVersion', 0);
      this.versionControl('stageVersion', 'stage');
      this.attrSave('quests', {});
      this.attrSave('questsVersion', 0);
      this.versionControl('questVersion', 'quests');
      now = new Date();
      this.attrSave('energy', ENERGY_MAX);
      this.attrSave('energyTime', now.valueOf());
      this.versionControl('energyVersion', ['energy', 'energyTime']);
      this.attrSave('flags', {});
      this.attrSave('mercenary', []);
      this.attrSave('dungeonData', null);
      this.attrSave('runtimeID', -1);
      this.attrSave('rmb', 0);
      this.attrSave('spendedDiamond', 0);
      this.attrSave('tutorialStage', 0);
      this.attrSave('purchasedCount', {});
      this.attrSave('lastLogin', currentTime());
      this.attrSave('creationDate', now.valueOf());
      this.attrSave('isNewPlayer', false);
      this.attrSave('loginStreak', {
        count: 0
      });
      this.attrSave('accountID', -1);
      this.attrSave('campaignState', {});
      this.attrSave('infiniteTimer', currentTime());
    }

    Player.prototype.logout = function(reason) {
      if (this.socket) {
        return this.socket.encoder.writeObject({
          NTF: Event_ExpiredPID,
          err: reason
        });
      }
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

    Player.prototype.onDisconnect = function() {
      return delete this.messages;
    };

    Player.prototype.getType = function() {
      return 'player';
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
      var dis, flag, ret, s, _i, _len, _ref7;
      if (diffDate(this.lastLogin) > 0) {
        this.purchasedCount = {};
      }
      this.lastLogin = currentTime();
      if (diffDate(this.creationDate) > 0) {
        this.tutorialStage = 1000;
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
      if (this.loginStreak.date) {
        dis = diffDate(this.loginStreak.date);
        if (dis === 0) {
          flag = false;
        } else if (dis > 1) {
          this.loginStreak.count = 0;
        }
      } else {
        this.loginStreak.count = 0;
      }
      this.log('onLogin', {
        loginStreak: this.loginStreak,
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
      return ret;
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
      this.loginStreak.date = currentTime(true).valueOf();
      this.log('claimLoginReward', {
        loginStreak: this.loginStreak.count,
        date: currentTime()
      });
      reward = queryTable(TABLE_CAMPAIGN, 'LoginStreak', this.abIndex).level[this.loginStreak.count].award;
      ret = this.claimPrize(reward);
      this.loginStreak.count += 1;
      if (this.loginStreak.count >= queryTable(TABLE_CAMPAIGN, 'LoginStreak').level.length) {
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

    Player.prototype.handlePayment = function(payment, handle) {
      var myReceipt;
      this.log('handlePayment', {
        payment: payment
      });
      switch (payment.paymentType) {
        case 'AppStore':
          throw 'AppStore Payment';
          break;
        case 'PP25':
        case 'ND91':
          myReceipt = payment.receipt;
          return async.waterfall([
            function(cb) {
              return dbWrapper.getReceipt(myReceipt, function(err, receipt) {
                if ((receipt != null) && receipt.state !== RECEIPT_STATE_DELIVERED) {
                  return cb(Error(RET_Issue37));
                } else {
                  return cb(null, receipt);
                }
              });
            }, (function(_this) {
              return function(receipt, cb) {
                var cfg, productList, rec, ret;
                productList = queryTable(TABLE_CONFIG, 'Product_List');
                rec = unwrapReceipt(myReceipt);
                cfg = productList[rec.productID];
                ret = [
                  {
                    NTF: Event_InventoryUpdateItem,
                    arg: {
                      dim: _this.addDiamond(cfg.diamond)
                    }
                  }
                ];
                _this.rmb += cfg.rmb;
                _this.onCampaign('RMB', cfg.rmb);
                _this.log('charge', {
                  rmb: cfg.rmb,
                  diamond: cfg.diamond,
                  tunnel: 'PP',
                  action: 'charge',
                  product: rec.pid,
                  receipt: myReceipt
                });
                ret.push({
                  NTF: Event_PlayerInfo,
                  arg: {
                    rmb: _this.rmb
                  }
                });
                ret.push({
                  NTF: Event_RoleUpdate,
                  arg: {
                    act: {
                      vip: _this.vipLevel()
                    }
                  }
                });
                postPaymentInfo(_this.createHero().level, myReceipt, payment.paymentType);
                dbWrapper.updateReceipt(myReceipt, RECEIPT_STATE_CLAIMED, function(err) {
                  return cb(err, ret);
                });
                return _this.saveDB();
              };
            })(this)
          ], (function(_this) {
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
          })(this));
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
      if (this.dungeonData != null) {
        this.dungeon = new Dungeon(this.dungeonData);
        return this.dungeon.initialize();
      }
    };

    Player.prototype.releaseDungeon = function() {
      delete this.dungeon;
      this.dungeonData = null;
      return dbLib.removeDungeon(this.name);
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

    Player.prototype.createHero = function(heroData) {
      var bag, e, equip, i, _ref7;
      if (heroData != null) {
        if (this.heroBase[heroData["class"]] != null) {
          return null;
        }
        heroData.xp = 0;
        heroData.equipment = [];
        this.heroBase[heroData["class"]] = heroData;
        this.switchHero(heroData["class"]);
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
        this.hero.equipment = equip;
        this.hero.vip = this.vipLevel();
        return new Hero(this.hero);
      } else {
        throw 'NoHero';
      }
    };

    Player.prototype.switchHero = function(hClass) {
      if (this.heroBase[hClass] == null) {
        return false;
      }
      if (this.hero != null) {
        this.hero = this.heroBase[hClass];
      } else {
        this.hero = this.heroBase[hClass];
      }
      this.hero.equipment = {};
      return this.hero.vip = this.vipLevel();
    };

    Player.prototype.addMoney = function(type, point) {
      if (!point) {
        return this[type];
      }
      if (point + this[type] < 0) {
        return false;
      }
      this[type] += point;
      if (type === 'diamond') {
        this.costedDiamond += point;
      }
      this.inventoryVersion++;
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
        this.hero.xp += point;
        currentLevel = this.createHero().level;
        this.onEvent('experience');
        if (prevLevel !== currentLevel) {
          if (currentLevel === 10) {
            dbLib.broadcastEvent(BROADCAST_PLAYER_LEVEL, {
              who: this.name,
              what: this.hero["class"]
            });
          }
          this.onEvent('level');
          this.log('levelChange', {
            prevLevel: prevLevel,
            newLevel: currentLevel
          });
        }
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

    Player.prototype.stageIsUnlockable = function(stage) {
      var stageConfig;
      stageConfig = queryTable(TABLE_STAGE, stage, this.abIndex);
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
        if (!this.stage[stage]) {
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
            this.stage[stage].level = 0;
          }
          if (state === STAGE_STATE_PASSED) {
            this.stage[stage].level += 1;
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
      if (this.dungeon.reward != null) {
        ret = ret.concat(this.claimDungeonAward(this.dungeon.reward));
      }
      return ret;
    };

    Player.prototype.startDungeon = function(stage, startInfoOnly, handler) {
      var dungeonConfig, stageConfig;
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
            if (_this.dungeonData) {
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
                _this.mercenary.splice(0, teamCount - team.length);
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
            return cb('OK');
          };
        })(this)
      ], (function(_this) {
        return function(err) {
          var ret;
          _this.loadDungeon();
          _this.log('startDungeon', {
            dungeonData: _this.dungeonData,
            err: err
          });
          if (err !== 'OK') {
            ret = err;
            err = new Error(err);
          } else if (_this.dungeon != null) {
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
          if (handler != null) {
            return handler(err, ret);
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
      this.questsVersion++;
      this.onEvent('gold');
      this.onEvent('diamond');
      this.onEvent('item');
      return packQuestEvent(this.quests, qid, this.questVersion);
    };

    Player.prototype.claimPrize = function(prize, allOrFail) {
      var e, equipUpdate, i, itemPrize, k, otherPrize, p, ret, _i, _j, _len, _len1, _ref7;
      if (allOrFail == null) {
        allOrFail = true;
      }
      if (prize == null) {
        return [];
      }
      if (!Array.isArray(prize)) {
        prize = [prize];
      }
      itemPrize = [];
      otherPrize = [];
      for (_i = 0, _len = prize.length; _i < _len; _i++) {
        p = prize[_i];
        if (p.type === PRIZETYPE_ITEM) {
          if (p.count > 0) {
            itemPrize.push(p);
          }
        } else {
          otherPrize.push(p);
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
      prize = itemPrize.concat(otherPrize);
      ret = [];
      for (_j = 0, _len1 = prize.length; _j < _len1; _j++) {
        p = prize[_j];
        if (p != null) {
          switch (p.type) {
            case PRIZETYPE_ITEM:
              ret = this.aquireItem(p.value, p.count, allOrFail);
              if (!(ret && ret.length > 0)) {
                return false;
              }
              break;
            case PRIZETYPE_GOLD:
              ret.push({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  god: this.addGold(p.count)
                }
              });
              break;
            case PRIZETYPE_DIAMOND:
              ret.push({
                NTF: Event_InventoryUpdateItem,
                arg: {
                  syn: this.inventoryVersion,
                  dim: this.addDiamond(p.count)
                }
              });
              break;
            case PRIZETYPE_EXP:
              ret.push({
                NTF: Event_RoleUpdate,
                arg: {
                  syn: this.heroVersion,
                  act: {
                    exp: this.addHeroExp(p.count)
                  }
                }
              });
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
              }
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
      this.questsVersion++;
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
        case 'gold':
        case 'diamond':
        case 'item':
          break;
        case 'level':
          this.onEvent('power');
          return this.onCampaign('Level');
        case 'Equipment':
          return this.onEvent('power');
        case 'power':
          return this.updateMercenaryInfo();
      }
    };

    Player.prototype.queryItemSlot = function(item) {
      return this.inventory.queryItemSlot(item);
    };

    Player.prototype.getItemAt = function(slot) {
      return this.inventory.get(slot);
    };

    Player.prototype.useItem = function(slot) {
      var dropData, e, equip, item, myClass, prize, ret, tmp, _ref7;
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
      this.inventoryVersion++;
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
              dropData = queryTable(TABLE_DROP, item.dropId, this.abIndex);
              if (!((dropData != null) && dropData.dropList)) {
                logError({
                  'action': 'useItem',
                  type: 'TreasureChest',
                  reason: 'invalidDropData',
                  id: item.id
                });
                return {
                  ret: RET_Unknown
                };
              }
              e = selectElementFromWeightArray(dropData.dropList, Math.random());
              prize = this.claimPrize(e.drop);
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
              if (e.drop.type === PRIZETYPE_ITEM && ((_ref7 = queryTable(TABLE_ITEM, e.drop.value, this.abIndex)) != null ? _ref7.quality : void 0) >= 2) {
                dbLib.broadcastEvent(BROADCAST_TREASURE_CHEST, {
                  who: this.name,
                  src: item.id,
                  out: e.drop.value
                });
              }
              return {
                prize: [e.drop],
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
            ntf: ret
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
      this.inventoryVersion++;
      return this.doAction({
        id: 'AquireItem',
        item: item,
        count: count,
        allorfail: allOrFail
      });
    };

    Player.prototype.removeItemById = function(id, count, allorfail) {
      this.inventoryVersion++;
      return this.doAction({
        id: 'RemoveItem',
        item: id,
        count: count,
        allorfail: allorfail
      });
    };

    Player.prototype.removeItem = function(item, count, slot) {
      this.inventoryVersion++;
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

    Player.prototype.transformGem = function(count) {
      var gem7, gemIndex, gems, goldCost, i, prize, r, ret, retPrize, retRM, _i, _ref7;
      gem7 = 0;
      goldCost = count * 50;
      if (!(goldCost <= this.gold)) {
        return {
          ret: RET_NotEnoughGold
        };
      }
      retRM = this.inventory.removeById(gem7, count, true);
      if (!retRM) {
        return {
          ret: RET_NoEnhanceStone
        };
      }
      this.addGold(-goldCost);
      gems = {};
      gemIndex = queryTable(TABLE_CONFIG, 'Global_Enhancement_GEM_Index', this.abIndex);
      prize = [];
      for (i = _i = 1, _ref7 = Math.floor(count * 0.5); 1 <= _ref7 ? _i <= _ref7 : _i >= _ref7; i = 1 <= _ref7 ? ++_i : --_i) {
        r = rand() % gemIndex.length;
        if (gems[r] == null) {
          gems[r] = {
            type: PRIZETYPE_ITEM,
            value: gemIndex[r],
            count: 0
          };
          prize.push(gems[r]);
        }
        gems[r].count++;
      }
      retPrize = this.claimPrize(prize);
      if (retPrize) {
        ret = this.doAction({
          id: 'ItemChange',
          ret: retRM,
          version: this.inventoryVersion
        });
        ret = ret.concat(retPrize);
        ret = ret.concat({
          NTF: Event_InventoryUpdateItem,
          arg: {
            syn: this.inventoryVersion,
            god: this.gold
          }
        });
        return {
          out: prize,
          res: ret
        };
      } else {
        this.inventory.reverseOpration(retRM);
        return {
          ret: RET_InventoryFull
        };
      }
    };

    Player.prototype.craftItem = function(slot) {
      var newItem, recipe, ret, retRM;
      recipe = this.getItemAt(slot);
      if (recipe.category !== ITEM_RECIPE) {
        return {
          ret: RET_NeedReceipt
        };
      }
      if (this.gold < recipe.recipeCost) {
        return {
          ret: RET_NotEnoughGold
        };
      }
      retRM = this.inventory.removeById(recipe.recipeIngredient, true);
      if (!retRM) {
        return {
          ret: RET_InsufficientIngredient
        };
      }
      ret = this.removeItem(null, 1, slot);
      ret = ret.concat(this.doAction({
        id: 'ItemChange',
        ret: retRM,
        version: this.inventoryVersion
      }));
      this.addGold(-recipe.recipeCost);
      newItem = new Item(recipe.recipeTarget);
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
        res: ret
      };
    };

    Player.prototype.levelUpItem = function(slot) {
      var cost, eh, exp, item, k, newItem, ret, s, upConfig, _ref7, _ref8, _ref9;
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
      exp = (_ref7 = item.upgradeXp) != null ? _ref7 : upConfig.xp;
      cost = (_ref8 = item.upgradeCost) != null ? _ref8 : upConfig.cost;
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
      _ref9 = this.equipment;
      for (k in _ref9) {
        s = _ref9[k];
        if (s === slot) {
          delete this.equipment[k];
        }
      }
      this.inventoryVersion++;
      this.addGold(-cost);
      ret = this.removeItem(null, 1, slot);
      newItem = new Item(item.upgradeTarget);
      newItem.enhancement = item.enhancement;
      ret = ret.concat(this.aquireItem(newItem));
      ret = ret.concat(this.useItem(this.queryItemSlot(newItem)).ntf);
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
              eh: eh
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
          eh: eh,
          xp: newItem.xp
        },
        res: ret
      };
    };

    Player.prototype.enhanceItem = function(itemSlot, gemSlot) {
      var cost, eh, enhance, enhance7, enhanceID, enhanceTable, equip, gem, gold, i, index, leftEnhancement, level, maxIndex, maxLevel, minIndex, minLevel, myEnhancements, rate, result, ret, retRM, _ref7, _ref8;
      equip = this.getItemAt(itemSlot);
      gem = this.getItemAt(gemSlot);
      if (!(equip && gem)) {
        return {
          ret: RET_ItemNotExist
        };
      }
      if (!(equip.category === ITEM_EQUIPMENT && equip.subcategory <= EquipSlot_Neck)) {
        return {
          ret: RET_EquipCantUpgrade
        };
      }
      if (gem.category !== ITEM_GEM) {
        return {
          ret: RET_NoEnhanceStone
        };
      }
      maxLevel = -1;
      minLevel = 1000000;
      maxIndex = -1;
      minIndex = 0;
      _ref7 = equip.enhancement;
      for (i in _ref7) {
        enhance = _ref7[i];
        if (enhance.level > maxLevel) {
          maxLevel = enhance.level;
          maxIndex = i;
        }
        if (enhance.level < minLevel) {
          minLevel = enhance.level;
          minIndex = i;
        }
      }
      this.inventoryVersion++;
      level = 0;
      enhanceID = -1;
      maxLevel++;
      cost = maxLevel * 2;
      if (cost < 1) {
        cost = 1;
      }
      gold = cost * 200;
      if (this.addGold(-gold) === false) {
        return {
          ret: RET_NotEnoughGold
        };
      }
      retRM = this.inventory.remove(gem.id, cost, gemSlot, true);
      if (!retRM) {
        this.addGold(gold);
        return {
          ret: RET_NoEnhanceStone
        };
      }
      if (gem.subcategory === ENHANCE_VOID) {
        if (maxIndex === -1) {
          return {
            ret: RET_CantUseVoidStone
          };
        }
        leftEnhancement = [RES_ATTACK, RES_HEALTH, RES_SPEED, RES_CRITICAL, RES_STRONG, RES_ACCURACY, RES_REACTIVITY];
        equip.enhancement.forEach(function(e) {
          return leftEnhancement = leftEnhancement.filter(function(l) {
            return l !== e.id;
          });
        });
        enhance = leftEnhancement[rand() % leftEnhancement.length];
        equip.enhancement[maxIndex].id = enhance;
        equip.enhancement.push(equip.enhancement.shift());
      } else {
        myEnhancements = equip.enhancement.map(function(e) {
          return e.id;
        });
        enhance7 = [RES_ATTACK, RES_HEALTH, RES_SPEED, RES_CRITICAL, RES_STRONG, RES_ACCURACY, RES_REACTIVITY];
        enhance7 = enhance7[rand() % enhance7.length];
        enhanceTable = [enhance7, 0, 0, RES_ATTACK, RES_HEALTH, RES_SPEED, RES_CRITICAL, RES_STRONG, RES_ACCURACY, RES_REACTIVITY];
        enhanceID = enhanceTable[gem.subcategory];
        _ref8 = equip.enhancement;
        for (i in _ref8) {
          enhance = _ref8[i];
          if (enhance.id === enhanceID) {
            index = i;
          }
        }
        if (index < equip.enhancement.length) {
          level = equip.enhancement[index].level + 1;
        } else if (equip.enhancement.length < ENHANCE_LIMIT) {
          index = equip.enhancement.length;
        } else {
          index = minIndex;
        }
        rate = queryTable(TABLE_CONFIG, "Enhance_Rate", this.abIndex)[level];
        if (level >= equip.rank) {
          if (gem.subcategory !== ENHANCE_SEVEN) {
            return {
              ret: RET_ExceedMaxEnhanceLevel
            };
          } else {
            rate = -1;
          }
        }
        if (Math.random() < rate) {
          equip.enhancement[index] = {
            id: enhanceID,
            level: level
          };
          result = 'Success';
        } else {
          result = 'Fail';
        }
      }
      ret = [
        {
          NTF: Event_InventoryUpdateItem,
          arg: {
            syn: this.inventoryVersion,
            'god': this.gold
          }
        }
      ];
      ret = ret.concat(this.doAction({
        id: 'ItemChange',
        ret: retRM,
        version: this.inventoryVersion
      }));
      this.log('enhanceItem', {
        itemId: equip.id,
        gemId: gem.subcategory,
        result: result,
        enhance: enhanceID,
        level: level,
        itemSlot: itemSlot,
        gemSlot: gemSlot
      });
      if (result === 'Fail') {
        return {
          ret: RET_EnhanceFailed,
          ntf: ret
        };
      }
      this.onEvent('Equipment');
      if (level >= 5) {
        dbLib.broadcastEvent(BROADCAST_ENHANCE, {
          who: this.name,
          what: equip.id,
          many: level
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
      var item, k, ret, s, _ref7;
      item = this.getItemAt(slot);
      _ref7 = this.equipment;
      for (k in _ref7) {
        s = _ref7[k];
        if (s === slot) {
          return {
            ret: RET_Unknown
          };
        }
      }
      if (item != null ? item.sellprice : void 0) {
        this.addGold(item.sellprice * item.count);
        ret = this.removeItem(null, null, slot);
        this.log('sellItem', {
          itemId: item.id,
          price: item.sellprice,
          count: item.count,
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

    Player.prototype.generateDungeonAward = function(reward) {
      var items;
      items = [];
      if (reward.result === DUNGEON_RESULT_DONE) {
        return [];
      }
      if (reward.result === DUNGEON_RESULT_WIN) {
        dbLib.incrBluestarBy(this.name, 1);
        items = [];
        if (reward.prize) {
          items = reward.prize.filter(function(p) {
            return Math.random() < p.rate;
          }).map(wrapCallback(this, function(g) {
            var dropTable, _ref7;
            dropTable = (_ref7 = queryTable(TABLE_CONFIG, "Global_Item_Drop_Table", this.abIndex)) != null ? _ref7 : [];
            g.items = g.items.concat(dropTable).filter((function(_this) {
              return function(i) {
                var itemConfig;
                itemConfig = queryTable(TABLE_ITEM, i.item, _this.abIndex);
                if (!itemConfig) {
                  return false;
                }
                if (itemConfig.singleton) {
                  return !_this.haveItem(i.item);
                }
                return true;
              };
            })(this));
            return g;
          })).map(function(g) {
            var e;
            e = selectElementFromWeightArray(g.items, Math.random());
            if (e) {
              return {
                type: PRIZETYPE_ITEM,
                value: e.item,
                count: 1
              };
            } else {
              logError({
                type: 'QuickFix',
                group: g,
                reward: reward
              });
              return {
                type: PRIZETYPE_ITEM,
                value: g[0],
                count: 1
              };
            }
          });
        }
      }
      if (reward.infinityPrize && reward.result === DUNGEON_RESULT_WIN) {
        if (reward.infinityPrize.type === PRIZETYPE_GOLD) {
          reward.gold += reward.infinityPrize.count;
        } else {
          items.push(reward.infinityPrize);
        }
      }
      reward.gold += reward.gold * this.goldAdjust();
      reward.exp += reward.exp * this.expAdjust();
      reward.wxp += reward.wxp * this.wxpAdjust();
      reward.gold = Math.ceil(reward.gold);
      reward.exp = Math.ceil(reward.exp);
      reward.wxp = Math.ceil(reward.wxp);
      reward.item = items;
      return [
        {
          type: PRIZETYPE_EXP,
          count: reward.exp
        }, {
          type: PRIZETYPE_GOLD,
          count: reward.gold
        }, {
          type: PRIZETYPE_WXP,
          count: reward.wxp
        }
      ].concat(items);
    };

    Player.prototype.claimDungeonAward = function(reward) {
      var k, objective, offlineReward, prize, qid, qst, quest, result, ret, rewardMessage, teammateRewardMessage, _ref7, _ref8;
      if (!((reward != null) && (this.dungeon != null))) {
        player.saveDB(function() {
          return player.releaseDungeon();
        });
        return [];
      }
      ret = [];
      if (reward.reviveCount > 0) {
        ret = this.inventory.removeById(ItemId_RevivePotion, reward.reviveCount, true);
        if (!ret || ret.length === 0) {
          return {
            NTF: Event_DungeonReward,
            arg: {
              prize: prize,
              res: 0
            }
          };
        }
        ret = this.doAction({
          id: 'ItemChange',
          ret: ret,
          version: this.inventoryVersion
        });
      }
      if (reward.quests) {
        _ref7 = reward.quests;
        for (qid in _ref7) {
          qst = _ref7[qid];
          if (!(((qst != null ? qst.counters : void 0) != null) && this.quests[qid])) {
            continue;
          }
          quest = queryTable(TABLE_QUEST, qid, this.abIndex);
          _ref8 = quest.objects;
          for (k in _ref8) {
            objective = _ref8[k];
            if (objective.type === QUEST_TYPE_NPC && (qst.counters[k] != null) && (this.quests[qid].counters != null)) {
              this.quests[qid].counters[k] = qst.counters[k];
            }
          }
        }
        this.questVersion++;
      }
      prize = this.generateDungeonAward(reward);
      prize = prize.filter(function(e) {
        if ((e.count != null) && e.count === 0) {
          return false;
        }
        return true;
      });
      rewardMessage = {
        NTF: Event_DungeonReward,
        arg: {
          res: reward.result
        }
      };
      if (prize.length > 0) {
        rewardMessage.arg.prize = prize;
      }
      ret = ret.concat([rewardMessage]);
      if (reward.result !== DUNGEON_RESULT_FAIL) {
        ret = ret.concat(this.completeStage(this.dungeon.stage));
      }
      ret = ret.concat(this.claimPrize(prize, false));
      offlineReward = [];
      if (reward.exp > 0) {
        offlineReward.push({
          type: PRIZETYPE_EXP,
          count: Math.ceil(TEAMMATE_REWARD_RATIO * reward.exp)
        });
      }
      if (reward.gold > 0) {
        offlineReward.push({
          type: PRIZETYPE_GOLD,
          count: Math.ceil(TEAMMATE_REWARD_RATIO * reward.gold)
        });
      }
      if (reward.wxp > 0) {
        offlineReward.push({
          type: PRIZETYPE_WXP,
          count: Math.ceil(TEAMMATE_REWARD_RATIO * reward.wxp)
        });
      }
      if (offlineReward.length > 0) {
        teammateRewardMessage = {
          type: MESSAGE_TYPE_SystemReward,
          src: MESSAGE_REWARD_TYPE_OFFLINE,
          prize: offlineReward
        };
        reward.team.forEach(function(name) {
          if (name) {
            return dbLib.deliverMessage(name, teammateRewardMessage);
          }
        });
      }
      result = 'Lost';
      if (reward.result === DUNGEON_RESULT_WIN) {
        result = 'Win';
      }
      this.log('finishDungeon', {
        stage: this.dungeon.getInitialData().stage,
        result: result,
        reward: prize
      });
      this.saveDB((function(_this) {
        return function() {
          return _this.releaseDungeon();
        };
      })(this));
      return ret;
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
      var cfg, level, _ref10, _ref11, _ref12, _ref7, _ref8, _ref9;
      _ref7 = getVip(this.rmb), level = _ref7.level, cfg = _ref7.cfg;
      switch (op) {
        case 'vipLevel':
          return level;
        case 'blueStarCost':
          return (_ref8 = cfg != null ? cfg.blueStarCost : void 0) != null ? _ref8 : 0;
        case 'goldAdjust':
          return (_ref9 = cfg != null ? cfg.goldAdjust : void 0) != null ? _ref9 : 0;
        case 'expAdjust':
          return (_ref10 = cfg != null ? cfg.expAdjust : void 0) != null ? _ref10 : 0;
        case 'wxpAdjust':
          return (_ref11 = cfg != null ? cfg.wxpAdjust : void 0) != null ? _ref11 : 0;
        case 'energyLimit':
          return ((_ref12 = cfg != null ? cfg.energyLimit : void 0) != null ? _ref12 : 0) + ENERGY_MAX;
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
      if (this.campaignState[campaignName] == null) {
        if (campaignName === 'Charge') {
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
      var cfg, _base;
      cfg = queryTable(TABLE_CAMPAIGN, campaignName, this.abIndex);
      if (cfg != null) {
        if ((cfg.date != null) && moment(cfg.date).format('YYYYMMDD') - moment().format('YYYYMMDD') < 0) {
          return {
            config: null
          };
        }
        if (typeof (_base = this.getCampaignState(campaignName)) === "function" ? _base(nd(this.getCampaignState(campaignName) === false)) : void 0) {
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
      var config, level, o, r, reward, rmb, _i, _len, _ref10, _ref11, _ref12, _ref13, _ref7, _ref8, _ref9, _results;
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
          _ref9 = this.getCampaignConfig('TotalCharge'), config = _ref9.config, level = _ref9.level;
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
          _ref10 = this.getCampaignConfig('FirstCharge'), config = _ref10.config, level = _ref10.level;
          if ((config != null) && (level != null)) {
            rmb = data;
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
          _ref11 = this.getCampaignConfig('LevelUp'), config = _ref11.config, level = _ref11.level;
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
          _ref12 = this.getCampaignConfig('Stage'), config = _ref12.config, level = _ref12.level;
          if ((config != null) && (level != null) && data === level.count) {
            this.setCampaignState('Stage', this.getCampaignState('Stage') + 1);
            reward.push({
              cfg: config,
              lv: level
            });
          }
          break;
        case 'BattleForce':
          _ref13 = this.getCampaignConfig('BattleForce'), config = _ref13.config, level = _ref13.level;
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
      var filtedName;
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
        return getMercenaryMember(filtedName, this.battleForce - 100, this.battleForce + 100, 30, (function(_this) {
          return function(err, heroData) {
            if (heroData) {
              _this.mercenary.push(heroData);
              return _this.requireMercenary(callback);
            } else {
              return callback(null);
            }
          };
        })(this));
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

    Player.prototype.injectWXP = function(slot) {
      var bookNeeded, equip, ret, retRM, upgrade, xpNeeded;
      equip = this.getItemAt(slot);
      if (!equip) {
        return {
          ret: RET_ItemNotExist
        };
      }
      upgrade = queryTable(TABLE_UPGRADE, equip.rank);
      xpNeeded = upgrade.xp - equip.xp;
      bookNeeded = Math.ceil(xpNeeded / 100);
      retRM = this.inventory.remove(queryTable(TABLE_CONFIG, 'Global_WXP_BOOK'), bookNeeded, null, true);
      if (retRM) {
        equip.xp = upgrade.xp;
        ret = this.doAction({
          id: 'ItemChange',
          ret: retRM,
          version: this.inventoryVersion
        });
        return {
          out: {
            cid: equip.id,
            sid: this.queryItemSlot(equip),
            stc: 1,
            xp: equip.xp
          },
          res: ret
        };
      } else {
        return {
          ret: RET_NoEnhanceStone
        };
      }
    };

    Player.prototype.replaceMercenary = function(id, handler) {
      var battleForce, filtedName, me;
      me = this;
      battleForce = this.battleForce;
      filtedName = [this.name];
      filtedName = filtedName.concat(me.mercenary.map(function(m) {
        return m.name;
      }));
      filtedName = filtedName.concat(me.contactBook.book);
      return getMercenaryMember(filtedName, battleForce - 10, battleForce + 200, 30, function(err, heroData) {
        if (heroData) {
          me.mercenary.splice(id, 1, heroData);
        } else {
          heroData = me.mercenary[id];
        }
        return handler(heroData);
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

    PlayerEnvironment.prototype.aquireItem = function(item, count, allOrFail) {
      var _ref7;
      count = count != null ? count : 1;
      item = createItem(item);
      if (item == null) {
        showMeTheStack();
      }
      if (item == null) {
        return [];
      }
      return {
        version: this.player.inventoryVersion,
        ret: (_ref7 = this.player) != null ? _ref7.inventory.add(item, count, allOrFail) : void 0
      };
    };

    PlayerEnvironment.prototype.removeItem = function(item, count, slot, allorfail) {
      var _ref7;
      return {
        ret: (_ref7 = this.player) != null ? _ref7.inventory.remove(item, count, slot, allorfail) : void 0,
        version: this.player.inventoryVersion
      };
    };

    PlayerEnvironment.prototype.translateAction = function(cmd) {
      var i, ret, routine, _ref7;
      if (cmd == null) {
        return [];
      }
      ret = [];
      if (cmd.output() != null) {
        ret = cmd.output();
      }
      _ref7 = cmd.cmdRoutine;
      for (i in _ref7) {
        routine = _ref7[i];
        if ((routine != null ? routine.output() : void 0) != null) {
          ret = ret.concat(routine.output());
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
        var arg, e, items, ret;
        ret = env.variable('ret');
        if (!(ret && ret.length > 0)) {
          return [];
        }
        items = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ret.length; _i < _len; _i++) {
            e = ret[_i];
            _results.push({
              sid: Number(e.slot),
              cid: e.id,
              stc: e.count
            });
          }
          return _results;
        })();
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
    AquireItem: {
      callback: function(env) {
        var ret, version, _ref7;
        _ref7 = env.aquireItem(env.variable('item'), env.variable('count'), env.variable('allorfail')), ret = _ref7.ret, version = _ref7.version;
        return this.routine({
          id: 'ItemChange',
          ret: ret,
          version: version
        });
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
    var i, level, lv, tbl, _ref7;
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
