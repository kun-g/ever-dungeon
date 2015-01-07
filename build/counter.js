(function() {
  "use strict";
  var Counter, Serializer, libTime, moment, registerConstructor, _ref;

  libTime = require('./timeUtils.js');

  moment = require('./moment');

  _ref = require('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  Counter = (function() {
    function Counter(config) {
      this.config = config;
      this.counter = config.initial_value;
      this.time = null;
      Object.defineProperty(this, 'config', {
        enumerable: false,
        writable: false,
        configurable: false
      });
    }

    Counter.prototype.isFulfiled = function(time) {
      this.update(time);
      if (this.config.uplimit) {
        return this.counter >= this.config.uplimit;
      }
      return false;
    };

    Counter.prototype.notFulfiled = function(time) {
      return !this.isFulfiled(time);
    };

    Counter.prototype.isCounted = function(time) {
      var theData;
      theData = {
        ThisCounter: {
          time: this.time
        }
      };
      if (this.config.count_down) {
        return libTime.verify(time, this.config.count_down, theData);
      }
      return false;
    };

    Counter.prototype.notCounted = function(time) {
      return !this.isCounted(time);
    };

    Counter.prototype.update = function(time) {
      return this.incr(0, time);
    };

    Counter.prototype.decr = function(delta, time) {
      return this.incr(-delta, time);
    };

    Counter.prototype.incr = function(delta, time) {
      var combo, duration, theData, units, uplimit;
      duration = this.config.duration;
      units = this.config.units;
      theData = {
        ThisCounter: {
          time: this.time
        }
      };
      time = moment(time);
      duration = this.config.duration;
      if (duration) {
        if (!libTime.verify(time, duration, theData)) {
          this.counter = 0;
        }
      }
      combo = this.config.combo;
      if (combo) {
        if (!libTime.verify(time, combo, theData)) {
          this.counter = 0;
        }
      }
      if (this.config.count_down && this.isCounted(time)) {
        delta = 0;
      }
      uplimit = this.config.uplimit;
      if (uplimit && this.counter + delta > uplimit) {
        delta = uplimit - this.counter;
      }
      this.counter += delta;
      if (delta) {
        this.time = time.format();
      }
      return this;
    };

    Counter.prototype.reset = function() {
      return this.counter = config.initial_value;
    };

    Counter.prototype.fulfill = function() {
      if (this.config.uplimit) {
        return this.counter = config.uplimit;
      }
    };

    return Counter;

  })();

  exports.Counter = Counter;

}).call(this);
