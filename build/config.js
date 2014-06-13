exports.data = {
  "ServerID": "1",
  "ServerConfig": [
    {
      "ID": 0,
      "Name": "Develop",
      "DB": {
        "Account": { "IP": "localhost", "PORT": 6379 },
        "Role": { "IP": "localhost", "PORT": 6379},
        "Publisher": { "IP": "localhost", "PORT": 6379},
        "Subscriber": { "IP": "localhost", "PORT": 6379}
      },
      "Gate": [
        {"ip": "localhost", "port": 7756},
        {"ip": "localhost", "port": 7758}
      ]
    },
    {
      "ID": 1,
      "Name": "Master",
      "DB": {
        "Account": { "IP": "10.4.4.188", "PORT": 6380 },
        "Role": { "IP": "10.4.4.188", "PORT": 6381 },
        "Publisher": { "IP": "10.4.4.188", "PORT": 6380 },
        "Subscriber": { "IP": "10.4.4.188", "PORT": 6380 }
      },
      "Gate": [
        {"ip": "10.4.4.188", "port": 7756},
        {"ip": "10.4.2.185", "port": 7756}
      ]
    }
  ],
  "ServerName": "Master",
  "ServerID": "1",
  "PayMethod": "PP",
  "Enhance_Rate" : [1, 0.75, 0.70, 0.65, 0.6, 0.55, 0.50, 0.45, 0.40, 0.35],
  "Product_List": [
    {"rmb":6,"diamond":60},
    {"rmb":12,"diamond":130},
    {"rmb":30,"diamond":330},
    {"rmb":68,"diamond":760},
    {"rmb":128,"diamond":1460},
    {"rmb":198,"diamond":2260},
    {"rmb":328,"diamond":3760},
    {"rmb":648,"diamond":7480},
    {"rmb":25,"diamond":100}
  ],

    "InitialEquipment":{
        5:[{"type":0,"value":622,"count":1,classLimit:[0]},
            {"type":0,"value":652,"count":1,classLimit:[1]},
            {"type":0,"value":682,"count":1,classLimit:[2]}
        ],
        4:[{"type":0,"value":40,"count":1,classLimit:[0]},
            {"type":0,"value":32,"count":1, classLimit:[1]},
            {"type":0,"value":36,"count":1, classLimit:[2]}
        ],
        2:[{"type":0,"value":41,"count":1, classLimit:[0]},
            {"type":0,"value":33,"count":1, classLimit:[1]},
            {"type":0,"value":37,"count":1,  classLimit:[2]}],
        1:[{"type":0,"value":42,"count":1, classLimit:[0]},
            {"type":0,"value":34,"count":1, classLimit:[1]},
            {"type":0,"value":38,"count":1, classLimit:[2]}],
        0:[{"type":0, "value":43,"count":1,classLimit:[0]},
            {"type":0,"value":35,"count":1, classLimit:[1]},
            {"type":0,"value":39, "count":1,classLimit:[2]}],
        3:[{"type":0,"value":712,"count":1,classLimit:[0]},
            {"type":0,"value":742,"count":1,classLimit:[1]},
            {"type":0,"value":772,"count":1,classLimit:[2]}]},
  "Global_Blue_Star_RewardTable" : [ ],
  "Global_Recyclable_Enhancement" : [ 0, 1, 2, 3, 4, 5, 6 ],
  "Global_Recycle_Config" : [
    {"minimum" : 0, "delta" : 1},
    {"minimum" : 1, "delta" : 1},
    {"minimum" : 2, "delta" : 2},
    {"minimum" : 3, "delta" : 3},
    {"minimum" : 4, "delta" : 4},
    {"minimum" : 5, "delta" : 5},
    {"minimum" : 6, "delta" : 6},
    {"minimum" : 7, "delta" : 7},
    {"minimum" : 8, "delta" : 8},
    {"minimum" : 9, "delta" : 9}
  ],

    "Global_Material_ID" : [558, 559, 560, 561, 562],
    "Global_Enhancement_GEM_Index" : [3, 4, 5, 26, 27, 392, 393],
  "Auth_API_Server": "10.4.2.185"
}
