(function() {
  var DBWrapper, Player, addMercenaryMember, async, dbLib, getMercenaryMember, getPlayerHero, helperLib, http, https, loadPlayer, loginBy, moment, updateMercenaryMember, wrapReceipt, _ref;

  require('./define');

  dbLib = require('./db');

  helperLib = require('./helper');

  _ref = require('./dbWrapper'), DBWrapper = _ref.DBWrapper, getMercenaryMember = _ref.getMercenaryMember, updateMercenaryMember = _ref.updateMercenaryMember, addMercenaryMember = _ref.addMercenaryMember, getPlayerHero = _ref.getPlayerHero;

  async = require('async');

  http = require('http');

  https = require('https');

  moment = require('moment');

  Player = require('./player').Player;

  loginBy = function(arg, token, callback) {
    var appID, appKey, options, passport, passportType, path, req, sign;
    passportType = arg.tp;
    passport = arg.id;
    switch (passportType) {
      case LOGIN_ACCOUNT_TYPE_91:
        appID = '112988';
        appKey = 'd30d9f0f53e2654274505e25c27913fe709eb1ad6265e5c5';
        sign = md5Hash(appID + '4' + passport + token + appKey);
        path = 'http://service.sj.91.com/usercenter/AP.aspx?Act=4&AppId=112988&Uin=' + passport + '&Sign=' + sign + '&SessionID=' + token;
        return http.get(path, function(res) {
          res.setEncoding('utf8');
          return res.on('data', function(chunk) {
            var result;
            result = JSON.parse(chunk);
            logInfo({
              action: 'login',
              type: LOGIN_ACCOUNT_TYPE_91,
              code: result
            });
            if (result.ErrorCode === '1') {
              return callback(null);
            } else {
              return callback(Error(RET_LoginFailed));
            }
          });
        }).on('error', function(e) {
          return logError({
            action: 'login',
            type: LOGIN_ACCOUNT_TYPE_91,
            error: e
          });
        });
      case LOGIN_ACCOUNT_TYPE_KY:
        appID = '4032';
        appKey = '42e50a13d86cda48be215d3f64856cd3';
        sign = md5Hash(appKey + token);
        path = 'http://f_signin.bppstore.com/loginCheck.php?tokenKey=' + token + '&sign=' + sign;
        return http.get(path, function(res) {
          res.setEncoding('utf8');
          return res.on('data', function(chunk) {
            var result;
            result = JSON.parse(chunk);
            logInfo({
              action: 'login',
              type: LOGIN_ACCOUNT_TYPE_KY,
              code: result
            });
            if (result.code === 0) {
              arg.id = result.data.guid;
              return callback(null);
            } else {
              return callback(Error(RET_LoginFailed));
            }
          });
        }).on('error', function(e) {
          return logError({
            action: 'login',
            type: LOGIN_ACCOUNT_TYPE_91,
            error: e
          });
        });
      case LOGIN_ACCOUNT_TYPE_PP:
        options = {
          host: 'passport_i.25pp.com',
          port: 8080,
          method: 'POST',
          path: '/index?tunnel-command=2852126756',
          headers: {
            'Content-Length': 32
          }
        };
        req = http.request(options, function(res) {
          res.setEncoding('utf8');
          return res.on('data', function(chunk) {
            var result;
            result = JSON.parse('{' + chunk + '}');
            logInfo({
              action: 'login',
              type: LOGIN_ACCOUNT_TYPE_PP,
              code: result.status
            });
            if (result.status === 0) {
              return callback(null);
            } else {
              return callback(Error(RET_LoginFailed));
            }
          });
        });
        req.on('error', function(e) {
          return logError({
            action: 'login',
            type: LOGIN_ACCOUNT_TYPE_PP,
            error: e
          });
        });
        req.write(token);
        return req.end();
      case LOGIN_ACCOUNT_TYPE_TG:
        return dbLib.loadAuth(passport, token, callback);
      case LOGIN_ACCOUNT_TYPE_AD:
      case LOGIN_ACCOUNT_TYPE_GAMECENTER:
        return callback(null);
      default:
        return callback(Error(RET_Issue33));
    }
  };

  loadPlayer = function(passportType, passport, callback) {
    return async.waterfall([
      function(cb) {
        return dbLib.loadPassport(passportType, passport, true, cb);
      }, function(account, cb) {
        return dbLib.loadAccount(account, cb);
      }, function(account, cb) {
        return dbLib.loadPlayer(account[gServerName], cb);
      }
    ], callback);
  };

  wrapReceipt = function(name, serverID, time, productID, tunnel) {
    return name + '@' + serverID + '@' + time + '@' + productID + '@' + tunnel;
  };

  exports.route = {
    RPC_Login: {
      id: 100,
      func: function(arg, dummy, handle, rpcID, socket, registerFlag) {
        return async.waterfall([
          function(cb) {
            var current, limit, _ref1;
            if (arg.bv == null) {
              cb(Error(RET_AppVersionNotMatch));
              return logError({
                action: 'login',
                reason: 'noBinaryVersion'
              });
            } else {
              current = queryTable(TABLE_VERSION, 'bin_version');
              limit = queryTable(TABLE_VERSION, 'bin_version_need');
              if (!((limit <= (_ref1 = arg.bv) && _ref1 <= current))) {
                return cb(Error(RET_AppVersionNotMatch));
              } else {
                return cb(null);
              }
            }
          }, function(cb) {
            if (+arg.rv !== queryTable(TABLE_VERSION, 'resource_version')) {
              return cb(Error(RET_ResourceVersionNotMatch));
            } else {
              return cb(null);
            }
          }, function(cb) {
            if (registerFlag) {
              return cb(null);
            } else {
              return loginBy(arg, arg.tk, cb);
            }
          }, function(cb) {
            return loadPlayer(arg.tp, arg.id, cb);
          }, function(player, cb) {
            var ev, time;
            if (player) {
              player.log('login', {
                type: arg.tp,
                id: arg.id
              });
              if (socket) {
                player.socket = socket;
                socket.player = player;
                socket.playerName = player.name;
              }
              if (gPlayerDB[player.name]) {
                gPlayerDB[player.name].logout(RET_LoginByAnotherDevice);
                delete gPlayerDB[player.name];
              }
              gPlayerDB[player.name] = player;
              time = Math.floor((new Date()).valueOf() / 1000);
              ev = [];
              player.updateMercenaryInfo(true);
              ev.push(player.notifyVersions());
              ev.push(player.syncEnergy());
              ev.push(player.syncFlags());
              ev.push({
                NTF: Event_ABIndex,
                arg: {
                  ab: +player.abIndex
                }
              });
              ev.push({
                NTF: Event_UpdateStoreInfo,
                arg: gShop.dump(player)
              });
              ev.push({
                NTF: Event_PlayerInfo,
                arg: {
                  aid: player.accountID,
                  vip: player.vipLevel(),
                  rmb: player.rmb
                }
              });
              ev.push({
                NTF: Event_RoleUpdate,
                arg: {
                  act: {
                    vip: player.vipLevel()
                  }
                }
              });
              return async.parallel([
                function(cb) {
                  return player.fetchMessage(cb);
                }, function(cb) {
                  return player.updateFriendInfo(cb);
                }, function(cb) {
                  return dbLib.newSessionInfo(function(err, session) {
                    player.runtimeID = session;
                    dbLib.publish('login', JSON.stringify({
                      player: player.name,
                      session: session
                    }));
                    dbLib.updateSessionInfo(session, {
                      player: player.name
                    }, function() {});
                    return cb(null, []);
                  });
                }
              ], function(err, result) {
                var loginInfo;
                if (player.destroied) {
                  return [];
                }
                result = result.reduce((function(r, l) {
                  return r.concat(l);
                }), []);
                ev = ev.concat(result).concat(player.onLogin()).concat(player.syncCampaign()).concat(player.syncEvent());
                loginInfo = {
                  REQ: rpcID,
                  RET: RET_OK,
                  arg: {
                    pid: player.runtimeID,
                    rid: player.name,
                    svt: time,
                    usr: player.name,
                    sid: gServerID
                  }
                };
                if (player.tutorialStage != null) {
                  loginInfo.arg.tut = player.tutorialStage;
                }
                handle([loginInfo].concat(ev));
                player.saveDB(cb);
                return player = null;
              });
            } else {
              return dbLib.newSessionInfo(function(err, session) {
                if (socket != null) {
                  socket.session = arg;
                  socket.session.sid = session;
                }
                dbLib.updateSessionInfo(session, arg, function() {});
                return cb(Error(RET_AccountHaveNoHero));
              });
            }
          }
        ], function(err, result) {
          var ret;
          if (err) {
            switch (+err.message) {
              case RET_AppVersionNotMatch:
                ret = {
                  arg: {
                    url: queryTable(TABLE_VERSION, 'bin_url')
                  }
                };
                break;
              case RET_ResourceVersionNotMatch:
                ret = {
                  arg: {
                    url: queryTable(TABLE_VERSION, 'url'),
                    tar: queryTable(TABLE_VERSION, 'resource_version')
                  }
                };
                break;
              case RET_AccountHaveNoHero:
                ret = {
                  arg: {
                    pid: socket.session.sid
                  }
                };
                break;
              default:
                ret = {};
            }
            ret.REQ = rpcID;
            ret.RET = +err.message;
            return handle([ret]);
          }
        });
      },
      args: ['tp', 'number', 'id', 'string', 'bv', 'string', 'rv', 'number', 'ch', 'string']
    },
    RPC_Register: {
      id: 101,
      func: function(arg, dummy, handle, rpcID, socket) {
        var name;
        name = arg.nam;
        return async.waterfall([
          function(cb) {
            var pendingLogin;
            pendingLogin = socket.session;
            return cb(null, pendingLogin.tp, pendingLogin.id);
          }, function(passportType, passport, cb) {
            return dbLib.loadPassport(passportType, passport, false, cb);
          }, function(account, cb) {
            return dbLib.createNewPlayer(account, gServerName, name, cb);
          }, function(account, cb) {
            var player;
            player = new Player();
            player.setName(name);
            player.accountID = account;
            player.initialize();
            player.createHero({
              name: name,
              "class": arg.cid,
              gender: arg.gen,
              hairStyle: arg.hst,
              hairColor: arg.hcl
            });
            logUser({
              name: name,
              action: 'register',
              "class": arg.cid,
              gender: arg.gen,
              hairStyle: arg.hst,
              hairColor: arg.hcl
            });
            return player.saveDB(cb);
          }
        ], function(err, result) {
          if (err) {
            return handle([
              {
                REQ: rpcID,
                RET: +err.message
              }
            ]);
          } else {
            return exports.route.RPC_Login.func(socket.session, dummy, handle, rpcID, socket, true);
          }
        });
      },
      args: ['pid', 'string', 'nam', 'string', 'cid', 'number', 'gen', 'number', 'hst', 'number', 'hcl', 'number']
    },
    RPC_ValidateName: {
      id: 102,
      func: function(arg, dummy, handler, rpcID, socket) {
        return dbLib.validateName(arg.nam, function(err) {
          return handler([
            {
              REQ: rpcID,
              RET: err ? +err.message : RET_OK
            }
          ]);
        });
      },
      args: ['nam', 'string']
    },
    NTF_Echo: {
      id: 103,
      func: function(arg, player, handler, rpcID, socket) {
        var evt;
        evt = {
          NTF: Event_Echo,
          sign: arg.sign
        };
        if (Number(arg.sign) >= 0) {
          evt.bv = queryTable(TABLE_VERSION, 'bin_version_need');
          evt.rv = queryTable(TABLE_VERSION, 'resource_version');
          evt.rvurl = queryTable(TABLE_VERSION, 'url');
          evt.bvurl = queryTable(TABLE_VERSION, 'bin_url');
        }
        return handler([evt]);
      },
      args: ['sign', 'number']
    },
    RPC_VerifyDungeon: {
      id: 17,
      func: function(arg, player, handler, rpcID, socket) {
        var doVerify, dungeonLib, evt, fileList, initialData, replay, result, reward, status;
        dungeonLib = require('./dungeon');
        result = {
          RET: RET_OK,
          REQ: rpcID
        };
        evt = [result];
        initialData = {};
        reward = [];
        replay = [];
        status = 'OK';
        fileList = ["define", "serializer", "spell", "unit", "container", "item", "seed-random", "commandStream", "dungeon", "trigger"];
        doVerify = function() {
          var dungeon, err, f, _i, _len;
          if (player.dungeon) {
            for (_i = 0, _len = fileList.length; _i < _len; _i++) {
              f = fileList[_i];
              if (require('./' + f).fileVersion !== arg.fileVersion[f]) {
                status = 'FileVersionConflict';
              }
            }
            logInfo(player.dungeonData);
            initialData = player.dungeonData;
            if (result.RET === RET_OK && (initialData != null)) {
              replay = arg.rep;
              dungeon = new dungeonLib.Dungeon(initialData);
              dungeon.initialize();
              try {
                dungeon.replayActionLog(replay);
              } catch (_error) {
                err = _error;
                status = 'Replay Failed';
                dungeon.reward = null;
              } finally {
                evt = evt.concat(player.claimDungeonAward());
                player.releaseDungeon();
                player.saveDB();
              }
            }
          } else {
            status = 'No dungeon';
            result.RET = RET_DungeonNotExist;
          }
          logInfo({
            action: 'verify_dungeon',
            player: player.name,
            initial_data: initialData,
            reward: reward,
            replay: replay,
            status: status
          });
          return handler(evt);
        };
        if (player.dungeon === null && player.dungeonID !== -1) {
          return player.loadDungeon(doVerify);
        } else {
          return doVerify();
        }
      },
      args: [],
      needPid: true
    },
    Request_Stastics: {
      id: 28,
      func: function(arg, player, handler, rpcID, socket) {
        return logInfo({
          action: 'stastics',
          key: arg.key,
          value: arg.val,
          name: player.name
        });
      },
      args: [],
      needPid: true
    },
    RPC_GameStartDungeon: {
      id: 1,
      func: function(arg, player, handler, rpcID, socket) {
        return player.startDungeon(+arg.stg, arg.initialDataOnly, function(err, evEnter) {
          if (typeof evEnter === 'number') {
            handler([
              {
                REQ: rpcID,
                RET: evEnter
              }
            ]);
          } else if (arg.initialDataOnly) {
            handler([
              {
                REQ: rpcID,
                RET: RET_OK,
                arg: evEnter
              }
            ].concat(player.syncEnergy()));
          } else if (evEnter) {
            handler([
              {
                REQ: rpcID,
                RET: RET_OK
              }
            ].concat(evEnter.concat(player.syncEnergy())));
          } else {
            handler([
              {
                REQ: rpcID,
                RET: RET_OK
              }
            ]);
          }
          return player.saveDB();
        });
      },
      args: ['stg'],
      needPid: true
    },
    RPC_ChargeDiamond: {
      id: 15,
      func: function(arg, player, handle, rpcID, socket) {
        switch (arg.stp) {
          case 'AppStore':
            throw Error('AppStore Payment');
            break;
          case 'PP25':
            throw Error('PP25 Payment');
        }
      },
      args: ['pid', 'string', 'rep', 'string'],
      needPid: true
    },
    RPC_VerifyPayment: {
      id: 15,
      func: function(arg, player, handler, rpcID, socket) {
        var options, req;
        logInfo({
          action: 'VerifyPayment',
          type: 'Apple',
          arg: arg
        });
        switch (arg.stp) {
          case 'AppStore':
            options = {
              hostname: 'sandbox.itunes.apple.com',
              port: 443,
              path: '/verifyReceipt',
              method: 'POST'
            };
            req = https.request(options, function(res) {
              res.setEncoding('utf8');
              return res.on('data', function(chunk) {
                var receipt, result;
                result = JSON.parse(chunk);
                logInfo({
                  action: 'VerifyPayment',
                  type: 'Apple',
                  code: result,
                  receipt: arg.bill
                });
                if (result.status !== 0 || result.original_transaction_id) {
                  return handler([
                    {
                      REQ: rpcID,
                      RET: RET_Unknown
                    }
                  ]);
                }
                receipt = arg.bill;
                return player.handlePayment({
                  paymentType: 'AppStore',
                  productID: result.product_id,
                  receipt: receipt
                }, function(err, result) {
                  var ret;
                  ret = RET_OK;
                  if (err != null) {
                    ret = err.message;
                  }
                  return handler([
                    {
                      REQ: rpcID,
                      RET: ret
                    }
                  ].concat(result));
                });
              });
            }).on('error', function(e) {
              logError({
                action: 'VerifyPayment',
                type: 'Apple',
                error: e,
                rep: arg.rep
              });
              return handler([
                {
                  REQ: rpcID,
                  RET: RET_InvalidPaymentInfo
                }
              ]);
            });
            req.write(JSON.stringify({
              "receipt-data": arg.rep
            }));
            return req.end();
        }
      },
      args: [],
      needPid: true
    },
    RPC_BindSubAuth: {
      id: 105,
      func: function(arg, player, handler, rpcID, socket) {
        var account;
        account = -1;
        if (player) {
          account = player.accountID;
        }
        return dbLib.bindAuth(account, arg.typ, arg.id, arg.pass, function(err, account) {
          return handler([
            {
              REQ: rpcID,
              RET: RET_OK,
              aid: account
            }
          ]);
        });
      },
      args: []
    },
    RPC_Reconnect: {
      id: 104,
      args: ['pid', 'string'],
      func: function(arg, player, handler, rpcID, socket) {
        return async.waterfall([
          function(cbb) {
            return dbLib.loadSessionInfo(arg.PID, cbb);
          }, function(sessionInfo, cbb) {
            if (!sessionInfo) {
              return cbb(Error(RET_SessionOutOfDate));
            } else {
              socket.session = sessionInfo;
              return cbb(null, sessionInfo);
            }
          }, function(info, cbb) {
            if (info.bin_version !== queryTable(TABLE_VERSION, 'bin_version') || +info.resource_version !== +queryTable(TABLE_VERSION, 'resource_version')) {
              return cbb(Error(RET_NewVersionArrived));
            } else {
              return cbb(null, info);
            }
          }, function(session, cbb) {
            if (session.player) {
              return dbLib.loadPlayer(session.player, cbb);
            } else {
              return cbb(Error(RET_OK));
            }
          }, function(p, cbb) {
            if (!p || p.runtimeID !== arg.PID) {
              return cbb(Error(RET_SessionOutOfDate));
            } else {
              return cbb(null, p);
            }
          }, function(p, cbb) {
            p.onReconnect(socket);
            p.socket = socket;
            socket.player = p;
            socket.playerName = p.name;
            gPlayerDB[p.name] = p;
            return p.updateFriendInfo(cbb);
          }
        ], function(err, result) {
          if (err && err.message !== RET_OK) {
            return handler([
              {
                REQ: rpcID,
                RET: err.message
              }
            ]);
          } else {
            return handler([
              {
                REQ: rpcID,
                RET: RET_OK
              }
            ]);
          }
        });
      }
    },
    RPC_QueryLeaderboard: {
      id: 30,
      func: function(arg, player, handler, rpcID, socket) {
        return helperLib.getPositionOnLeaderboard(arg.typ, player.name, arg.src, arg.src + arg.cnt - 1, function(err, result) {
          var ret;
          ret = {
            REQ: rpcID,
            RET: RET_OK
          };
          if (arg.me != null) {
            ret.me = result.position;
          }
          if (result.board != null) {
            return async.map(result.board, getPlayerHero, function(err, result) {
              ret.lst = result.map(getBasicInfo);
              return handler([ret]);
            });
          } else {
            return handler([ret]);
          }
        });
      },
      args: [],
      needPid: true
    },
    RPC_SubmitDailyQuest: {
      id: 29,
      func: function(arg, player, handler, rpcID, socket) {
        return player.submitCampaign('event_daily', function(err, ret) {
          handler([
            {
              REQ: rpcID,
              RET: RET_OK
            }
          ].concat(ret));
          return player.saveDB();
        });
      },
      args: [],
      needPid: true
    }
  };

}).call(this);
