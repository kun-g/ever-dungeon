(function() {
  var Card, Item, Serializer, registerConstructor, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requires('./define');

  _ref = requires('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  Item = (function(_super) {
    __extends(Item, _super);

    function Item(data) {
      var cfg;
      if (typeof data === 'number') {
        data = {
          id: data
        };
      }
      if (data.id === 907) {
        console.log("The 907 is comming");
        showMeTheStack();
      }
      cfg = {
        slot: [],
        count: 1,
        id: data.id
      };
      this.id = data.id;
      if (this.getConfig()) {
        if (this.getConfig().category === ITEM_EQUIPMENT) {
          cfg.xp = 0;
          cfg.enhancement = [];
        }
        if (this.getConfig().expiration) {
          cfg.date = -1;
        }
      }
      Item.__super__.constructor.call(this, data, cfg, {});
      if (this.id != null) {
        this.initialize();
      }
    }

    Item.prototype.getConfig = function() {
      return queryTable(TABLE_ITEM, this.id);
    };

    Item.prototype.spaceCount = function() {
      if (this.storeOnly) {
        return 0;
      }
      return 1;
    };

    Item.prototype.initialize = function() {
      if (this.id != null) {
        return this.restore(JSON.parse(JSON.stringify(this.getConfig())));
      }
    };

    return Item;

  })(Serializer);

  Card = (function(_super) {
    __extends(Card, _super);

    function Card(id) {
      Card.__super__.constructor.call(this, id);
    }

    Card.prototype.getConfig = function() {
      return queryTable(TABLE_CARD, this.id);
    };

    return Card;

  })(Item);

  registerConstructor(Card);

  registerConstructor(Item);

  exports.Item = Item;

  exports.Card = Card;

  exports.fileVersion = -1;

}).call(this);
