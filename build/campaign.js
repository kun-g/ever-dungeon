(function() {
  "use strict";
  var Campaign, libCounter, libTime, utils;

  libTime = require('./timeUtils.js');

  libCounter = require('./counter.js');

  utils = {
    libTime: libTime,
    libCounter: libCounter
  };

  Campaign = (function() {
    function Campaign(config) {
      this.config = config;
    }

    Campaign.prototype.getLogicOperator = function(obj) {
      var key, keys, _i, _len;
      keys = ['or', 'and', 'not'];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        if (obj[key]) {
          return key;
        }
      }
      return null;
    };

    Campaign.prototype.conditionCheck = function(condition, object, time) {
      var flag;
      if (!condition) {
        return true;
      }
      flag = true;
      if (Array.isArray(condition)) {
        flag = condition.reduce((function(_this) {
          return function(r, e) {
            var thisData;
            if (!r) {
              return r;
            }
            switch (e.type) {
              case 'counter':
                return _this.getInfo(object).counter[e.func](time);
              case 'time':
                thisData = {
                  Timestamp: object.timestamp
                };
                return libTime.verify(time, e.timeExpr, thisData);
              case 'function':
                thisData = {
                  object: object,
                  time: time
                };
                return e.func(thisData, utils);
            }
          };
        })(this), true);
      } else {
        switch (this.getLogicOperator(condition)) {
          case 'or':
            return condition.or.reduce((function(_this) {
              return function(r, e) {
                if (r) {
                  return r;
                }
                return r || _this.conditionCheck([e], object, time);
              };
            })(this), false);
          case 'and':
            return condition.and.reduce((function(_this) {
              return function(r, e) {
                if (!r) {
                  return r;
                }
                return r && _this.conditionCheck([e], object, time);
              };
            })(this), true);
          case 'not':
            return !this.conditionCheck([condition.not], object, time);
        }
      }
      return flag;
    };

    Campaign.prototype.canReset = function(object, time) {
      return this.conditionCheck(this.config.reset_condition, object, time);
    };

    Campaign.prototype.activate = function() {
      var delta, object, time;
      object = arguments[0];
      delta = arguments[1];
      time = arguments[2];
      return object.counters[this.config.counter.key].incr(delta, time);
    };

    Campaign.prototype.isActive = function(object, time) {
      if (this.config.storeType && object.type !== this.config.storeType) {
        return false;
      }
      return this.conditionCheck(this.config.available_condition, object, time);
    };

    Campaign.prototype.reset = function(object, time) {
      var action, thisData, _i, _len, _ref, _results;
      if (!this.config.reset_action) {
        return;
      }
      _ref = this.config.reset_action;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        switch (action.type) {
          case 'function':
            thisData = {
              object: object,
              time: time
            };
            _results.push(action.func(thisData, utils));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    Campaign.prototype.getInfo = function(object, time) {
      var counter, counterConfig, counterKey, result;
      result = {};
      counterConfig = this.config.counter;
      if (counterConfig) {
        counterKey = counterConfig.key;
        if (!object.counters[counterKey]) {
          object.counters[counterKey] = new libCounter.Counter(counterConfig);
        } else if (!(object.counters[counterKey] instanceof libCounter.Counter)) {
          counter = new libCounter.Counter(counterConfig);
          counter.counter = object.counters[counterKey].counter;
          counter.time = object.counters[counterKey].time;
          object.counters[counterKey] = counter;
        }
        result.counter = object.counters[counterKey];
      }
      return result;
    };

    return Campaign;

  })();

  exports.Campaign = Campaign;

}).call(this);
