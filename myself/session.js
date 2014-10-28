(function() {
  var STATE_ACTIVE, STATE_INACTIVE, STATE_INVALID, STATE_NEW, Session, destroySession, gMemSession, logoutSession, newSession;

  STATE_NEW = 'new';

  STATE_ACTIVE = 'active';

  STATE_INACTIVE = 'inactive';

  STATE_INVALID = 'invalid';

  gMemSession = [];

  newSession = function() {
    var tmp;
    tmp = {
      state: STATE_NEW,
      type: 'Memory'
    };
    gMemSession.push(tmp);
    tmp.id = gMemSession.length - 1;
    return tmp;
  };

  exports.newSession = newSession;

  exports.varifySession = function(sessionID, callback) {
    if (gMemSession[sessionID]) {
      return callback();
    } else {
      return callback(false);
    }
  };

  destroySession = function() {};

  logoutSession = function() {};

  Session = (function() {
    function Session() {
      this.state = 'new';
      this.sessionID = 0;
    }

    Session.prototype.init = function() {};

    Session.prototype.act = function(action, arg, handler) {
      switch (this.state) {
        case 'new':
          switch (action) {
            case 'varify':
              return this.varify(arg, handler);
          }
          break;
        case 'active':
        case 'inactive':
          switch (action) {
            case 'disconnect':
              return session.state = 'invalid';
          }
      }
    };

    Session.prototype.varify = function(arg, handler) {
      return this.state = 'active';
    };

    return Session;

  })();

}).call(this);
