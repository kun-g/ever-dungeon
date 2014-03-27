(function() {
  var Dungeon, dbLib, loadDungeon, util;

  util = require('util');

  require('./define');

  dbLib = require('./db');

  Dungeon = require('./dungeon').Dungeon;

  initServer();

  loadDungeon = function(name, id, callback) {
    GLOBAL['dbPrefix'] = 'Develop.';
    dbLib.initializeDB({
      "Account": {
        "IP": "localhost",
        "PORT": 6379
      },
      "Role": {
        "IP": "localhost",
        "PORT": 6379
      },
      "Publisher": {
        "IP": "localhost",
        "PORT": 6379
      },
      "Subscriber": {
        "IP": "localhost",
        "PORT": 6379
      }
    });
    return setTimeout((function(_this) {
      return function() {
        return dbLib.loadDungeon(name, id, function(err, dungeon) {
          dbLib.releaseDB();
          if (callback) {
            return callback(err, dungeon);
          }
        });
      };
    })(this), 100);
  };

  initGlobalConfig(function() {
    var d, init, rep;
    rep = [
      [
        {
          a: 0,
          r: 455529896
        }, {
          a: 1,
          g: {
            b: 11,
            p: [10, null, null]
          },
          r: 748376054
        }, {
          a: 1,
          g: {
            b: 16,
            p: [11, null, null]
          },
          r: 415642431
        }, {
          a: 5,
          g: {
            t: 16,
            p: [11, null, null]
          },
          r: 863033710
        }, {
          a: 1,
          g: {
            b: 21,
            p: [16, null, null]
          },
          r: 430727470
        }, {
          a: 1,
          g: {
            b: 22,
            p: [21, null, null]
          },
          r: 736149779
        }, {
          a: 5,
          g: {
            t: 22,
            p: [21, null, null]
          },
          r: 700116866
        }, {
          a: 1,
          g: {
            b: 23,
            p: [22, null, null]
          },
          r: 676176050
        }, {
          a: 6,
          g: {
            t: 23
          },
          r: 812400584
        }, {
          a: 1,
          g: {
            b: 18,
            p: [23, null, null]
          },
          r: 439072826
        }, {
          a: 5,
          g: {
            t: 18,
            p: [23, null, null]
          },
          r: 394165723
        }, {
          a: 5,
          g: {
            t: 18,
            p: [23, null, null]
          },
          r: 989965198
        }, {
          a: 6,
          g: {
            t: 13
          },
          r: 250951614
        }
      ]
    ];
    init = {
      stage: 104,
      initialQuests: {
        '153': {
          counters: [0]
        }
      },
      blueStar: 0,
      abIndex: 563534,
      team: [
        {
          nam: '改革刚刚改革',
          gen: 1,
          cid: 0,
          hst: 2,
          hcl: 2,
          exp: 0
        }
      ],
      randSeed: 47867
    };
    d = new Dungeon(init);
    d.initialize();
    d.replayActionLog(rep);
    return console.log(d.reward);
  });

}).call(this);
