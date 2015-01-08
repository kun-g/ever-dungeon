libTrigger = {};
(function() {
  "use strict";
  var Action, ActionDB, Condition, PredicateDB, Query, SequalDB, Trigger, TriggerManager, angle_dir_map, areaShape, bindVariable, branch, calcDirection, calculate, conditionCheck, condition_and, condition_or, direction, doAction, doGetProperty, doLoop, evaluateParameter, executeSequal, filterObject, getTypeof, getVar, handlers, initCalcDirFunc, isSequal, maskUnion, modifier, parameter_config, parse, parseVariable, printMask, selectCross, selectLine, selectSquare, selectTriangle, translatePos;

  modifier = {
    1: {
      x: -1,
      y: 1
    },
    2: {
      x: 0,
      y: 1
    },
    3: {
      x: 1,
      y: 1
    },
    4: {
      x: -1,
      y: 0
    },
    5: {
      x: 0,
      y: 0
    },
    6: {
      x: 1,
      y: 0
    },
    7: {
      x: -1,
      y: -1
    },
    8: {
      x: 0,
      y: -1
    },
    9: {
      x: 1,
      y: -1
    }
  };

  direction = {
    NorthWest: 7,
    North: 8,
    NorthEast: 9,
    West: 4,
    Center: 5,
    East: 6,
    SouthWest: 1,
    South: 2,
    SouthEast: 3
  };

  areaShape = {
    Line: 0,
    Cross: 1,
    Square: 2,
    Triangle: 3
  };

  translatePos = function(pos) {
    var x, y;
    x = pos % Dungeon_Width;
    y = (pos - x) / Dungeon_Width;
    return {
      x: x,
      y: y
    };
  };

  libTrigger.translatePos = translatePos;

  angle_dir_map = [];

  angle_dir_map[direction.East] = [0, 1, 15, 16];

  angle_dir_map[direction.NorthEast] = [1, 3];

  angle_dir_map[direction.North] = [3, 5];

  angle_dir_map[direction.NorthWest] = [5, 7];

  angle_dir_map[direction.West] = [7, 9];

  angle_dir_map[direction.SouthWest] = [9, 11];

  angle_dir_map[direction.South] = [11, 13];

  angle_dir_map[direction.SouthEast] = [13, 15];

  initCalcDirFunc = function(cfg) {
    var inRange;
    cfg = cfg.map(function(elm) {
      return elm.map(function(rd) {
        return rd / 8 * Math.PI;
      });
    });
    inRange = function(cfg, angle) {
      var k, v, _i, _len;
      for (k = _i = 0, _len = cfg.length; _i < _len; k = ++_i) {
        v = cfg[k];
        if (v != null) {
          if ((v[0] <= angle && angle < v[1])) {
            return k;
          }
          if ((v.length === 4) && ((v[0] <= angle && angle < v[1]) || (v[2] <= angle && angle < v[3]))) {
            return k;
          }
        }
      }
      return direction.Center;
    };
    return function(src, tar) {
      var angle, dx, dy;
      dx = tar.x - src.x;
      dy = src.y - tar.y;
      if (dx === 0 && dy === 0) {
        return direction.Center;
      }
      angle = Math.atan(dy / dx);
      if (angle < 0) {
        angle = Math.PI + angle;
      }
      if (dy < 0 || (dy === 0 && dx < 0)) {
        angle += Math.PI;
      }
      return inRange(cfg, angle);
    };
  };

  calcDirection = initCalcDirFunc(angle_dir_map);

  libTrigger.calcDirection = calcDirection;

  maskUnion = function(one, another) {
    var arr, idx1, idx2, isMask, result, _i, _len;
    result = [].concat(one);
    for (idx1 in another) {
      arr = another[idx1];
      if (result[idx1] == null) {
        result[idx1] = [];
      }
      for (idx2 = _i = 0, _len = arr.length; _i < _len; idx2 = ++_i) {
        isMask = arr[idx2];
        if (isMask) {
          result[idx1][idx2] = true;
        }
      }
    }
    return result;
  };

  printMask = function(arr) {
    var arr1, c, idx, strArr, _i, _j, _len, _ref, _results;
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      arr1 = arr[_i];
      if (arr1 != null) {
        strArr = [];
        for (idx = _j = 0, _ref = Dungeon_Width - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; idx = 0 <= _ref ? ++_j : --_j) {
          c = arr1[idx] ? '@' : '*';
          strArr.push(c);
        }
        _results.push(debug(strArr.join('|')));
      } else {
        _results.push(debug('*|*|*|*|*'));
      }
    }
    return _results;
  };

  selectLine = function(x, y, direction, dFrom, length, result) {
    var i, mod, _i, _ref, _ref1, _ref2;
    mod = modifier[direction];
    if (!result) {
      result = [];
    }
    for (i = _i = dFrom, _ref = dFrom + length - 1; dFrom <= _ref ? _i <= _ref : _i >= _ref; i = dFrom <= _ref ? ++_i : --_i) {
      if (!((0 <= (_ref1 = y + mod.y * i) && _ref1 < Dungeon_Height) && (0 <= (_ref2 = x + mod.x * i) && _ref2 < Dungeon_Width))) {
        continue;
      }
      if (!result[y + mod.y * i]) {
        result[y + mod.y * i] = [];
      }
      result[y + mod.y * i][x + mod.x * i] = true;
    }
    return result;
  };

  selectCross = function(x, y, direction, dFrom, length) {
    var ret, sel, selector, _i, _len;
    selector = [2, 4, 6, 8];
    if (direction % 2) {
      selector = [1, 3, 7, 9];
    }
    ret = [];
    for (_i = 0, _len = selector.length; _i < _len; _i++) {
      sel = selector[_i];
      selectLine(x, y, sel, dFrom, length + 1, ret);
    }
    return ret;
  };

  selectSquare = function(x, y, direction, dFrom, length, ground) {
    var adjust, i, mod, ret, sel, selector, _i, _j, _len, _ref;
    if (direction % 2) {
      selector = [[8, 3], [6, 1], [2, 7], [4, 9]];
      adjust = 1;
    } else {
      selector = [[7, 6], [9, 2], [1, 8], [3, 4]];
      adjust = 2;
    }
    ret = [];
    for (i = _i = dFrom, _ref = dFrom + length; dFrom <= _ref ? _i <= _ref : _i >= _ref; i = dFrom <= _ref ? ++_i : --_i) {
      for (_j = 0, _len = selector.length; _j < _len; _j++) {
        sel = selector[_j];
        mod = modifier[sel[0]];
        selectLine(x + mod.x * i, y + mod.y * i, sel[1], 0, i * adjust + 1, ret);
      }
    }
    return ret;
  };

  selectTriangle = function(x, y, direction, dFrom, length, ground) {
    var i, localModifier, mod, ret, _i, _ref;
    localModifier = {
      7: [4, 9],
      8: [7, 6],
      9: [8, 3],
      4: [1, 8],
      5: [5, 5],
      6: [9, 2],
      1: [2, 7],
      2: [3, 4],
      3: [6, 1]
    };
    ret = [];
    for (i = _i = dFrom, _ref = dFrom + length - 1; dFrom <= _ref ? _i <= _ref : _i >= _ref; i = dFrom <= _ref ? ++_i : --_i) {
      mod = localModifier[direction][0];
      mod = modifier[mod];
      if (direction % 2) {
        selectLine(x + mod.x * i, y + mod.y * i, localModifier[direction][1], 0, i + 1, ret);
      } else {
        selectLine(x + mod.x * i, y + mod.y * i, localModifier[direction][1], 0, 1 + 2 * i, ret);
      }
    }
    return ret;
  };

  handlers = {};

  handlers[areaShape.Line] = selectLine;

  handlers[areaShape.Cross] = selectCross;

  handlers[areaShape.Square] = selectSquare;

  handlers[areaShape.Triangle] = selectTriangle;

  filterObject = function(me, objects, filters, env) {
    var dirTarPos, effectDir, f, mask, o, p, result, srcFaction, tmp, _i, _len, _ref, _ref1, _ref2;
    if (!Array.isArray(filters)) {
      filters = [filters];
    }
    result = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        o = objects[_i];
        _results.push(o);
      }
      return _results;
    })();
    for (_i = 0, _len = filters.length; _i < _len; _i++) {
      f = filters[_i];
      srcFaction = (_ref = me.faction) != null ? _ref : f.faction;
      switch (f.type) {
        case 'alive':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              p = result[_j];
              if (p.isAlive()) {
                _results.push(p);
              }
            }
            return _results;
          })();
          break;
        case 'same-faction':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              o = result[_j];
              if (o.faction === srcFaction) {
                _results.push(o);
              }
            }
            return _results;
          })();
          break;
        case 'role-id':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              o = result[_j];
              if (o.roleID === f.roleID) {
                _results.push(o);
              }
            }
            return _results;
          })();
          break;
        case 'visible':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              p = result[_j];
              if (p.isVisible) {
                _results.push(p);
              }
            }
            return _results;
          })();
          break;
        case 'not-me':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              p = result[_j];
              if (p.ref !== me.ref) {
                _results.push(p);
              }
            }
            return _results;
          })();
          break;
        case 'same-block':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              p = result[_j];
              if (p.pos === me.pos) {
                _results.push(p);
              }
            }
            return _results;
          })();
          break;
        case 'sort':
          result.sort(function(a, b) {
            if (f.reverse) {
              return b[f.by] - a[f.by];
            } else {
              return a[f.by] - b[f.by];
            }
          });
          break;
        case 'count':
          result = result.slice(0, f.count);
          break;
        case 'different-faction':
          result = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
              o = result[_j];
              if (o.faction !== srcFaction) {
                _results.push(o);
              }
            }
            return _results;
          })();
          break;
        default:
          if (env == null) {
            return [];
          }
          switch (f.type) {
            case 'target-faction-with-flag':
              result = (function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
                  o = result[_j];
                  if (env.getFactionConfig(srcFaction, o.faction, f.flag)) {
                    _results.push(o);
                  }
                }
                return _results;
              })();
              break;
            case 'source-faction-with-flag':
              result = (function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
                  o = result[_j];
                  if (env.getFactionConfig(o.faction, srcFaction, f.flag)) {
                    _results.push(o);
                  }
                }
                return _results;
              })();
              break;
            case 'target-faction-without-flag':
              result = (function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
                  o = result[_j];
                  if (!env.getFactionConfig(srcFaction, o.faction, f.flag)) {
                    _results.push(o);
                  }
                }
                return _results;
              })();
              break;
            case 'source-faction-without-flag':
              result = (function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
                  o = result[_j];
                  if (!env.getFactionConfig(o.faction, srcFaction, f.flag)) {
                    _results.push(o);
                  }
                }
                return _results;
              })();
              break;
            case 'shuffle':
              result = shuffle(result, env.rand());
              break;
            case 'anchor':
              tmp = result;
              f = JSON.parse(JSON.stringify(f));
              if (f.startDistance == null) {
                f.startDistance = 0;
              }
              if (f.offsetX == null) {
                f.offsetX = 0;
              }
              if (f.offsetY == null) {
                f.offsetY = 0;
              }
              if (f.anchorPos != null) {
                if (Array.isArray(f.anchorPos)) {
                  f.anchorPosList = f.anchorPos;
                } else {
                  f.anchorPosList = me.selectTarget({
                    targetSelection: f.anchorPos
                  }, env).map(function(e) {
                    return e.pos;
                  });
                }
              } else {
                f.anchorPosList = [0];
              }
              if (f.anchorDirPos != null) {
                dirTarPos = (_ref1 = me.selectTarget({
                  targetSelection: f.anchorDirPos
                }, env)) != null ? (_ref2 = _ref1[0]) != null ? _ref2.pos : void 0 : void 0;
              }
              effectDir = [];
              mask = f.anchorPosList.reduce(function(acc, pos) {
                var dir;
                p = translatePos(pos);
                if (f.direction != null) {
                  dir = f.direction;
                } else if (dirTarPos != null) {
                  dir = calcDirection(p, translatePos(dirTarPos));
                } else {
                  dir = direction.East;
                }
                effectDir.push(dir);
                mask = handlers[f.shape](p.x + f.offsetX, p.y + f.offsetY, dir, f.startDistance, f.length);
                return maskUnion(acc, mask);
              }, []);
              debug('aP', f.anchorPosList, 'dirTarPos', dirTarPos);
              env.variable('effdirlst', effectDir);
              result = result.filter(function(e) {
                var _ref3;
                p = translatePos(e.pos);
                return (_ref3 = mask[p.y]) != null ? _ref3[p.x] : void 0;
              });
          }
      }
    }
    return result;
  };

  libTrigger.filterObject = filterObject;

  doGetProperty = function(obj, key) {
    var k, properties, _i, _len;
    if (typeof key === 'string') {
      properties = key.split('.');
    } else {
      properties = [key];
    }
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

  libTrigger.doGetProperty = doGetProperty;

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

  libTrigger.conditionCheck = conditionCheck;

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
        case 'Time':
          return moment(expr.time);
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
    if (expr.time) {
      return 'Time';
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

  libTrigger.parse = parse;

  libTrigger.TriggerManager = TriggerManager;

  libTrigger.fileVersion = -1;

  evaluateParameter = function(expression) {
    if (typeof expression === 'string') {
      if (expression[0] === '$') {
        return false;
      }
    } else if (typeof expression === 'object') {
      throw 'NNNN';
    }
    return expression;
  };

  condition_and = function(config, parameter) {
    var cond, condition, result, _i, _len;
    result = true;
    for (_i = 0, _len = config.length; _i < _len; _i++) {
      cond = config[_i];
      condition = new Condition(cond);
      result = result && condition.evaluate.apply(condition, parameter);
      if (!result) {
        return false;
      }
    }
    return result;
  };

  condition_or = function(config, parameter) {
    var cond, condition, result, _i, _len;
    result = false;
    for (_i = 0, _len = config.length; _i < _len; _i++) {
      cond = config[_i];
      condition = new Condition(cond);
      result = result || condition.evaluate.apply(condition, parameter);
      if (result) {
        return true;
      }
    }
    return result;
  };

  Condition = (function() {
    function Condition(config) {
      this.config = config;
      this.variable = {};
    }

    Condition.prototype.addVariable = function(key, value) {
      this.variable[key] = value;
      return this;
    };

    Condition.prototype.fillUpParamter = function(parameters) {
      var k, parameter_config, result, v;
      parameter_config = PredicateDB[this.config.predicate].parameter;
      if (!parameter_config) {
        return parameters;
      }
      result = [];
      for (k in parameter_config) {
        v = parameter_config[k];
        if (parameters != null ? parameters[v] : void 0) {
          result[k] = parameters[v];
        } else {
          result[k] = this.config[v];
        }
      }
      result = result.map((function(_this) {
        return function(e) {
          if (isSequal(e)) {
            return executeSequal(e, _this.variable);
          } else {
            return e;
          }
        };
      })(this));
      return result;
    };

    Condition.prototype.executePredicator = function(name, parameters) {
      return PredicateDB[name].func.apply(this, this.fillUpParamter.apply(this, parameters));
    };

    Condition.prototype.evaluate = function() {
      var condition, result;
      if (!this.config) {
        return true;
      }
      if (typeof this.config === 'string') {
        result = this.executePredicator(this.config, arguments);
      } else if (Array.isArray(this.config)) {
        result = condition_and(this.config, arguments);
      } else if (typeof this.config === 'object') {
        if (this.config.or) {
          result = condition_or(this.config.or, arguments);
        } else if (this.config.not) {
          condition = new Condition(this.config.not);
          result = !condition.evaluate.apply(condition, arguments);
        } else if (this.config.and) {
          result = condition_and(this.config.and, arguments);
        } else {
          result = this.executePredicator(this.config.predicate, arguments);
        }
      } else {
        result = false;
      }
      this.varialbe = {};
      return result;
    };

    return Condition;

  })();

  libTrigger.Condition = Condition;

  Action = (function() {
    function Action(config) {
      this.config = config;
      this.variable = {};
    }

    Action.prototype.addVariable = function(key, value) {
      this.variable[key] = value;
      return this;
    };

    Action.prototype.fillUpParamter = function(parameters) {
      var k, parameter_config, result, v;
      parameter_config = ActionDB[this.config.action].parameter;
      if (!parameter_config) {
        return parameters;
      }
      result = [];
      for (k in parameter_config) {
        v = parameter_config[k];
        if (parameters != null ? parameters[v] : void 0) {
          result[k] = parameters[v];
        } else {
          result[k] = this.config[v];
        }
      }
      result = result.map((function(_this) {
        return function(e) {
          if (isSequal(e)) {
            return executeSequal(e, _this.variable);
          } else {
            return e;
          }
        };
      })(this));
      return result;
    };

    Action.prototype.execute = function(parameters) {
      return ActionDB[this.config.action].func.apply(this, this.fillUpParamter(parameters));
    };

    return Action;

  })();

  libTrigger.Action = Action;

  Trigger = (function() {
    function Trigger(config, creator) {
      this.config = config;
      this.creator = creator;
    }

    Trigger.prototype.conditionIsPassed = function(parameters) {
      if (!this.config.condition) {
        return true;
      }
      return (new Condition(this.config.condition)).evaluate(parameters);
    };

    Trigger.prototype.executeAction = function(parameters) {
      var action;
      action = new Action(this.config.action);
      return action.execute(parameters);
    };

    Trigger.prototype.execute = function(parameters) {
      if (this.conditionIsPassed(parameters)) {
        return this.executeAction(parameters);
      }
    };

    return Trigger;

  })();

  libTrigger.Trigger = Trigger;

  ActionDB = {};

  ActionDB.modify_property = {
    parameter: ['object', 'key', 'value'],
    func: function(object, key, value) {
      return object[key] = value;
    }
  };

  PredicateDB = {};

  PredicateDB.alive = {
    parameter: ['object'],
    func: function(object) {
      if (object.isAlive) {
        return object.isAlive();
      } else {
        return false;
      }
    }
  };

  parameter_config = ['value1', 'value2'];

  PredicateDB['>'] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a > b;
    }
  };

  PredicateDB['<'] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a < b;
    }
  };

  PredicateDB['='] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a === b;
    }
  };

  PredicateDB['>='] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a >= b;
    }
  };

  PredicateDB['<='] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a <= b;
    }
  };

  PredicateDB['!='] = {
    parameter: parameter_config,
    func: function(a, b) {
      return a !== b;
    }
  };

  PredicateDB.same = {
    parameter: ['parameters'],
    func: function(parameters) {
      var k, mask, v;
      mask = {};
      for (k in parameters) {
        v = parameters[k];
        mask[v] = 1;
      }
      return Object.keys(mask).length === 1;
    }
  };

  parseVariable = function(expr, variables) {
    var keys, obj;
    if (!(variables && typeof expr === 'string')) {
      return expr;
    }
    if (expr[0] !== '$') {
      return expr;
    }
    expr = expr.slice(1);
    keys = expr.split('.');
    obj = variables[keys.shift()];
    while (keys.length) {
      if (!obj) {
        return null;
      }
      obj = obj[keys.shift()];
    }
    return obj;
  };

  isSequal = function(expr) {
    return (expr != null ? expr.query : void 0) != null;
  };

  executeSequal = function(expr, variables) {
    var key, obj, query;
    query = new Query(expr.query);
    obj = parseVariable(expr.object, variables);
    if (isSequal(obj)) {
      obj = executeSequal(obj, variables);
    }
    key = parseVariable(expr.key, variables);
    if (isSequal(key)) {
      key = executeSequal(key, variables);
    }
    return query.evaluate(obj, key);
  };

  libTrigger.executeSequal = executeSequal;

  Query = (function() {
    function Query(config, creator) {
      this.config = config;
      this.creator = creator;
      this.func = SequalDB[this.config];
    }

    Query.prototype.evaluate = function() {
      return this.func.apply(this, arguments);
    };

    return Query;

  })();

  libTrigger.Query = Query;

  SequalDB = {
    get_property: function() {
      return doGetProperty(arguments[0], arguments[1]);
    },
    select_target: function() {
      var pool, predicator, _i, _len;
      pool = getPool();
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        predicator = conditions[_i];
        pool = pool.filter(function(e) {
          return predicator(e);
        });
      }
      return pool;
    }
  };

  libTrigger.direction = direction;

  libTrigger.areaShape = areaShape;

}).call(this);
