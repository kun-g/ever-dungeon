exports.data = [
    {
        "name":"battleforce",
        "key":"battleForce",
        "reverse":false,
        "initialValue":0,
        "type":"player",
        "availableCondition":true
    },
    {
        "name":"infinitydungeon",
        "key":"stage.120.level",
        "resetTime": { day: 1},
        "reverse":false,
        "initialValue":0,
        "type":"player",
        "availableCondition":true
    },
    {
        "name":"killMonster",
        "key":"counters.monster",
        "resetTime": { day: 1},
        "reverse":false,
        "initialValue":0,
        "type":"player",
        "availableCondition":true
    },
    {
        "name":"Arena",
        "reverse": true,
        "initialValue": 'length',
        "type":"player",
        "availableCondition":true
    },
    {
        "name":"WorldBoss133",
        "key":"counters.worldBoss.133",
        "resetTime": { weekday: 9, minute: 5},
        "reverse": false,
        "type":"player",
        "availableCondition":true,
        "event":"",
    },

];
