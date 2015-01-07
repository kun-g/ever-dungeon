exports.data = {
    "Auth_API_Server": "192.168.128.11"

    DB_Config: {
        "SEAsia": {
            "Account": { "IP": "192.168.128.9", "PORT": 6380 },
            "Role": { "IP": "192.168.128.10", "PORT": 6380 },
            "Publisher": { "IP": "192.168.128.9", "PORT": 6380 },
            "Subscriber": { "IP": "192.168.128.9", "PORT": 6380 }
        }
    },

    Server_Config: {
        "Develop": {
            ID: 0,
            Name: "Develop",
            DB: "SEAsia",
            IP: "10.4.3.41",
            DB_Prefix: "Develop"
         "Gate": [
           {"ip": "192.168.128.9", "port": 7756},
           {"ip": "192.168.128.10", "port": 7756},
           {"ip": "192.168.128.11", "port": 7756}
         ]
        }
    },

    IP_Config : {
        "192.168.128.9": [ { Server: "Develop", Port: 7757 } ],
    }
}
