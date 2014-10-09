(function() {
  var Wizard, calcFormular, getLevelConfig, getProperty, getSpellConfig, plusThemAll, triggerLib;

  require('./define');

  triggerLib = require('./trigger');

  getSpellConfig = function(spellID) {
    var cfg;
    cfg = queryTable(TABLE_SKILL, spellID);
    if (cfg == null) {
      return null;
    }
    return cfg.config;
  };

  getProperty = function(origin, backup) {
    if (backup != null) {
      return backup;
    } else {
      return origin;
    }
  };

  getLevelConfig = function(cfg, level) {
    level -= 1;
    if (cfg.levelConfig && (cfg.levelConfig[level] != null)) {
      return cfg.levelConfig[level];
    } else {
      return {};
    }
  };

  plusThemAll = function(config, env) {
    var e, k, sum, v, _i, _len, _ref;
    if (!((config != null) && (env != null))) {
      return 0;
    }
    sum = 0;
    if (Array.isArray(env)) {
      for (_i = 0, _len = env.length; _i < _len; _i++) {
        e = env[_i];
        sum += plusThemAll(config, e);
      }
    } else {
      sum = (_ref = config.c) != null ? _ref : 0;
      for (k in config) {
        v = config[k];
        if (env[k] != null) {
          sum += env[k] * v;
        }
      }
    }
    return sum;
  };

  calcFormular = function(e, s, t, config) {
    var c;
    c = config.c ? config.c : 0;
    return Math.ceil(plusThemAll(config.environment, e) + plusThemAll(config.src, s) + plusThemAll(config.tar, t) + c);
  };

  Wizard = (function() {
    function Wizard() {
      this.wSpellDB = {};
      this.wTriggers = {};
      this.wSpellMutex = {};
      this.wPreBuffState = {
        rs: BUFF_TYPE_NONE,
        ds: BUFF_TYPE_NONE,
        hs: BUFF_TYPE_NONE
      };
    }

    Wizard.prototype.isAlive = function() {
      return this.health > 0;
    };

    Wizard.prototype.installSpell = function(spellID, level, cmd, delay) {
      var cfg, levelConfig;
      if (delay == null) {
        delay = 0;
      }
      cfg = getSpellConfig(spellID);
      if (!((level != null) > 0)) {
        level = 1;
      }
      if (cfg == null) {
        return false;
      }
      levelConfig = getLevelConfig(cfg, level);
      if (this.wSpellDB[spellID]) {
        this.removeSpell(spellID, cmd);
      }
      this.wSpellDB[spellID] = {
        level: level,
        delay: delay
      };
      this.setupTriggerCondition(spellID, cfg.triggerCondition, levelConfig, cmd);
      this.setupAvailableCondition(spellID, cfg.availableCondition, levelConfig, cmd);
      this.doAction(this.wSpellDB[spellID], cfg.installAction, levelConfig, this.selectTarget(cfg, cmd), cmd);
      return this.spellStateChanged(spellID, cmd);
    };

    Wizard.prototype.setupAvailableCondition = function(spellID, conditions, level, cmd) {
      var limit, thisSpell, _i, _len, _results;
      if (!conditions) {
        return false;
      }
      thisSpell = this.wSpellDB[spellID];
      _results = [];
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        limit = conditions[_i];
        switch (limit.type) {
          case 'effectCount':
            _results.push(thisSpell.effectCount = 0);
            break;
          case 'tick':
            if (thisSpell.tick == null) {
              thisSpell.tick = {};
            }
            _results.push(thisSpell.tick[limit.tickType] = 0);
            break;
          case 'event':
            _results.push(this.installTrigger(spellID, limit.event));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    Wizard.prototype.setupTriggerCondition = function(spellID, conditions, level, cmd) {
      var limit, thisSpell, _i, _len, _results;
      if (conditions == null) {
        return false;
      }
      thisSpell = this.wSpellDB[spellID];
      _results = [];
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        limit = conditions[_i];
        switch (limit.type) {
          case 'countDown':
            _results.push(thisSpell.cd = 0);
            break;
          case 'event':
            _results.push(this.installTrigger(spellID, limit.event));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    Wizard.prototype.calcEffectState = function(spellID) {
      var cfg, _ref;
      cfg = getSpellConfig(spellID);
      if (((_ref = cfg.basic) != null ? _ref.buffEffect : void 0) != null) {
        if (this.wSpellDB[spellID]) {
          return {
            id: cfg.basic.buffEffect
          };
        } else {
          return {
            id: cfg.basic.buffEffect,
            uninstall: true
          };
        }
      } else {
        return null;
      }
    };

    Wizard.prototype.spellStateChanged = function(spellID, cmd) {
      if (cmd == null) {
        return false;
      }
      return typeof cmd.routine === "function" ? cmd.routine({
        id: 'SpellState',
        wizard: this,
        effect: this.calcEffectState(spellID)
      }) : void 0;
    };

    Wizard.prototype.removeSpell = function(spellID, cmd) {
      var c, cfg, _i, _j, _len, _len1, _ref, _ref1;
      cfg = getSpellConfig(spellID);
      if (cfg.triggerCondition != null) {
        _ref = cfg.triggerCondition;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c.type === 'event') {
            this.removeTrigger(spellID, c.event);
          }
        }
      }
      if (cfg.availableCondition != null) {
        _ref1 = cfg.availableCondition;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          c = _ref1[_j];
          if (c.type === 'event') {
            this.removeTrigger(spellID, c.event);
          }
        }
      }
      if (cfg.uninstallAction != null) {
        this.doAction(this.wSpellDB[spellID], cfg.uninstallAction, {}, this.selectTarget(cfg, cmd), cmd);
      }
      delete this.wSpellDB[spellID];
      return this.spellStateChanged(spellID, cmd);
    };

    Wizard.prototype.installTrigger = function(spellID, event) {
      var thisSpell;
      if (event == null) {
        return false;
      }
      thisSpell = this.wSpellDB[spellID];
      if (this.wTriggers[event] == null) {
        this.wTriggers[event] = [];
      }
      if (this.wTriggers[event].indexOf(spellID) === -1) {
        this.wTriggers[event].push(spellID);
      }
      if (thisSpell.eventCounters == null) {
        thisSpell.eventCounters = {};
      }
      return thisSpell.eventCounters[event] = 0;
    };

    Wizard.prototype.removeTrigger = function(spellID, event) {
      var id;
      if (!((event != null) && this.wTriggers[event])) {
        return false;
      }
      this.wTriggers[event] = (function() {
        var _i, _len, _ref, _results;
        _ref = this.wTriggers[event];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          if (id !== spellID) {
            _results.push(id);
          }
        }
        return _results;
      }).call(this);
      if (!(this.wTriggers[event].length > 0)) {
        return delete this.wTriggers[event];
      }
    };

    Wizard.prototype.castSpell = function(spellID, level, cmd) {
      var canTrigger, cfg, delay, reason, target, thisSpell, _ref;
      cfg = getSpellConfig(spellID);
      thisSpell = this.wSpellDB[spellID];
      if (thisSpell != null) {
        level = thisSpell.level;
      }
      if (level == null) {
        return 'InvalidLevel';
      }
      level = getLevelConfig(cfg, level);
      target = this.selectTarget(cfg, cmd);
      _ref = this.triggerCheck(thisSpell, cfg.triggerCondition, level, target, cmd), canTrigger = _ref[0], reason = _ref[1];
      if (!canTrigger) {
        return reason;
      }
      this.doAction(thisSpell, cfg.action, level, target, cmd);
      this.updateCDOfSpell(spellID, true, cmd);
      if (!this.availableCheck(spellID, cfg, cmd)) {
        this.removeSpell(spellID, cmd);
      }
      delay = 0;
      if (thisSpell != null) {
        delay = thisSpell.delay;
      }
      if (cfg.basic != null) {
        if (typeof cmd.routine === "function") {
          cmd.routine({
            id: 'Casting',
            spell: cfg.basic,
            caster: this,
            castee: target,
            delay: delay
          });
        }
      }
      return true;
    };

    Wizard.prototype.onEvent = function(event, cmd) {
      var id, thisSpell, _i, _len, _ref, _results;
      if (this.wTriggers[event] == null) {
        return true;
      }
      _ref = this.wTriggers[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        thisSpell = this.wSpellDB[id];
        if (thisSpell != null) {
          thisSpell.eventCounters[event]++;
        }
        _results.push(this.castSpell(id, null, cmd));
      }
      return _results;
    };

    Wizard.prototype.clearSpellCD = function(spellID, cmd) {
      var thisSpell;
      if (!((spellID != null) && (this.wSpellDB[spellID] != null))) {
        return false;
      }
      thisSpell = this.wSpellDB[spellID];
      if ((thisSpell.cd != null) && thisSpell.cd !== 0) {
        thisSpell.cd = 0;
        if (this.isHero()) {
          return typeof cmd.routine === "function" ? cmd.routine({
            id: 'SpellCD',
            cdInfo: thisSpell.cd
          }) : void 0;
        }
      }
    };

    Wizard.prototype.updateCDOfSpell = function(spellID, isReset, cmd) {
      var c, cd, cdConfig, cfg, level, preCD, thisSpell;
      cfg = getSpellConfig(spellID);
      thisSpell = this.wSpellDB[spellID];
      if (!thisSpell) {
        return [false, 'NotLearned'];
      }
      if (!cfg.triggerCondition) {
        return [true, 'NoCD'];
      }
      if (!this.isAlive()) {
        return [false, 'Dead'];
      }
      cdConfig = (function() {
        var _i, _len, _ref, _results;
        _ref = cfg.triggerCondition;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c.type === 'countDown') {
            _results.push(c);
          }
        }
        return _results;
      })();
      if (!(cdConfig.length > 0)) {
        return [true, 'NoCD'];
      }
      cdConfig = cdConfig[0];
      level = getLevelConfig(cfg, thisSpell.level);
      cd = getProperty(cdConfig.cd, level.cd);
      preCD = thisSpell.cd;
      if (isReset) {
        thisSpell.cd = cd;
      } else if (!this.isAlive()) {
        thisSpell.cd = -1;
      } else {
        if (thisSpell.cd !== 0) {
          thisSpell.cd -= 1;
        }
      }
      if (thisSpell.cd !== preCD && this.isHero()) {
        return typeof cmd.routine === "function" ? cmd.routine({
          id: 'SpellCD',
          cdInfo: thisSpell.cd
        }) : void 0;
      }
    };

    Wizard.prototype.haveMutex = function(mutex) {
      return this.wSpellMutex[mutex] != null;
    };

    Wizard.prototype.setMutex = function(mutex, count) {
      return this.wSpellMutex[mutex] = count;
    };

    Wizard.prototype.tickMutex = function() {
      var count, mutex, _ref, _results;
      _ref = this.wSpellMutex;
      _results = [];
      for (mutex in _ref) {
        count = _ref[mutex];
        count -= 1;
        this.wSpellMutex[mutex] = count;
        if (count === 0) {
          _results.push(delete this.wSpellMutex[mutex]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Wizard.prototype.tickSpell = function(tickType, cmd) {
      var spellID, thisSpell, _ref, _results;
      this.tickMutex();
      _ref = this.wSpellDB;
      _results = [];
      for (spellID in _ref) {
        thisSpell = _ref[spellID];
        this.updateCDOfSpell(spellID, false, cmd);
        if ((thisSpell.tick != null) && (thisSpell.tick[tickType] != null) && (tickType != null)) {
          thisSpell.tick[tickType] += 1;
        }
        if (!this.availableCheck(spellID, getSpellConfig(spellID), cmd)) {
          _results.push(this.removeSpell(spellID, cmd));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Wizard.prototype.availableCheck = function(spellID, cfg, cmd) {
      var conditions, count, level, limit, thisSpell, _i, _len, _ref;
      thisSpell = this.wSpellDB[spellID];
      if (!thisSpell) {
        return false;
      }
      conditions = cfg.availableCondition;
      if (!conditions) {
        return true;
      }
      level = getLevelConfig(cfg, thisSpell.level);
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        limit = conditions[_i];
        switch (limit.type) {
          case 'effectCount':
            if (!(thisSpell.effectCount < getProperty(limit.count, level.count))) {
              return false;
            }
            break;
          case 'tick':
            if (!(thisSpell.tick[limit.tickType] < getProperty(limit.ticks, level.ticks))) {
              return false;
            }
            break;
          case 'event':
            count = (_ref = getProperty(limit.eventCount, level.eventCount)) != null ? _ref : 1;
            if (!(thisSpell.eventCounters[limit.event] < count)) {
              return false;
            }
        }
      }
      return true;
    };

    Wizard.prototype.calcBuffState = function() {
      var cfg, k, res, roleState, s, spellID, thisSpell, _ref;
      roleState = {
        rs: BUFF_TYPE_NONE,
        ds: BUFF_TYPE_NONE,
        hs: BUFF_TYPE_NONE
      };
      _ref = this.wSpellDB;
      for (spellID in _ref) {
        thisSpell = _ref[spellID];
        cfg = getSpellConfig(spellID);
        if (cfg.buffType == null) {
          continue;
        }
        switch (cfg.buffType) {
          case 'RoleDebuff':
            roleState.rs = BUFF_TYPE_DEBUFF;
            break;
          case 'HealthDebuff':
            roleState.hs = BUFF_TYPE_DEBUFF;
            break;
          case 'AttackDebuff':
            roleState.ds = BUFF_TYPE_DEBUFF;
            break;
          case 'HealthBuff':
            roleState.hs = BUFF_TYPE_BUFF;
            break;
          case 'AttackBuff':
            roleState.ds = BUFF_TYPE_BUFF;
            break;
          case 'RoleBuff':
            roleState.rs = BUFF_TYPE_BUFF;
        }
      }
      res = {};
      for (k in roleState) {
        s = roleState[k];
        if (this.wPreBuffState[k] !== s) {
          res[k] = s;
        }
        switch (k) {
          case 'hs':
            res.hp = this.health;
            break;
          case 'ds':
            res.dc = this.attack;
        }
      }
      this.wPreBuffState = roleState;
      return res;
    };

    Wizard.prototype.selectTarget = function(cfg, cmd) {
      var b, blocks, env, pool;
      if (!((cfg.targetSelection != null) && cfg.targetSelection.pool)) {
        return [];
      }
      if (!(cfg.targetSelection.pool === 'self' || (cmd != null))) {
        return [];
      }
      if (cmd != null) {
        env = cmd.getEnvironment();
      }
      switch (cfg.targetSelection.pool) {
        case 'self':
          pool = this;
          break;
        case 'target':
          pool = env.variable('tar');
          break;
        case 'source':
          pool = env.variable('src');
          break;
        case 'objects':
          pool = env.getObjects();
          break;
        case 'blocks':
          blocks = cfg.targetSelection.blocks;
          pool = blocks != null ? (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = blocks.length; _i < _len; _i++) {
              b = blocks[_i];
              _results.push(env.getBlock(b));
            }
            return _results;
          })() : env.getBlock();
      }
      if (pool == null) {
        pool = [];
      }
      if (!Array.isArray(pool)) {
        pool = [pool];
      }
      if ((cfg.targetSelection.filter != null) && pool.length > 0) {
        pool = triggerLib.filterObject(this, pool, cfg.targetSelection.filter, env);
      }
      if (pool == null) {
        pool = [];
      }
      if (!Array.isArray(pool)) {
        pool = [pool];
      }
      return pool;
    };

    Wizard.prototype.triggerCheck = function(thisSpell, conditions, level, target, cmd) {
      var env, from, limit, to, _i, _len, _ref, _ref1, _ref2;
      if (conditions == null) {
        return [true];
      }
      env = cmd.getEnvironment();
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        limit = conditions[_i];
        switch (limit.type) {
          case 'chance':
            if (!env.chanceCheck(getProperty(limit.chance, level.chance))) {
              return [false, 'NotFortunate'];
            }
            break;
          case 'card':
            if (!env.haveCard(limit.id)) {
              return [false, 'NoCard'];
            }
            break;
          case 'alive':
            if (!this.isAlive()) {
              return [false, 'Dead'];
            }
            break;
          case 'visible':
            if (!this.isVisible) {
              return [false, 'visible'];
            }
            break;
          case 'needTarget':
            if (target == null) {
              return [false, 'No target'];
            }
            break;
          case 'countDown':
            if (thisSpell == null) {
              return [false, 'NotLearned'];
            }
            if (!(thisSpell.cd <= 0)) {
              return [false, 'NotReady'];
            }
            break;
          case 'myMutex':
            if (this.haveMutex(limit.mutex)) {
              return [false, 'TargetMutex'];
            }
            break;
          case 'targetMutex':
            if (target == null) {
              return [false, 'NoTarget'];
            }
            if (target.some(function(t) {
              return t.haveMutex(limit.mutex);
            })) {
              return [false, 'TargetMutex'];
            }
            break;
          case 'event':
            if (thisSpell == null) {
              return [false, 'NotLearned'];
            }
            if ((limit.eventCount != null) && limit.eventCount > thisSpell.eventCounters[limit.event]) {
              return [false, 'EventCount'];
            }
            if (limit.reset) {
              thisSpell.eventCounters[limit.event] = 0;
            }
            break;
          case 'property':
            from = (_ref = limit.from) != null ? _ref : -Infinity;
            to = (_ref1 = limit.to) != null ? _ref1 : Infinity;
            if (!((limit.property != null) && (from < (_ref2 = this[limit.property]) && _ref2 < to))) {
              return [false, 'Property'];
            }
        }
      }
      return [true];
    };

    Wizard.prototype.getActiveSpell = function() {
      return -1;
    };

    Wizard.prototype.doAction = function(thisSpell, actions, level, target, cmd) {
      var a, c, cfg, delay, effect, env, formular, formularResult, h, modifications, pos, property, spellID, src, t, val, variables, _aa, _ab, _ac, _buffType, _i, _j, _k, _l, _len, _len1, _len10, _len11, _len12, _len13, _len14, _len15, _len16, _len17, _len18, _len19, _len2, _len20, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _s, _t, _u, _v, _w, _x, _y, _z;
      if (actions == null) {
        return false;
      }
      env = cmd != null ? cmd.getEnvironment() : void 0;
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        a = actions[_i];
        variables = {};
        if (env != null) {
          variables = env.variable();
          variables.heroCount = env.getAliveHeroes().length;
          variables.totalMonsterCount = env.getMonsters().length;
          variables.visibleMonsterCount = env.getMonsters().filter(function(m) {
            return m.isVisible;
          }).length;
        }
        if (getProperty(a.formular, level.formular) != null) {
          formularResult = calcFormular(variables, this, target, getProperty(a.formular, level.formular));
        }
        delay = 0;
        if (thisSpell != null) {
          delay = thisSpell.delay;
        }
        if (a.delay) {
          delay += typeof a.delay === 'number' ? a.delay : env.rand() * a.delay.base + env.rand() * a.delay.range;
        }
        switch (a.type) {
          case 'modifyVar':
            env.variable(a.x, formularResult);
            break;
          case 'ignoreHurt':
            env.variable('ignoreHurt', true);
            break;
          case 'replaceTar':
            env.variable('tar', this);
            break;
          case 'setTargetMutex':
            for (_j = 0, _len1 = target.length; _j < _len1; _j++) {
              t = target[_j];
              t.setMutex(getProperty(a.mutex, level.mutex), getProperty(a.count, level.count));
            }
            break;
          case 'setMyMutex':
            this.setMutex(getProperty(a.mutex, level.mutex), getProperty(a.count, level.count));
            break;
          case 'resetSpellCD':
            for (_k = 0, _len2 = target.length; _k < _len2; _k++) {
              t = target[_k];
              t.clearSpellCD(t.getActiveSpell(), cmd);
            }
            break;
          case 'ignoreCardCost':
            env.variable('ignoreCardCost', true);
            break;
          case 'dropItem':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'DropItem',
                list: a.dropList
              });
            }
            break;
          case 'dropPrize':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'DropPrize',
                dropID: a.dropID,
                me: this,
                showPrize: a.showPrize,
                motion: a.motion,
                ref: this.ref,
                effect: a.effect,
                pos: this.pos
              });
            }
            break;
          case 'rangeAttack':
          case 'attack':
            if (level.effect != null) {
              a.effect = level.effect;
            }
            if (level.delay != null) {
              a.delay = level.delay;
            }
            for (_l = 0, _len3 = target.length; _l < _len3; _l++) {
              t = target[_l];
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'Attack',
                  src: this,
                  tar: t,
                  isRange: true,
                  hurtDelay: a.hurtDelay,
                  eff: a.effect,
                  effDelay: a.effDelay
                });
              }
            }
            break;
          case 'showUp':
            for (_m = 0, _len4 = target.length; _m < _len4; _m++) {
              t = target[_m];
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'ShowUp',
                  tar: t
                });
              }
            }
            break;
          case 'costCard':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'CostCard',
                card: a.card
              });
            }
            break;
          case 'showExit':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'ShowExit'
              });
            }
            break;
          case 'resurrect':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'Resurrect',
                tar: target
              });
            }
            break;
          case 'randTeleport':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'TeleportObject',
                obj: this
              });
            }
            break;
          case 'kill':
            if (a.self) {
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'Kill',
                  tar: this,
                  cod: a.cod
                });
              }
            } else {
              for (_n = 0, _len5 = target.length; _n < _len5; _n++) {
                t = target[_n];
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'Kill',
                    tar: t,
                    cod: a.cod
                  });
                }
              }
            }
            break;
          case 'shock':
            if (cmd != null) {
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'Shock',
                  time: a.time,
                  delay: a.delay,
                  range: a.range
                });
              }
            }
            break;
          case 'tremble':
            switch (a.act) {
              case 'self':
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'Tremble',
                    act: this.ref,
                    time: a.time,
                    delay: a.delay,
                    range: a.range
                  });
                }
                break;
              case 'target':
                for (_o = 0, _len6 = target.length; _o < _len6; _o++) {
                  t = target[_o];
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'Tremble',
                      act: t.ref,
                      time: a.time,
                      delay: a.delay,
                      range: a.range
                    });
                  }
                }
            }
            break;
          case 'blink':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'Blink',
                time: a.time,
                delay: a.delay,
                color: a.color
              });
            }
            break;
          case 'changeBGM':
            cmd.routine({
              id: 'ChangeBGM',
              music: a.music,
              repeat: a.repeat
            });
            break;
          case 'whiteScreen':
            cmd.routine({
              id: 'WhiteScreen',
              mode: a.mode,
              time: a.time,
              color: a.color
            });
            break;
          case 'endDungeon':
            cmd.routine({
              id: 'EndDungeon',
              result: a.result
            });
            break;
          case 'openBlock':
            cmd.routine({
              id: 'OpenBlock',
              block: a.block
            });
            break;
          case 'playSound':
            cmd.routine({
              id: 'SoundEffect',
              sound: a.sound
            });
            break;
          case 'chainBlock':
            _ref = a.source;
            for (_p = 0, _len7 = _ref.length; _p < _len7; _p++) {
              src = _ref[_p];
              cmd.routine({
                id: 'ChainBlock',
                src: src,
                tar: a.target
              });
            }
            break;
          case 'castSpell':
            this.castSpell(a.spell, (_ref1 = a.level) != null ? _ref1 : 1, cmd);
            break;
          case 'newFaction':
            env.newFaction(a.name);
            break;
          case 'changeFaction':
            for (_q = 0, _len8 = target.length; _q < _len8; _q++) {
              t = target[_q];
              t.faction = a.faction;
            }
            break;
          case 'factionAttack':
            env.factionAttack(a.src, a.tar, a.flag);
            break;
          case 'factionHeal':
            env.factionHeal(a.src, a.tar, a.flag);
            break;
          case 'heal':
            if (a.self) {
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'Heal',
                  src: this,
                  tar: this,
                  hp: formularResult,
                  delay: delay
                });
              }
            } else {
              for (_r = 0, _len9 = target.length; _r < _len9; _r++) {
                t = target[_r];
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'Heal',
                    src: this,
                    tar: t,
                    hp: formularResult,
                    delay: delay
                  });
                }
              }
            }
            break;
          case 'removeSpell':
            for (_s = 0, _len10 = target.length; _s < _len10; _s++) {
              t = target[_s];
              t.removeSpell(a.spell, cmd);
            }
            break;
          case 'installSpell':
            for (_t = 0, _len11 = target.length; _t < _len11; _t++) {
              t = target[_t];
              delay = 0;
              if (thisSpell != null) {
                delay = thisSpell.delay;
              }
              if (a.delay != null) {
                delay += typeof a.delay === 'number' ? a.delay : a.delay.base + env.rand() * a.delay.range;
              }
              t.installSpell(getProperty(a.spell, level.spell), getProperty(a.level, level.level), cmd, delay);
            }
            break;
          case 'damage':
            for (_u = 0, _len12 = target.length; _u < _len12; _u++) {
              t = target[_u];
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'Damage',
                  src: this,
                  tar: t,
                  damageType: a.damageType,
                  isRange: a.isRange,
                  damage: formularResult,
                  delay: delay
                });
              }
            }
            break;
          case 'playAction':
            if (a.pos === 'self') {
              if (typeof cmd.routine === "function") {
                cmd.routine({
                  id: 'SpellAction',
                  motion: a.motion,
                  ref: this.ref
                });
              }
            } else if (a.pos === 'target') {
              for (_v = 0, _len13 = target.length; _v < _len13; _v++) {
                t = target[_v];
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'SpellAction',
                    motion: a.motion,
                    ref: t.ref
                  });
                }
              }
            }
            break;
          case 'tutorial':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'Tutorial',
                tutorialId: a.tutorialId
              });
            }
            break;
          case 'playEffect':
            if (env == null) {
              continue;
            }
            effect = getProperty(a.effect, level.effect);
            pos = getProperty(a.pos, level.pos);
            if (pos != null) {
              if (pos === 'self') {
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'Effect',
                    delay: delay,
                    effect: effect,
                    pos: this.pos
                  });
                }
              } else if (pos === 'target') {
                for (_w = 0, _len14 = target.length; _w < _len14; _w++) {
                  t = target[_w];
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'Effect',
                      delay: delay,
                      effect: effect,
                      pos: t.pos
                    });
                  }
                }
              } else if (typeof pos === 'number') {
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'Effect',
                    delay: delay,
                    effect: effect,
                    pos: pos
                  });
                }
              } else if (Array.isArray(pos)) {
                for (_x = 0, _len15 = pos.length; _x < _len15; _x++) {
                  pos = pos[_x];
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'Effect',
                      delay: delay,
                      effect: effect,
                      pos: pos
                    });
                  }
                }
              }
            } else {
              switch (a.act) {
                case 'self':
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'Effect',
                      delay: delay,
                      effect: effect,
                      act: this.ref
                    });
                  }
                  break;
                case 'target':
                  for (_y = 0, _len16 = target.length; _y < _len16; _y++) {
                    t = target[_y];
                    if (typeof cmd.routine === "function") {
                      cmd.routine({
                        id: 'Effect',
                        delay: delay,
                        effect: effect,
                        act: t.ref
                      });
                    }
                  }
              }
            }
            break;
          case 'delay':
            c = {
              id: 'Delay'
            };
            if (a.delay != null) {
              c.delay = a.delay;
            }
            cmd = cmd.next(c);
            break;
          case 'setProperty':
            modifications = getProperty(a.modifications, level.modifications);
            if (thisSpell.modifications == null) {
              thisSpell.modifications = {};
            }
            for (property in modifications) {
              formular = modifications[property];
              val = calcFormular(variables, this, null, formular);
              this[property] += val;
              if (thisSpell.modifications[property] == null) {
                thisSpell.modifications[property] = 0;
              }
              thisSpell.modifications[property] += val;
            }
            break;
          case 'resetProperty':
            if (!thisSpell) {
              continue;
            }
            _ref2 = thisSpell.modifications;
            for (property in _ref2) {
              val = _ref2[property];
              this[property] -= val;
            }
            delete thisSpell.modifications;
            break;
          case 'clearDebuff':
          case 'clearBuff':
            if (a.type === 'clearDebuff') {
              _buffType = ['RoleDebuff', 'HealthDebuff', 'AttackDebuff'];
            } else {
              _buffType = ['RoleBuff', 'HealthBuff', 'AttackBuff'];
            }
            for (_z = 0, _len17 = target.length; _z < _len17; _z++) {
              h = target[_z];
              _ref3 = h.wSpellDB;
              for (spellID in _ref3) {
                thisSpell = _ref3[spellID];
                cfg = getSpellConfig(spellID);
                if (_buffType.indexOf(cfg.buffType) !== -1) {
                  h.removeSpell(spellID, cmd);
                }
              }
            }
            break;
          case 'collect':
            cmd.routine({
              id: 'CollectID',
              collectId: a.collectID
            });
            break;
          case 'createMonster':
            c = {
              id: 'CreateObject',
              classID: getProperty(a.monsterID, level.monsterID),
              count: getProperty(a.objectCount, level.objectCount),
              withKey: getProperty(a.withKey, level.withKey),
              collectID: getProperty(a.collectID, level.collectID),
              effect: getProperty(a.effect, level.effect)
            };
            if (!a.randomPos) {
              c.pos = this.pos;
            }
            if (a.pos != null) {
              c.pos = a.pos;
            }
            if (typeof cmd.routine === "function") {
              cmd.routine(c);
            }
            break;
          case 'dialog':
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'Dialog',
                dialogId: a.dialogId
              });
            }
            break;
          case 'rangeAttackEff':
            if (level.effect != null) {
              a.effect = level.effect;
            }
            if (typeof cmd.routine === "function") {
              cmd.routine({
                id: 'RangeAttackEffect',
                dey: a.delay,
                eff: a.effect,
                src: this,
                tar: target
              });
            }
            break;
          case 'showBubble':
            pos = getProperty(a.pos, level.pos);
            if (pos != null) {
              if (pos === 'self') {
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'ShowBubble',
                    pos: this.pos,
                    eff: a.effect,
                    typ: a.bubbleType,
                    cont: a.content,
                    dey: a.delay,
                    dur: a.duration
                  });
                }
              } else if (pos === 'target') {
                for (_aa = 0, _len18 = target.length; _aa < _len18; _aa++) {
                  t = target[_aa];
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'ShowBubble',
                      pos: t.pos,
                      eff: a.effect,
                      typ: a.bubbleType,
                      cont: a.content,
                      dey: a.delay,
                      dur: a.duration
                    });
                  }
                }
              } else if (typeof pos === 'number') {
                if (typeof cmd.routine === "function") {
                  cmd.routine({
                    id: 'ShowBubble',
                    pos: pos,
                    eff: a.effect,
                    typ: a.bubbleType,
                    cont: a.content,
                    dey: a.delay,
                    dur: a.duration
                  });
                }
              } else if (Array.isArray(pos)) {
                for (_ab = 0, _len19 = pos.length; _ab < _len19; _ab++) {
                  pos = pos[_ab];
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'ShowBubble',
                      pos: pos,
                      eff: a.effect,
                      typ: a.bubbleType,
                      cont: a.content,
                      dey: a.delay,
                      dur: a.duration
                    });
                  }
                }
              }
            } else {
              switch (a.act) {
                case 'self':
                  if (typeof cmd.routine === "function") {
                    cmd.routine({
                      id: 'ShowBubble',
                      act: this.ref,
                      eff: a.effect,
                      typ: a.bubbleType,
                      cont: a.content,
                      dey: a.delay,
                      dur: a.duration
                    });
                  }
                  break;
                case 'target':
                  for (_ac = 0, _len20 = target.length; _ac < _len20; _ac++) {
                    t = target[_ac];
                    if (typeof cmd.routine === "function") {
                      cmd.routine({
                        id: 'ShowBubble',
                        act: t.ref,
                        eff: a.effect,
                        typ: a.bubbleType,
                        cont: a.content,
                        dey: a.delay,
                        dur: a.duration
                      });
                    }
                  }
              }
            }
        }
      }
      if ((thisSpell != null ? thisSpell.effectCount : void 0) != null) {
        return thisSpell.effectCount += 1;
      }
    };

    return Wizard;

  })();

  exports.Wizard = Wizard;

  exports.fileVersion = -1;

}).call(this);
