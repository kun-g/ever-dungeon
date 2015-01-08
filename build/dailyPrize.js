exports.data = {
    storeType: "player",
    counter: {
        key: 'check_in',
        initial_value: 0,
        uplimit: 31,
        count_down: { time: 'time@ThisCounter', units: 'day' },
        duration: { time: 'time@ThisCounter', units: 'month' }
    },
    available_condition: [ { type: 'counter', func: "notCounted" } ],
    rewards: [
    {
        "prizeId": 0,
        "prize": [ { "type": 0, "value":538, "count":1 } ]
    },
    {
        "prizeId":1,
        "prize": [ { "type": 0, "value":871, "count":2 }, { "type": 0, "value":871, "count":2, "vip":1 } ]
    },
    {
        "prizeId":2,
        "prize": [ { "type": 0, "value":540, "count":1 } ]
    },
    {
        "prizeId":3,
        "prize": [ { "type": 0, "value":858, "count":3 }, { "type": 0, "value":858, "count":3, "vip":1 } ]
    },
    {
        "prizeId":4,
        "prize": [
            {
                "type": 2,
                "count":20
            }
        ]
    },
    {
        "prizeId":5,
        "prize": [
            {
                "type": 0,
                "value":538,
                "count":1
            }
        ]
    },
    {
        "prizeId":6,
        "prize": [
            {
                "type": 0,
                "value":871,
                "count":4
            },
            {
                "type": 0,
                "value":871,
                "count":4,
                "vip":1
            }
        ]
    },
    {
        "prizeId":7,
        "prize": [
            {
                "type": 0,
                "value":540,
                "count":1
            }
        ]
    },
    {
        "prizeId":8,
        "prize": [
            {
                "type": 0,
                "value":858,
                "count":8
            },
            {
                "type": 0,
                "value":858,
                "count":8,
                "vip":2
            }
        ]
    },
    {
        "prizeId":9,
        "prize": [
            {
                "type": 2,
                "count":30
            }
        ]
    },
    {
        "prizeId":10,
        "prize": [
            {
                "type": 0,
                "value":538,
                "count":2
            }
        ]
    },
    {
        "prizeId":11,
        "prize": [
            {
                "type": 0,
                "value":871,
                "count":5
            },
            {
                "type": 0,
                "value":871,
                "count":5,
                "vip":3
            }
        ]
    },
    {
        "prizeId":12,
        "prize": [
            {
                "type": 0,
                "value":540,
                "count":2
            }
        ]
    },
    {
        "prizeId":13,
        "prize": [
            {
                "type": 0,
                "value":859,
                "count":4
            },
            {
                "type": 0,
                "value":859,
                "count":4,
                "vip":4
            }
        ]
    },
    {
        "prizeId":14,
        "prize": [
            {
                "type": 2,
                "count":40
            }
        ]
    },
    {
        "prizeId":15,
        "prize": [
            {
                "type": 0,
                "value":538,
                "count":2
            }
        ]
    },
    {
        "prizeId":16,
        "prize": [
            {
                "type": 0,
                "value":871,
                "count":10
            },
            {
                "type": 0,
                "value":871,
                "count":10,
                "vip":5
            }
        ]
    },
    {
        "prizeId":17,
        "prize": [
            {
                "type": 0,
                "value":540,
                "count":2
            }
        ]
    },
    {
        "prizeId":18,
        "prize": [
            {
                "type": 0,
                "value":859,
                "count":8
            },
            {
                "type": 0,
                "value":859,
                "count":8,
                "vip":6
            }
        ]
    },
    {
        "prizeId":19,
        "prize": [
            {
                "type": 2,
                "count":50
            }
        ]
    },
    {
        "prizeId":20,
        "prize": [
            {
                "type": 0,
                "value":538,
                "count":3
            }
        ]
    },
    {
        "prizeId":21,
        "prize": [
            {
                "type": 0,
                "value":871,
                "count":15
            },
            {
                "type": 0,
                "value":871,
                "count":15,
                "vip":7
            }
        ]
    },
    {
        "prizeId":22,
        "prize": [
            {
                "type": 0,
                "value":540,
                "count":3
            }
        ]
    },
    {
        "prizeId":23,
        "prize": [
            {
                "type": 0,
                "value":860,
                "count":5
            },
            {
                "type": 0,
                "value":860,
                "count":5,
                "vip":8
            }
        ]
    },
    {
        "prizeId":24,
        "prize": [
            {
                "type": 2,
                "count":60
            }
        ]
    },
    {
        "prizeId":25,
        "prize": [
            {
                "type": 0,
                "value":539,
                "count":2
            }
        ]
    },
    {
        "prizeId":26,
        "prize": [
            {
                "type": 0,
                "value":871,
                "count":18
            },
            {
                "type": 0,
                "value":871,
                "count":18,
                "vip":8
            }
        ]
    },
    {
        "prizeId":27,
        "prize": [
            {
                "type": 2,
                "count":100
            }
        ]
    },
    {
        "prizeId":28,
        "prize": [
            {
                "type": 2,
                "count":150
            },
            {
                "type": 2,
                "count":150,
                "vip":8
            }
        ]
    },
    {
        "prizeId":29,
        "prize": [
            {
                "type": 2,
                "count":200
            }
        ]
    },
    {
        "prizeId":30,
        "prize": [
            {
                "type": 2,
                "count":250
            }
        ]
    }]
};
