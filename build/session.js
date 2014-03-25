(function() {
  var STATE_ACTIVE, STATE_INACTIVE, STATE_INVALID, STATE_NEW, Session, dbLib, destroySession, loadSession, logoutSession, newSession, upgradeSession;

  dbLib = require('./db');

  STATE_NEW = 'new';

  STATE_ACTIVE = 'active';

  STATE_INACTIVE = 'inactive';

  STATE_INVALID = 'invalid';

  newSession = function() {
    return {
      state: STATE_NEW,
      type: 'Bare'
    };
  };

  loadSession = function(sessionID, callback) {
    return dbLib.loadSessionInfo(sessionID, callback);
  };

  upgradeSession = function() {};

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
