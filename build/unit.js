(function() {
  var Hero, Mirror, Monster, Npc, Unit, Wizard, createUnit, flagCreation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./define');

  Wizard = require('./spell').Wizard;

  flagCreation = false;

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit() {
      Unit.__super__.constructor.apply(this, arguments);
      this.isVisible = false;
    }

    Unit.prototype.calculatePower = function() {
      var ret;
      ret = this.health + this.attack * 6 + this.speed * 2 + this.critical * 2 + this.strong * 2 + this.reactivity * 2 + this.accuracy * 2;
      if (ret) {
        return ret;
      } else {
        return 0;
      }
    };

    Unit.prototype.getActiveSpell = function() {
      var roleConfig, _ref;
      if (this["class"] != null) {
        roleConfig = queryTable(TABLE_ROLE, this["class"]);
      }
      if ((roleConfig != null ? (_ref = roleConfig.property) != null ? _ref.activeSpell : void 0 : void 0) == null) {
        return -1;
      }
      return roleConfig.property.activeSpell;
    };

    Unit.prototype.levelUp = function() {
      var cfg, data, lvConfig, roleConfig, s, _i, _len, _ref, _ref1, _results;
      if (this["class"] != null) {
        roleConfig = queryTable(TABLE_ROLE, this["class"]);
      }
      if ((roleConfig != null ? roleConfig.levelId : void 0) == null) {
        return false;
      }
      lvConfig = queryTable(TABLE_LEVEL, roleConfig.levelId);
      cfg = lvConfig.levelData;
      _results = [];
      while (((_ref1 = cfg[this.level]) != null ? _ref1.xp : void 0) <= this.xp) {
        data = cfg[this.level];
        this.modifyProperty(data.property);
        if (data.skill != null) {
          _ref = data.skill;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            if ((s.classLimit == null) || s.classLimit === this["class"]) {
              this.installSpell(s.id, s.level);
            }
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
      var k, s, v, xproperty, _i, _len, _ref, _ref1, _results;
      this.roleID = roleConfig.classId;
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
      this.faction = roleConfig.faction;
      this.dropInfo = roleConfig.dropInfo;
      if (flagCreation) {
        console.log('Property ', JSON.stringify(roleConfig.property));
      }
      if ((roleConfig.xproperty != null) && (this.rank != null) > 0) {
        this.health = Math.ceil(this.health * this.rank);
        this.attack = Math.ceil(this.attack * this.rank);
        xproperty = {};
        _ref = roleConfig.xproperty;
        for (k in _ref) {
          v = _ref[k];
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
        _ref1 = roleConfig.skill;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          s = _ref1[_i];
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
      var e, enhance, enhancement, equipment, k, _ref, _results;
      if (this.equipment == null) {
        return false;
      }
      _ref = this.equipment;
      _results = [];
      for (k in _ref) {
        e = _ref[k];
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
            var _i, _len, _ref1, _ref2, _results1;
            _ref1 = e.eh;
            _results1 = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              enhancement = _ref1[_i];
              enhance = queryTable(TABLE_ENHANCE, enhancement.id);
              if ((enhance != null ? (_ref2 = enhance.property) != null ? _ref2[enhancement.level] : void 0 : void 0) == null) {
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

  Mirror = (function(_super) {
    __extends(Mirror, _super);

    function Mirror(heroData) {
      Mirror.__super__.constructor.apply(this, arguments);
      if (heroData == null) {
        return false;
      }
      this.type = Unit_Mirror;
      this.blockType = Block_Enemy;
      this.isVisible = false;
      this.keyed = true;
      this.initialize(heroData);
    }

    Mirror.prototype.initialize = function(heroData) {
      var battleForce, cfg, cid, hero;
      hero = new Hero({
        name: heroData.nam,
        "class": heroData.cid,
        gender: heroData.gen,
        hairStyle: heroData.hst,
        hairColor: heroData.hcl,
        equipment: heroData.itm,
        xp: heroData.exp
      });
      battleForce = hero.calculatePower();
      cfg = queryTable(TABLE_ROLE, heroData.cid);
      cid = cfg.transId;
      cfg = queryTable(TABLE_ROLE, cfg.transId);
      if (cfg != null) {
        this.initWithConfig(cfg);
      }
      this["class"] = cid;
      this.level = 0;
      this.xp = heroData.exp;
      this.levelUp();
      this.counterAttack = true;
      this.health = Math.ceil(battleForce * (6 / 18.5));
      this.attack = Math.ceil(battleForce * (0.3 / 18.5));
      this.critical = battleForce * (1 / 18.5);
      this.strong = battleForce * (1 / 18.5);
      this.accuracy = battleForce * (1 / 18.5) + 30;
      this.reactivity = battleForce * (1 / 18.5) - 60;
      this.speed = battleForce * (1 / 18.5) + 20;
      this.maxHP = this.health;
      this.equipment = heroData.itm;
      this.name = heroData.nam;
      this.gender = heroData.gen;
      this.hairStyle = heroData.hst;
      this.hairColor = heroData.hcl;
      this.ref = heroData.ref;
      return this.id = cid;
    };

    return Mirror;

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
        return this.initWithConfig(cfg);
      }
    };

    return Npc;

  })(Unit);

  createUnit = function(config) {
    var cfg;
    if ((config != null ? config.id : void 0) != null) {
      cfg = queryTable(TABLE_ROLE, config.id);
    }
    if (cfg == null) {
      throw Error('No such an unit:' + (config != null ? config.id : void 0) + ' cfg: ' + config);
    }
    switch (cfg.classType) {
      case Unit_Enemy:
        return new Monster(config);
      case Unit_NPC:
        return new Npc(config);
      case Unit_Hero:
        return new Mirror(config);
    }
  };

  exports.createUnit = createUnit;

  exports.Hero = Hero;

  exports.fileVersion = -1;

}).call(this);
