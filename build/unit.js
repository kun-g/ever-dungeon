(function() {
  var Hero, Monster, Npc, Serializer, Unit, Wizard, createUnit, flagCreation, registerConstructor, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./define');

  Wizard = require('./spell').Wizard;

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  flagCreation = false;

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit() {
      Unit.__super__.constructor.apply(this, arguments);
      this.isVisible = false;
    }

    Unit.prototype.calculatePower = function() {
      var ret;
      ret = this.health + this.attack * 6 + this.speed * 2 + this.critical * 2 + this.strong * 2 + this.reactivity * 2 + this.accuracy * 2 + (this.level - 1) * 40;
      if (ret) {
        return ret;
      } else {
        return 0;
      }
    };

    Unit.prototype.getActiveSpell = function() {
      var roleConfig, _ref1;
      if (this["class"] != null) {
        roleConfig = queryTable(TABLE_ROLE, this["class"]);
      }
      if ((roleConfig != null ? (_ref1 = roleConfig.property) != null ? _ref1.activeSpell : void 0 : void 0) == null) {
        return -1;
      }
      return roleConfig.property.activeSpell;
    };

    Unit.prototype.levelUp = function() {
      var cfg, data, lvConfig, roleConfig, s, _i, _len, _ref1, _ref2, _results;
      if (this["class"] != null) {
        roleConfig = queryTable(TABLE_ROLE, this["class"]);
      }
      if ((roleConfig != null ? roleConfig.levelId : void 0) == null) {
        return false;
      }
      lvConfig = queryTable(TABLE_LEVEL, roleConfig.levelId);
      cfg = lvConfig.levelData;
      _results = [];
      while (((_ref2 = cfg[this.level]) != null ? _ref2.xp : void 0) <= this.xp) {
        data = cfg[this.level];
        this.modifyProperty(data.property);
        if (data.skill != null) {
          _ref1 = data.skill;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            s = _ref1[_i];
            this.installSpell(s.id, s.level);
          }
        }
        this.level += 1;
        if (flagCreation) {
          _results.push(console.log('LevelUp ', JSON.stringify(data.property)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Unit.prototype.initWithConfig = function(roleConfig) {
      var k, s, v, xproperty, _i, _len, _ref1, _ref2, _results;
      if (roleConfig == null) {
        return false;
      }
      if (roleConfig.bossFlag) {
        this.type = Unit_Boss;
      }
      if (roleConfig.collectId != null) {
        this.collectId = roleConfig.collectId;
      }
      if (roleConfig.property != null) {
        this.modifyProperty(roleConfig.property);
      }
      if (flagCreation) {
        console.log('Property ', JSON.stringify(roleConfig.property));
      }
      if ((roleConfig.xproperty != null) && (this.rank != null) > 0) {
        this.health = Math.ceil(this.health * this.rank);
        this.attack = Math.ceil(this.attack * this.rank);
        xproperty = {};
        _ref1 = roleConfig.xproperty;
        for (k in _ref1) {
          v = _ref1[k];
          xproperty[k] = Math.ceil(v * this.rank);
        }
        this.modifyProperty(xproperty);
        if (flagCreation) {
          console.log('xRank ', this.rank);
        }
        if (flagCreation) {
          console.log('xProperty ', JSON.stringify(xproperty));
        }
      }
      if (roleConfig.skill != null) {
        _ref2 = roleConfig.skill;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          s = _ref2[_i];
          _results.push(this.installSpell(s.id, s.level));
        }
        return _results;
      }
    };

    Unit.prototype.modifyProperty = function(properties) {
      var k, v, _results;
      if (properties == null) {
        return false;
      }
      _results = [];
      for (k in properties) {
        v = properties[k];
        if (this[k] != null) {
          _results.push(this[k] += v);
        } else {
          _results.push(this[k] = v);
        }
      }
      return _results;
    };

    Unit.prototype.gearUp = function() {
      var e, enhance, enhancement, equipment, k, _ref1, _results;
      if (this.equipment == null) {
        return false;
      }
      _ref1 = this.equipment;
      _results = [];
      for (k in _ref1) {
        e = _ref1[k];
        if (!(queryTable(TABLE_ITEM, e.cid) != null)) {
          continue;
        }
        equipment = queryTable(TABLE_ITEM, e.cid);
        if (equipment.basic_properties != null) {
          this.modifyProperty(equipment.basic_properties);
        }
        if (flagCreation) {
          console.log('Equipment ', JSON.stringify(equipment));
        }
        if (e.eh != null) {
          _results.push((function() {
            var _i, _len, _ref2, _ref3, _results1;
            _ref2 = e.eh;
            _results1 = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              enhancement = _ref2[_i];
              enhance = queryTable(TABLE_ENHANCE, enhancement.id);
              if ((enhance != null ? (_ref3 = enhance.property) != null ? _ref3[enhancement.level] : void 0 : void 0) == null) {
                continue;
              }
              this.modifyProperty(enhance.property[enhancement.level]);
              if (flagCreation) {
                _results1.push(console.log('Enhancement ', JSON.stringify(enhance.property[enhancement.level])));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Unit.prototype.isMonster = function() {
      return false;
    };

    Unit.prototype.isHero = function() {
      return false;
    };

    return Unit;

  })(Wizard);

  Hero = (function(_super) {
    __extends(Hero, _super);

    function Hero(heroData) {
      var k, v;
      Hero.__super__.constructor.apply(this, arguments);
      if (heroData == null) {
        return false;
      }
      this.type = Unit_Hero;
      this.blockType = Block_Hero;
      this.isVisible = true;
      for (k in heroData) {
        v = heroData[k];
        this[k] = v;
      }
      if (this.xp == null) {
        this.xp = 0;
      }
      if (this.equipment == null) {
        this.equipment = [];
      }
      this.initialize();
    }

    Hero.prototype.initialize = function() {
      var cfg;
      if (this["class"] != null) {
        cfg = queryTable(TABLE_ROLE, this["class"]);
      }
      if (cfg != null) {
        this.initWithConfig(cfg);
      }
      this.level = 0;
      this.levelUp();
      this.gearUp();
      if (this.health <= 0) {
        this.health = 1;
      }
      if (this.attack <= 0) {
        this.attack = 1;
      }
      this.maxHP = this.health;
      if (flagCreation) {
        return console.log('Hero ', JSON.stringify(this));
      }
    };

    Hero.prototype.isHero = function() {
      return true;
    };

    return Hero;

  })(Unit);

  Monster = (function(_super) {
    __extends(Monster, _super);

    function Monster(data) {
      var k, v;
      Monster.__super__.constructor.apply(this, arguments);
      if (data == null) {
        return false;
      }
      this.type = Unit_Enemy;
      this.blockType = Block_Enemy;
      for (k in data) {
        v = data[k];
        this[k] = v;
      }
      this.initialize();
    }

    Monster.prototype.isMonster = function() {
      return true;
    };

    Monster.prototype.initialize = function() {
      var cfg;
      if (this.id != null) {
        cfg = queryTable(TABLE_ROLE, this.id);
      }
      if (cfg != null) {
        this.initWithConfig(cfg);
      }
      this.faction = 'monster';
      if (flagCreation) {
        return console.log('Monster ', JSON.stringify(this));
      }
    };

    return Monster;

  })(Unit);

  Npc = (function(_super) {
    __extends(Npc, _super);

    function Npc(data) {
      var k, v;
      Npc.__super__.constructor.apply(this, arguments);
      if (data == null) {
        return false;
      }
      this.type = Unit_NPC;
      this.blockType = Block_Npc;
      for (k in data) {
        v = data[k];
        this[k] = v;
      }
      this.initialize();
    }

    Npc.prototype.isMonster = function() {
      return false;
    };

    Npc.prototype.initialize = function() {
      var cfg;
      if (this.id != null) {
        cfg = queryTable(TABLE_ROLE, this.id);
      }
      if (cfg != null) {
        this.initWithConfig(cfg);
      }
      return this.faction = 'npc';
    };

    return Npc;

  })(Unit);

  createUnit = function(config) {
    var cfg;
    if ((config != null ? config.id : void 0) != null) {
      cfg = queryTable(TABLE_ROLE, config.id);
    }
    if (cfg == null) {
      throw Error('No such an unit:' + (config != null ? config.id : void 0));
    }
    switch (cfg.classType) {
      case Unit_Enemy:
        return new Monster(config);
      case Unit_NPC:
        return new Npc(config);
    }
  };

  registerConstructor(Hero);

  registerConstructor(Monster);

  exports.createUnit = createUnit;

  exports.Hero = Hero;

  exports.fileVersion = -1;

}).call(this);
