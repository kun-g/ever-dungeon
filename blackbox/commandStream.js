libCommandStream = {};
(function() {
  "use strict";
  var CommandStream, Environment, isDebug, splLib;

  

  splLib = libSpell;

  isDebug = false;

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
        debug('Failed to get', id, 'from', this.config);
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
          debug('Processing:', this.cmd.id);
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
      debug(placeHolder + this.cmd.id);
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
      if (array.length === count) {
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

  libCommandStream.CommandStream = CommandStream;

  libCommandStream.Environment = Environment;

  libCommandStream.fileVersion = -1;

}).call(this);
