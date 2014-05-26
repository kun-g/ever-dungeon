require('./define');
var dbLib = require('./db');
var async = require('async');
require('./globals');

//players = ['天走卢克', '埃及傲', '萌成喵', '鲍哥', '江湖飘', '飛扬', 
//        'Doyle', '豆豆同学丶', '震北冥', '888666', '蛋町' ];
players = ['jvf'];

//serverName = 'Develop';
serverName = 'Master';

var config = {
  Develop: {
    ip: '10.4.3.41',
    port: 6379,
    port2: 6379
  },
  Master: {
    ip: '10.4.4.188',
    port: 6380,
    port2: 6381
  }
};

config = config[serverName];
ip = config.ip;
port = config.port;
port2 = config.port2;
dbPrefix = serverName+'.';

var rewardMessage = {
  type: Event_SystemReward,
  src: MESSAGE_REWARD_TYPE_SYSTEM,
  tit: '奖励',
  txt: '首充奖励',
  prize: [
    //{type: PRIZETYPE_EXP, count: 10000},
    //{type: PRIZETYPE_ITEM, value: 0, count: 50},
    //{type: PRIZETYPE_ITEM, value: 539, count: 2},
    //{type: PRIZETYPE_ITEM, value: 528, count: 1},
    //{type: PRIZETYPE_ITEM, value: 529, count: 1},
    //{type: PRIZETYPE_ITEM, value: 535, count: 1},
    //{type: PRIZETYPE_ITEM, value: 539, count: 1},
    //{type: PRIZETYPE_ITEM, value: 61, count: 1},

    //鮑哥
    //{type: PRIZETYPE_ITEM, value: 539, count: 2}, //大活力药剂
    //{type: PRIZETYPE_ITEM, value: 538, count: 8}, //小活力药剂
    //{type: PRIZETYPE_ITEM, value: 540, count: 27}, //复活

    // 蛋町
    //{type: PRIZETYPE_ITEM, value: 268, count: 1},
    //{type: PRIZETYPE_ITEM, value: 401, count: 1},

    //{type: PRIZETYPE_ITEM, value: 551, count: 1},
    //{type: PRIZETYPE_ITEM, value: 552, count: 1},
    //{type: PRIZETYPE_ITEM, value: 533, count: 99},
    //{type: PRIZETYPE_WXP, count: 10000},
    //{type: PRIZETYPE_GOLD, count: 100000},
    //{type: PRIZETYPE_EXP, count: 10000},
    //{type: PRIZETYPE_DIAMOND, count: 150}
    //{type: PRIZETYPE_WXP, count: 10000},
    //{type: PRIZETYPE_GOLD, count: 100000},
    //{type: PRIZETYPE_DIAMOND, count: 10000},
    //{type: PRIZETYPE_ITEM, value: 533, count: 20}//至尊礼包
    //{type: PRIZETYPE_ITEM, value: 553, count: 1},//至尊礼包
    {type: PRIZETYPE_ITEM, value: 0, count: 1000},//至尊礼包
    //{type: PRIZETYPE_EXP, count: 1000000},
  ]
};
dbLib.initializeDB({
  "Account": { "IP": ip, "PORT": port},
  "Role": { "IP": ip, "PORT": port2},
  "Publisher": { "IP": ip, "PORT": port},
  "Subscriber": { "IP": ip, "PORT": port}
});

function syncItem() {
  require('./helper').initLeaderboard(queryTable(TABLE_LEADBOARD));
  initServer();
  gServerID = -1;
  count = 0;
  dbClient.keys("Master.player.*", function (err, list) {
    list = list.map( function (e) { return e.slice('Master.player.'.length); } );
    list = ['豆豆同学丶'];
    async.map(list,
      function(name, cb) {
        if (list.indexOf(name) < 0) {
          cb();
        } else {
          dbLib.loadPlayer(name, function (err, player) {
            function showInventory() {
              var bag = player.inventory.map(
                function (e, i) {
                  if (!e) return null;
                  var ret = { id: e.id, name: e.label, slot: i };
                  if (e.enhancement) {
                    ret.enhancement = JSON.parse(JSON.stringify(e.enhancement));
                  }
                  if (player.isEquiped(i)) ret.equip = true;
                  return ret;
                })
              .filter( function (e) { return e; } );
              logInfo({ diamond: player.diamond, bag: bag});
            }
            //showInventory();
            if (player.migrate()) {
              console.log(name);
              player.save(cb);
            } else {
              cb();
            }
            player = null;
            //showInventory();
          });
        }
      }, function(err) {console.log('Done', err);});
  });
}

xwrapReceipt = function(receipt) {
  var x = receipt.split('@');
  var id = x[0];
      productID = x[1];
      serverID = x[2];
      time = x[3];
      tunnel = x[4];
  return {
    id: +id,
    serverID: +serverID,
    time: +time,
    productID: +productID,
    tunnel: tunnel
  };
};

function loadReceipt () {
  require('./globals');
  list = [
    '你骂了隔壁的@1@1393882339@0@PP25',
    '000000-100011398344373APP111',
    '0000447502011399313267PP25',
    'Angela@1@1393799422@3@APP111',
    '0000385500011397800238ND91',
    '0000401707001398156184Kuaiyong',
    '我拍@1@1392348155@0',
    '好久不见@1@1392614569@0',
    '0000334700011397827706ND91',
    '0000329900011397121082ND91',
    '血刀老祖@1@1392608462@2',
    '夜孤猫@1@1393209471@0@APP111',
    '血刀老祖@1@1392475337@3',
    '无敌小霸王@1@1396101164@0@APP111',
    '0000477400011398736336ND91',
    '0000404301011398183831ND91',
    '追风男孩@1@1394758829@1@APP111',
    '0000477603011398775089PP25',
    '0000404307011398184390ND91',
    '汉克斯@1@1392810113@5',
    '0000463201011398404014PP25',
    '0000334900011397442385ND91',
    '我拍@1@1392348088@4',
    '0000461102011398532729ND91',
    'mini@1@1393085645@5@PP25',
    'diaos@1@1393165353@4@PP25',
    '血刀老祖@1@1392608284@3',
    '0000417103011398331412PP25',
    '0000387203011398683935ND91',
    '江湖飘@1@1392825112@6',
    '秦秦晨@1@1393430283@2@PP25',
    '江湖飘@1@1392548156@2',
    '0000329900011397122950ND91',
    '0000036003011399567086APP111',
    '追风男孩@1@1394758389@2@APP111',
    '口臭@1@1392553572@7',
    '戴天@1@1392816116@6',
    'qqd@1@1393082131@3@APP111',
    'undefine00011399033718PP25',
    '0000036004011400941838APP111',
    '0000459403011398416485PP25',
    '0000473605011398741398PP25',
    '埃及傲@1@1393108336@1@APP111',
    '埃及傲@1@1393108336@0@APP111',
    '0000493601011399541297PP25',
    'Angelababy@1@1393505148@3@APP111',
    '戴天@1@1392688594@2',
    '一朵南瓜@1@1392716412@1',
    '芭比@1@1392441246@1',
    'Sylvanas柒沫@1@1394998654@2@APP111',
    '0000401707001398156025Kuaiyong',
    '0000334800011397827494ND91',
    '0000405201011398236390ND91',
    '0000477505011398611269PP25',
    'qqq@1@1393082131@3@APP111',
    '0000487403011399157695ND91',
    '0000401700001398153305Kuaiyong',
    '好久不见@1@1392358187@0',
    '0000387205011400839327ND91',
    '伴神而生@1@1393430792@4@APP111',
    '望之守护@1@1393044247@2@PP25',
    '大叔@1@1393510451@7@PP25',
    '血刀老祖@1@1392523993@5',
    '0000401707001398156459Kuaiyong',
    '苍月@1@1393200528@2@APP111',
    '埃及傲@1@1393082130@3@APP111',
    '苏曦@1@1392569058@2',
    '大叔@1@1393765973@2@PP25',
    '0000433800011398341956PP25',
    '0000401700001398153533Kuaiyong',
    '0000334501011397187870ND91',
    '0000401707001398152214Kuaiyong',
    '阿旺@1@1392383875@3',
    'Doyle@1@1393082130@3@APP111',
    'Ben@1@1393145057@2@APP111',
    '好久不见@1@1392368657@0',
    '0000329900011397122101ND91',
    '0000388206011398182526ND91',
    '大叔@1@1392817634@5',
    '鲍哥@1@1392615074@2',
    '0000447606011398339291PP25',
    'Doyle@1@1392528228@2',
    '好久不见@1@1392378035@0',
    '0000477602011399033700PP25',
    '伊利小妹@1@1393150035@3@APP111',
    'scylla@1@1393348965@3@PP25',
    '大只老@1@1392708427@0',
    '0000001400011398185928PP25',
    '小鸡快跑@1@1392576202@2'
  ];
  list.forEach( function (e) {
    var x = unwrapReceipt(e);
    console.log(x);
  });
  //accountDBClient.keys('Receipt.*', function (err, list) {
  //  console.log(list);
  //  //list.forEach( function (e) { console.log(unwrapReceipt(e)); } );
  //});
}

initGlobalConfig(null, function () {
  loadReceipt ();
});
//async.map(players, function (playerName, cb) {
//  dbLib.deliverMessage(playerName, rewardMessage, cb);
//}, function (err, result) {
//  console.log('Done');
//  dbLib.releaseDB();
//});

/*
receipt = 'qqd@1@1393082131@3@APP111';

/*
receipt = playerName+'@1@1392358195@0';
dbWrapper = require('./dbWrapper');
console.log(unwrapReceipt(receipt));
dbWrapper.updateReceipt(receipt, RECEIPT_STATE_AUTHORIZED, function (err) {
  dbLib.deliverMessage(playerName, {
    type: MESSAGE_TYPE_ChargeDiamond,
    paymentType: 'PP25',
    receipt: receipt
  }, null, serverName);
  console.log('Err', err);
});
*/
