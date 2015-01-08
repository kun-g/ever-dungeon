exports.data = {
    "Auth_API_Server": "192.168.128.11",

    DB_Config: {
        "SEAsia": {
            "Account": { "IP": "192.168.128.9", "PORT": 6380 },
            "Role": { "IP": "192.168.128.10", "PORT": 6380 },
            "Publisher": { "IP": "192.168.128.9", "PORT": 6380 },
            "Subscriber": { "IP": "192.168.128.9", "PORT": 6380 }
        }
    },

    Server_Config: {
        "Develop.9": {
            ID: 0,
            Name: "Develop",
            DB: "SEAsia",
            DB_Prefix: "Develop"
        },
 
        "Develop.10": {
            ID: 0,
            Name: "Develop",
            DB: "SEAsia",
            DB_Prefix: "Develop"
        },
		"Develop.11": {
            ID: 0,
            Name: "Develop",
            DB: "SEAsia",
            DB_Prefix: "Develop"
        }
 
    },

    IP_Config : {
        "192.168.128.9": [ { Server: "Develop.9", Port: 7756 } ],
        "192.168.128.10": [ { Server: "Develop.10", Port: 7756 } ],
        "192.168.128.11": [ { Server: "Develop.11", Port: 7756 } ],
    },
	Gate_Config:{
		"192.168.128.10": [
//           {"ip": "192.168.128.9", "port": 7756},
           {"ip": "192.168.128.10", "port": 7756},
 //          {"ip": "192.168.128.11", "port": 7756}
		]
	}

}
