(function() {
  var Command, CommandStream, Environment, command_config, extention, installExtention, isDebug, isRequirementMatched, makeCommand, _;

  _ = require('./underscore');

  isDebug = false;

  Command = (function() {
    function Command(config, parent) {
      this.config = config;
      this.parent = parent;
    }

    Command.prototype.execute = function(a, b) {
      this.parameters = arguments;
      if (this.config.execute) {
        return this.config.execute.apply(this, arguments);
      }
    };

    Command.prototype.undo = function() {
      if (this.config.undo) {
        return this.config.undo.apply(this, this.parameters);
      }
    };

    Command.prototype.translate = function() {
      if (this.config.translate) {
        return this.config.translate.apply(this, this.parameters);
      }
    };

    Command.prototype.next = function(cmd) {
      var newCommand, old;
      old = this.nextCMD;
      newCommand = new Command;
      this.nextCMD = new CommandStream(c, this.parent, config);
      this.nextCMD.predecessor = this;
      if (old != null) {
        this.nextCMD.nextCMD = old;
        old.predecessor = this.nextCMD;
      }
      return this.nextCMD;
    };

    return Command;

  })();

  CommandStream = (function() {
    function CommandStream(cmd, parent, config, environment) {
      this.cmd = cmd;
      this.parent = parent;
      this.config = config;
      this.environment = environment;
      this.cmdRoutine = [];
      this.active = true;
    }

    CommandStream.prototype.getEnvironment = function() {
      if (this.environment != null) {
        return this.environment;
      }
      if (this.parent != null) {
        return this.parent.getEnvironment();
      }
      if (this.predecessor != null) {
        return this.predecessor.getEnvironment();
      }
    };

    CommandStream.prototype.getCallback = function(id) {
      var error;
      try {
        if (this.config != null) {
          return this.config[id].callback;
        }
        if (this.parent != null) {
          return this.parent.getCallback(id);
        }
        if (this.predecessor != null) {
          return this.predecessor.getCallback(id);
        }
      } catch (_error) {
        error = _error;
        console.log('Failed to get', id, 'from', this.config);
        return null;
      }
    };

    CommandStream.prototype.getOutput = function(id) {
      if ((this.config != null) && (id != null)) {
        return this.config[id].output;
      }
      if (this.parent != null) {
        return this.parent.getOutput(id);
      }
      if (this.predecessor != null) {
        return this.predecessor.getOutput(id);
      }
      return null;
    };

    CommandStream.prototype.process = function() {
      var routine, _i, _len, _ref;
      if (this.active && (this.getCallback(this.cmd.id) != null)) {
        if (isDebug) {
          console.log('Processing:', this.cmd.id);
        }
        if (this.getEnvironment() != null) {
          this.getEnvironment().setVariableField(this.cmd);
        }
        this.getCallback(this.cmd.id).apply(this, [this.getEnvironment()]);
      }
      _ref = this.cmdRoutine;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        routine = _ref[_i];
        routine.process();
      }
      if (this.nextCMD) {
        return this.nextCMD.process();
      }
    };

    CommandStream.prototype.print = function(placeHolder) {
      var r, _i, _len, _ref;
      if (placeHolder == null) {
        placeHolder = '';
      }
      console.log(placeHolder + this.cmd.id);
      _ref = this.cmdRoutine;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        r.print(placeHolder + '  ');
      }
      if (this.nextCMD != null) {
        return this.nextCMD.print(placeHolder + '>');
      }
    };

    CommandStream.prototype.output = function() {
      var ret;
      ret = [];
      if (this.active && (this.getOutput(this.cmd.id) != null)) {
        if (this.getEnvironment() != null) {
          this.getEnvironment().setVariableField(this.cmd);
        }
        ret = this.getOutput(this.cmd.id).apply(this, [this.getEnvironment()]);
      }
      return ret;
    };

    CommandStream.prototype.routine = function(c, config) {
      var r;
      r = new CommandStream(c, this, config);
      this.cmdRoutine.push(r);
      return r;
    };

    CommandStream.prototype.suicide = function() {
      return this.active = false;
    };

    CommandStream.prototype.getPrevCommand = function(id) {
      if (!this.parent) {
        return null;
      }
      if (this.parent.cmd.id === id) {
        return this.parent;
      }
      return this.parent.getPrevCommand(id);
    };

    CommandStream.prototype.next = function(c, config) {
      var old;
      old = this.nextCMD;
      this.nextCMD = new CommandStream(c, this.parent, config);
      this.nextCMD.predecessor = this;
      if (old != null) {
        this.nextCMD.nextCMD = old;
        old.predecessor = this.nextCMD;
      }
      return this.nextCMD;
    };

    CommandStream.prototype.translate = function() {
      return this.getEnvironment().translate(this);
    };

    return CommandStream;

  })();

  Environment = (function() {
    function Environment() {}

    Environment.prototype.setVariableField = function(VariableField) {
      this.VariableField = VariableField;
    };

    Environment.prototype.variable = function(key, val) {
      if (key == null) {
        return this.VariableField;
      }
      if (val != null) {
        this.VariableField[key] = val;
      }
      return this.VariableField[key];
    };

    Environment.prototype.rand = function() {
      return Math.random();
    };

    Environment.prototype.randMember = function(array, count) {
      var i, indexes, result, _i, _ref, _results;
      if (count == null) {
        count = 1;
      }
      if (!Array.isArray(array)) {
        return [];
      }
      if (!(array.length >= count)) {
        return [];
      }
      if (array.length === count && count !== 1) {
        return array;
      }
      indexes = (function() {
        _results = [];
        for (var _i = 0, _ref = array.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      result = (function() {
        var _j, _results1;
        _results1 = [];
        for (i = _j = 1; 1 <= count ? _j <= count : _j >= count; i = 1 <= count ? ++_j : --_j) {
          _results1.push(array[Math.floor(indexes.splice(this.rand() * indexes.length, 1)[0])]);
        }
        return _results1;
      }).call(this);
      if (count === 1) {
        result = result[0];
      }
      return result;
    };

    Environment.prototype.chanceCheck = function(chance) {
      return this.rand() < chance;
    };

    return Environment;

  })();

  command_config = {
    modify_property: {
      description: '修改属性',
      parameters: {
        property: '属性对象'
      },
      execute: function(parameter) {
        var key, obj, p, _ref, _results;
        obj = parameter.obj;
        this.backup = {};
        _ref = parameter.property;
        _results = [];
        for (key in _ref) {
          p = _ref[key];
          this.backup[key] = obj[key];
          _results.push(obj[key] = p);
        }
        return _results;
      },
      undo: function(parameter) {
        var k, obj, p, _ref, _results;
        obj = parameter.obj;
        _ref = this.backup;
        _results = [];
        for (k in _ref) {
          p = _ref[k];
          if (p != null) {
            _results.push(obj[k] = p);
          } else {
            _results.push(delete obj[k]);
          }
        }
        return _results;
      },
      translate: function(obj) {
        return JSON.stringify(obj);
      }
    },
    incress_property: {
      execute: function(parameter) {
        var k, originProperty, v, _ref;
        originProperty = _(parameter.obj).pick(_(parameter.property).keys());
        _ref = parameter.property;
        for (k in _ref) {
          v = _ref[k];
          if (originProperty[k]) {
            v = originProperty[k] + v;
          }
          originProperty[k] = v;
        }
        this.cmd_modifyProperty = makeCommand('modify_property');
        return this.cmd_modifyProperty.execute({
          obj: parameter.obj,
          property: originProperty
        });
      },
      undo: function() {
        return this.cmd_modifyProperty.undo();
      }
    }
  };

  makeCommand = function(name) {
    return new Command(command_config[name]);
  };

  extention = {
    interfaces: {
      makeCommand: function(commandName) {
        if (!this.getCommandConfig(commandName)) {
          return null;
        }
        return new Command(this.getCommandConfig(commandName));
      },
      executeCommand: function(commandName, parameter) {
        var cmd, command, k, localParameter, _results;
        if (_(commandName).isArray()) {
          _results = [];
          for (k in commandName) {
            cmd = commandName[k];
            _results.push(this.executeCommand(cmd.type, cmd));
          }
          return _results;
        } else {
          command = this.makeCommand(commandName);
          if (!command) {
            throw new Error('Command(' + commandName + ') is not supported.', commandName);
          }
          localParameter = _({
            obj: this
          }).extend(parameter);
          return command.execute(localParameter);
        }
      },
      getCommandConfig: function(commandName) {
        return this.command_config[commandName];
      }
    }
  };

  isRequirementMatched = function(obj, config) {
    if (!config) {
      return true;
    }
    obj = obj.prototype;
    return config.reduce((function(r, l) {
      return r && typeof obj[l.field] === l.type;
    }), true);
  };

  installExtention = function(obj, config) {
    var field, value, _ref, _results;
    if (!isRequirementMatched(obj, config.requirement)) {
      throw new Error('Install extention failed');
    }
    _ref = config.interfaces;
    _results = [];
    for (field in _ref) {
      value = _ref[field];
      if (obj.prototype[field]) {
        continue;
      }
      _results.push(obj.prototype[field] = value);
    }
    return _results;
  };

  exports.CommandStream = CommandStream;

  exports.Environment = Environment;

  exports.Command = Command;

  exports.makeCommand = makeCommand;

  exports.command_config = command_config;

  exports.installCommandExtention = function(obj) {
    return installExtention(obj, extention);
  };

  exports.fileVersion = -1;

}).call(this);
