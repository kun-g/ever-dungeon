(function() {
  var Card, Item, Serializer, registerConstructor, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requires('./define');

  _ref = requires('./serializer'), Serializer = _ref.Serializer, registerConstructor = _ref.registerConstructor;

  Item = (function(_super) {
    __extends(Item, _super);

    function Item(id) {
      Item.__super__.constructor.apply(this, arguments);
      this.attrSave('slot', []);
      this.attrSave('count', 1);
      if ((id != null) && typeof id === 'object') {
        id = id.id;
      }
      if (id != null) {
        this.attrSave('id', id);
      }
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
        this.restore(this.getConfig());
      }
      if (this.id != null) {
        this.attrSave('id', this.id);
      }
      if (this.category === ITEM_EQUIPMENT && (this.xp == null)) {
        this.attrSave('xp', 0);
      }
      if (this.category === ITEM_EQUIPMENT && (this.enhancement == null)) {
        return this.attrSave('enhancement', []);
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
