exports.data = {
    Auth_API_Server: "10.4.2.185",

    DB_Config: {
        "local": {
            Account: { IP: "localhost", PORT: 6379 },
            Role: { IP: "localhost", PORT: 6379 },
            Publisher: { IP: "localhost", PORT: 6379 },
            Subscriber: { IP: "localhost", PORT: 6379 }
        },
        "10.4.3.41": {
            Account: { IP: "10.4.3.41", PORT: 6380 },
            Role: { IP: "10.4.3.41", PORT: 6380 },
            Publisher: { IP: "10.4.3.41", PORT: 6380 },
            Subscriber: { IP: "10.4.3.41", PORT: 6380 }
        },
        "192.168.1.16": {
            Account: { IP: "localhost", PORT: 6379 },
            Role: { IP: "localhost", PORT: 6379 },
            Publisher: { IP: "localhost", PORT: 6379 },
            Subscriber: { IP: "localhost", PORT: 6379 }
        },
        "10.4.4.188": {
            Account: { IP: "10.4.4.188", PORT: 6380 },
            Role: { IP: "10.4.4.188", PORT: 6381 },
            Publisher: { IP: "10.4.4.188", PORT: 6380 },
            Subscriber: { IP: "10.4.4.188", PORT: 6380 }
        }
    },

    Server_Config: {
        "测试:本地数据库": {
            ID: -1,
            Name: "Develop",
            DB: "local",
            DB_Prefix: "Develop"
        },
        "测试:188数据库": {
            ID: -1,
            Name: "Develop",
            DB: "192.168.1.16",
            DB_Prefix: "Develop"
        },
        "Develop": {
            ID: 0,
            Name: "Develop",
            DB: "10.4.3.41",
            IP: "10.4.3.41",
            DB_Prefix: "Develop"
        },
        "Master": {
            ID: 1,
            Name: "Master",
            DB: "10.4.4.188",
            DB_Prefix: "Master",
        }
    },

    IP_Config : {
        "192.168.1.4": [ {
            Server: "测试:本地数据库",
            Port: 7756
        }, {
            Server: "测试:188数据库",
            Port: 7757
        } ],
        "10.4.4.188": [ {
            Server: "Master",
            Port: 7756
        } ],
        "10.3.4.41": [ {
            Server: "Develop",
            Port: 7756
        } ],
    },
	Gate_Config:{
		"10.3.4.41":[
			{ip:"10.3.4.41", port:7756},
		]
	}
}
