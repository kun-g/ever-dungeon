(function() {
  "use strict";
  var PACKET_FLAG_AES, PACKET_FLAG_BSON, PACKET_FLAG_MESSAGEPACK, PACKET_FLAG_SIZE, SimpleProtocolDecoder, SimpleProtocolEncoder, Transform, algo, algoKey, bson, crypto, msgpack,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Transform = require('stream').Transform;

  msgpack = require('msgpack');

  crypto = require('crypto');

  bson = require('bson').BSONPure.BSON;

  algo = 'aes128';

  algoKey = '0123456789abcdef';

  PACKET_FLAG_SIZE = 1;

  PACKET_FLAG_MESSAGEPACK = 2;

  PACKET_FLAG_AES = 4;

  PACKET_FLAG_BSON = 8;

  SimpleProtocolEncoder = (function(_super) {
    __extends(SimpleProtocolEncoder, _super);

    function SimpleProtocolEncoder(options) {
      this._flag = {};
      SimpleProtocolEncoder.__super__.constructor.call(this, options);
      this.totalBytes = 0;
      this.maxBytes = 0;
    }

    SimpleProtocolEncoder.prototype.setFlag = function(key, flag) {
      if (flag == null) {
        flag = true;
      }
      return this._flag[key] = flag;
    };

    SimpleProtocolEncoder.prototype.onPacket = function(packets) {
      var b, buffs, p, size, _i, _len;
      size = 0;
      buffs = [];
      for (_i = 0, _len = packets.length; _i < _len; _i++) {
        p = packets[_i];
        size += p.length;
        buffs.push(p);
      }
      b = Buffer(size);
      this.totalBytes += size;
      if (size > this.maxBytes) {
        this.maxBytes = size;
      }
      return this.write(Buffer.concat(buffs));
    };

    SimpleProtocolEncoder.prototype.writeObject = function(obj) {
      var aes128E, buffs, data, f, flag;
      flag = 0;
      buffs = [];
      if (this._flag.messagePack) {
        flag |= PACKET_FLAG_MESSAGEPACK;
      }
      if (this._flag.aes) {
        flag |= PACKET_FLAG_AES;
      }
      if (this._flag.size) {
        flag |= PACKET_FLAG_SIZE;
      }
      f = Buffer(1);
      f.writeUInt8(flag, 0);
      buffs.push(f);
      if (this._flag.messagePack) {
        data = msgpack.pack(obj);
      } else if (this._flag.bson) {
        data = bson.serialize(obj);
      } else {
        data = Buffer(JSON.stringify(obj));
      }
      if (this._flag.size) {
        f = Buffer(2);
        f.writeUInt16BE(data.length, 0);
        buffs.push(f);
      }
      if (this._flag.aes) {
        aes128E = crypto.createCipher(algo, algoKey);
        aes128E.on('data', (function(_this) {
          return function(data) {
            return _this.onPacket(buffs.concat([data]));
          };
        })(this));
        return aes128E.end(data);
      } else {
        return this.onPacket(buffs.concat([data]));
      }
    };

    SimpleProtocolEncoder.prototype._transform = function(chunk, encoding, done) {
      this.push(chunk);
      return done();
    };

    return SimpleProtocolEncoder;

  })(Transform);

  SimpleProtocolDecoder = (function(_super) {
    __extends(SimpleProtocolDecoder, _super);

    function SimpleProtocolDecoder(options) {
      this.state = 'flag';
      this.pendingData = Buffer(0);
      this.to = 0;
      this.totalBytes = 0;
      this.maxBytes = 0;
      SimpleProtocolDecoder.__super__.constructor.call(this, options);
    }

    SimpleProtocolDecoder.prototype.onPacket = function(packet) {
      var err;
      if (this.flag & PACKET_FLAG_MESSAGEPACK) {
        return this.emit('request', msgpack.unpack(packet));
      } else if (this.flag & PACKET_FLAG_BSON) {
        return this.emit('request', bson.deserialize(packet));
      } else {
        try {
          return packet = JSON.parse(packet.toString());
        } catch (_error) {
          err = _error;
          return packet = null;
        } finally {
          this.emit('request', packet);
        }
      }
    };

    SimpleProtocolDecoder.prototype._transform = function(chunk, encoding, done) {
      var aes128D, data, from, packet, res, size;
      from = 0;
      this.totalBytes += chunk.length;
      data = Buffer.concat([this.pendingData, chunk]);
      res = null;
      while (this.to <= data.length) {
        switch (this.state) {
          case 'flag':
            this.flag = data.readUInt8(from);
            from += 1;
            this.to = from + 2;
            this.state = 'size';
            break;
          case 'size':
            if (this.flag & PACKET_FLAG_SIZE) {
              size = data.readUInt16BE(from);
              if (this.flag & PACKET_FLAG_AES) {
                size = Math.ceil(size / 16) * 16;
              }
              from = this.to;
              this.to = from + size;
              if (size > this.maxBytes) {
                this.maxBytes = size;
              }
            }
            this.state = 'data';
            break;
          case 'data':
            packet = data.slice(from, this.to);
            if (this.flag & PACKET_FLAG_AES) {
              aes128D = crypto.createDecipher(algo, algoKey);
              aes128D.on('data', (function(_this) {
                return function(res) {
                  return _this.onPacket(res);
                };
              })(this));
              aes128D.end(packet);
            } else {
              this.onPacket(packet);
            }
            from = this.to;
            this.to += 1;
            this.state = 'flag';
        }
      }
      this.pendingData = data.slice(from);
      this.to -= from;
      return done();
    };

    return SimpleProtocolDecoder;

  })(Transform);

  exports.SimpleProtocolEncoder = SimpleProtocolEncoder;

  exports.SimpleProtocolDecoder = SimpleProtocolDecoder;

}).call(this);
