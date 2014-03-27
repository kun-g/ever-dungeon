(function() {
  var TriggerManager, bindVariable, branch, calculate, conditionCheck, doAction, doGetProperty, doLoop, getTypeof, getVar, parse;

  doGetProperty = function(obj, key) {
    var k, properties, _i, _len;
    properties = key.split('.');
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      k = properties[_i];
      if (obj != null) {
        obj = obj[k];
      } else {
        return void 0;
      }
    }
    return obj;
  };

  exports.doGetProperty = doGetProperty;

  conditionCheck = function(conditionFormular, variables, cmd) {
    var c, k;
    if (getTypeof(conditionFormular) !== 'Boolean') {
      return false;
    }
    if (conditionFormular === true) {
      return true;
    }
    if (conditionFormular === false) {
      return false;
    }
    for (k in conditionFormular) {
      c = conditionFormular[k];
      switch (k) {
        case '>':
          return parse(c[0], variables, cmd) > parse(c[1], variables, cmd);
        case '<':
          return parse(c[0], variables, cmd) < parse(c[1], variables, cmd);
        case '==':
          return parse(c[0], variables, cmd) === parse(c[1], variables, cmd);
        case '!=':
          return parse(c[0], variables, cmd) !== parse(c[1], variables, cmd);
        case '<=':
          return parse(c[0], variables, cmd) <= parse(c[1], variables, cmd);
        case '>=':
          return parse(c[0], variables, cmd) >= parse(c[1], variables, cmd);
        case 'or':
          return parse(c, variables, cmd).some(function(x) {
            return parse(x, variables, cmd);
          });
        case 'and':
          return parse(c, variables, cmd).every(function(x) {
            return parse(x, variables, cmd);
          });
        case 'not':
          return !parse(c, variables, cmd);
      }
    }
  };

  exports.conditionCheck = conditionCheck;

  parse = function(expr, variable, cmd) {
    if (Array.isArray(expr)) {
      return expr.map(function(e) {
        return parse(e, variable, cmd);
      });
    } else {
      switch (getTypeof(expr)) {
        case 'Boolean':
          return conditionCheck(expr, variable, cmd);
        case 'Variable':
          return bindVariable(expr, variable, cmd);
        case 'Formular':
          return calculate(expr, variable, cmd);
        case 'Branch':
          return branch(expr, variable, cmd);
        case 'Loop':
          return doLoop(expr, variable, cmd);
        case 'Action':
          return doAction(expr, variable, cmd);
        default:
          return getVar(expr, variable, cmd);
      }
    }
  };

  getTypeof = function(expr) {
    var k, v;
    if (expr == null) {
      return 'Undefined';
    }
    if (expr === true || expr === false) {
      return 'Boolean';
    }
    if (!(typeof expr === 'object' || Array.isArray(expr))) {
      return 'Undefined';
    }
    if (expr.type != null) {
      return 'Action';
    }
    if (getTypeof(expr.condition) === 'Boolean') {
      if (expr["if"] != null) {
        return 'Branch';
      }
      if (expr["while"] != null) {
        return 'Loop';
      }
    }
    for (k in expr) {
      v = expr[k];
      if (k[1] === '_') {
        if (k[0] === 'v') {
          return 'Variable';
        }
      }
    }
    for (k in expr) {
      v = expr[k];
      switch (k) {
        case '<':
        case '>':
        case '==':
        case '>=':
        case '<=':
        case '!=':
        case 'or':
        case 'and':
        case 'not':
          return 'Boolean';
        case '+':
        case '-':
        case '*':
        case '/':
        case '&':
        case '|':
        case '~':
          return 'Formular';
      }
    }
    return 'Undefined';
  };

  branch = function(expr, variable, cmd) {
    if (parse(expr.condition, variable, cmd) === true) {
      return parse(expr["if"], variable, cmd);
    } else if (expr["else"]) {
      return parse(expr["else"], variable, cmd);
    }
  };

  doLoop = function(expr, variable, cmd) {
    var _results;
    _results = [];
    while (parse(expr.condition, variable, cmd) === true) {
      _results.push(parse(expr["while"], variable, cmd));
    }
    return _results;
  };

  getVar = function(kv, variable, cmd) {
    var _base;
    if ((variable != null) && (variable[kv] != null)) {
      return variable[kv];
    }
    if ((cmd != null) && ((typeof cmd.getEnvironment === "function" ? typeof (_base = cmd.getEnvironment()).getVar === "function" ? _base.getVar(kv) : void 0 : void 0) != null)) {
      return cmd.getEnvironment().getVar(kv);
    }
    if (Array.isArray(kv)) {
      return kv.map(function(k) {
        return getVar(k);
      });
    }
    return kv;
  };

  doAction = function(actions, variables, cmd) {
    var a, act, c, env, k, local, v, _i, _len;
    if (!Array.isArray(actions)) {
      actions = [actions];
    }
    if (cmd != null) {
      env = cmd.getEnvironment();
    }
    for (_i = 0, _len = actions.length; _i < _len; _i++) {
      act = actions[_i];
      if (act.trigger != null) {
        variables = env.getTrigger(act.trigger).variables;
      }
      switch (act.type) {
        case 'deleteVariable':
          delete variables[act.name];
          break;
        case 'getProperty':
          local = doGetProperty(variables, act.key);
          if ((local == null) && (env != null)) {
            return doGetProperty(env.variable(), act.key);
          }
          return local;
        case 'newVariable':
          variables[act.name] = parse(act.value, variables, cmd);
          return variables[act.name];
        case 'modifyVariable':
          if (variables[act.name] != null) {
            variables[act.name] = parse(act.value, variables, cmd);
          } else if (env.variable(act.name) != null) {
            return env.variable(act.name, parse(act.value, variables, cmd));
          }
          break;
        case 'delay':
          c = {
            id: 'Delay'
          };
          if (act.delay != null) {
            c.delay = act.delay;
          }
          cmd = cmd.next(c);
          break;
        default:
          a = {};
          for (k in act) {
            v = act[k];
            a[k] = parse(v, variables, cmd);
          }
          if (env != null) {
            return env.doAction(a, variables, cmd);
          }
      }
    }
  };

  bindVariable = function(variables, dummy, cmd) {
    var k, ret, v;
    ret = {};
    for (k in variables) {
      v = variables[k];
      ret[k] = parse(v, variables, cmd);
    }
    return ret;
  };

  calculate = function(formular, variables, cmd) {
    var c, k;
    for (k in formular) {
      c = formular[k];
      switch (k) {
        case '+':
          return parse(c[0], variables, cmd) + parse(c[1], variables, cmd);
        case '-':
          return parse(c[0], variables, cmd) - parse(c[1], variables, cmd);
        case '*':
          return parse(c[0], variables, cmd) * parse(c[1], variables, cmd);
        case '/':
          return parse(c[0], variables, cmd) / parse(c[1], variables, cmd);
        case '&':
          return parse(c[0], variables, cmd) & parse(c[1], variables, cmd);
        case '|':
          return parse(c[0], variables, cmd) | parse(c[1], variables, cmd);
        case '~':
          return ~parse(c, variables, cmd);
      }
    }
  };

  TriggerManager = (function() {
    function TriggerManager(config) {
      this.config = config;
      this.triggers = {};
      this.events = {};
    }

    TriggerManager.prototype.onEvent = function(event, cmd) {
      var i, t, _ref, _results;
      if (this.events[event] == null) {
        return false;
      }
      _ref = this.events[event];
      _results = [];
      for (i in _ref) {
        t = _ref[i];
        if (this.triggers[t] != null) {
          _results.push(this.invokeTrigger(t, {}, cmd));
        }
      }
      return _results;
    };

    TriggerManager.prototype.doAction = function(act, variables, cmd) {
      switch (act.type) {
        case 'installTrigger':
          return this.installTrigger(act.name, variables, cmd);
        case 'removeTrigger':
          return this.removeTrigger(act.name);
        case 'enableTrigger':
          return this.enableTrigger(act.name);
        case 'disableTrigger':
          return this.disableTrigger(act.name);
        case 'invokeTrigger':
          return this.invokeTrigger(act.name, act.paramater, cmd);
      }
    };

    TriggerManager.prototype.installTrigger = function(name, variables, cmd) {
      var cfg, e, _i, _len, _ref, _results;
      cfg = this.config[name];
      if (cfg == null) {
        throw Error('Unconfigured trigger:' + name);
      }
      this.triggers[name] = {
        variables: bindVariable(cfg.variable, variables, cmd),
        enable: true
      };
      if (cfg.triggerEvent) {
        _ref = cfg.triggerEvent;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (this.events[e] == null) {
            this.events[e] = [];
          }
          _results.push(this.events[e].push(name));
        }
        return _results;
      }
    };

    TriggerManager.prototype.getTrigger = function(name) {
      return this.triggers[name];
    };

    TriggerManager.prototype.disableTrigger = function(name) {
      var _ref;
      return (_ref = this.triggers[name]) != null ? _ref.enable = false : void 0;
    };

    TriggerManager.prototype.enableTrigger = function(name) {
      var _ref;
      return (_ref = this.triggers[name]) != null ? _ref.enable = true : void 0;
    };

    TriggerManager.prototype.removeTrigger = function(name) {
      return delete this.triggers[name];
    };

    TriggerManager.prototype.invokeTrigger = function(name, paramaters, cmd) {
      var cfg, trigger;
      trigger = this.triggers[name];
      if (!((trigger != null) && trigger.enable)) {
        return false;
      }
      cfg = this.config[name];
      if ((cfg.condition != null) && !parse(cfg.condition, trigger.variables, cmd)) {
        return false;
      }
      return parse(cfg.action, trigger.variables, cmd);
    };

    return TriggerManager;

  })();

  exports.parse = parse;

  exports.TriggerManager = TriggerManager;

  exports.fileVersion = -1;

}).call(this);
