(function() {
  "use strict";
  var complexVerify, doVerify, getLogicOperator, moment, parseDuration, parseMoment, verify, _, _s;

  moment = require('./moment');

  _s = require("./underscore.string.js");

  _ = require("./underscore.js");

  _.mixin(_s.exports());

  _.mixin({
    includeString: _s.include,
    reverseString: _s.reverse
  });

  complexVerify = function(time, exp) {
    switch (getLogicOperator(exp)) {
      case 'or':
        return exp.or.reduce(function(r, e) {
          if (r) {
            return r;
          }
          return r || doVerify(time, e);
        }, false);
      case 'and':
        return exp.and.reduce(function(r, e) {
          if (!r) {
            return r;
          }
          return r && doVerify(time, e);
        }, true);
      case 'not':
        return !doVerify(time, exp.not);
    }
  };

  getLogicOperator = function(obj) {
    var k, key, keys;
    keys = ['or', 'and', 'not'];
    for (k in keys) {
      key = keys[k];
      if (obj[key]) {
        return key;
      }
    }
    return null;
  };

  doVerify = function(time, config) {
    var duration, from, localDuration, range, result, to;
    if (getLogicOperator(config)) {
      return complexVerify(time, config);
    }
    result = true;
    range = moment(config.time);
    if (range) {
      if (config.units) {
        result = result && range.isSame(time, config.units);
      }
      duration = config.duration;
      if (duration) {
        localDuration = moment.duration({
          to: time,
          from: range
        });
        result = result && localDuration < moment.duration(duration);
      }
    }
    from = config.from;
    to = config.to;
    if (from) {
      result = result && time.isAfter(from);
    }
    if (to) {
      result = result && time.isBefore(to);
    }
    return result;
  };

  parseMoment = function(arg, theObject) {
    var field, object, time, tokens;
    if (!arg) {
      return moment();
    }
    if (moment.isMoment(arg)) {
      return arg;
    }
    if (typeof arg === 'string') {
      if (_(arg).includeString('@')) {
        tokens = _(arg).words("@");
        field = tokens[0];
        object = theObject[tokens[1]];
        arg = object[field];
      }
      arg = moment(arg);
    } else if (typeof arg === 'object') {
      time = parseMoment(arg.time, theObject);
      if (arg.startOf) {
        time = time.startOf(arg.startOf);
      }
      if (arg.endOf) {
        time = time.endOf(arg.endOf);
      }
      if (arg.offset) {
        time = time.add(moment.duration(arg.offset));
      }
      arg = time;
    }
    return arg;
  };

  parseDuration = function(exp, theObject) {
    var config, operator, tempFunc;
    config = {};
    operator = getLogicOperator(exp);
    if (operator) {
      tempFunc = function(e) {
        return parseDuration(e, theObject);
      };
      config[operator] = exp[operator].map(tempFunc);
    } else {
      config.units = exp.units;
      if (exp.time) {
        config.time = parseMoment(exp.time, theObject);
        if (exp.duration) {
          config.duration = moment.duration(exp.duration);
        }
      } else if (exp.from) {
        config.from = parseMoment(exp.from, theObject);
      } else if (exp.to) {
        config.to = parseMoment(exp.to, theObject);
      }
    }
    return config;
  };

  verify = function(time, durationExp, theData) {
    var timeExp;
    time = parseMoment(time, theData);
    theData.Arguments = {
      time: time
    };
    timeExp = parseDuration(durationExp, theData);
    return doVerify(time, timeExp);
  };

  exports.verify = verify;

  exports.diff = function(to, from) {
    return moment.duration({
      from: from,
      to: to
    });
  };

  exports.currentTime = function() {
    return moment().format();
  };

}).call(this);
