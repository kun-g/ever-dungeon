(function() {
  var Card, ENHANCE_TYPE_ITEM, ENHANCE_TYPE_STONE, Enhance_Stone, Equipment, Item, Serializer, enhance_stone_command_config, equipment_command_config, initConstructors, installCommandExtention, item_command_config, item_type_config, k, makeBasicCommand, registerConstructor, v, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./define');

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  _ = require('./underscore');

  makeBasicCommand = require('./commandStream').makeCommand;

  item_command_config = {};

  Item = (function(_super) {
    __extends(Item, _super);

    function Item(config, additionalConfig) {
      var cfg;
      this.config = config;
      cfg = {
        slot: [],
        count: 1,
        serverId: -1,
        id: config.classId
      };
      if (this.config.expiration) {
        savingCfg.date = -1;
      }
      Item.__super__.constructor.call(this, config, _.extend(cfg, additionalConfig));
      if (this.config.id === 907) {
        console.log("The 907 is comming");
        showMeTheStack();
      }
      Object.defineProperty(this, 'config', {
        enumerable: false,
        writable: false
      });
    }

    Item.prototype.getConfig = function() {
      return this.config;
    };

    Item.prototype.spaceCount = function() {
      if (this.storeOnly) {
        return 0;
      } else {
        return 1;
      }
    };

    Item.prototype.command_config = item_command_config;

    return Item;

  })(Serializer);

  installCommandExtention = require('./commandStream').installCommandExtention;

  installCommandExtention(Item);

  ENHANCE_TYPE_STONE = 0;

  ENHANCE_TYPE_ITEM = 1;

  equipment_command_config = {
    install_enhancement: {
      description: '安装一个强化',
      parameters: {
        enhancement: '强化数组',
        scheduled: '是否需要计时'
      }
    },
    incress_property: {
      description: '提升装备属性',
      parameters: {
        property: '属性'
      },
      execute: function(parameter) {
        parameter.obj = parameter.obj.property();
        this.cmd_incressProperty = makeBasicCommand('incress_property');
        return this.cmd_incressProperty.execute(parameter);
      },
      undo: function(obj, properties) {
        return this.cmd_incressProperty.undo();
      }
    },
    install_skill: {
      description: '给装备安装技能',
      parameters: {
        id: '技能id',
        level: '等级*'
      },
      execute: function(parameter) {
        if (!parameter.obj.skill) {
          parameter.obj.skill = [];
        }
        return parameter.obj.skill.push(_(parameter).pick('id', 'level'));
      }
    },
    update_appearance: {
      execute: function(parameter) {
        var appearance, config, k, v, _results;
        config = parameter.obj.config;
        appearance = config.effecta;
        if (parameter.gender != null) {
          if (parameter.gender && config.effectm) {
            appearance = config.effectm;
          } else if (config.effectf) {
            appearance = config.effectf;
          }
        }
        parameter.obj._appearance = {};
        if (appearance) {
          _results = [];
          for (k in appearance) {
            v = appearance[k];
            _results.push(parameter.obj._appearance[k] = v);
          }
          return _results;
        }
      }
    },
    change_appearance: {
      execute: function(parameter) {
        return _(parameter.obj._appearance).extend(parameter.appearance);
      }
    }
  };

  Equipment = (function(_super) {
    __extends(Equipment, _super);

    Equipment.prototype.command_config = equipment_command_config;

    function Equipment(config) {
      var savingCfg;
      this.config = config;
      savingCfg = {
        xp: 0,
        enhancement: [],
        status: 0
      };
      Equipment.__super__.constructor.call(this, config, savingCfg);
      this._property = {};
      if (config.basic_properties) {
        _.extend(this._property, config.basic_properties);
      }
      this._appearance = {};
    }

    Equipment.prototype.property = function(key, val) {
      if (key == null) {
        return this._property;
      }
      if (val != null) {
        this._property[key] = val;
      }
      return this._property[key];
    };

    Equipment.prototype.appearance = function() {
      return this._appearance;
    };

    Equipment.prototype.deleteProperty = function(key) {
      return delete this._property[key];
    };

    Equipment.prototype.installEnhancement = function(enhancementItem) {
      var cfg;
      cfg = {
        type: ENHANCE_TYPE_ITEM,
        id: enhancementItem.getInitialData()
      };
      this.enhancement.push(cfg);
      return this.executeCommand(enhancementItem.command);
    };

    Equipment.prototype.equipUpgradeXp = function() {
      var cfg;
      if (!this.upgradeTarget) {
        return -1;
      }
      if (this.upgradeXp) {
        return this.upgradeXp;
      }
      cfg = queryTable(TABLE_UPGRADE, this.rank);
      if (!cfg) {
        return -1;
      }
      return cfg.xp;
    };

    return Equipment;

  })(Item);

  Enhance_Stone = (function(_super) {
    __extends(Enhance_Stone, _super);

    function Enhance_Stone(config) {
      this.config = config;
      Enhance_Stone.__super__.constructor.call(this, config);
    }

    Enhance_Stone.prototype.getCommandConfig = function(commandName) {
      return enhance_stone_command_config[commandName];
    };

    return Enhance_Stone;

  })(Item);

  enhance_stone_command_config = {};

  item_type_config = [
    {
      category: -1,
      constructor: Item
    }, {
      category: 1,
      constructor: Equipment
    }, {
      category: 5,
      constructor: Enhance_Stone
    }
  ];

  initConstructors = function(config, defaultConstructor) {
    var indexer;
    indexer = {};
    config.forEach(function(e) {
      return indexer[e.category] = e.constructor;
    });
    return function(data) {
      var id;
      if (typeof data === 'number') {
        id = data;
        data = queryTable(TABLE_ITEM, id);
      } else if (data.id != null) {
        id = data.id;
        data = _(data).extend(queryTable(TABLE_ITEM, id));
      }
      if (indexer[data.category]) {
        return new indexer[data.category](data);
      } else {
        return new defaultConstructor(data);
      }
    };
  };

  Card = (function(_super) {
    __extends(Card, _super);

    function Card(id) {
      this.id = id;
      Card.__super__.constructor.call(this, queryTable(TABLE_CARD, this.id));
    }

    return Card;

  })(Item);

  exports.Card = Card;

  exports.Enhance_Stone = Enhance_Stone;

  exports.createItem = initConstructors(item_type_config, Item);

  for (k in item_type_config) {
    v = item_type_config[k];
    registerConstructor(exports.createItem, v.constructor.name);
  }

  exports.fileVersion = -1;

}).call(this);
