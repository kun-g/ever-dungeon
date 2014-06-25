var data = [
    {
        "chapterId": 0,
        "hidden":true,
        "title":"dungeonname0.png",
        "desc":"非常隐蔽的地洞，难以被察觉，其中偶尔会\n有怪物的身影出现。",
        "icon":"mapicon2.png",
        "stage":[
            {
                "stageId": 0,
                "cost": 0,
                "team": 1,
                "hidden":false,
                "dungeon": 0,
                "teammate": [
                {
                  "class" : 131,
                  "name" : "约书亚",
                  "gender" : 1,
                  "hairStyle" : 5,
                  "hairColor" : 13,
                  "xp" : 0
                },
                {
                  "class" : 132,
                  "name" : "凯瑟琳",
                  "gender" : 0,
                  "hairStyle" : 5,
                  "hairColor" :3 ,
                  "xp" : 0
                }
                ]
            }
        ]
    },
    {
    "abtest": [
        {
		"chapterId": 1,
        "idx": 0,
        "style": "map-dungeon1",
		"title":"dungeonname1.png",
        "label":"多姆洞穴",
		"desc":"似乎是天然形成的洞穴，出没着一些危险的\n野生怪物，让不少旅人有去无回。",
		"icon":"mapicon2.png",

		"stage":[
            {
				"stageId": 1,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 1,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.0.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 2,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 2,
                "tutorial":3,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 3,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 3,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.2.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 4,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":4,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.3.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 5,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 5,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.4.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 6,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 6,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.5.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 7,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 7,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.6.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":78,
                "cost":10,
                "dungeon":64,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.7.state"}, 2 ] }
                ]
                }

            }
		]
	},
{
"chapterId": 1,
"idx": 0,
"style": "map-dungeon1",
"title":"dungeonname1.png",
"label":"多姆洞穴",
"desc":"似乎是天然形成的洞穴，出没着一些危险的\n野生怪物，让不少旅人有去无回。",
"icon":"mapicon2.png",

"stage":[
{
"stageId": 1,
"cost": 15,
"team": 1,
"hidden":false,
"dungeon": 84,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.0.state"}, 2 ] }
    ]
    }

},
{
"stageId": 2,
"cost": 15,
"team": 1,
"hidden":false,
"dungeon": 85,
"tutorial":3,
    "teammate": [
        {
            "class" : 164,
            "name" : "琳达",
            "gender" : 0,
            "hairColor" : 15,
            "xp" : 0
        }],
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.1.state"}, 2 ] }
    ]
    }

},
{
"stageId": 3,
"cost": 15,
"team": 1,
"hidden":false,
"dungeon": 86,
    "teammate": [
        {
            "class" : 164,
            "name" : "琳达",
            "gender" : 0,
            "hairColor" : 15,
            "xp" : 0
        }],
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.2.state"}, 2 ] }
    ]
    }

},
{
"stageId": 4,
"cost": 15,
"team": 2,
"hidden":false,
"dungeon":87,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.3.state"}, 2 ] }
    ]
    }

},
{
"stageId": 5,
"cost": 15,
"team": 2,
"hidden":false,
"dungeon": 88,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.4.state"}, 2 ] }
    ]
    }

},
{
"stageId": 6,
"cost": 15,
"team": 3,
"hidden":false,
"dungeon": 89,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.5.state"}, 2 ] }
    ]
    }

},
{
"stageId": 7,
"cost": 15,
"team": 3,
"hidden":false,
"dungeon": 90,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.6.state"}, 2 ] }
    ]
    }

},
{
"stageId":78,
"cost":10,
"dungeon":64,
"isInfinite":true,
    "cond":
    { "and": [
        { "==": [ { "type": "getProperty", "key": "stage.7.state"}, 2 ] }
    ]
    }

}
]
}
]
},
	{
		"chapterId": 2,
        "idx": 1,
        "style": "map-dungeon2",
		"title":"dungeonname2.png",
        "label":"密谋森林",
		"desc":"阴森诡异的密谋森林，吞噬了很多勇者的生\n命，因此很少有人再敢靠近它。",
		"icon":"mapicon1.png",
		"stage":[
            {
                "stageId": 8,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 8,
                "cond":
                { "or": [
                    { "==": [ { "type": "getProperty", "key": "stage.7.state"}, 2 ] },
                    { "==": [ { "type": "getProperty", "key": "stage.102.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 9,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 9,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.8.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 10,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 10,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.9.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 11,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":11,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.10.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 12,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 12,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.11.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 13,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 13,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.12.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 14,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 14,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.13.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":79,
                "cost":10,
                "dungeon":65,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.14.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 3,
		"idx": 2,
        "style": "map-dungeon3",
		"title":"dungeonname3.png",
        "label":"湖滨大道",
		"desc":"沿着凯多湖边一直蔓延的湖滨大道，由于年\n久失修，如今成为了盗贼们的聚集地。",
		"icon":"mapicon7.png",
		"stage":[
            {
                "stageId": 15,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 15,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.14.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 16,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 16,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.15.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 17,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 17,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.16.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 18,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":18,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.17.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 19,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 19,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.18.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 20,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 20,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.19.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 21,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 21,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.20.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":80,
                "cost":10,
                "dungeon":66,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.21.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
        "chapterId":4,
		"idx": 3,
        "style": "map-dungeon7",
		"title":"dungeonname7.png",
        "label":"断肠崖",
		"desc":"塔伦山脉中最险要的地方，遍布着夺命的悬\n崖，稍不留神就会让你付出惨痛的代价。",
		"icon":"mapicon4.png",
		"stage":[
            {
                "stageId": 22,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 22,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.21.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 23,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 23,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.22.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 24,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 24,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.23.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 25,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":25,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.24.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 26,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 26,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.25.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 27,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 27,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.26.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 28,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 28,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.27.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":81,
                "cost":10,
                "dungeon":67,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.28.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 5,
		"idx": 4,
        "style": "map-dungeon5",
		"title":"dungeonname5.png",
        "label":"暮色平原",
		"desc":"表面上一片祥和的大草原，但却暗潮涌动\n潜伏的怪物们会告诫你不要小看这片平原。",
		"icon":"mapicon3.png",
		"stage":[
		    {
				"stageId": 29,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 29,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.28.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 30,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 30,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.29.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 31,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 31,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.30.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 32,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 32,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.31.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 33,
				"cost": 15,
				"team": 3,
			    "hidden":false,
				"dungeon": 33,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.32.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 34,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 34,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.33.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 35,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 35,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.34.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":82,
                "cost":10,
                "dungeon":68,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.35.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 6,
		"idx": 5,
        "style": "map-dungeon6",
		"title":"dungeonname6.png",
        "label":"野蛮哨站",
		"desc":"兽人的哨站，存放着兽人抢夺村庄的战利品，\n重兵把守，勇者们几乎都是有去无回。",
		"icon":"mapicon5.png",
		"stage":[
			{
			    "stageId": 36,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 36,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.35.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 37,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":37,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.36.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 38,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 38,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.37.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 39,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 39,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.38.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 40,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 40,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.39.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 41,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 41,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.40.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 42,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 42,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.41.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":83,
                "cost":10,
                "dungeon":69,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.42.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 7,
		"idx": 6,
        "style": "map-dungeon4",
		"title":"dungeonname4.png",
        "label":"旋风谷",
		"desc":"山谷险要的地势加上诡异的巨大山风，让这\n里成为勇者们永远的噩梦。",
		"icon":"mapicon4.png",
		"stage":[
			{
				"stageId": 43,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 43,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.42.state"}, 2 ] }
                ]
                }

            },
		    {
				"stageId": 44,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 44,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.43.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 45,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 45,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.44.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 46,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 46,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.45.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 47,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":47,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.46.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 48,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":48,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.47.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 49,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":49,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.48.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":84,
                "cost":10,
                "dungeon":70,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.49.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 8,
		"idx": 7,
        "style": "map-dungeon8",
		"title":"dungeonname8.png",
        "label":"丛林密道",
		"desc":"不见天日的丛林中，隐藏着的古老密道，现\n在已经荒废并且成为怪物们的巢穴。",
		"icon":"mapicon1.png",
		"stage":[
		    {
				"stageId": 50,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 50,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.49.state"}, 2 ] }
                ]
                }

            },
			{
			    "stageId": 51,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 51,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.50.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 52,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 52,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.51.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 53,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 53,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.52.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 54,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 54,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.53.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 55,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 55,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.54.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 56,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 56,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.55.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":85,
                "cost":10,
                "dungeon":71,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.56.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 9,
		"idx": 8,
        "style": "map-dungeon9",
		"title":"dungeonname9.png",
        "label":"巫师营地",
		"desc":"巫师掌控着的地盘，营地中驻扎着巫师手下\n的邪恶军团，是一支极具威胁的军队。",
		"icon":"mapicon5.png",
		"stage":[
    {
				"stageId": 57,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 57,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.56.state"}, 2 ] }
                ]
                }

            },
			{
        "stageId": 58,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 58,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.57.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 59,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":59,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.58.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 60,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 60,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.59.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 61,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":61,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.60.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 62,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":62,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.61.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 63,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":63,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.62.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":86,
                "cost":10,
                "dungeon":72,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.63.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 10,
		"idx": 9,
        "style": "map-dungeon10",
		"title":"dungeonname10.png",
        "label":"死灵洞穴",
		"desc":"盘踞着未知力量的洞穴，据说这股力量来自\n遥远的上古，是人类无法探知的境地。",
		"icon":"mapicon2.png",
		"stage":[
    {
				"stageId": 64,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 76,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 65,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 77,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 66,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 78,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 67,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 79,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 68,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 80,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 69,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon":81,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 70,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 82,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":87,
                "cost":10,
                "dungeon":83,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            }
		]
	},
	{
		"chapterId": 11,
		"idx": 10,
        "style": "map-dungeon11",
		"title":"dungeonname11.png",
        "label":"塔卡宫殿",
		"desc":"领主塔卡的宫殿，卡塔不仅拥有强大的佣兵\n军团，据称他已经掌握了未知力量。",
	    "icon":"mapicon6.png",
		"stage":[
		    {
			    "stageId": 71,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 84,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 72,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":85,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId": 73,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon":86,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
				"stageId":74,
				"cost": 15,
				"team": 3,
				"hidden":false,
				"dungeon": 87,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
			{
			    "stageId":75,
			    "cost": 15,
			    "team": 3,
			    "hidden":false,
			    "dungeon": 88,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":76,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 89,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":77,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 90,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.1000.state"}, 2 ] }
                ]
                }

            }
        ]
    },
    {
        "chapterId": 12,
        "label":"日常任务章",
        "hidden": true,
        "stage":[
            {
                "stageId": 88,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 76,
                "event":"event_daily"
            },
            {
                "stageId": 89,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 77,
                "event":"event_daily"
            },
            {
                "stageId": 90,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 78,
                "event":"event_daily"
            },
            {
                "stageId": 91,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 79,
                "event":"event_daily"
            },
            {
                "stageId": 92,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 80,
                "event":"event_daily"
            },
            {
                "stageId": 93,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 81 ,
                "event":"event_daily"
            },
            {
                "stageId": 94,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 82,
                "event":"event_daily"
            },
            {
                "stageId": 95,
                "cost": 10,
                "team": 3,
                "hidden":true,
                "dungeon": 83,
                "event":"event_daily"
            }
        ]
    },
    {
        "chapterId": 13,
        "idx": 0,
        "style": "map-dungeon1",
        "title":"dungeonname1.png",
        "label":"多姆洞穴",
        "desc":"似乎是天然形成的洞穴，出没着一些危险的\n野生怪物，让不少旅人有去无回。",
        "icon":"mapicon2.png",

        "stage":[
            {
                "stageId": 96,
                "cost": 15,
                "team": 1,
                "hidden":false,
                "dungeon": 92,
                "tutorial":2,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.104.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 97,
                "cost": 15,
                "team": 1,
                "hidden":false,
                "dungeon": 93,
                "teammate": [
                {
                    "class" : 164,
                    "name" : "阿雅",
                    "gender" : 0,
                    "hairColor" : 15,
                    "xp" : 0
                }],
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.105.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 98,
                "cost": 15,
                "team": 1,
                "hidden":false,
                "dungeon": 94,
                "tutorial":4,
                "teammate": [
                {
                    "class" : 164,
                    "name" : "阿雅",
                    "gender" : 0,
                    "hairColor" : 15,
                    "xp" : 0
                }],
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.97.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 99,
                "cost": 15,
                "team": 2,
                "hidden":false,
                "dungeon":95,
                "tutorial":6,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.106.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 100,
                "cost": 15,
                "team": 2,
                "hidden":false,
                "dungeon": 96,
                "tutorial":7,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.99.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 101,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 97,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.107.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId": 102,
                "cost": 15,
                "team": 3,
                "hidden":false,
                "dungeon": 98,
                "tutorial":9,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.101.state"}, 2 ] }
                ]
                }

            },
            {
                "stageId":103,
                "cost":10,
                "dungeon":64,
                "isInfinite":true,
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "stage.102.state"}, 2 ] }
                ]
                }

            }
        ]
    },
    {
    "chapterId": 14,
    "hidden": true,
    "label":"教程",
    "stage":[
        {
            "stageId": 104,
            "cost": 0,
            "team": 1,
            "hidden":false,
            "dungeon": 91,
            "tutorial":1
        },
        {
            "stageId": 105,
            "cost": 0,
            "team": 1,
            "hidden":false,
            "dungeon": 99,
            "tutorial":3,
            "teammate": [
                {
                    "class" : 131,
                    "name" : "约书亚",
                    "gender" : 1,
                    "hairStyle" : 5,
                    "hairColor" : 13,
                    "xp" : 0
                }
            ],
            "cond":
            { "and": [
                { "==": [ { "type": "getProperty", "key": "stage.96.state"}, 2 ] }
            ]
            }
        },
        {
            "stageId": 106,
            "cost": 0,
            "team": 1,
            "hidden":false,
            "dungeon": 100,
            "tutorial":5,
            "teammate": [
                {
                    "class" : 132,
                    "name" : "凯瑟琳",
                    "gender" : 0,
                    "hairStyle" : 5,
                    "hairColor" :3 ,
                    "xp" : 0
                }
            ],
            "cond":
            { "and": [
                { "==": [ { "type": "getProperty", "key": "stage.98.state"}, 2 ] }
            ]
            }
        },
        {
            "stageId": 107,
            "cost": 0,
            "team": 1,
            "hidden":false,
            "dungeon": 101,
            "tutorial":8,
            "teammate": [
                {
                    "class" : 131,
                    "name" : "约书亚",
                    "gender" : 1,
                    "hairStyle" : 5,
                    "hairColor" : 13,
                    "xp" : 0
                },
                {
                    "class" : 132,
                    "name" : "凯瑟琳",
                    "gender" : 0,
                    "hairStyle" : 5,
                    "hairColor" :3 ,
                    "xp" : 0
                }
            ],
            "cond":
            { "and": [
                { "==": [ { "type": "getProperty", "key": "stage.100.state"}, 2 ] }
            ]
            }
        }
        ]
    },
    {
      "chapterId": 15,
      "hidden": true,
      "label":"HuoDong",
      "stage":[
        {
          stageId: 108,
          cost: 10,
          team: 3,
          hidden: true,
          dungeon: 105,
          description: "Enhance1",
          eventName: "event_enhance",
          condition: function (obj, util) {
            return ( obj.counters.enhance < 3 ) &&
              ( util.today.weekday() === 2 ||
                util.today.weekday() === 4 ||
                util.today.weekday() === 6 ||
                util.today.weekday() === 0 );
          },
          initialAction: function (obj) {
            obj.counters.enhance++;
          }
        },
        {
          stageId: 109,
          cost: 10,
          team: 3,
          hidden: true,
          dungeon: 106,
          eventName: "event_enhance",
          description: "Enhance2",
          condition: function (obj, util) {
            return ( obj.counters.enhance < 3 ) &&
              ( util.today.weekday() === 2 ||
                util.today.weekday() === 4 ||
                util.today.weekday() === 6 ||
                util.today.weekday() === 0 );
          },
          initialAction: function (obj) {
            obj.counters.enhance++;
          }
        },
        {
          stageId: 110,
          cost: 15,
          team: 3,
          hidden: true,
          dungeon: 107,
          description: "Enhance3",
          eventName: "event_enhance",
          condition: function (obj, util) {
            return ( obj.counters.enhance < 3 ) &&
              ( util.today.weekday() === 2 ||
                util.today.weekday() === 4 ||
                util.today.weekday() === 6 ||
                util.today.weekday() === 0 );
          },
          initialAction: function (obj) {
            obj.counters.enhance++;
          }
        },
        {
          stageId: 111,
          cost: 15,
          team: 3,
          hidden: true,
          dungeon: 108,
          description: "Enhance4",
          eventName: "event_enhance",
          condition: function (obj, util) {
            return ( obj.counters.enhance < 3 ) &&
              ( util.today.weekday() === 2 ||
                util.today.weekday() === 4 ||
                util.today.weekday() === 6 ||
                util.today.weekday() === 0 );
          },
          initialAction: function (obj) {
            obj.counters.enhance++;
          }
        },
        {
          stageId: 112,
          cost: 20,
          team: 3,
          hidden: true,
          dungeon: 109,
          description: "Enhance5",
          eventName: "event_enhance",
          condition: function (obj, util) {
            return ( obj.counters.enhance < 3 ) &&
              ( util.today.weekday() === 2 ||
                util.today.weekday() === 4 ||
                util.today.weekday() === 6 ||
                util.today.weekday() === 0 );
          },
          initialAction: function (obj) {
            obj.counters.enhance++;
          }
        },
        {
          stageId: 113
        },
        {
            stageId: 114,
            cost: 10,
            team: 3,
            hidden: true,
            dungeon: 102,
            description: "Goblin1",
            eventName: "event_goblin",
            condition: function (obj, util) {
              return obj.counters.goblin < 3 || !obj.counters.goblin;
            },
            initialAction: function (obj) {
              if (obj.counters.goblin) {
                obj.counters.goblin++;
              } else {
                obj.counters.newProperty('goblin', 1);
              }
            }
        },
        {
            stageId: 115,
            cost: 15,
            team: 3,
            hidden: true,
            dungeon: 103,
            description: "Goblin2",
            eventName: "event_goblin",
            condition: function (obj, util) {
              return obj.counters.goblin < 3 || !obj.counters.goblin;
            },
            initialAction: function (obj) {
              if (obj.counters.goblin) {
                obj.counters.goblin++;
              } else {
                obj.counters.newProperty('goblin', 1);
              }
            }
        },
        {
            stageId: 116,
            cost: 20,
            team: 3,
            hidden: true,
            dungeon: 104,
            description: "Goblin3",
            eventName: "event_goblin",
            condition: function (obj, util) {
              return obj.counters.goblin < 3 || !obj.counters.goblin;
            },
            initialAction: function (obj) {
              if (obj.counters.goblin) {
                obj.counters.goblin++;
              } else {
                obj.counters.newProperty('goblin', 1);
              }
            }
        },
          {
              stageId: 117,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 110,
              description: "wxp1",
              eventName: "event_weapon",
              condition: function (obj, util) {
                return ( obj.counters.weapon < 3 ) &&
                  ( util.today.weekday() === 1 ||
                    util.today.weekday() === 3 ||
                    util.today.weekday() === 5 ||
                    util.today.weekday() === 0 );
              },
              initialAction: function (obj) {
                obj.counters.weapon++;
              }
          },
          {
              stageId: 118,
              cost: 15,
              team: 3,
              hidden: true,
              dungeon: 111,
              description: "wxp2",
              eventName: "event_weapon",
              condition: function (obj, util) {
                return ( obj.counters.weapon < 3 ) &&
                  ( util.today.weekday() === 1 ||
                    util.today.weekday() === 3 ||
                    util.today.weekday() === 5 ||
                    util.today.weekday() === 0 );
              },
              initialAction: function (obj) {
                obj.counters.weapon++;
              }
          },
          {
              stageId: 119,
              cost: 20,
              team: 3,
              hidden: true,
              dungeon: 112,
              description: "wxp3",
              eventName: "event_weapon",
              condition: function (obj, util) {
                return ( obj.counters.weapon < 3 ) &&
                  ( util.today.weekday() === 1 ||
                    util.today.weekday() === 3 ||
                    util.today.weekday() === 5 ||
                    util.today.weekday() === 0 );
              },
              initialAction: function (obj) {
                obj.counters.weapon++;
              }
          },
          {
              stageId: 120,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 113,
              description: "infinity",
              eventName: "event_infinite",
	      "isInfinite":true,
              condition: function (obj, util) {
                return true;
              },
              initialAction: function (obj) {
              }
          },
          {
              stageId: 121,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 114,
              description: "hunt83",
              eventName: "event_goblin",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) {
                  return obj.counters.goblin < 3 || !obj.counters.goblin;
              },
              initialAction: function (obj) {
                  //if (obj.counters.goblin) {
                  //    obj.counters.goblin++;
                  //} else {
                  //    obj.counters.newProperty('goblin', 1);
                  //}
              }
          },
          {
              stageId: 122,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 115,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 123,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 116,
              description: "hunt112",
              eventName: "event_hunt112",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 124,
              cost: 10,
              team: 1,
              pvp: true,
              hidden: true,
              dungeon: 118,
              description: "hunt112",
              eventName: "event_goblin",
              "formularId":1,
              condition: function (obj, util) { return true;
              },
              initialAction: function (obj) { }
          },
          {
              stageId: 125,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 119,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 126,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 120,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 127,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 121,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 128,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 122,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 129,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 123,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 130,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 124,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 131,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 125,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          },
          {
              stageId: 132,
              cost: 10,
              team: 3,
              hidden: true,
              dungeon: 126,
              description: "hunt39",
              eventName: "event_hunt39",
              "isInfinite":true,
              "formularId":1,
              condition: function (obj, util) { return true; },
              initialAction: function (obj) { }
          }
      ]
  }
];
for (k in data) {
  data[k].stageId = k;
}
exports.data = data;
