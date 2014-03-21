(function() {
  var Serializer, g_attr_constructorTable, objectlize, registerConstructor;

  Serializer = (function() {
    function Serializer() {
      this.s_attr_to_save = [];
      this.s_attr_version = {};
      this.s_attr_dirtyFlag = {};
      Object.defineProperty(this, 's_attr_to_save', {
        enumerable: false
      });
      Object.defineProperty(this, 's_attr_version', {
        enumerable: false
      });
      Object.defineProperty(this, 's_attr_dirtyFlag', {
        enumerable: false
      });
    }

    Serializer.prototype.attrSave = function(key, val) {
      if (val != null) {
        this[key] = val;
      }
      if (this.s_attr_to_save.indexOf(key) !== -1) {
        return false;
      }
      return this.s_attr_to_save.push(key);
    };

    Serializer.prototype.versionControl = function(versionKey, keys) {
      var key, _i, _j, _len, _len1, _results;
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.attrSave(key);
      }
      if (this[versionKey] == null) {
        this[versionKey] = 1;
      }
      if (!this.s_attr_version[versionKey]) {
        this.s_attr_version[versionKey] = [];
      }
      _results = [];
      for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
        key = keys[_j];
        if (this.s_attr_version[versionKey].indexOf(key) === -1) {
          _results.push(this.s_attr_version[versionKey].push(key));
        }
      }
      return _results;
    };

    Serializer.prototype.getConstructor = function() {
      return g_attr_constructorTable[this.constructor.name];
    };

    Serializer.prototype.dump = function() {
      var key, ret, v, val, _i, _len, _ref, _ref1;
      ret = {
        _constructor_: this.constructor.name,
        save: {}
      };
      _ref = this.s_attr_to_save;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (!(this[key] != null)) {
          continue;
        }
        val = this[key];
        if (Array.isArray(val)) {
          ret.save[key] = val.map(function(e) {
            if ((e != null ? e.dump : void 0) != null) {
              return e.dump();
            } else {
              return e;
            }
          });
        } else {
          ret.save[key] = (val != null ? val.dump : void 0) != null ? val.dump() : val;
        }
      }
      _ref1 = this.s_attr_version;
      for (key in _ref1) {
        v = _ref1[key];
        ret.save[key] = this[key];
      }
      return ret;
    };

    Serializer.prototype.restore = function(data) {
      var k, v;
      if (data == null) {
        return this;
      }
      for (k in data) {
        v = data[k];
        if (v != null) {
          if (v._constructor_ != null) {
            this.attrSave(k, objectlize(v));
          } else if (Array.isArray(v)) {
            this.attrSave(k, v.map(function(e) {
              if ((e != null ? e._constructor_ : void 0) != null) {
                return objectlize(e);
              } else {
                return e;
              }
            }));
          } else {
            this.attrSave(k, v);
          }
        }
      }
      return this;
    };

    Serializer.prototype.dumpChanged = function() {
      return this.dump().save;
    };

    return Serializer;

  })();

  objectlize = function(data) {
    var o;
    if ((data != null ? data._constructor_ : void 0) == null) {
      throw 'No constructor';
    }
    if (!g_attr_constructorTable[data._constructor_]) {
      throw 'No constructor:' + data._constructor_;
    }
    o = new g_attr_constructorTable[data._constructor_]();
    o.restore(data.save);
    if (o.initialize != null) {
      o.initialize();
    }
    return o;
  };

  registerConstructor = function(func) {
    var constructor;
    constructor = func.prototype.constructor;
    if (typeof constructor === 'function') {
      return g_attr_constructorTable[constructor.name] = func;
    }
  };

  g_attr_constructorTable = {};

  exports.Serializer = Serializer;

  exports.registerConstructor = registerConstructor;

  exports.objectlize = objectlize;

  exports.fileVersion = -1;

}).call(this);
