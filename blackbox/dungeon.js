(function() {
  var Bag, Block, Card, CardStack, CommandStream, DBWrapper, Dungeon, DungeonCommandStream, DungeonEnvironment, Environment, Hero, Item, Level, TriggerManager, Wizard, calcInfiniteRank, calcInfiniteX, changeSeed, compete, createUnit, createUnits, criticalFormula, dungeonCSConfig, flagShowRand, genUnitInfo, hitFormula, onEvent, parse, privateRand, seed_random, speedFormula, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requires('./define');

  requires('./shared');

  Wizard = requires('./spell').Wizard;

  DBWrapper = requires('./serializer').Serializer;

  _ref = requires('./unit'), createUnit = _ref.createUnit, Hero = _ref.Hero;

  _ref1 = requires('./item'), Item = _ref1.Item, Card = _ref1.Card;

  _ref2 = requires('./commandStream'), CommandStream = _ref2.CommandStream, Environment = _ref2.Environment;

  _ref3 = requires('./container'), Bag = _ref3.Bag, CardStack = _ref3.CardStack;

  _ref4 = requires('./trigger'), parse = _ref4.parse, TriggerManager = _ref4.TriggerManager;

  seed_random = requires('./seed-random');

  speedFormula = {
    'a': 1,
    'b': 60,
    'c': 0.5
  };

  hitFormula = {
    'a': 1,
    'b': 150,
    'c': 0.75,
    downLimit: 0.5
  };

  criticalFormula = {
    'a': 7,
    'b': 140,
    'c': 0.1,
    upLimit: 0.4
  };

  flagShowRand = false;

  compete = function(formula, dungeon) {
    return function(p1, p2) {
      var ret, rnd, x;
      x = p1 - p2;
      ret = 0;
      if (x > 0) {
        ret = formula.c + x / (formula.b + formula.a * x);
      } else {
        x = Math.abs(x);
        ret = formula.c - x / (formula.b + formula.a * x);
      }
      if ((formula.downLimit != null) && formula.downLimit > ret) {
        ret = formula.downLimit;
      }
      if ((formula.upLimit != null) && formula.upLimit < ret) {
        ret = formula.upLimit;
      }
      rnd = dungeon.random();
      return rnd < ret;
    };
  };

  privateRand = function(round) {
    var ret;
    ret = Math.floor(this.random() * 1000000000);
    if (round) {
      return ret % round;
    } else {
      return ret;
    }
  };

  changeSeed = function(seed) {
    var randomFunc;
    if (seed == null) {
      seed = rand();
    }
    this.randSeed = seed;
    randomFunc = seed_random.seedrandom(seed);
    this.random = function() {
      var ret;
      ret = randomFunc();
      if (flagShowRand) {
        console.log('Rand:', ret);
      }
      return ret;
    };
    return Object.defineProperty(this, 'random', {
      enumerable: false
    });
  };

  calcInfiniteX = function(infiniteLevel) {
    if (infiniteLevel % 10 === 0) {
      return infiniteLevel / 10;
    } else if (infiniteLevel % 5 === 0) {
      return infiniteLevel / 5 - Math.floor(infiniteLevel / 10);
    } else {
      return infiniteLevel - Math.floor(infiniteLevel / 5) - Math.floor(infiniteLevel / 10);
    }
  };

  calcInfiniteRank = function(infiniteLevel) {
    var x;
    x = calcInfiniteX(infiniteLevel);
    return Math.ceil(0.1 * x * x + 0.1 * x + 1);
  };

  createUnits = function(rules, randFunc) {
    var cfg, filterLevels, globalRule, i, l, levelConfig, levelRule, placeUnit, r, rand, result, rule, selectFromPool, selectPos, translateRule, _i, _j, _k, _len, _len1, _len2, _ref5;
    rand = function(mod) {
      var r;
      if (mod == null) {
        mod = 30;
      }
      r = randFunc();
      if (r < 1) {
        r *= mod;
      }
      return r;
    };
    translateRule = function(cRule) {
      if (!cRule) {
        return [];
      }
      return cRule.map(function(r) {
        var currentRule, k, v;
        if (!((r.from != null) || (r.to != null))) {
          return r;
        }
        currentRule = {};
        for (k in r) {
          v = r[k];
          if (k !== 'from' && k !== 'to') {
            currentRule[k] = v;
          }
        }
        if (r.from != null) {
          currentRule.count = r.from + rand();
        }
        if (r.to != null) {
          currentRule.count %= r.to;
        }
        return currentRule;
      });
    };
    levelRule = [];
    _ref5 = rules.levels;
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      l = _ref5[_i];
      levelRule.push(translateRule(l.objects));
    }
    globalRule = translateRule(rules.global);
    levelConfig = [];
    for (i in levelRule) {
      l = levelRule[i];
      cfg = {
        id: i,
        total: 0,
        limit: Infinity,
        takenPos: {}
      };
      for (_j = 0, _len1 = l.length; _j < _len1; _j++) {
        r = l[_j];
        if (!((r.id != null) || (r.pool != null))) {
          if (r.count != null) {
            cfg.limit = r.count;
          }
        }
      }
      levelConfig.push(cfg);
    }
    selectFromPool = function(poolID, count) {
      var _k, _ref6, _results;
      _results = [];
      for (i = _k = 0, _ref6 = count - 1; 0 <= _ref6 ? _k <= _ref6 : _k >= _ref6; i = 0 <= _ref6 ? ++_k : --_k) {
        _results.push(selectElementFromWeightArray(rules.pool[poolID], rand()));
      }
      return _results;
    };
    selectPos = function(positions, lConfig) {
      var pos;
      pos = positions.filter(function(p) {
        return !lConfig.takenPos[p];
      });
      if (pos.length > 0) {
        return pos[rand() % pos.length];
      }
      return -1;
    };
    placeUnit = function(lRule, lConfig, single) {
      var count, idList, result, _k, _len2, _ref6;
      result = [];
      for (_k = 0, _len2 = lRule.length; _k < _len2; _k++) {
        r = lRule[_k];
        if (!((r.id != null) || (r.pool != null))) {
          continue;
        }
        count = (_ref6 = r.count) != null ? _ref6 : 1;
        if (single) {
          count = 1;
        }
        if (count + lConfig.total > lConfig.limit) {
          count = lConfig.total - lConfig.limit + count;
        }
        if (count <= 0) {
          continue;
        }
        if (r.id != null) {
          idList = [r];
        }
        if (r.pool != null) {
          idList = selectFromPool(r.pool, count);
          count = 1;
        }
        idList.forEach(function(c) {
          var k, u, v;
          u = {};
          for (k in c) {
            v = c[k];
            u[k] = v;
          }
          if (r.pos) {
            if (typeof r.pos === 'number') {
              u.pos = r.pos;
            }
            if (Array.isArray(r.pos)) {
              u.pos = selectPos(r.pos, lConfig);
            }
            lConfig.takenPos[r.pos] = true;
          }
          lConfig.total += count;
          return result.push(u);
        });
      }
      return result;
    };
    result = [];
    for (i in levelRule) {
      l = levelRule[i];
      result.push(placeUnit(l, levelConfig[i]));
    }
    for (_k = 0, _len2 = globalRule.length; _k < _len2; _k++) {
      rule = globalRule[_k];
      i = 0;
      filterLevels = function() {
        var _ref6, _ref7;
        cfg = levelConfig.filter(function(c) {
          return c.total < c.limit;
        });
        if (((_ref6 = rule.levels) != null ? _ref6.from : void 0) != null) {
          cfg = cfg.filter(function(c) {
            return c.id > rule.levels.from;
          });
        }
        if (((_ref7 = rule.levels) != null ? _ref7.to : void 0) != null) {
          cfg = cfg.filter(function(c) {
            return c.id < rule.levels.to;
          });
        }
        return cfg;
      };
      while (i < rule.count) {
        cfg = filterLevels();
        if (cfg.length <= 0) {
          break;
        }
        cfg = cfg[rand() % cfg.length];
        result[cfg.id] = result[cfg.id].concat(placeUnit([rule], cfg, true));
        i++;
      }
    }
    return result;
  };

  exports.createUnits = createUnits;

  Dungeon = (function() {
    function Dungeon(data) {
      var cfg, k, t, v, _i, _len, _ref5;
      this.effectCounter = 0;
      this.killingInfo = [];
      this.currentLevel = -1;
      this.cardStack = CardStack(5);
      this.actionLog = [];
      this.revive = 0;
      this.factionDB = queryTable(TABLE_FACTION);
      this.triggerManager = new TriggerManager(queryTable(TABLE_TRIGGER));
      if (data == null) {
        return false;
      }
      for (k in data) {
        v = data[k];
        this[k] = v;
      }
      if (this.initialQuests != null) {
        this.quests = deepCopy(this.initialQuests);
      }
      cfg = this.getConfig();
      if (cfg.triggers) {
        _ref5 = cfg.triggers;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          t = _ref5[_i];
          this.triggerManager.installTrigger(t, {}, this);
        }
      }
    }

    Dungeon.prototype.onEvent = function(event, cmd) {
      return this.triggerManager.onEvent(event, cmd);
    };

    Dungeon.prototype.newFaction = function(name) {
      if (!this.factionDB[name]) {
        return this.factionDB[name] = {};
      }
    };

    Dungeon.prototype.factionAttack = function(src, dst, flag) {
      return changeFactionRelaction(src, dst, 'attackable', flag);
    };

    Dungeon.prototype.factionHeal = function(src, dst, flag) {
      return changeFactionRelaction(src, dst, 'healable', flag);
    };

    Dungeon.prototype.changeFactionRelaction = function(src, dst, relation, flag) {
      if (this.factionDB[src] == null) {
        return false;
      }
      if (this.factionDB[src][dst] == null) {
        this.factionDB[src][dst] = {};
      }
      return this.factionDB[src][dst][relation] = flag;
    };

    Dungeon.prototype.rand = function() {
      return privateRand.apply(this, arguments);
    };

    Dungeon.prototype.changeSeed = function() {
      return changeSeed.apply(this, arguments);
    };

    Dungeon.prototype.getInitialData = function() {
      var ret;
      ret = {
        stage: this.stage,
        randSeed: this.randSeed,
        initialQuests: this.initialQuests,
        team: this.team,
        abIndex: this.abIndex
      };
      if (this.infiniteLevel != null) {
        ret.infiniteLevel = this.infiniteLevel;
      }
      if (this.blueStar != null) {
        ret.blueStar = this.blueStar;
      }
      if (this.baseRank) {
        ret.baseRank = this.baseRank;
      }
      return ret;
    };

    Dungeon.prototype.getStageConfig = function() {
      return queryTable(TABLE_STAGE, this.stage, this.abIndex);
    };

    Dungeon.prototype.getConfig = function() {
      return queryTable(TABLE_DUNGEON, this.getStageConfig().dungeon, this.abIndex);
    };

    Dungeon.prototype.initialize = function() {
      var arrCollectID, cfg, creation, infiniteLevel, o, q, qid, qst, quests, _i, _len, _ref5, _ref6, _ref7, _ref8;
      this.speedCompete = compete(speedFormula, this);
      this.hitCompete = compete(hitFormula, this);
      this.criticalCompete = compete(criticalFormula, this);
      Object.defineProperty(this, 'speedCompete', {
        enumerable: false
      });
      Object.defineProperty(this, 'hitCompete', {
        enumerable: false
      });
      Object.defineProperty(this, 'criticalCompete', {
        enumerable: false
      });
      if (this.randSeed != null) {
        this.changeSeed(this.randSeed);
      } else {
        this.changeSeed();
      }
      cfg = this.getConfig();
      this.goldRate = (_ref5 = cfg.goldRate) != null ? _ref5 : 1;
      this.xpRate = (_ref6 = cfg.xpRate) != null ? _ref6 : 1;
      this.wxpRate = (_ref7 = cfg.wxpRate) != null ? _ref7 : 1;
      if (this.baseRank == null) {
        this.baseRank = 0;
      }
      if (cfg.rank) {
        this.baseRank = cfg.rank;
      }
      if (this.infiniteLevel != null) {
        this.baseRank += calcInfiniteRank(this.infiniteLevel);
        infiniteLevel = this.infiniteLevel;
        if (infiniteLevel % 10 === 0) {
          this.goldRate *= 1.5;
          this.xpRate *= 1.5;
        } else if (infiniteLevel % 5 === 0) {
          this.goldRate *= 1.3;
          this.xpRate *= 1.3;
        } else {
          this.goldRate = 1.1;
          this.xpRate *= 1.1;
        }
      }
      creation = createUnits(cfg, (function(_this) {
        return function() {
          return _this.rand();
        };
      })(this));
      arrCollectID = [];
      quests = this.quests != null ? this.quests : [];
      for (qid in quests) {
        qst = quests[qid];
        q = queryTable(TABLE_QUEST, qid, this.abIndex);
        _ref8 = q.objects;
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          o = _ref8[_i];
          arrCollectID.push(o.collectId);
        }
      }
      this.unitCreation = creation.map(function(level) {
        return level.filter(function(e) {
          if (e.questOnly) {
            return arrCollectID.indexOf(e.collectId);
          } else {
            return true;
          }
        });
      });
      this.initiateHeroes(this.team);
      this.nextLevel();
      return this.replayActionLog();
    };

    Dungeon.prototype.initiateHeroes = function(team) {
      var e, ref;
      if (!team) {
        team = [];
      }
      ref = 0;
      this.heroes = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = team.length; _i < _len; _i++) {
          e = team[_i];
          _results.push(new Hero({
            name: e.nam,
            "class": e.cid,
            gender: e.gen,
            hairStyle: e.hst,
            hairColor: e.hcl,
            equipment: e.itm,
            xp: e.exp,
            order: ref,
            ref: ref++
          }));
        }
        return _results;
      })();
      this.heroes.push(new Hero({}));
      return this.heroes.forEach(function(e) {
        return e.faction = 'hero';
      });
    };

    Dungeon.prototype.getDummyHero = function() {
      return this.heroes[this.heroes.length - 1];
    };

    Dungeon.prototype.aquireCard = function(id) {
      var card;
      card = new Card(id);
      this.getDummyHero().installSpell(card.func, 1);
      return this.cardStack.add(card, 1, true);
    };

    Dungeon.prototype.costCard = function(slot, count) {
      return this.cardStack.remove(null, count != null ? count : 1, slot);
    };

    Dungeon.prototype.getCard = function(slot) {
      return this.cardStack.get(slot);
    };

    Dungeon.prototype.getInitialInfo = function() {
      return {
        syn: 0,
        pat: this.team,
        stg: this.stage
      };
    };

    Dungeon.prototype.getHeroes = function(all) {
      if (all) {
        return this.heroes;
      } else {
        return this.heroes.slice(0, this.heroes.length - 1);
      }
    };

    Dungeon.prototype.getAliveHeroes = function() {
      return this.heroes.filter(function(h) {
        return (h.health != null) && h.health > 0;
      });
    };

    Dungeon.prototype.getMonsters = function() {
      var _ref5;
      return (_ref5 = this.level) != null ? _ref5.getMonsters().filter(function(o) {
        return o.health > 0;
      }) : void 0;
    };

    Dungeon.prototype.getEnemyOf = function(obj) {
      if (typeof obj.isMonster === "function" ? obj.isMonster() : void 0) {
        return this.getHeroes();
      } else if (typeof obj.isHero === "function" ? obj.isHero() : void 0) {
        return this.getMonsters();
      } else {
        return [];
      }
    };

    Dungeon.prototype.getTeammateOf = function(obj) {
      var list;
      if (obj.isMonster == null) {
        return [];
      }
      list = [];
      if (obj.isMonster()) {
        list = this.getMonsters();
      } else if (obj.isHero()) {
        list = this.getHeroes(true);
      }
      return list.filter(function(o) {
        return o.ref !== obj.ref;
      });
    };

    Dungeon.prototype.getEntrance = function() {
      var _ref5;
      return (_ref5 = this.level) != null ? _ref5.entrance : void 0;
    };

    Dungeon.prototype.getExit = function() {
      var _ref5;
      return (_ref5 = this.level) != null ? _ref5.exit : void 0;
    };

    Dungeon.prototype.moveHeroes = function(positions) {
      var k, obj, p, _ref5, _ref6, _ref7, _results;
      _results = [];
      for (k in positions) {
        p = positions[k];
        if (!((this.heroes[k] != null) && (((_ref5 = this.level) != null ? _ref5.blocks[p] : void 0) != null))) {
          continue;
        }
        obj = this.heroes[k];
        if ((_ref6 = this.level.blocks[obj.pos]) != null) {
          _ref6.removeRef(obj);
        }
        obj.pos = p;
        _results.push((_ref7 = this.level.blocks[obj.pos]) != null ? _ref7.addRef(obj) : void 0);
      }
      return _results;
    };

    Dungeon.prototype.explore = function(tar) {
      var access, i, n, nx, ny, _i, _ref5;
      if (this.level.blocks[tar].explored) {
        return 0;
      }
      if (tar === this.getEntrance()) {
        return 1;
      }
      if (Array.isArray(this.getEntrance()) && this.getEntrance().indexOf(tar) !== -1) {
        return 1;
      }
      access = false;
      for (i = _i = 0; _i <= 3; i = ++_i) {
        nx = tar % DG_LEVELWIDTH;
        ny = Math.floor(tar / DG_LEVELWIDTH);
        switch (i) {
          case 0:
            ny--;
            break;
          case 1:
            nx++;
            break;
          case 2:
            ny++;
            break;
          case 3:
            nx--;
        }
        n = nx + ny * DG_LEVELWIDTH;
        if ((_ref5 = this.level.blocks[n]) != null ? _ref5.explored : void 0) {
          return 1;
        }
      }
      this.onReplayMissMatch();
      return -1;
    };

    Dungeon.prototype.getRank = function() {
      var _ref5;
      return (_ref5 = this.level) != null ? _ref5.rank : void 0;
    };

    Dungeon.prototype.getUnitAtBlock = function(block) {
      var _ref5;
      if (((_ref5 = this.level) != null ? _ref5.blocks[block] : void 0) != null) {
        return this.level.blocks[block].getRef(-1);
      }
    };

    Dungeon.prototype.doAction = function(req) {
      var action, arg, cmd, _ref5;
      cmd = (_ref5 = req != null ? req.CMD : void 0) != null ? _ref5 : req != null ? req.CNF : void 0;
      switch (cmd) {
        case RPC_GameStartDungeon:
          action = DUNGEON_ACTION_ENTER_DUNGEON;
          break;
        case Request_DungeonSpell:
          action = DUNGEON_ACTION_CAST_SPELL;
          break;
        case REQUEST_CancelDungeon:
          action = DUNGEON_ACTION_CANCEL_DUNGEON;
          break;
        case Request_DungeonRevive:
          action = DUNGEON_ACTION_REVIVE;
          break;
        case Request_DungeonCard:
          action = DUNGEON_ACTION_USE_ITEM_SPELL;
          arg = {
            s: +req.arg.slt
          };
          break;
        case Request_DungeonTouch:
          action = DUNGEON_ACTION_TOUCHBLOCK;
          arg = {
            b: +req.arg.tar,
            p: [+req.arg.pos, +req.arg.pos1, +req.arg.pos2]
          };
          break;
        case Request_DungeonExplore:
          action = DUNGEON_ACTION_EXPLOREBLOCK;
          arg = {
            b: +req.arg.tar,
            p: [+req.arg.pos, +req.arg.pos1, +req.arg.pos2]
          };
          break;
        case Request_DungeonActivate:
          action = DUNGEON_ACTION_ACTIVATEMECHANISM;
          arg = {
            t: +req.arg.tar
          };
          break;
        case Request_DungeonAttack:
          action = DUNGEON_ACTION_ATTACK;
          arg = {
            t: +req.arg.tar,
            p: [+req.arg.pos, +req.arg.pos1, +req.arg.pos2]
          };
      }
      return this.act(action, arg);
    };

    Dungeon.prototype.act = function(action, arg, replayMode, showResult, randNumber) {
      var aliveHeroes, cmd, hero, r, ret;
      if (replayMode == null) {
        replayMode = false;
      }
      if (showResult == null) {
        showResult = false;
      }
      if (randNumber == null) {
        randNumber = 0;
      }
      if (replayMode) {
        r = this.rand();
        if (r !== randNumber) {
          if (randNumber !== r) {
            console.log('Unmatched rand number', action, arg, randNumber, r);
          }
          return this.onReplayMissMatch();
        }
      } else {
        if (this.actionLog[this.currentLevel] == null) {
          this.actionLog[this.currentLevel] = [];
        }
        this.actionLog[this.currentLevel].push({
          a: action,
          g: arg,
          r: this.rand()
        });
      }
      ret = [];
      aliveHeroes = this.getAliveHeroes().filter(function(h) {
        return h != null;
      }).sort(function(a, b) {
        return a.order - b.order;
      });
      if ((aliveHeroes != null ? aliveHeroes.length : void 0) > 0) {
        hero = aliveHeroes[0];
      }
      switch (action) {
        case DUNGEON_ACTION_ENTER_DUNGEON:
          ret.push({
            NTF: Event_DungeonEnter,
            arg: this.getInitialInfo()
          });
          cmd = DungeonCommandStream({
            id: 'EnterDungeon'
          }, this);
          cmd.next({
            id: 'ResultCheck'
          });
          cmd.process();
          break;
        case DUNGEON_ACTION_CANCEL_DUNGEON:
          cmd = DungeonCommandStream({
            id: 'CancelDungeon'
          }, this);
          cmd.process();
          break;
        case DUNGEON_ACTION_USE_ITEM_SPELL:
          cmd = DungeonCommandStream({
            id: 'BeginTurn',
            type: 'Item',
            src: hero
          }, this);
          cmd.next({
            id: 'UseItem',
            slot: arg.s
          }).next({
            id: 'EndTurn',
            type: 'Item',
            src: hero
          }).next({
            id: 'ResultCheck'
          });
          cmd.process();
          break;
        case DUNGEON_ACTION_CAST_SPELL:
          hero = this.heroes[0];
          ret = [];
          if (hero.health > 0) {
            cmd = DungeonCommandStream({
              id: 'BeginTurn',
              type: 'Spell',
              src: hero
            }, this);
            cmd.next({
              id: 'CastSpell',
              me: hero,
              spell: hero.activeSpell
            }).next({
              id: 'EndTurn',
              type: 'Spell',
              src: hero
            }).next({
              id: 'ResultCheck'
            });
            cmd.process();
          }
          break;
        case DUNGEON_ACTION_TOUCHBLOCK:
          cmd = DungeonCommandStream({
            id: 'TouchBlock',
            block: arg.b,
            positions: arg.p
          }, this);
          cmd.process();
          break;
        case DUNGEON_ACTION_ATTACK:
          cmd = DungeonCommandStream({
            id: 'InitiateAttack',
            block: arg.t,
            positions: arg.p
          }, this);
          cmd.process();
          break;
        case DUNGEON_ACTION_ACTIVATEMECHANISM:
          cmd = DungeonCommandStream({
            id: 'ActivateMechanism',
            block: arg.t,
            positions: arg.p
          }, this);
          cmd.next({
            id: 'EndTurn',
            type: 'Activate',
            src: hero
          });
          cmd.process();
          break;
        case DUNGEON_ACTION_EXPLOREBLOCK:
          cmd = DungeonCommandStream({
            id: 'BeginTurn',
            type: 'Move',
            src: hero
          }, this);
          cmd.next({
            id: 'ExploreBlock',
            block: arg.b,
            positions: arg.p,
            src: hero
          }).next({
            id: 'EndTurn',
            type: 'Move',
            src: hero
          }).next({
            id: 'ResultCheck'
          });
          cmd.process();
          break;
        case DUNGEON_ACTION_REVIVE:
          this.revive++;
          cmd = DungeonCommandStream({
            id: 'Revive'
          }, this);
          cmd.process();
          break;
        default:
          return this.onReplayMissMatch();
      }
      if (!(!cmd || (replayMode && !showResult))) {
        ret.push({
          NTF: Event_DungeonAction,
          arg: cmd.translate()
        });
      }
      return ret;
    };

    Dungeon.prototype.onReplayMissMatch = function() {
      if (this.replayMode) {
        throw Error('ReplayFailed');
      }
    };

    Dungeon.prototype.replayActionLog = function(actionLog) {
      var actions, _i, _len;
      this.replayMode = true;
      actionLog = actionLog != null ? actionLog : [];
      for (_i = 0, _len = actionLog.length; _i < _len; _i++) {
        actions = actionLog[_i];
        if (actions != null) {
          this.replayActions(actions);
        }
      }
      this.replayMode = false;
      return this.actionLog = actionLog;
    };

    Dungeon.prototype.replayActions = function(actions) {
      var a, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        a = actions[_i];
        _results.push(this.act(a.a, a.g, true, true, a.r));
      }
      return _results;
    };

    Dungeon.prototype.getActionLog = function(level) {
      if (level != null) {
        return this.actionLog[level];
      } else {
        return this.actionLog;
      }
    };

    Dungeon.prototype.nextLevel = function() {
      var cfg, lvConfig;
      this.currentLevel++;
      cfg = this.getConfig();
      if (this.currentLevel < cfg.levelCount) {
        lvConfig = cfg.levels[this.currentLevel];
        this.level = new Level();
        this.level.rand = (function(_this) {
          return function(r) {
            return _this.rand(r);
          };
        })(this);
        this.level.random = (function(_this) {
          return function(r) {
            return _this.random(r);
          };
        })(this);
        Object.defineProperty(this.level, 'random', {
          enumerable: false
        });
        Object.defineProperty(this.level, 'rand', {
          enumerable: false
        });
        return this.level.init(lvConfig, this.baseRank, this.getHeroes(), this.unitCreation[this.currentLevel]);
      }
    };

    return Dungeon;

  })();

  exports.Dungeon = Dungeon;

  Block = (function(_super) {
    __extends(Block, _super);

    function Block() {
      Block.__super__.constructor.apply(this, arguments);
      this.refList = [];
      this.passable = [false, false, false, false];
      this.explored = false;
      this.tileType = Block_Empty;
      this.isBlock = true;
    }

    Block.prototype.addRef = function(obj) {
      return this.refList.push(obj);
    };

    Block.prototype.removeRef = function(obj) {
      return this.refList = this.refList.filter(function(e) {
        return e.ref !== obj.ref;
      });
    };

    Block.prototype.getRef = function(index) {
      var o, _i, _len, _ref5;
      if (index == null) {
        return this.refList;
      }
      if (index !== -1) {
        return this.refList[index];
      }
      _ref5 = this.refList;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        o = _ref5[_i];
        if (o.health > 0) {
          return o;
        }
      }
      return null;
    };

    Block.prototype.getType = function() {
      if (this.tileType === Block_Exit || this.tileType === Block_LockedExit || this.getRef(-1) === null) {
        return this.tileType;
      }
      if (this.getRef(-1) != null) {
        return this.getRef(-1).blockType;
      }
    };

    return Block;

  })(Wizard);

  Level = (function() {
    function Level() {
      this.objects = [];
      this.ref = HEROTAG;
    }

    Level.prototype.init = function(lvConfig, baseRank, heroes, objectConfig) {
      this.objects = this.objects.concat(heroes);
      this.rank = baseRank;
      if (lvConfig.rank != null) {
        this.rank += lvConfig.rank;
      }
      this.generateBlockLayout(lvConfig);
      this.setupEnterAndExit(lvConfig);
      this.placeMapObjects(objectConfig);
      return this.entrance;
    };

    Level.prototype.createBlocks = function() {
      var i;
      this.blocks = [];
      i = 0;
      while (!(i++ >= DG_BLOCKCOUNT)) {
        this.blocks.push(new Block());
      }
      return this.blocks;
    };

    Level.prototype.generateBlockLayout = function(config) {
      var blocks, close, closeCount, e, i, j, k, n, neighbor, neighborCount, ninclose, ninopen, nx, ny, open, openCount, p, x, xx, xy, z, zx, zy, _i, _j, _k, _l, _ref5, _ref6, _ref7, _results, _results1;
      blocks = this.createBlocks();
      for (i in blocks) {
        e = blocks[i];
        e.pos = +i;
      }
      if ((config != null ? config.layout : void 0) != null) {
        _results = [];
        for (k = _i = 0, _ref5 = DG_BLOCKCOUNT - 1; 0 <= _ref5 ? _i <= _ref5 : _i >= _ref5; k = 0 <= _ref5 ? ++_i : --_i) {
          blocks[k].passable = [true, true, true, true];
          if (config.layout[k] & 1) {
            blocks[k].passable[UP] = false;
          }
          if (config.layout[k] & 2) {
            blocks[k].passable[DOWN] = false;
          }
          if (config.layout[k] & 4) {
            blocks[k].passable[LEFT] = false;
          }
          if (config.layout[k] & 8) {
            blocks[k].passable[RIGHT] = false;
          }
          if (config.layout[k] & 16) {
            _results.push(blocks[k].explored = true);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        open = [];
        close = [];
        openCount = 0;
        closeCount = 0;
        neighbor = [];
        neighborCount = 0;
        open[openCount++] = 1;
        open[openCount++] = DG_LEVELWIDTH;
        close[closeCount++] = 0;
        _results1 = [];
        while (openCount !== 0) {
          p = this.rand(openCount);
          x = open[p];
          xx = x % DG_LEVELWIDTH;
          xy = Math.floor(x / DG_LEVELWIDTH);
          neighborCount = 0;
          for (i = _j = 0; _j <= 3; i = ++_j) {
            nx = xx;
            ny = xy;
            switch (i) {
              case UP:
                ny--;
                break;
              case RIGHT:
                nx++;
                break;
              case DOWN:
                ny++;
                break;
              case LEFT:
                nx--;
            }
            if (nx < 0 || ny < 0 || nx >= DG_LEVELWIDTH || ny >= DG_LEVELHEIGHT) {
              continue;
            }
            n = nx + ny * DG_LEVELWIDTH;
            ninclose = false;
            for (j = _k = 0, _ref6 = closeCount - 1; 0 <= _ref6 ? _k <= _ref6 : _k >= _ref6; j = 0 <= _ref6 ? ++_k : --_k) {
              if (close[j] === n) {
                ninclose = true;
                break;
              }
            }
            if (ninclose) {
              neighbor[neighborCount++] = n;
            } else {
              ninopen = false;
              for (j = _l = 0, _ref7 = openCount - 1; 0 <= _ref7 ? _l <= _ref7 : _l >= _ref7; j = 0 <= _ref7 ? ++_l : --_l) {
                if (open[j] === n) {
                  ninopen = true;
                  break;
                }
              }
              if (!ninopen) {
                open[openCount++] = n;
              }
            }
          }
          z = neighbor[this.rand(neighborCount)];
          zx = z % DG_LEVELWIDTH;
          zy = Math.floor(z / DG_LEVELWIDTH);
          if (zx !== xx) {
            if (zx < xx) {
              blocks[z].passable[RIGHT] = true;
              blocks[x].passable[LEFT] = true;
            } else {
              blocks[z].passable[LEFT] = true;
              blocks[x].passable[RIGHT] = true;
            }
          }
          if (zy !== xy) {
            if (zy < xy) {
              blocks[z].passable[DOWN] = true;
              blocks[x].passable[UP] = true;
            } else {
              blocks[z].passable[UP] = true;
              blocks[x].passable[DOWN] = true;
            }
          }
          close[closeCount++] = x;
          if (p !== openCount - 1) {
            open[p] = open[openCount - 1];
          }
          _results1.push(openCount--);
        }
        return _results1;
      }
    };

    Level.prototype.setupEnterAndExit = function(config) {
      this.entrance = this.rand(DG_BLOCKCOUNT);
      if ((config != null ? config.entrance : void 0) != null) {
        this.entrance = config.entrance;
      }
      this.exit = this.rand(DG_BLOCKCOUNT - 1);
      if (this.exit === this.entrance || ((this.entrance.indexOf != null) && this.entrance.indexOf(this.exit) !== -1)) {
        this.exit = DG_BLOCKCOUNT - 1;
      }
      if ((config != null ? config.exit : void 0) != null) {
        this.exit = config.exit;
      }
      if (this.blocks[this.exit] != null) {
        return this.blocks[this.exit].tileType = Block_Exit;
      }
    };

    Level.prototype.lockUp = function(isLock) {
      var _ref5;
      return (_ref5 = this.blocks[this.exit]) != null ? _ref5.tileType = isLock ? Block_LockedExit : Block_Exit : void 0;
    };

    Level.prototype.createObject = function(id, pos, keyed, collectId, effect) {
      var o;
      o = createUnit({
        id: id,
        rank: this.rank,
        pos: pos,
        ref: this.ref,
        keyed: keyed
      });
      o.installSpell(DUNGEON_DROP_CARD_SPELL, 1);
      if (keyed) {
        this.lockUp;
      }
      if (collectId != null) {
        o.collectId = collectId;
      }
      o.effect = effect;
      this.ref += 1;
      this.blocks[pos].addRef(o);
      this.objects.push(o);
      return o;
    };

    Level.prototype.placeObjects = function(id, count, keyed, collectId) {
      var i, indexes, pos, _i, _results;
      indexes = (function() {
        var _i, _ref5, _results;
        _results = [];
        for (i = _i = 0, _ref5 = DG_BLOCKCOUNT - 1; 0 <= _ref5 ? _i <= _ref5 : _i >= _ref5; i = 0 <= _ref5 ? ++_i : --_i) {
          if (this.blocks[i].getType() === Block_Empty) {
            _results.push(i);
          }
        }
        return _results;
      }).call(this);
      if (Array.isArray(this.entrance)) {
        indexes = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = indexes.length; _i < _len; _i++) {
            i = indexes[_i];
            if (this.entrance.indexOf(i) === -1) {
              _results.push(i);
            }
          }
          return _results;
        }).call(this);
      } else {
        indexes = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = indexes.length; _i < _len; _i++) {
            i = indexes[_i];
            if (this.entrance !== i) {
              _results.push(i);
            }
          }
          return _results;
        }).call(this);
      }
      if (!(indexes.length > count)) {
        return [];
      }
      _results = [];
      for (i = _i = 1; 1 <= count ? _i <= count : _i >= count; i = 1 <= count ? ++_i : --_i) {
        pos = indexes.splice(this.rand() % indexes.length, 1)[0];
        _results.push(this.createObject(id, pos, keyed, collectId));
      }
      return _results;
    };

    Level.prototype.placeMapObjects = function(cfg) {
      var o, _i, _j, _len, _len1, _ref5, _results;
      if (cfg == null) {
        return false;
      }
      for (_i = 0, _len = cfg.length; _i < _len; _i++) {
        o = cfg[_i];
        if (o.pos != null) {
          this.createObject(o.id, o.pos, o.keyed, o.collectId);
        }
      }
      _results = [];
      for (_j = 0, _len1 = cfg.length; _j < _len1; _j++) {
        o = cfg[_j];
        if (o.pos == null) {
          _results.push(this.placeObjects(o.id, (_ref5 = o.count) != null ? _ref5 : 1, o.keyed, o.collectId));
        }
      }
      return _results;
    };

    Level.prototype.getMonsters = function() {
      return this.objects.filter(function(e) {
        return e.isMonster();
      });
    };

    Level.prototype.print = function() {
      var b, e, i, row, str, strUp, up, x, y, _i, _j, _k, _len, _ref5, _ref6, _results;
      _results = [];
      for (y = _i = 0, _ref5 = Dungeon_Height - 1; 0 <= _ref5 ? _i <= _ref5 : _i >= _ref5; y = 0 <= _ref5 ? ++_i : --_i) {
        up = [];
        row = [];
        for (x = _j = 0, _ref6 = Dungeon_Width - 1; 0 <= _ref6 ? _j <= _ref6 : _j >= _ref6; x = 0 <= _ref6 ? ++_j : --_j) {
          b = this.blocks[Dungeon_Width * y + x];
          if (Dungeon_Width * y + x === this.entrance || (this.entrance.indexOf != null) && this.entrance.indexOf(Dungeon_Width * y + x) !== -1) {
            row.push('E');
          } else {
            if (b.explored || b.getType() === 1) {
              row.push(b.getType());
            } else {
              row.push(6);
            }
          }
          if (b.passable[RIGHT]) {
            row.push(' ');
          } else {
            row.push('|');
          }
          up.push(b.passable[UP]);
        }
        strUp = ' ';
        for (_k = 0, _len = up.length; _k < _len; _k++) {
          e = up[_k];
          if (e) {
            strUp += '   ';
          } else {
            strUp += '___';
          }
          strUp += ' ';
        }
        console.log(strUp);
        str = '  ';
        for (i in row) {
          e = row[i];
          switch (e) {
            case 0:
              str += '  ';
              break;
            case 1:
              str += 'O ';
              break;
            case 2:
              str += 'X ';
              break;
            case 3:
              str += 'N ';
              break;
            case 5:
              str += 'D ';
              break;
            case 10:
              str += 'H ';
              break;
            case 6:
              str += y * Dungeon_Width + i / 2;
              if (y * Dungeon_Width + i / 2 < 10) {
                str += ' ';
              }
              break;
            default:
              str += e + ' ';
          }
        }
        _results.push(console.log(str));
      }
      return _results;
    };

    return Level;

  })();

  DungeonEnvironment = (function(_super) {
    __extends(DungeonEnvironment, _super);

    function DungeonEnvironment(dungeon) {
      this.dungeon = dungeon;
    }

    DungeonEnvironment.prototype.installTrigger = function(name) {
      return this.dungeon.triggerManager.installTrigger(name);
    };

    DungeonEnvironment.prototype.haveCard = function(card) {
      return this.indexOfCard(card) !== -1;
    };

    DungeonEnvironment.prototype.rand = function() {
      return this.dungeon.random();
    };

    DungeonEnvironment.prototype.getVar = function(key) {
      switch (key) {
        case 'currentLevel':
          return this.getCurrentLevel();
        default:
          return void 0;
      }
    };

    DungeonEnvironment.prototype.doAction = function(act, variables, cmd) {
      var a;
      a = act;
      switch (a.type) {
        case 'dialog':
          return typeof cmd.routine === "function" ? cmd.routine({
            id: 'Dialog',
            dialogId: act.dialogId
          }) : void 0;
        case 'tutorial':
          return typeof cmd.routine === "function" ? cmd.routine({
            id: 'Tutorial',
            tutorialId: act.tutorialId
          }) : void 0;
        case 'modifyEnvVariable':
          return this.variable(a.name, a.value);
        case 'shock':
          return typeof cmd.routine === "function" ? cmd.routine({
            id: 'Shock',
            time: a.time,
            delay: a.delay,
            range: a.range
          }) : void 0;
        case 'blink':
          return typeof cmd.routine === "function" ? cmd.routine({
            id: 'Blink',
            time: a.time,
            delay: a.delay,
            color: a.color
          }) : void 0;
        case 'changeBGM':
          return cmd.routine({
            id: 'ChangeBGM',
            music: a.music,
            repeat: a.repeat
          });
        case 'whiteScreen':
          return cmd.routine({
            id: 'WhiteScreen',
            mode: a.mode,
            time: a.time,
            color: a.color
          });
        case 'playSound':
          return cmd.routine({
            id: 'SoundEffect',
            sound: a.sound
          });
      }
    };

    DungeonEnvironment.prototype.indexOfCard = function(card) {
      if (this.dungeon == null) {
        return -1;
      }
      if (typeof card === 'number') {
        card = this.dungeon.cardStack.filter(function(c) {
          return (c != null) && c.classId === card;
        })[0];
      }
      return this.dungeon.cardStack.queryItemSlot(card);
    };

    DungeonEnvironment.prototype.getTeammateOf = function(wizard) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getTeammateOf(wizard) : void 0;
    };

    DungeonEnvironment.prototype.getEnemyOf = function(wizard) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getEnemyOf(wizard) : void 0;
    };

    DungeonEnvironment.prototype.getCardStack = function() {
      if (this.dungeon != null) {
        return this.dungeon.cardStack.container;
      } else {
        return [];
      }
    };

    DungeonEnvironment.prototype.getFactionConfig = function(src, tar, flag) {
      var factionDB;
      factionDB = this.dungeon.factionDB;
      if (!((factionDB != null) && (factionDB[src] != null) && (factionDB[src][tar] != null))) {
        return false;
      }
      if (flag != null) {
        return factionDB[src][tar][flag];
      }
      return factionDB[src][tar][flag];
    };

    DungeonEnvironment.prototype.isEntranceExplored = function() {
      var e, entrance, _i, _len, _ref5, _ref6;
      entrance = this.dungeon.getEntrance();
      if (Array.isArray(entrance)) {
        for (_i = 0, _len = entrance.length; _i < _len; _i++) {
          e = entrance[_i];
          if (!this.dungeon.level.blocks[e].explored) {
            return false;
          }
        }
        return true;
      } else {
        return (_ref5 = this.dungeon) != null ? (_ref6 = _ref5.level) != null ? _ref6.blocks[entrance].explored : void 0 : void 0;
      }
    };

    DungeonEnvironment.prototype.getAliveHeroes = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getAliveHeroes() : void 0;
    };

    DungeonEnvironment.prototype.getHeroes = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getHeroes() : void 0;
    };

    DungeonEnvironment.prototype.getMonsters = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getMonsters() : void 0;
    };

    DungeonEnvironment.prototype.getObjects = function() {
      var _ref5, _ref6;
      return (_ref5 = this.dungeon) != null ? (_ref6 = _ref5.level) != null ? _ref6.objects : void 0 : void 0;
    };

    DungeonEnvironment.prototype.getBlock = function(id) {
      var _ref5;
      if (((_ref5 = this.dungeon) != null ? _ref5.level : void 0) == null) {
        return [];
      }
      if (id == null) {
        return this.dungeon.level.blocks;
      }
      return this.dungeon.level.blocks[id];
    };

    DungeonEnvironment.prototype.initiateHeroes = function(data) {
      var heroes, objects;
      this.dungeon.initiateHeroes(data);
      heroes = this.dungeon.getAliveHeroes();
      objects = this.dungeon.level.objects;
      return this.dungeon.level.objects = heroes.concat(objects.slice(heroes.length, objects.length));
    };

    DungeonEnvironment.prototype.incrReviveCount = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.reviveCount++ : void 0;
    };

    DungeonEnvironment.prototype.getInitialData = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getInitialData() : void 0;
    };

    DungeonEnvironment.prototype.getEntrance = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getEntrance() : void 0;
    };

    DungeonEnvironment.prototype.getExit = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getExit() : void 0;
    };

    DungeonEnvironment.prototype.lockUp = function(flag) {
      var _ref5, _ref6;
      return (_ref5 = this.dungeon) != null ? (_ref6 = _ref5.level) != null ? _ref6.lockUp(flag) : void 0 : void 0;
    };

    DungeonEnvironment.prototype.exploreBlock = function(block) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.explore(block) : void 0;
    };

    DungeonEnvironment.prototype.newFaction = function(name) {
      return this.dungeon.newFaction(name);
    };

    DungeonEnvironment.prototype.factionAttack = function(src, dst, flag) {
      return this.dungeon.factionAttack(src, dst, flag);
    };

    DungeonEnvironment.prototype.factionHeal = function(src, dst, flag) {
      return this.dungeon.factionHeal(src, dst, flag);
    };

    DungeonEnvironment.prototype.getObjectAtBlock = function(block) {
      return this.getBlock(block).getRef(-1);
    };

    DungeonEnvironment.prototype.getCurrentLevel = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.currentLevel : void 0;
    };

    DungeonEnvironment.prototype.moveHeroes = function(positions) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.moveHeroes(positions) : void 0;
    };

    DungeonEnvironment.prototype.compete = function(type, a, b) {
      switch (type) {
        case 'speed':
          return this.dungeon.speedCompete(a, b);
        case 'hit':
          return this.dungeon.hitCompete(a, b);
        case 'critical':
          return this.dungeon.criticalCompete(a, b);
      }
    };

    DungeonEnvironment.prototype.incrEffectCount = function() {
      return this.dungeon.effectCounter++;
    };

    DungeonEnvironment.prototype.aquireCard = function(id) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.aquireCard(id) : void 0;
    };

    DungeonEnvironment.prototype.costCard = function(slot, count) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.costCard(slot, count) : void 0;
    };

    DungeonEnvironment.prototype.getCard = function(slot) {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.getCard(slot) : void 0;
    };

    DungeonEnvironment.prototype.getQuests = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.quests : void 0;
    };

    DungeonEnvironment.prototype.nextLevel = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.nextLevel() : void 0;
    };

    DungeonEnvironment.prototype.isDungeonFinished = function() {
      return this.dungeon.currentLevel >= this.dungeon.getConfig().levelCount;
    };

    DungeonEnvironment.prototype.createObject = function(classID, pos, withkey, collectId, effect) {
      var _ref5, _ref6;
      return (_ref5 = this.dungeon) != null ? (_ref6 = _ref5.level) != null ? _ref6.createObject(classID, pos, withkey, collectId, effect) : void 0 : void 0;
    };

    DungeonEnvironment.prototype.useItem = function(spell, level, cmd) {
      return this.dungeon.getDummyHero().castSpell(spell, level, cmd);
    };

    DungeonEnvironment.prototype.getReviveCount = function() {
      var _ref5;
      return (_ref5 = this.dungeon) != null ? _ref5.revive : void 0;
    };

    DungeonEnvironment.prototype.createSpellMsg = function(actor, spell, delay) {
      var ev, ret;
      if (!((actor != null) && (spell != null))) {
        return [];
      }
      ret = [];
      if (spell.motion != null) {
        ev = {
          id: ACT_SPELL,
          spl: spell.motion
        };
        if (actor.isBlock) {
          ev.pos = +actor.pos;
        } else {
          ev.act = actor.ref;
        }
        ret.push(ev);
      }
      if (spell.effect != null) {
        delay = delay;
        if (spell.delay != null) {
          delay += spell.delay;
        }
        ev = {
          id: ACT_EFFECT,
          dey: delay,
          eff: spell.effect
        };
        if (actor.isBlock) {
          ev.pos = +actor.pos;
        } else {
          ev.act = actor.ref;
        }
        ret.push(ev);
      }
      return ret;
    };

    DungeonEnvironment.prototype.notifyTurnEvent = function(isBegin, turnType, src, tar, cmd) {
      var allEvent, basicEvent, e, tailString, turnEvent, _i, _len, _ref5;
      tailString = isBegin ? 'Begin' : 'End';
      allEvent = 'on' + turnType + 'Turn' + tailString;
      turnEvent = 'onTurn' + tailString;
      _ref5 = this.getMonsters().concat(this.getHeroes()).concat(this.getBlock());
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        e = _ref5[_i];
        e.onEvent(allEvent, cmd);
        e.onEvent(turnEvent, cmd);
      }
      basicEvent = tailString + turnType + 'Turn';
      return onEvent(basicEvent, cmd, src, tar);
    };

    DungeonEnvironment.prototype.onEvent = function(event, cmd) {
      return this.dungeon.onEvent(event, cmd);
    };

    DungeonEnvironment.prototype.getFirstPace = function(pace) {
      var count, i, p, pPace;
      pPace = [];
      if (Array.isArray(pace[0])) {
        pPace = pace.splice(0, 1)[0];
      } else if (pace[0] != null) {
        count = 0;
        for (i in pace) {
          p = pace[i];
          if (Array.isArray(p)) {
            count = 1;
            break;
          }
          count++;
        }
        pPace = pace.splice(0, count);
      }
      return pPace;
    };

    DungeonEnvironment.prototype.mergeFirstPace = function(prev, next) {
      var i, nPace, nextPace, nonInstant, p, pPace, ret;
      pPace = this.getFirstPace(prev);
      nPace = this.getFirstPace(next);
      nonInstant = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = pPace.length; _i < _len; _i++) {
          p = pPace[_i];
          if (!isInstantAction(p.id) && (p.act != null)) {
            _results.push(p.act);
          }
        }
        return _results;
      })();
      nextPace = [];
      for (i in nPace) {
        p = nPace[i];
        if (!isInstantAction(p.id) && nonInstant.indexOf(p.act) !== -1) {
          if (p.id !== ACT_HURT) {
            nextPace.push(p);
          }
        } else {
          pPace.push(p);
        }
      }
      nPace = nextPace;
      ret = [];
      if (pPace.length > 1) {
        ret.push(pPace);
      } else {
        ret = ret.concat(pPace);
      }
      ret = ret.concat(prev);
      if (nPace.length > 1) {
        ret.push(nPace);
      } else {
        ret = ret.concat(nPace);
      }
      ret = ret.concat(next);
      return ret;
    };

    DungeonEnvironment.prototype.pacelize = function(pace) {
      var p, _i, _len;
      if (pace.length <= 1) {
        return pace;
      }
      for (_i = 0, _len = pace.length; _i < _len; _i++) {
        p = pace[_i];
        if (Array.isArray(p)) {
          return pace;
        }
      }
      return [pace];
    };

    DungeonEnvironment.prototype.translateDungeonAction = function(cmd) {
      var currentPace, i, routine, _ref5;
      if (cmd == null) {
        return [];
      }
      currentPace = cmd.output();
      if (currentPace == null) {
        currentPace = [];
      }
      _ref5 = cmd.cmdRoutine;
      for (i in _ref5) {
        routine = _ref5[i];
        currentPace = this.mergeFirstPace(currentPace, this.translateDungeonAction(routine));
      }
      return this.pacelize(currentPace).concat(this.translateDungeonAction(cmd.nextCMD));
    };

    DungeonEnvironment.prototype.translate = function(cmd) {
      return this.translateDungeonAction(cmd);
    };

    return DungeonEnvironment;

  })(Environment);

  DungeonCommandStream = function(cmd, dungeon) {
    var cmdStream, env;
    if (dungeon == null) {
      dungeon = null;
    }
    env = new DungeonEnvironment(dungeon);
    cmdStream = new CommandStream(cmd, null, dungeonCSConfig, env);
    return cmdStream;
  };

  genUnitInfo = function(h, withBasicInfo, buffState) {
    var flag, k, state, unitInfo;
    if (withBasicInfo == null) {
      withBasicInfo = false;
    }
    if (buffState == null) {
      buffState = null;
    }
    if ((h != null ? h.ref : void 0) == null) {
      return null;
    }
    unitInfo = {
      id: ACT_UnitInfo,
      ref: h.ref
    };
    flag = false;
    if (buffState) {
      for (k in buffState) {
        state = buffState[k];
        unitInfo[k] = state;
        flag = true;
      }
    }
    if (withBasicInfo) {
      unitInfo.hp = h.health;
      unitInfo.dc = h.attack;
      unitInfo.od = h.order;
      flag = true;
    }
    if (flag) {
      return unitInfo;
    } else {
      return null;
    }
  };

  dungeonCSConfig = {
    EnterDungeon: {
      callback: function(env) {
        this.routine({
          id: 'EnterLevel'
        });
        return this.routine({
          id: 'UpdateLockStatues'
        });
      },
      output: function(env) {
        var c, ev, _i, _len, _ref5;
        ev = [];
        _ref5 = env.getCardStack();
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          c = _ref5[_i];
          if (c != null) {
            ev.push({
              id: ACT_DROPITEM,
              sid: env.indexOfCard(c),
              typ: c.id,
              cnt: c.count
            });
          }
        }
        return ev;
      }
    },
    EnterLevel: {
      callback: function(env) {
        var e, entrance, i, monster, newPosition, _i, _j, _k, _l, _len, _len1, _ref5, _ref6, _ref7, _ref8;
        entrance = env.getEntrance();
        env.onEvent('onEnterLevel', this);
        if (Array.isArray(entrance)) {
          newPosition = entrance;
          for (i = _i = _ref5 = newPosition.length, _ref6 = env.getHeroes().length - 1; _ref5 <= _ref6 ? _i <= _ref6 : _i >= _ref6; i = _ref5 <= _ref6 ? ++_i : --_i) {
            newPosition.push(entrance[0]);
          }
        } else {
          newPosition = [entrance, entrance, entrance];
        }
        if (env.isEntranceExplored()) {
          for (e = _j = 0, _ref7 = DG_BLOCKCOUNT - 1; 0 <= _ref7 ? _j <= _ref7 : _j >= _ref7; e = 0 <= _ref7 ? ++_j : --_j) {
            if (env.getBlock(e).explored) {
              this.routine({
                id: 'OpenBlock',
                block: e
              });
            }
          }
        } else {
          if (Array.isArray(entrance)) {
            for (_k = 0, _len = entrance.length; _k < _len; _k++) {
              e = entrance[_k];
              this.routine({
                id: 'ExploreBlock',
                block: e,
                positions: entrance
              });
            }
          } else {
            this.routine({
              id: 'ExploreBlock',
              block: entrance
            });
          }
        }
        env.moveHeroes(newPosition);
        _ref8 = env.getMonsters();
        for (_l = 0, _len1 = _ref8.length; _l < _len1; _l++) {
          monster = _ref8[_l];
          monster.onEvent('onEnterLevel', this);
        }
        return this.routine({
          id: 'TickSpell'
        });
      },
      output: function(env) {
        var ev, h, heroInfo, positions, ret, _ref5, _ref6, _ref7, _ref8;
        ev = {
          id: ACT_EnterLevel,
          "lvl": env.getCurrentLevel()
        };
        positions = (function() {
          var _i, _len, _ref5, _results;
          _ref5 = env.getHeroes();
          _results = [];
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            h = _ref5[_i];
            _results.push(h.pos);
          }
          return _results;
        })();
        if (((_ref5 = env.getHeroes()[0]) != null ? _ref5.health : void 0) > 0) {
          ev.pos = positions[0];
        }
        if (((_ref6 = env.getHeroes()[1]) != null ? _ref6.health : void 0) > 0) {
          ev.pos1 = positions[1];
        }
        if (((_ref7 = env.getHeroes()[2]) != null ? _ref7.health : void 0) > 0) {
          ev.pos2 = positions[2];
        }
        if (((_ref8 = env.getHeroes()[3]) != null ? _ref8.health : void 0) > 0) {
          ev.pos3 = positions[3];
        }
        heroInfo = env.getAliveHeroes().filter(function(e) {
          return (e != null ? e.ref : void 0) != null;
        }).sort(function(a, b) {
          return a.order - b.order;
        }).map(function(h, index) {
          var k, t, v;
          t = {};
          for (k in h) {
            v = h[k];
            t[k] = v;
          }
          t.order = index;
          return t;
        }).map(function(h) {
          return genUnitInfo(h, true);
        }).filter(function(e) {
          return e != null;
        });
        ret = [ev];
        ret = ret.concat(heroInfo);
        return ret;
      }
    },
    ExploreBlock: {
      callback: function(env) {
        var block, positions, res, _ref5;
        block = env.variable('block');
        res = env.exploreBlock(block);
        env.variable('exploreResult', res);
        if (res === 1) {
          this.routine({
            id: 'OpenBlock',
            block: block
          });
          positions = (_ref5 = env.variable('positions')) != null ? _ref5 : [block, block, block];
          return env.moveHeroes(positions);
        }
      },
      output: function(env) {
        switch (env.variable('exploreResult')) {
          case -1:
            return {
              id: ACT_POPTEXT,
              arg: 'Invalid move'
            };
          case 0:
            return {
              id: ACT_POPTEXT,
              arg: 'Explored block'
            };
          default:
            return [];
        }
      }
    },
    SpellCD: {
      output: function(env) {
        if (env.variable('cdInfo') != null) {
          return [
            {
              id: ACT_SkillCD,
              cd: env.variable('cdInfo')
            }
          ];
        }
      }
    },
    SpellState: {
      output: function(env) {
        var actor, bid, effect, ev, ret;
        ret = genUnitInfo(env.variable('wizard'), false, env.variable('state'));
        if (env.variable('effect') != null) {
          effect = env.variable('effect');
          if (ret != null) {
            ret = [ret];
          }
          bid = effect.id;
          actor = env.variable('wizard');
          ev = {
            id: ACT_EFFECT,
            eff: bid
          };
          if (effect.uninstall) {
            ev.rmf = true;
          }
          ev.sid = actor.isBlock ? (actor.pos + 1) * 100 + bid : (actor.ref + 1) * 1000 + bid;
          if (actor.isBlock) {
            ev.pos = +actor.pos;
          } else {
            ev.act = actor.ref;
          }
          ret.push(ev);
        }
        if (ret != null) {
          return ret;
        } else {
          return [];
        }
      }
    },
    TickSpell: {
      callback: function(env) {
        var h, _i, _len, _ref5, _results;
        _ref5 = env.getHeroes().concat(env.getMonsters());
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          h = _ref5[_i];
          _results.push(h.tickSpell(env.variable('tickType'), this));
        }
        return _results;
      }
    },
    OpenBlock: {
      callback: function(env) {
        var block, e;
        if (env.getBlock(env.variable('block')) == null) {
          return this.suicide();
        }
        env.getBlock(env.variable('block')).explored = true;
        this.routine({
          id: 'BlockInfo',
          block: env.variable('block')
        });
        block = env.getBlock(env.variable('block'));
        if (block.getType() === Block_Npc || block.getType() === Block_Enemy) {
          e = block.getRef(-1);
          this.routine({
            id: 'UnitInfo',
            unit: e
          });
          env.variable('monster', e);
          env.variable('tar', e);
          e.onEvent('onShow', this);
          env.onEvent('onMonsterShow', this);
          if ((e != null ? e.isVisible : void 0) !== true) {
            return e.isVisible = true;
          }
        }
      }
    },
    BlockInfo: {
      output: function(env) {
        var block, blockEv, passable, pos, _i, _len, _ref5;
        pos = env.variable('block');
        block = env.getBlock(pos);
        blockEv = {
          id: ACT_Block,
          pos: +pos,
          typ: block.getType(),
          pas: ''
        };
        if (block.proxy != null) {
          blockEv.trs = block.proxy;
        }
        _ref5 = block.passable;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          passable = _ref5[_i];
          if (passable) {
            blockEv.pas += '1';
          } else {
            blockEv.pas += '0';
          }
        }
        return [blockEv];
      }
    },
    UnitInfo: {
      output: function(env) {
        var e, eEv;
        e = env.variable('unit');
        if (e.dead) {
          return [];
        }
        eEv = {
          id: ACT_Enemy,
          pos: e.pos,
          rid: e.id,
          hp: e.health,
          ref: e.ref,
          typ: e.type
        };
        if (e.attack != null) {
          eEv.dc = e.attack;
        }
        if (e.effect != null) {
          eEv.eff = e.effect;
        }
        if (getBasicInfo(e)) {
          eEv.role = getBasicInfo(e);
        }
        return [eEv];
      }
    },
    TouchBlock: {
      callback: function(env) {
        var aliveHeroes, block, hero, tar;
        env.onEvent('onTouchBlock', this);
        block = env.getBlock(env.variable('block'));
        if (block.explored) {
          tar = env.getObjectAtBlock(env.variable('block'));
          aliveHeroes = env.getAliveHeroes().filter(function(h) {
            return h != null;
          }).sort(function(a, b) {
            return a.order - b.order;
          });
          if ((aliveHeroes != null ? aliveHeroes.length : void 0) > 0) {
            hero = aliveHeroes[0];
          }
          if ((tar != null) && (hero != null)) {
            if (env.getFactionConfig(hero.faction, tar.faction, 'attackable')) {
              return this.routine({
                id: 'InitiateAttack',
                src: hero,
                tar: enemy
              });
            }
          } else {
            return this.routine({
              id: 'ActivateMechanism',
              block: env.variable('block')
            });
          }
        } else {
          return this.routine({
            id: 'ExploreBlock',
            block: env.variable('block')
          });
        }
      }
    },
    InitiateAttack: {
      callback: function(env) {
        var a, aliveHeroes, attackActions, cmd, enemy, hero, _i, _len;
        enemy = env.getObjectAtBlock(env.variable('block'));
        aliveHeroes = env.getAliveHeroes().filter(function(h) {
          return h != null;
        }).sort(function(a, b) {
          return a.order - b.order;
        });
        if ((aliveHeroes != null ? aliveHeroes.length : void 0) > 0) {
          hero = aliveHeroes[0];
        }
        if (!((enemy != null) && (hero != null))) {
          return this.suicide();
        }
        if (env.variable('positions')) {
          env.moveHeroes(env.variable('positions'));
        }
        attackActions = [
          {
            attacker: hero,
            attackee: enemy
          }
        ];
        if (enemy.counterAttack) {
          if (env.compete('speed', hero.speed, enemy.speed)) {
            attackActions.push({
              attacker: enemy,
              attackee: hero
            });
          } else {
            attackActions.splice(0, 0, {
              attacker: enemy,
              attackee: hero
            });
          }
        }
        hero.order += env.getHeroes().length;
        cmd = this.next({
          id: 'BeginTurn',
          type: 'Battle',
          src: hero,
          tar: enemy
        });
        for (_i = 0, _len = attackActions.length; _i < _len; _i++) {
          a = attackActions[_i];
          cmd = cmd.next({
            id: 'Attack',
            tar: a.attackee,
            src: a.attacker
          });
        }
        cmd = cmd.next({
          id: 'EndTurn',
          type: 'Battle',
          src: hero,
          tar: enemy
        });
        if ((aliveHeroes != null ? aliveHeroes.length : void 0) > 1) {
          cmd = cmd.next({
            id: 'ShiftOrder'
          });
        }
        return cmd.next({
          id: 'ResultCheck'
        });
      }
    },
    BeginTurn: {
      callback: function(env) {
        env.notifyTurnEvent(true, env.variable('type'), env.variable('src'), env.variable('tar'), this);
        return this.routine({
          id: 'TickSpell',
          tickType: env.variable('type')
        });
      }
    },
    EndTurn: {
      callback: function(env) {
        env.notifyTurnEvent(false, env.variable('type'), env.variable('src'), env.variable('tar'), this);
        return this.routine({
          id: 'UpdateLockStatues'
        });
      }
    },
    Attack: {
      callback: function(env) {
        var src, tar;
        src = env.variable('src');
        tar = env.variable('tar');
        if (!(src.health > 0 && tar.health > 0)) {
          return this.suicide();
        }
        env.variable('damage', src.attack);
        onEvent('Target', this, src, tar);
        env.variable('hit', env.compete('hit', src.accuracy, tar.reactivity));
        onEvent('Hit', this, env.variable('src'), env.variable('tar'));
        if (env.variable('hit')) {
          return this.routine({
            id: 'Damage',
            ignoreHurt: env.variable('ignoreHurt'),
            src: env.variable('src'),
            tar: env.variable('tar'),
            damage: env.variable('damage'),
            damageType: 'Physical',
            hurtDelay: env.variable('hurtDelay'),
            hpDelay: env.variable('hpDelay'),
            isRange: env.variable('isRange')
          });
        } else {
          return this.routine({
            id: 'Evade',
            src: tar
          });
        }
      },
      output: function(env) {
        var flag;
        flag = env.variable('hit') ? HP_RESULT_TYPE_HIT : HP_RESULT_TYPE_MISS;
        return [
          {
            act: env.variable('src').ref,
            id: ACT_ATTACK,
            ref: env.variable('tar').ref,
            res: flag
          }
        ];
      }
    },
    ShiftOrder: {
      output: function(env) {
        return [
          {
            id: ACT_SHIFTORDER
          }
        ];
      }
    },
    CancelDungeon: {
      callback: function(env) {
        return this.routine({
          id: 'ClaimResult',
          win: DUNGEON_RESULT_FAIL
        });
      }
    },
    ClaimResult: {
      callback: function(env) {
        env.onEvent('onClaimResult', this);
        return env.dungeon.result = env.variable('win');
      },
      output: function(env) {
        return [
          {
            id: ACT_DungeonResult,
            win: env.variable('win')
          }
        ];
      }
    },
    AllHeroAreDead: {
      output: function(env) {
        return [
          {
            id: ACT_AllHeroAreDead,
            cnt: env.getReviveCount()
          }
        ];
      }
    },
    Revive: {
      callback: function(env) {
        var p, _i, _len, _ref5, _ref6, _results;
        env.initiateHeroes(env.getInitialData().team);
        env.incrReviveCount();
        _ref5 = env.getAliveHeroes();
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          p = _ref5[_i];
          _results.push(p.pos = (_ref6 = env.getEntrance()[0]) != null ? _ref6 : env.getEntrance());
        }
        return _results;
      },
      output: function(env) {
        var p, ret;
        ret = (function() {
          var _i, _len, _ref5, _results;
          _ref5 = env.getAliveHeroes();
          _results = [];
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            p = _ref5[_i];
            _results.push({
              id: ACT_Enemy,
              pos: p.pos,
              rid: p["class"],
              hp: p.health,
              dc: p.attack,
              ref: p.ref,
              typ: Unit_Hero
            });
          }
          return _results;
        })();
        ret.push({
          id: ACT_SkillCD,
          cd: 0
        });
        return ret;
      }
    },
    ResultCheck: {
      callback: function(env) {
        var win;
        win = env.isDungeonFinished();
        if (win) {
          if (env.dungeon.getConfig().collectId) {
            this.routine({
              id: 'CollectID',
              collectId: env.dungeon.getConfig().collectId
            });
          }
          this.routine({
            id: 'ClaimResult',
            win: DUNGEON_RESULT_WIN
          });
        }
        if (env.getAliveHeroes().length <= 0) {
          return this.routine({
            id: 'AllHeroAreDead'
          });
        }
      }
    },
    ShowExit: {
      callback: function(env) {
        return this.routine({
          id: 'OpenBlock',
          block: env.getExit()
        });
      }
    },
    Delay: {
      output: function(env) {
        if (env.variable('delay')) {
          return [
            {
              id: ACT_Delay,
              tim: env.variable('delay')
            }
          ];
        } else {
          return [];
        }
      }
    },
    SoundEffect: {
      output: function(env) {
        return [
          {
            id: ACT_PlaySound,
            sod: env.variable('sound')
          }
        ];
      }
    },
    SpellAction: {
      output: function(env) {
        return [
          {
            id: ACT_SPELL,
            spl: env.variable('motion'),
            act: env.variable('ref')
          }
        ];
      }
    },
    Blink: {
      output: function(env) {
        var evt;
        evt = {
          id: ACT_Blink,
          dey: env.variable('delay'),
          tim: env.variable('time')
        };
        if (env.variable('color') != null) {
          evt.col = env.variable('color');
        }
        return [evt];
      }
    },
    Shock: {
      output: function(env) {
        var evt;
        evt = {
          id: ACT_Shock,
          dey: env.variable('delay'),
          tim: env.variable('time')
        };
        if (env.variable('range') != null) {
          evt.rag = env.variable('range');
        }
        return [evt];
      }
    },
    Dialog: {
      output: function(env) {
        return [
          {
            id: ACT_Dialog,
            did: env.variable('dialogId')
          }
        ];
      }
    },
    Tutorial: {
      output: function(env) {
        return [
          {
            id: ACT_Tutorial,
            tid: env.variable('tutorialId')
          }
        ];
      }
    },
    ChangeBGM: {
      output: function(env) {
        var evt;
        evt = {
          id: ACT_ChangeBGM
        };
        if (env.variable('music') != null) {
          evt.mus = env.variable('music');
        }
        if (env.variable('repeat') != null) {
          evt.rep = env.variable('repeat');
        }
        return [evt];
      }
    },
    ChainBlock: {
      callback: function(env) {
        var src;
        src = env.getBlock(env.variable('src'));
        if (src != null) {
          src.proxy = env.variable('tar');
        }
        if (env.getBlock(env.variable('src')).explored) {
          return this.routine({
            id: 'BlockInfo',
            block: env.variable('src')
          });
        }
      }
    },
    EndDungeon: {
      callback: function(env) {
        return this.routine({
          id: 'ClaimResult',
          win: env.variable('result')
        });
      }
    },
    WhiteScreen: {
      output: function(env) {
        return [
          {
            id: ACT_WhiteScreen,
            mod: env.variable('mode'),
            tim: env.variable('time'),
            col: env.variable('color')
          }
        ];
      }
    },
    Kill: {
      callback: function(env) {
        env.variable('tar').health = 0;
        if (!env.variable('tar').isVisible) {
          env.variable('tar').dead = true;
        }
        return this.routine({
          id: 'Dead',
          tar: env.variable('tar'),
          cod: env.variable('cod')
        });
      }
    },
    ShowUp: {
      callback: function(env) {
        var tar;
        tar = env.variable('tar');
        tar.isVisible = true;
        return this.routine({
          id: 'OpenBlock',
          block: tar.pos
        });
      }
    },
    TeleportObject: {
      callback: function(env) {
        var availableSlot, obj, slot;
        obj = env.variable('obj');
        if (!(obj.health > 0)) {
          return this.suicide();
        }
        slot = env.variable('tarPos');
        if (slot == null) {
          availableSlot = env.getBlock().filter(function(e) {
            return e.getType() === Block_Empty;
          });
          slot = env.randMember(availableSlot);
          if (slot != null) {
            slot = slot.pos;
          }
        }
        if (slot == null) {
          return this.suicide();
        }
        env.variable('orgPos', obj.pos);
        env.variable('tarPos', slot);
        env.getBlock(slot).explored = true;
        env.getBlock(obj.pos).removeRef(obj);
        env.getBlock(slot).addRef(obj);
        obj.pos = slot;
        if (!(env.variable('obj').health > 0)) {
          return this.suicide();
        }
        return this.routine({
          id: 'BlockInfo',
          block: env.variable('tarPos')
        });
      },
      output: function(env) {
        return [
          {
            act: env.variable('obj').ref,
            id: ACT_TELEPORT,
            pos: env.variable('tarPos')
          }
        ];
      }
    },
    DropItem: {
      callback: function(env) {
        var card, dropList, ret;
        dropList = env.variable('list');
        card = selectElementFromWeightArray(dropList, env.rand());
        ret = env.aquireCard(card.item);
        if (!(ret.length > 0)) {
          return this.suicide();
        }
        ret = ret[0];
        env.variable('slot', ret.slot);
        env.variable('type', ret.id);
        return env.variable('count', ret.count);
      },
      output: function(env) {
        return [
          {
            id: ACT_DROPITEM,
            sid: +env.variable('slot'),
            typ: env.variable('type'),
            cnt: env.variable('count')
          }
        ];
      }
    },
    Casting: {
      output: function(env) {
        var delay, info, ret, spell, src, t, tar, _i, _len;
        src = env.variable('caster');
        tar = env.variable('castee');
        spell = env.variable('spell');
        delay = env.variable('delay');
        if ((spell != null) && (src != null)) {
          ret = env.createSpellMsg(src, {
            motion: spell.spellAction,
            delay: spell.spellDelay,
            effect: spell.spellEffect
          }, delay);
        }
        if (tar != null) {
          info = {
            motion: spell.targetAction,
            delay: spell.targetDelay,
            effect: spell.targetEffect
          };
          for (_i = 0, _len = tar.length; _i < _len; _i++) {
            t = tar[_i];
            ret = ret.concat(env.createSpellMsg(t, info, delay));
          }
        }
        return ret;
      }
    },
    Effect: {
      output: function(env) {
        if (env.variable('pos') != null) {
          return [
            {
              id: ACT_EFFECT,
              dey: env.variable('delay'),
              eff: env.variable('effect'),
              pos: env.variable('pos')
            }
          ];
        } else {
          return [
            {
              id: ACT_EFFECT,
              dey: env.variable('delay'),
              eff: env.variable('effect'),
              act: env.variable('act')
            }
          ];
        }
      }
    },
    CastSpell: {
      callback: function(env) {
        return env.variable('me').castSpell(env.variable('spell'), null, this);
      }
    },
    UseItem: {
      callback: function(env) {
        var card;
        card = env.getCard(env.variable('slot'));
        if (card != null) {
          return env.useItem(card.func, 1, this);
        }
      }
    },
    Resurrect: {
      callback: function(env) {
        var t, _i, _len, _ref5, _results;
        _ref5 = env.variable('tar');
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          t = _ref5[_i];
          if (t.maxHP) {
            _results.push(t.health = Math.ceil(t.maxHP * 0.2));
          }
        }
        return _results;
      },
      output: function(env) {
        var t, _i, _len, _ref5, _results;
        _ref5 = env.variable('tar');
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          t = _ref5[_i];
          _results.push({
            id: ACT_UnitInfo,
            ref: t.ref,
            hp: t.health
          });
        }
        return _results;
      }
    },
    CostCard: {
      callback: function(env) {
        var c, card, h, i, indexes, ret, slot, _i, _len, _ref5, _ref6;
        slot = env.variable('slot');
        card = env.variable('card');
        if (env.variable('randCost')) {
          indexes = env.getCardStack().map(function(c, i) {
            if (c != null) {
              return i;
            } else {
              return -1;
            }
          }).filter(function(i) {
            return i !== -1;
          });
          slot = env.randMember(indexes);
        } else if (card != null) {
          _ref5 = env.getCardStack();
          for (i in _ref5) {
            c = _ref5[i];
            if ((c != null ? c.classId : void 0) === card) {
              slot = i;
            }
          }
        }
        if (env.getCard(slot) == null) {
          return this.suicide();
        }
        env.variable('costCard', true);
        _ref6 = env.getHeroes();
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          h = _ref6[_i];
          h.onEvent('onCostCard', this);
        }
        if (!env.variable('costCard')) {
          return this.suicide();
        }
        ret = env.costCard(slot, 1);
        if (!((ret != null ? ret.length : void 0) > 0)) {
          return this.suicide();
        }
        ret = ret[0];
        env.variable('slot', ret.slot);
        env.variable('type', ret.id);
        return env.variable('count', ret.count);
      },
      output: function(env) {
        return [
          {
            id: ACT_DROPITEM,
            sid: +env.variable('slot'),
            typ: env.variable('type'),
            cnt: env.variable('count')
          }
        ];
      }
    },
    CreateObject: {
      callback: function(env) {
        var availableSlot, count, p, pos, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref5, _results;
        pos = env.variable('pos');
        if (pos == null) {
          availableSlot = env.getBlock().filter(function(e) {
            return e.getType() === Block_Empty;
          });
          count = 1;
          if (env.variable('count') != null) {
            count = env.variable('count');
          }
          pos = env.randMember(availableSlot, count);
          if (!Array.isArray(pos)) {
            pos = [pos];
          }
          pos = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = pos.length; _i < _len; _i++) {
              p = pos[_i];
              _results.push(p.pos);
            }
            return _results;
          })();
        }
        if (!Array.isArray(pos)) {
          pos = [pos];
        }
        env.variable('pos', pos);
        for (_i = 0, _len = pos.length; _i < _len; _i++) {
          p = pos[_i];
          env.createObject(env.variable('classID'), p, env.variable('withKey'), env.variable('collectID'), env.variable('effect'));
        }
        for (_j = 0, _len1 = pos.length; _j < _len1; _j++) {
          p = pos[_j];
          env.getBlock(p).explored = true;
        }
        for (_k = 0, _len2 = pos.length; _k < _len2; _k++) {
          p = pos[_k];
          env.getBlock(p).effect = env.variable('effect');
        }
        _ref5 = env.variable('pos');
        _results = [];
        for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
          p = _ref5[_l];
          _results.push(this.routine({
            id: 'OpenBlock',
            block: p
          }));
        }
        return _results;
      }
    },
    Heal: {
      callback: function(env) {
        var hp;
        hp = env.variable('hp');
        if (!((hp != null) && hp > 0)) {
          return this.suicide();
        }
        onEvent('Heal', this, env.variable('src'), env.variable('tar'));
        return env.variable('tar').health += env.variable('hp');
      },
      output: function(env) {
        var _ref5;
        return [
          {
            act: env.variable('tar').ref,
            id: ACT_POPHP,
            num: env.variable('hp'),
            flg: HP_RESULT_TYPE_HEAL,
            dey: (_ref5 = env.variable('delay')) != null ? _ref5 : 0.3
          }
        ];
      }
    },
    Damage: {
      callback: function(env) {
        var damageType, isRange, _ref5;
        damageType = env.variable('damageType');
        isRange = env.variable('isRange');
        if (!(((_ref5 = env.variable('tar')) != null ? _ref5.health : void 0) > 0)) {
          return this.suicide();
        }
        if (damageType === 'Physical') {
          env.variable('critical', env.compete('critical', env.variable('src').critical, env.variable('tar').strong));
        }
        if (env.variable('critical')) {
          env.variable('damage', env.variable('damage') * 2);
        }
        if (isRange) {
          onEvent(damageType + 'RangeDamage', this, env.variable('src'), env.variable('tar'));
        } else {
          onEvent(damageType + 'Damage', this, env.variable('src'), env.variable('tar'));
        }
        if (env.variable('tar').health <= env.variable('damage')) {
          onEvent('DeathStrike', this, env.variable('src'), env.variable('tar'));
        }
        env.variable('tar').health -= env.variable('damage');
        if (env.variable('critical')) {
          onEvent('CriticalDamage', this, env.variable('src'), env.variable('tar'));
        }
        if (env.variable('tar').health <= 0) {
          return this.next({
            id: 'Dead',
            tar: env.variable('tar'),
            killer: env.variable('src'),
            damage: env.variable('damage')
          });
        }
      },
      output: function(env) {
        var damage, delay, flag, ret;
        flag = env.variable('critical') ? HP_RESULT_TYPE_CRITICAL : HP_RESULT_TYPE_HIT;
        damage = Math.ceil(env.variable('damage'));
        ret = [];
        if (damage > 0) {
          delay = 0.3;
          if (env.variable('delay')) {
            delay = env.variable('delay');
          }
          if (!env.variable('ignoreHurt')) {
            ret.push({
              act: env.variable('tar').ref,
              id: ACT_HURT,
              dey: delay
            });
          }
          ret.push({
            act: env.variable('tar').ref,
            id: ACT_POPHP,
            num: damage,
            flg: flag,
            dey: delay
          });
        }
        return ret;
      }
    },
    UpdateLockStatues: {
      callback: function(env) {
        var exit, keys, oldStatues;
        keys = env.getObjects().filter(function(m) {
          return (m.health != null) && m.health > 0;
        }).filter(function(m) {
          return (m.keyed != null) && m.keyed;
        });
        exit = env.getBlock(env.getExit());
        if (exit != null) {
          oldStatues = exit.getType();
        }
        env.lockUp(keys.length !== 0);
        if (!((exit != null) && oldStatues !== exit.getType() && exit.explored)) {
          return this.suicide();
        }
        return this.routine({
          id: 'BlockInfo',
          block: env.getExit()
        });
      }
    },
    CollectID: {
      callback: function(env) {
        var collectId, i, objective, qid, quest, questInfo, _ref5, _ref6;
        collectId = env.variable('collectId');
        questInfo = [];
        _ref5 = env.getQuests();
        for (qid in _ref5) {
          quest = _ref5[qid];
          if ((quest != null ? quest.counters : void 0) == null) {
            continue;
          }
          _ref6 = queryTable(TABLE_QUEST, qid, this.abIndex).objects;
          for (i in _ref6) {
            objective = _ref6[i];
            if (!(objective.type === QUEST_TYPE_NPC && objective.collect === collectId)) {
              continue;
            }
            if (quest.counters[i] == null) {
              continue;
            }
            quest.counters[i] += 1;
            if (quest.counters[i] > objective.count) {
              quest.counters[i] = objective.count;
            } else {
              questInfo.push(packQuestEvent(env.getQuests(), qid));
            }
          }
        }
        return env.variable('questInfo', questInfo);
      },
      output: function(env) {
        var e, _i, _len, _ref5, _results;
        _ref5 = env.variable('questInfo');
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          e = _ref5[_i];
          _results.push({
            id: ACT_Event,
            event: e
          });
        }
        return _results;
      }
    },
    Dead: {
      callback: function(env) {
        var killer, src;
        killer = env.variable('killer');
        src = env.variable('tar');
        if (src.collectId != null) {
          this.routine({
            id: 'CollectID',
            collectId: src.collectId
          });
        }
        onEvent('Kill', this, killer, src);
        if (env.getBlock(src.pos) && src.health <= 0) {
          env.getBlock(src.pos).removeRef(src);
        }
        if (env.variable('tar').health <= 0 && (env.variable('cod') == null) && env.variable('tar').dropInfo) {
          env.dungeon.killingInfo.push({
            dropInfo: env.variable('tar').dropInfo
          });
        }
        if (src.isVisible) {
          return this.routine({
            id: 'BlockInfo',
            block: src.pos
          });
        }
      },
      output: function(env) {
        var ret;
        ret = [];
        if (env.variable('tar').isVisible && env.variable('tar').health <= 0) {
          ret.push({
            act: env.variable('tar').ref,
            id: ACT_DEAD
          });
        }
        return ret;
      }
    },
    Evade: {
      output: function(env) {
        return [
          {
            act: env.variable('src').ref,
            id: ACT_EVADE,
            dey: 0
          }
        ];
      }
    },
    ActivateMechanism: {
      callback: function(env) {
        var block;
        block = env.getBlock(env.variable('block'));
        if (!block.explored) {
          return this.suicide();
        }
        switch (block.getType()) {
          case Block_Exit:
            env.nextLevel();
            if (env.isDungeonFinished()) {
              return this.routine({
                id: 'ResultCheck'
              });
            } else {
              return this.routine({
                id: 'EnterLevel'
              });
            }
            break;
          case Block_Npc:
            return block.getRef(-1).onEvent('onBeActivate', this);
        }
      }
    }
  };

  onEvent = function(evt, cmd, src, tar) {
    var env, m, _i, _j, _len, _len1, _ref5, _ref6;
    env = cmd.getEnvironment();
    env.variable('src', src);
    env.variable('tar', tar);
    if (src) {
      src.onEvent('on' + evt, cmd);
      _ref5 = env.getTeammateOf(src);
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        m = _ref5[_i];
        m.onEvent('onTeammate' + evt, cmd);
      }
    }
    if (tar) {
      tar.onEvent('onBe' + evt, cmd);
      _ref6 = env.getTeammateOf(tar);
      for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
        m = _ref6[_j];
        m.onEvent('onTeammateBe' + evt, cmd);
      }
    }
    return env.onEvent(evt, cmd);
  };

  exports.DungeonEnvironment = DungeonEnvironment;

  exports.DungeonCommandStream = DungeonCommandStream;

  exports.fileVersion = -1;

}).call(this);
