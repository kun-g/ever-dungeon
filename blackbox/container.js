libContainer = {};
(function() {
  var Bag, CONTAINER_TYPE_BAG, CONTAINER_TYPE_CARD_STACK, CONTAINER_TYPE_FURANCE, CardStack, PlayerBag, STACK_TYPE_MULTIPLE_STACK, STACK_TYPE_SINGLE_STACK, Serializer, objectlize, registerConstructor, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  

  _ref = libSerializer, Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor, objectlize = _ref.objectlize;

  STACK_TYPE_SINGLE_STACK = 1;

  STACK_TYPE_MULTIPLE_STACK = 2;

  Bag = (function(_super) {
    __extends(Bag, _super);

    function Bag(data) {
      var cfg;
      cfg = {
        container: [],
        limit: 0,
        type: 0,
        stackType: 0
      };
      Bag.__super__.constructor.call(this, data, cfg, {});
    }

    Bag.prototype.validate = function() {
      return this.container.map((function(_this) {
        return function(item, index) {
          if (item == null) {
            return null;
          }
          if (item.count <= 0) {
            item.count = 1;
            logInfo({
              action: 'fixCount',
              index: index
            });
          }
          if (_this.queryItemSlot(item) !== index) {
            logInfo({
              action: 'fixSlot',
              index: index,
              origin: _this.queryItemSlot(item)
            });
            item.slot[_this.type] = index;
          }
          if (item.id == null) {
            logInfo({
              action: 'clearSlot',
              index: index
            });
            _this.removeItemAt(index);
          }
          return item;
        };
      })(this));
    };

    Bag.prototype.getMaxLength = function() {
      return this.container.reduce((function(r, l) {
        if (l && l.spaceCount() === 0) {
          return r + 1;
        }
        return r;
      }), this.limit);
    };

    Bag.prototype.countSpace = function() {
      return this.container.reduce((function(r, l) {
        if (l) {
          return r - l.spaceCount();
        }
        return r;
      }), this.limit);
    };

    Bag.prototype.add = function(item, count, allOrFail) {
      var bag, constructor, e, eCount, emptySlot, err, i, left, ret, sameSlot, slots, stack, tmp, tmpCount, _i, _j, _k, _l, _len, _len1, _ref1, _ref2, _ref3, _ref4;
      if (item == null) {
        return false;
      }
      ret = [];
      try {
        if (Array.isArray(item)) {
          for (_i = 0, _len = item.length; _i < _len; _i++) {
            e = item[_i];
            tmp = this.add(e.item, e.count, allOrFail);
            if (!tmp) {
              throw 'No can do';
            }
            ret = ret.concat(tmp);
          }
        } else {
          bag = this.container;
          stack = item.stack;
          sameSlot = [];
          emptySlot = [];
          if (!count) {
            count = 1;
          }
          if (!stack) {
            stack = 1;
          }
          for (i in bag) {
            e = bag[i];
            if (e != null) {
              if (e.id === item.id) {
                sameSlot.push(+i);
              }
            } else {
              emptySlot.push(+i);
            }
          }
          if (this.container.length < this.getMaxLength()) {
            for (i = _j = _ref1 = this.container.length, _ref2 = this.getMaxLength() - 1; _ref1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = _ref1 <= _ref2 ? ++_j : --_j) {
              emptySlot.push(i);
            }
          } else if (item.spaceCount() === 0) {
            for (i = _k = _ref3 = this.container.length, _ref4 = this.container.length + count; _ref3 <= _ref4 ? _k <= _ref4 : _k >= _ref4; i = _ref3 <= _ref4 ? ++_k : --_k) {
              emptySlot.push(i);
            }
          }
          if (this.stackType === STACK_TYPE_SINGLE_STACK) {
            if (sameSlot.length > 0) {
              emptySlot = [];
            } else if (emptySlot.length > 0) {
              emptySlot = [emptySlot[0]];
            }
          }
          slots = sameSlot.filter(function(s) {
            return bag[s].count < stack;
          }).concat(emptySlot);
          left = count;
          for (_l = 0, _len1 = slots.length; _l < _len1; _l++) {
            e = slots[_l];
            if (!(left > 0)) {
              continue;
            }
            eCount = 0;
            tmpCount = 0;
            if (bag[e]) {
              eCount = bag[e].count;
              tmpCount = left > stack - eCount ? stack : left + eCount;
            } else {
              tmpCount = left > stack ? stack : left;
              if (count === 1) {
                bag[e] = item;
              } else {
                constructor = item.getConstructor();
                tmp = new constructor(item.dump().save);
                bag[e] = tmp;
              }
            }
            bag[e].count = tmpCount;
            left -= tmpCount - eCount;
            bag[e].slot[this.type] = e;
            ret.push({
              slot: e,
              id: item.id,
              oldAmount: eCount,
              count: bag[e].count,
              delta: bag[e].count - eCount,
              bagType: this.type,
              opration: 'add'
            });
          }
          if (left > 0) {
            if (allOrFail) {
              throw 'No can do';
            } else {
              ret = [
                {
                  left: left
                }
              ];
            }
          }
        }
      } catch (_error) {
        err = _error;
        if (err === 'No can do') {
          this.reverseOpration(ret);
          return false;
        }
      }
      return ret;
    };

    Bag.prototype.removeById = function(id, count, allOrFail) {
      return this.remove(id, count, null, allOrFail);
    };

    Bag.prototype.removeItemAt = function(slot, count, allOrFail) {
      return this.remove(null, count, slot, allOrFail);
    };

    Bag.prototype.remove = function(id, count, slot, allOrFail) {
      var amount, bag, e, err, i, item, ret, sameSlot, that, tmp, _i, _len, _ref1;
      if (!((id != null) || (slot != null))) {
        return [];
      }
      ret = [];
      try {
        if (Array.isArray(id)) {
          for (_i = 0, _len = id.length; _i < _len; _i++) {
            e = id[_i];
            tmp = this.remove(e.item, e.count, null, allOrFail);
            if (!tmp) {
              throw 'No can do';
            }
            ret = ret.concat(tmp);
          }
        } else {
          if ((id != null) && typeof id === 'object') {
            slot = this.queryItemSlot(id);
            id = id.id;
          }
          that = this;
          bag = this.container;
          sameSlot = [];
          if (bag[slot] && ((id == null) || id === bag[slot].id)) {
            sameSlot.push(bag[slot]);
          }
          if (id != null) {
            _ref1 = this.container;
            for (i in _ref1) {
              item = _ref1[i];
              if ((item != null) && item.id === id && this.queryItemSlot(item) !== slot) {
                sameSlot.push(item);
              }
            }
          }
          amount = 0;
          ret = sameSlot.reduce((function(res, e, s) {
            var tmpCount;
            if ((count == null) || count > amount) {
              tmpCount = count && amount + e.count > count ? count - amount : e.count;
              amount += tmpCount;
              e.count -= tmpCount;
              if (e.count <= 0) {
                bag[that.queryItemSlot(e)] = null;
              }
              return res.concat({
                slot: that.queryItemSlot(e),
                id: e.id,
                oldAmount: e.count + tmpCount,
                count: e.count,
                item: e,
                bagType: that.type,
                opration: 'remove'
              });
            }
            return res;
          }), []);
          if (count && amount < count) {
            if (allOrFail) {
              throw 'No can do';
            }
            ret.left = count - amount;
          }
        }
      } catch (_error) {
        err = _error;
        if (err === 'No can do') {
          this.reverseOpration(ret);
          return false;
        } else {
          logError({
            action: 'containerAdd',
            err: err.stack
          });
        }
      }
      return ret;
    };

    Bag.prototype.size = function(size) {
      if (size != null) {
        this.limit += size;
      }
      return this.limit;
    };

    Bag.prototype.get = function(slot) {
      return this.container[slot];
    };

    Bag.prototype.queryItemSlot = function(item) {
      if (item != null) {
        return item.slot[this.type];
      }
      return -1;
    };

    Bag.prototype.reverseOpration = function(ret) {
      var bag, that;
      bag = this.container;
      that = this;
      return ret.forEach(function(e) {
        if (e.opration === 'add') {
          return that.remove(null, e.delta, e.slot, false);
        } else {
          bag[e.slot] = e.item;
          return bag[e.slot].count = e.oldAmount;
        }
      });
    };

    Bag.prototype.map = function(func) {
      return this.container.map(func);
    };

    Bag.prototype.filter = function(func) {
      return this.container.filter(func);
    };

    return Bag;

  })(Serializer);

  CONTAINER_TYPE_BAG = 0;

  CONTAINER_TYPE_CARD_STACK = 1;

  CONTAINER_TYPE_FURANCE = 2;

  CardStack = function(count) {
    var bag;
    bag = new Bag({
      type: CONTAINER_TYPE_CARD_STACK,
      limit: count,
      stackType: STACK_TYPE_SINGLE_STACK
    });
    return bag;
  };

  PlayerBag = function(count) {
    var bag;
    bag = new Bag({
      type: CONTAINER_TYPE_BAG,
      limit: count,
      stackType: STACK_TYPE_MULTIPLE_STACK
    });
    return bag;
  };

  libContainer.Bag = PlayerBag;

  libContainer.CardStack = CardStack;

  registerConstructor(Bag);

  libContainer.fileVersion = -1;

}).call(this);
