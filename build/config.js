exports.data = {
  "ServerID": "0",
  "ServerName": "Develop",
  "ServerConfig": [
    {
      "ID": 0,
      "Name": "Develop",
      "DB": {
        "Account": { "IP": "192.168.1.17", "PORT": 6380 },
        "Role": { "IP": "192.168.1.17", "PORT": 6380},
        "Publisher": { "IP": "192.168.1.17", "PORT": 6380},
        "Subscriber": { "IP": "192.168.1.17", "PORT": 6380}
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
    },
  ],
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
    {"rmb":25,"diamond":0}
  ],
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
