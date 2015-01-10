exports.data = [
    {
        "questId":0,
        "title":"劫後逢生",
        "desc":"傳說中的魔龍再次出現，混沌的黑暗將再度降臨，做好準備迎接挑戰",
        "objects":[
            {
                "type":0,
                "label":"與魔龍交戰，並且死裡逃生。",
                "collect":1000,
                "count":1
            }
        ],
        "prize":[
            {
                "type":0,
                "value":25,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        },
        "endDialogue":9
    },
    {
        "abtest":[
            {
                "questId":1,
                "title":"找到湯姆大叔",
                "desc":"一直找不到湯姆大叔，聽村民說見他去了【多姆洞穴I】，趕緊去看看吧。",
                "objects":[
                    {
                        "type":0,
                        "label":"探索【多姆洞穴I】",
                        "collect":1001,
                        "count":1
                    }
                ],
                "prize":[
                    {
                        "type":1,
                        "count":250
                    }
                ],
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "quests.0.complete"}, true ] }
                ]
                },
                "endDialogue":11
            },{
                "questId":1,
                "title":"找到湯姆大叔的女兒",
                "desc":"聽說湯姆大叔的女兒去了【多姆洞穴I】，趕緊去看看吧。",
                "objects":[
                    {
                        "type":0,
                        "label":"找到湯姆大叔的女兒",
                        "collect":1001,
                        "count":1
                    }
                ],
                "prize":[
                    {
                        "type":1,
                        "count":250
                    }
                ],
                "cond":
                { "and": [
                    { "==": [ { "type": "getProperty", "key": "quests.0.complete"}, true ] }
                ]
                },
                "endDialogue":30
            }]},
    {
        "questId":2,
        "title":"討伐沒節操史萊姆",
        "desc":"黏糊糊史萊姆捲土重來，害的村裡妹子們都不敢出門，實在太沒節操了，趕緊去【多姆洞穴II】幹掉它！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黏糊糊史萊姆【BOSS】",
                "collect":2001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":150
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.1.complete"}, true ] }
        ]
        },
        "endDialogue":17
    },
    {
        "questId":3,
        "title":"驅逐野狼",
        "desc":"野狼又到發情期了，整晚叫喚讓人怎麼睡？！為村民們驅趕野狼吧！",
        "objects":[
            {
                "type":0,
                "label":"擊殺10只野狼",
                "collect":3001,
                "count":10
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":4,
        "title":"攤上大事了？！",
        "desc":"還記得不經意間被你打跑的猥瑣哥布林嗎？他爸可是酋長哥布林！現在他們要帶哥布林村管大隊來報仇，目前正在【多姆洞穴III】集結同伴。",
        "objects":[
            {
                "type":0,
                "label":"擊敗哥布林酋長【BOSS】",
                "collect":4001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.2.complete"}, true ] }
        ]
        },
        "endDialogue":12
    },
    {
        "questId":5,
        "title":"尋找卡姆礦石",
        "desc":"山姆大叔想要一些卡姆礦石，在【多姆洞穴III】儲量比較豐富哦",
        "objects":[
            {
                "type":0,
                "label":"採集3枚卡姆礦石",
                "collect":5001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":6,
        "title":"清理殘餘哥布林部隊",
        "desc":"挫敗了哥布林先鋒部隊，現在是掃蕩殘餘部隊的時候了！",
        "objects":[
            {
                "type":0,
                "label":"擊敗哥布林15只",
                "collect":6001,
                "count":15
            }
        ],
        "prize":[
            {
                "type":1,
                "count":400
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":7,
        "title":"尋找走失的村民",
        "desc":"卡琳為了幫父親采藥去了【多姆洞穴IV】，一直沒回來，趕緊去把她找回來吧！",
        "objects":[
            {
                "type":0,
                "label":"尋找村民卡琳",
                "collect":7001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":8,
        "title":"尋找神奇草藥",
        "desc":"答應卡琳幫她在【多姆洞穴IV】中，尋找到醫治父親的神奇草藥。",
        "objects":[
            {
                "type":0,
                "label":"採集3株神奇草藥",
                "collect":8001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":9,
        "title":"剿滅哥布林部落",
        "desc":"是時候給他們致命一擊了，立刻前往【多姆洞穴IV】擊敗他們吧",
        "objects":[
            {
                "type":0,
                "label":"擊倒哥布林酋長【BOSS】",
                "collect":9001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.4.complete"}, true ] }
        ]
        }

    },
    {
        "questId":10,
        "title":"尋找高階卡姆礦石",
        "desc":"通過對卡姆礦石的研究，山姆大叔覺得能夠得到在【多姆洞穴IV】的高純度礦石，就能製作出給力裝備！",
        "objects":[
            {
                "type":0,
                "label":"採集5枚高階卡姆礦石",
                "collect":10001,
                "count":5
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }

        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":11,
        "title":"找到卡姆結晶",
        "desc":"在【多姆洞穴IV】發現卡姆礦石結晶，不過被黏糊糊史萊姆吞下去了，趁被它消化前，趕緊去奪過來！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黏糊糊史萊姆【BOSS】",
                "count":1 ,
                "collect":11001
            }
        ],
        "prize":[

            {
                "type":1,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":12,
        "title":"哥布林野狼聯手？",
        "desc":"哥布林和野狼勾結起來，似乎想對村子進行報復，趕緊去【多姆洞穴V】看看吧",
        "objects":[
            {
                "type":0,
                "label":"擊敗哥布林狼騎手【BOSS】",
                "collect":12001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.9.complete"}, true ] }
        ]
        }

    },
    {
        "questId":13,
        "title":"救出昔日的小夥伴們",
        "desc":"村民看到狼騎手抓住了一個戰士和一個法師，目前正在【多姆洞穴VI】，去救他們吧！",
        "objects":[
            {
                "type":0,
                "label":"找到受困的小夥伴",
                "collect":13001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.12.complete"}, true ] }
        ]
        },
        "startDialogue":13
    },
    {
        "questId":14,
        "title":"尋找小夥伴的牧師",
        "desc":"被捉的小夥伴果然不是凱薩琳和卡爾，不過他們一同組隊的牧師目前還在【多姆洞穴VI】迷路中",
        "objects":[
            {
                "type":0,
                "label":"找到小夥伴的牧師",
                "collect":14001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":15,
        "title":"多姆村英雄",
        "desc":"將【多姆洞穴VII】中的史萊姆擊倒，給村莊帶來安寧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒巨型史萊姆【BOSS】",
                "collect":15001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":1,
                "count":400
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.13.complete"}, true ] }
        ]
        }
        ,
        "startDialogue":15,
        "endDialogue":16
    },
    {
        "questId":16,
        "title":"史萊姆清道夫",
        "desc":"【多姆洞穴VII】史萊姆們又開始集結了，再次前往打敗它們。",
        "objects":[
            {
                "type":0,
                "label":"擊倒大史萊姆【BOSS】",
                "collect":15001,
                "count":1
            },{
                "type":0,
                "label":"擊敗史萊姆",
                "collect":16001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":17,
        "questStage":8,
        "title":"探索密謀森林",
        "desc":"搜索【密謀森林I】尋找相關線索",
        "objects":[
            {
                "type":0,
                "label":"探索【密謀森林I】",
                "collect":17001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "or": [
            { "==": [ { "type": "getProperty", "key": "quests.15.complete"}, true ] },
            { "==": [ { "type": "getProperty", "key": "quests.163.complete"}, true ] }
        ]
        }

    },
    {
        "questId":18,
        "questStage":8,
        "title":"走丟的雪麗",
        "desc":"雪麗去【密謀森林I】就再也沒人見過了，幫村民們去找找吧",
        "objects":[
            {
                "type":0,
                "label":"找到雪麗",
                "collect":18001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.17.complete"}, true ] }
        ]
        }

    },
    {
        "questId":19,
        "questStage":9,
        "title":"狼騎的逆襲",
        "desc":"沒有得到教訓的狼騎又想捲土重來，去【密謀森林II】擊潰它們！",
        "objects":[
            {
                "type":0,
                "label":"擊倒狼騎【BOSS】",
                "collect":19001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.17.complete"}, true ] }
        ]
        }

    },
    {
        "questId":20,
        "title":"不規矩的獸族兵",
        "desc":"獸族兵越來越倡狂，阻止它們對村莊造成巨大的傷害！",
        "objects":[
            {
                "type":0,
                "label":"討伐獸族兵",
                "collect":20001,
                "count":25
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.19.complete"}, true ] }
        ]
        }

    },
    {
        "questId":21,
        "questStage":10,
        "title":"獸族一鍋端",
        "desc":"【密謀森林III】中發現有獸族在建哨站，似乎在盤算著什麼陰謀！",
        "objects":[
            {
                "type":0,
                "label":"擊敗獸族投斧手【BOSS】",
                "collect":21001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.19.complete"}, true ] }
        ]
        }

    },
    {
        "questId":22,
        "questStage":10,
        "title":"聖靈草",
        "desc":"又到聖靈草生長的季節，這只在【密謀森林III】中生長的草藥，是村莊中最常用的醫療用品。",
        "objects":[
            {
                "type":0,
                "label":"收集聖靈草",
                "collect":22001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":0,
                "value":540,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.21.complete"}, true ] }
        ]
        }

    },
    {
        "questId":23,
        "questStage":11,
        "title":"火焰史萊姆！？",
        "desc":"兇猛的火焰史萊姆出現在【密謀森林IV】中，已經襲擊了不少村民了，趕緊去擊敗它！",
        "objects":[
            {
                "type":0,
                "label":"擊倒火焰史萊姆【BOSS】",
                "collect":23001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.21.complete"}, true ] }
        ]
        }

    },
    {
        "questId":24,
        "questStage":11,
        "title":"火焰魔法結晶",
        "desc":"【密謀森林IV】中的火焰史萊姆的出現，產生了蘊含火焰力量的結晶，採集回來給湯姆大叔瞧瞧。",
        "objects":[
            {
                "type":0,
                "label":"收集火焰魔法結晶",
                "collect":24001,
                "count":5
            }
        ],
        "prize":[

            {
                "type":1,
                "count":500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.23.complete"}, true ] }
        ]
        }

    },
    {
        "questId":25,
        "title":"滅蟲大行動",
        "desc":"紫毒狼蛛們開始躁動不安了，到處都是它們的蜘蛛網，趕緊為民除害吧！",
        "objects":[
            {
                "type":0,
                "label":"討伐紫毒狼蛛群",
                "collect":25001,
                "count":30
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.23.complete"}, true ] }
        ]
        }

    },
    {
        "questId":26,
        "questStage":12,
        "title":"再戰火焰史萊姆",
        "desc":"上次的火焰史萊姆一役沒有將它徹底清除，現在它又恢復了，就在【密謀森林V】！",
        "objects":[
            {
                "type":0,
                "label":"擊倒火焰史萊姆【BOSS】",
                "collect":26001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.23.complete"}, true ] }
        ]
        }

    },
    {
        "questId":27,
        "questStage":13,
        "title":"尋找武器鍛造學徒",
        "desc":"湯姆大叔的學徒為了尋找鍛造材料一個人去了【密謀森林VI】！情況可能非常危險，去把他找回來吧！",
        "objects":[
            {
                "type":0,
                "label":"找到湯姆大叔的學徒",
                "collect":27001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":760
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.25.complete"}, true ] }
        ]
        }

    },
    {
        "questId":28,
        "title":"收集鍛造素材",
        "desc":"為湯姆大叔的學徒找到血狼的牙齒",
        "objects":[
            {
                "type":0,
                "label":"收集40個血狼牙",
                "collect":28001,
                "count":40
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.26.complete"}, true ] }
        ]
        }

    },
    {
        "questId":29,
        "questStage":13,
        "title":"尋找密謀森林的最深層入口",
        "desc":"成功通過【密謀森林VI】尋找到最深處的入口",
        "objects":[
            {
                "type":0,
                "label":"成功突破【密謀森林VI】",
                "collect":29001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":380
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.26.complete"}, true ] }
        ]
        }

    },
    {
        "questId":30,
        "questStage":14,
        "title":"解放密謀森林",
        "desc":"將【密謀森林VII】深處的怪物擊敗，為森林帶來寧靜",
        "objects":[
            {
                "type":0,
                "label":"擊敗食人魔怪【BOSS】",
                "collect":30001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":760
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.29.complete"}, true ] }
        ]
        }

    },
    {
        "questId":31,
        "questStage":14,
        "title":"食人魔終結者",
        "desc":"將【密謀森林VII】中的大小食人魔擊倒！",
        "objects":[
            {
                "type":0,
                "label":"擊敗食人魔怪【BOSS】",
                "collect":30001,
                "count":1
            },
            {
                "type":0,
                "label":"擊敗食人魔",
                "collect":31001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1180
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.30.complete"}, true ] }
        ]
        }

    },
    {
        "questId":32,
        "questStage":15,
        "title":"打打打打劫！？",
        "desc":"【湖濱大道I】出現了一夥山賊，找到並擊倒他們！",
        "objects":[
            {
                "type":0,
                "label":"擊敗山賊【BOSS】",
                "collect":32001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.30.complete"}, true ] }
        ]
        }

    },
    {
        "questId":33,
        "questStage":16,
        "title":"救出商隊成員",
        "desc":"商隊在途經【湖濱大道II】時受到山賊的襲擊，其中一個成員被抓走了，幫商隊救出他吧！",
        "objects":[
            {
                "type":0,
                "label":"救出商隊成員",
                "collect":33001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.32.complete"}, true ] }
        ]
        }

    },
    {
        "questId":34,
        "questStage":16,
        "title":"商隊守衛者I",
        "desc":"【湖濱大道II】上也出現了不少傭兵打劫商團，商團們肅清道路吧！",
        "objects":[
            {
                "type":0,
                "label":"將【湖濱大道II】的傭兵掃清",
                "collect":34001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.32.complete"}, true ] }
        ]
        }

    },
    {
        "questId":35,
        "questStage":16,
        "title":"找尋失蹤的寶箱",
        "desc":"商隊成員救回了，不過一起的寶箱還沒找到，前往【湖濱大道II】替他們找回寶箱。",
        "objects":[
            {
                "type":0,
                "label":"找回商隊的寶箱",
                "collect":35001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.33.complete"}, true ] }
        ]
        }

    },
    {
        "questId":36,
        "title":"吃人的怪物",
        "desc":"食人魔出沒在湖濱大道附近襲擊商隊，將它們趕走！",
        "objects":[
            {
                "type":0,
                "label":"討伐食人魔",
                "collect":36001,
                "count":25
            }
        ],
        "prize":[
            {
                "type":1,
                "count":960
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.34.complete"}, true ] }
        ]
        }

    },
    {
        "questId":37,
        "questStage":17,
        "title":"商隊守衛者II",
        "desc":"肅清【湖濱大道III】上掠奪商隊的壞人們！",
        "objects":[
            {
                "type":0,
                "label":"將【湖濱大道III】的傭兵掃清",
                "collect":37001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.34.complete"}, true ] }
        ]
        }

    },
    {
        "questId":38,
        "title":"迷之怪物",
        "questStage":17,
        "desc":"【湖濱大道III】出現了一隻迷之怪物，襲擊商隊，並且搶走大量寶物。",
        "objects":[
            {
                "type":0,
                "label":"討伐迷之怪物",
                "collect":38001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.37.complete"}, true ] }
        ]
        }

    },
    {
        "questId":39,
        "title":"礦石收集者",
        "desc":"商隊帶著數種神秘礦石來給湯姆大叔，不過在湖濱大道遇到山賊弄丟了，為湯姆大叔找回礦石。",
        "objects":[
            {
                "type":0,
                "label":"找到神秘礦石1",
                "collect":39001,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘礦石2",
                "collect":39002,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘礦石3",
                "collect":39003,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘礦石4",
                "collect":39004,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1180
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.37.complete"}, true ] }
        ]
        }

    },
    {
        "questId":40,
        "title":"最討厭弓箭！",
        "desc":"使用弓箭的遊俠成了湖濱大道上商隊的最大威脅，為保護商隊的安全，擊潰他們！",
        "objects":[
            {
                "type":0,
                "label":"擊殺遊俠",
                "collect":40001,
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":960
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.37.complete"}, true ] }
        ]
        }

    },
    {
        "questId":41,
        "questStage":18,
        "title":"湊熱鬧的史萊姆",
        "desc":"原本寧靜的【湖濱大道IV】，現在連史萊姆也來湊熱鬧，一併清除它們！",
        "objects":[
            {
                "type":0,
                "label":"擊殺火焰史萊姆【BOSS】",
                "collect":41001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1120
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.37.complete"}, true ] }
        ]
        }

    },
    {
        "questId":42,
        "title":"迷之怪物II",
        "questStage":18,
        "desc":"迷之怪物這回出現在了【湖濱大道IV】，趁它還沒跑走，速度去擊敗它！",
        "objects":[
            {
                "type":0,
                "label":"擊殺迷之怪物【BOSS】",
                "collect":42001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":580
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.38.complete"}, true ] }
        ]
        }

    },
    {
        "questId":43,
        "questStage":18,
        "title":"找回商隊寶箱",
        "desc":"迷之怪物已經被擊倒，但商隊的寶箱還在【湖濱大道IV】，去幫他們找回來吧。",
        "objects":[
            {
                "type":0,
                "label":"商隊寶箱",
                "collect":43001,
                "count":4
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.42.complete"}, true ] }
        ]
        }

    },
    {
        "questId":44,
        "questStage":19,
        "title":"迎頭痛擊",
        "desc":"山賊團夥出現在了【湖濱大道V】，前往那裡給他們迎頭一擊！",
        "objects":[
            {
                "type":0,
                "label":"擊倒山賊頭目【BOSS】",
                "collect":44001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.41.complete"}, true ] }
        ]
        }

    },
    {
        "questId":45,
        "questStage":20,
        "title":"救回雪麗",
        "desc":"山賊們為了報仇，把雪麗抓走了，目前他們在【湖濱大道VI】集結，趕緊把她救回來！",
        "objects":[
            {
                "type":0,
                "label":"救出雪麗",
                "collect":45001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":480
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.44.complete"}, true ] }
        ]
        }

    },
    {
        "questId":46,
        "title":"剿滅山賊",
        "questStage":20,
        "desc":"山賊頭目和殘党逃去了【湖濱大道VI】，將他們徹底趕走吧！",
        "objects":[
            {
                "type":0,
                "label":"擊倒山賊頭目【BOSS】",
                "collect":46001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":620
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.44.complete"}, true ] }
        ]
        }

    },
    {
        "questId":47,
        "questStage":21,
        "title":"肅清商旅道路",
        "desc":"商旅道路上只剩下傭兵們在作亂了，把【湖濱大道VII】的傭兵們徹底肅清！",
        "objects":[
            {
                "type":0,
                "label":"擊倒遊俠兵長【BOSS】",
                "collect":47001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":960
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.46.complete"}, true ] }
        ]
        }

    },
    {
        "questId":48,
        "questStage":21,
        "title":"傭兵雙煞",
        "desc":"遊俠兵長與流浪劍士一起出現了，前往【湖濱大道VII】擊倒傭兵雙煞！",
        "objects":[
            {
                "type":0,
                "label":"擊倒遊俠兵長【BOSS】",
                "collect":47001,
                "count":1
            },
            {
                "type":0,
                "label":"擊倒流浪劍士【BOSS】",
                "collect":48001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":960
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.47.complete"}, true ] }
        ]
        }

    },
    {
        "questId":49,
        "questStage":22,
        "title":"探索斷腸崖",
        "desc":"前往【斷腸崖I】探索，並擊倒那裡的怪物頭領",
        "objects":[
            {
                "type":0,
                "label":"擊倒死灰哥布林投矛手【BOSS】",
                "collect":49001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.47.complete"}, true ] }
        ]
        }

    },
    {
        "questId":50,
        "questStage":23,
        "title":"給人添麻煩的考古學家",
        "desc":"頑固的考古學家去了【斷腸崖II】考古，近期那邊異常危險，去找到他並護送出來。",
        "objects":[
            {
                "type":0,
                "label":"找到考古學家",
                "collect":50001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":650
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.49.complete"}, true ] }
        ]
        }

    },
    {
        "questId":51,
        "title":"考古學家的委託",
        "desc":"斷腸崖是曾經的古戰場，因此有大量骷髏屍體，收集骷髏來做考古素材吧。",
        "objects":[
            {
                "type":0,
                "label":"收集骷髏",
                "collect":51001,
                "count":60
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1700
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.50.complete"}, true ] }
        ]
        }

    },
    {
        "questId":52,
        "questStage":23,
        "title":"金色食人魔之謎",
        "desc":"有人在【斷腸崖II】目擊了金色的食人魔，或許就是那邊近期異常的根源，前去調查一下吧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒金色食人魔【BOSS】",
                "collect":52001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.49.complete"}, true ] }
        ]
        }

    },
    {
        "questId":53,
        "questStage":24,
        "title":"金色食人魔之謎II",
        "desc":"另一隻金色食人魔目前正在【斷腸崖III】徘徊，為保護大家安全，前去擊倒它",
        "objects":[
            {
                "type":0,
                "label":"擊倒金色食人魔【BOSS】",
                "collect":53001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.52.complete"}, true ] }
        ]
        }

    },
    {
        "questId":54,
        "questStage":24,
        "title":"風之草",
        "desc":"【斷腸崖III】中生長著一種名叫風之草的草藥，商隊目前急缺這種草藥，拜託你去幫忙採集。",
        "objects":[
            {
                "type":0,
                "label":"收集風之草",
                "collect":54001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":850
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.52.complete"}, true ] }
        ]
        }

    },
    {
        "questId":55,
        "questStage":24,
        "title":"風之秘寶",
        "desc":"風之草的藥效沒有完全激發出來，需要配合【斷腸崖III】中的風之秘寶，前往那裡找到並帶回給商隊。",
        "objects":[
            {
                "type":0,
                "label":"收集風之秘寶",
                "collect":55001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.54.complete"}, true ] }
        ]
        }

    },
    {
        "questId":56,
        "title":"秘寶小偷",
        "desc":"風之秘寶不在寶箱中，似乎被偷走了，繼續搜尋秘寶的下落。",
        "objects":[
            {
                "type":0,
                "label":"找到風之秘寶",
                "collect":56001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.54.complete"}, true ] }
        ]
        }

    },
    {
        "questId":57,
        "questStage":25,
        "title":"野獸集結I",
        "desc":"哥布林們在【斷腸崖IV】中集結，非常可疑，前去調查。",
        "objects":[
            {
                "type":0,
                "label":"調查斷腸崖IV",
                "collect":57001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.53.complete"}, true ] }
        ]
        }

    },
    {
        "questId":58,
        "questStage":25,
        "title":"採集風之結晶",
        "desc":"湯姆大叔需要風之結晶可以在【斷腸崖IV】中找到",
        "objects":[
            {
                "type":0,
                "label":"採集風之結晶",
                "collect":58001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":900
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.57.complete"}, true ] }
        ]
        }

    },
    {
        "questId":59,
        "questStage":25,
        "title":"狼騎的復仇",
        "desc":"此前擊潰了死灰狼騎的陰謀，這次它們為了報復把卡琳抓去了【斷腸崖IV】。",
        "objects":[
            {
                "type":0,
                "label":"找回卡琳",
                "collect":59001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.58.complete"}, true ] }
        ]
        }

    },
    {
        "questId":60,
        "questStage":26,
        "title":"野獸集結II",
        "desc":"死灰狼騎再度出現在【斷腸崖V】，野獸們蠢蠢欲動，情況非常緊急。",
        "objects":[
            {
                "type":0,
                "label":"擊倒死灰狼騎【BOSS】",
                "collect":60001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.57.complete"}, true ] }
        ]
        }

    },
    {
        "questId":61,
        "title":"死灰哥布林投矛手",
        "desc":"斷腸崖中出現大量哥布林，率先剿滅死灰哥布林投矛手，給它們造成打擊。",
        "objects":[
            {
                "type":0,
                "label":"擊倒死灰哥布林投矛手",
                "collect":61001,
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.60.complete"}, true ] }
        ]
        }

    },
    {
        "questId":62,
        "questStage":27,
        "title":"野獸集結III",
        "desc":"野獸們在【斷腸崖VI】做最後的抵抗，前去擊倒它們。",
        "objects":[
            {
                "type":0,
                "label":"將斷腸崖VI的野獸清除",
                "collect":62001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.60.complete"}, true ] }
        ]
        }

    },
    {
        "questId":63,
        "questStage":28,
        "title":"野獸們的幕後黑手",
        "desc":"終於找到幕後黑手了，正是躲在【斷腸崖VII】的狂暴哥布林，打敗它平息這場混亂吧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒狂暴哥布林投矛手【BOSS】",
                "collect":63001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.62.complete"}, true ] }
        ]
        }

    },
    {
        "questId":64,
        "questStage":28,
        "title":"肅清殘餘部隊",
        "desc":"將【斷腸崖VII】的殘餘部隊全部剿滅",
        "objects":[
            {
                "type":0,
                "label":"擊倒狂暴哥布林投矛手【BOSS】",
                "collect":63001,
                "count":1
            },
            {
                "type":0,
                "label":"擊倒死灰哥布林投矛手【BOSS】",
                "collect":64001,
                "count":1
            },
            {
                "type":0,
                "label":"擊倒死灰狼騎【BOSS】",
                "collect":64002,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1200
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.63.complete"}, true ] }
        ]
        }

    },
    {
        "questId":65,
        "questStage":29,
        "title":"歡迎來到大草原",
        "desc":"探索【暮色平原I】",
        "objects":[
            {
                "type":0,
                "label":"成功探索暮色平原I",
                "collect":65001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":750
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.63.complete"}, true ] }
        ]
        }

    },
    {
        "questId":66,
        "title":"剷除在這些討厭的傭兵",
        "desc":"暮色平原出現了大量流浪的傭兵，將他們打倒。",
        "objects":[
            {
                "type":0,
                "label":"擊倒流浪劍士",
                "collect":66001,
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.65.complete"}, true ] }
        ]
        }

    },
    {
        "questId":67,
        "questStage":30,
        "title":"霸氣的藍褲衩",
        "desc":"【暮色平原II】出現了穿著藍褲衩的山賊頭目，到處打劫，趕緊去擊倒這個藍褲衩吧！",
        "objects":[
            {
                "type":0,
                "label":"擊倒藍褲衩山賊頭目【BOSS】",
                "collect":67001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.65.complete"}, true ] }
        ]
        }

    },
    {
        "questId":68,
        "title":"這次是小藍帽哦！",
        "desc":"藍帽遊俠包圍了整個暮色平原，再下去情況將很危險。",
        "objects":[
            {
                "type":0,
                "label":"擊倒藍帽遊俠",
                "collect":68001,
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.67.complete"}, true ] }
        ]
        }

    },
    {
        "questId":69,
        "questStage":31,
        "title":"暮色前哨戰",
        "desc":"傭兵們在【暮色平原III】建立了前哨戰，前去看看情況。",
        "objects":[
            {
                "type":0,
                "label":"通過暮色平原III",
                "collect":69001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.67.complete"}, true ] }
        ]
        }

    },
    {
        "questId":70,
        "questStage":31,
        "title":"拯救村民",
        "desc":"傭兵抓走大量村民做人質，前去【暮色平原III】的前哨戰搭救他們。",
        "objects":[
            {
                "type":0,
                "label":"救回被捉走的村民",
                "collect":70001,
                "count":4
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.69.complete"}, true ] }
        ]
        }

    },
    {
        "questId":71,
        "questStage":32,
        "title":"剿滅傭兵殘黨",
        "desc":"前哨戰的殘黨聚集在了【暮色平原IV】，將他們徹底剷除！",
        "objects":[
            {
                "type":0,
                "label":"剿滅傭兵殘黨",
                "collect":71001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.69.complete"}, true ] }
        ]
        }

    },
    {
        "questId":72,
        "questStage":33,
        "title":"翡翠突擊",
        "desc":"【暮色平原V】上出現了翡翠史萊姆，專門躲在草叢中襲擊村民。",
        "objects":[
            {
                "type":0,
                "label":"擊倒翡翠史萊姆【BOSS】",
                "collect":72001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.71.complete"}, true ] }
        ]
        }

    },
    {
        "questId":73,
        "questStage":33,
        "title":"翠綠怪獸",
        "desc":"【暮色平原V】出現了翠綠色的野獸，異常可怕。",
        "objects":[
            {
                "type":0,
                "label":"擊倒翠綠怪獸【BOSS】",
                "collect":73001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":0,
                "value":540,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.72.complete"}, true ] }
        ]
        }

    },
    {
        "questId":74,
        "questStage":34,
        "title":"翡翠二重奏",
        "desc":"【暮色平原VI】同時出現兩隻翡翠史萊姆，趁變更多之前消滅它們吧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒翡翠史萊姆【BOSS】",
                "collect":74001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.73.complete"}, true ] }
        ]
        }

    },
    {
        "questId":75,
        "questStage":35,
        "title":"鬥狼之魂",
        "desc":"【暮色平原VII】聚集著大量鬥狼，似乎傳說中的鬥狼之魂即將降臨。",
        "objects":[
            {
                "type":0,
                "label":"擊倒鬥狼之魂【BOSS】",
                "collect":75001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.74.complete"}, true ] }
        ]
        }

    },
    {
        "questId":76,
        "questStage":35,
        "title":"野獸共鬥",
        "desc":"將【暮色平原VII】上的兩大怪物擊倒。",
        "objects":[
            {
                "type":0,
                "label":"擊倒鬥狼之魂【BOSS】",
                "collect":75001,
                "count":1
            },
            {
                "type":0,
                "label":"擊倒翡翠野獸【BOSS】",
                "collect":76001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.75.complete"}, true ] }
        ]
        }

    },
    {
        "questId":77,
        "questStage":36,
        "title":"探索獸人營地",
        "desc":"探索【野蠻哨站I】。",
        "objects":[
            {
                "type":0,
                "label":"探索野蠻哨站I",
                "collect":77001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1260
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.75.complete"}, true ] }
        ]
        }

    },
    {
        "questId":78,
        "title":"掃清障礙",
        "desc":"野蠻哨站中的偵察兵黃色哥布林，阻礙了探索的進程，先掃清一下障礙吧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒黃色哥布林",
                "collect":78001,
                "count":50
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2080
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.77.complete"}, true ] }
        ]
        }

    },
    {
        "questId":79,
        "questStage":37,
        "title":"擊破部落哨崗",
        "desc":"將【野蠻哨站II】的前哨崗給擊破，保證探查工作的進行",
        "objects":[
            {
                "type":0,
                "label":"擊破野蠻哨站II",
                "collect":79001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1040
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.77.complete"}, true ] }
        ]
        }

    },
    {
        "questId":80,
        "questStage":37,
        "title":"找回走失的傑克",
        "desc":"傑克一人去了【野蠻哨站II】找尋自己的父親，至今沒有音訊，前去看看。",
        "objects":[
            {
                "type":0,
                "label":"找到傑克",
                "collect":80001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1260
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.79.complete"}, true ] }
        ]
        }

    },
    {
        "questId":81,
        "questStage":38,
        "title":"野蠻哨站的異動",
        "desc":"獸族小隊長銀靈狼騎兵目前在【野蠻哨站III】，前去探查情況。",
        "objects":[
            {
                "type":0,
                "label":"擊倒銀靈狼騎兵【BOSS】",
                "collect":81001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1040
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.77.complete"}, true ] }
        ]
        }

    },
    {
        "questId":82,
        "questStage":38,
        "title":"神秘的傭兵",
        "desc":"在【野蠻哨站III】出現神秘的傭兵劍士，難道和傑克的父親有什麼關係？",
        "objects":[
            {
                "type":0,
                "label":"擊倒傭兵劍士【BOSS】",
                "collect":82001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2080
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.80.complete"}, true ] }
        ]
        }

    },
    {
        "questId":83,
        "questStage":39,
        "title":"野蠻哨站調查令I",
        "desc":"前往【野蠻哨站IV】進行深入調查，尋找神秘的傭兵。",
        "objects":[
            {
                "type":0,
                "label":"通過野蠻哨站IV",
                "collect":83001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1260
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.81.complete"}, true ] }
        ]
        }

    },
    {
        "questId":84,
        "title":"考古調查",
        "desc":"野蠻哨站出現了大量不死骷髏，收集殘骸來給考古學家吧。",
        "objects":[
            {
                "type":0,
                "label":"收集大刀骷髏殘骸",
                "collect":84001,
                "count":100
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2080
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.83.complete"}, true ] }
        ]
        }

    },
    {
        "questId":85,
        "questStage":40,
        "title":"哥布林酋長的威脅",
        "desc":"哥布林們已經覺察到我們的探查，哥布林酋長正在【野蠻哨站V】集結部隊對我們反擊，前去擊破它們！",
        "objects":[
            {
                "type":0,
                "label":"擊倒哥布林酋長【BOSS】",
                "collect":85001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1040
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.83.complete"}, true ] }
        ]
        }

    },
    {
        "questId":86,
        "questStage":40,
        "title":"還魂草傳說I",
        "desc":"傑克的父親為了尋找傳說中的還魂草，踏上了傭兵之路，聽說這種草生長在【野蠻哨站V】附近。",
        "objects":[
            {
                "type":0,
                "label":"收集還魂草",
                "collect":86001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1260
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.85.complete"}, true ] }
        ]
        }

    } ,
    {
        "questId":87,
        "questStage":41,
        "title":"野蠻哨站調查令II",
        "desc":"深入調查獸人大本營【野蠻哨站VI】",
        "objects":[
            {
                "type":0,
                "label":"探索野蠻哨站VI",
                "collect":87001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1040
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.85.complete"}, true ] }
        ]
        }

    },
    {
        "questId":88,
        "questStage":41,
        "title":"還魂草傳說II",
        "desc":"傑克的父親正是此前的傭兵劍士，但似乎失去了之前的記憶，趕緊去【野蠻哨站VI】把他帶回來吧！",
        "objects":[
            {
                "type":0,
                "label":"打倒傭兵劍士【BOSS】",
                "collect":88001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1260
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.86.complete"}, true ] }
        ]
        }

    },
    {
        "questId":89,
        "questStage":41,
        "title":"還魂草傳說III",
        "desc":"傑克父親已經恢復，據說是把迷魂草當成還魂草了，導致失去了理智，去【野蠻哨站VI】把這些害人的植物除盡吧。",
        "objects":[
            {
                "type":0,
                "label":"銷毀迷魂草",
                "collect":89001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":0,
                "value":538,
                "count":1
            },
            {
                "type":0,
                "value":540,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.88.complete"}, true ] }
        ]
        }

    },
    {
        "questId":90,
        "questStage":42,
        "title":"野蠻哨站幕後黑手",
        "desc":"找到了一直潛伏著的劍士，現在躲在【野蠻哨站VII】，前去擊敗他！",
        "objects":[
            {
                "type":0,
                "label":"擊敗劍聖",
                "collect":90001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1040
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.87.complete"}, true ] }
        ]
        }

    },
    {
        "questId":91,
        "questStage":42,
        "title":"挑戰野蠻哨站",
        "desc":"【野蠻哨站VII】中的劍聖與獸族聯手，你是否能夠通過這個挑戰？",
        "objects":[
            {
                "type":0,
                "label":"擊敗劍聖",
                "collect":90001,
                "count":1
            },
            {
                "type":0,
                "label":"擊敗銀斧",
                "collect":91001,
                "count":2
            },
            {
                "type":0,
                "label":"擊敗金斧",
                "collect":91002,
                "count":2
            },
            {
                "type":0,
                "label":"擊敗翠靈",
                "collect":91003,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2080
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.90.complete"}, true ] }
        ]
        }

    },
    {
        "questId":92,
        "questStage":43,
        "title":"山賊的節操？",
        "desc":"號稱只在山上搶劫的卡斯山賊頭目，目前出現在了【旋風穀I】，去給他點教訓吧。",
        "objects":[
            {
                "type":0,
                "label":"擊敗卡斯山賊頭目【BOSS】",
                "collect":92001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1280
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.90.complete"}, true ] }
        ]
        }

    },
    {
        "questId":93,
        "title":"山崖礦石尋找之旅",
        "desc":"旋風穀的獨有礦石讓湯姆大叔激動不已，收集齊3種礦石給他吧！",
        "objects":[
            {
                "type":0,
                "label":"收集神秘礦石1",
                "collect":93001,
                "count":4
            },
            {
                "type":0,
                "label":"收集神秘礦石2",
                "collect":93002,
                "count":4
            },
            {
                "type":0,
                "label":"收集神秘礦石3",
                "collect":93003,
                "count":4
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1320
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.92.complete"}, true ] }
        ]
        }

    },
    {
        "questId":94,
        "questStage":48,
        "title":"礦石結晶",
        "desc":"旋風穀的神秘礦石存在結晶，不過在【旋風谷VI】被強力的怪物守護著，去收集帶給湯姆大叔吧！",
        "objects":[
            {
                "type":0,
                "label":"獲得神秘礦石結晶",
                "collect":94001,
                "count":1

            }
        ],
        "prize":[
            {
                "type":1,
                "count":2560
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.93.complete"}, true ] }
        ]
        }

    },
    {
        "questId":95,
        "questStage":44,
        "title":"山賊的教訓！",
        "desc":"卡斯山賊頭目在【旋風穀II】招兵買馬，看來上次沒有嘗到教訓，再來給他們一記吧！",
        "objects":[
            {
                "type":0,
                "label":"擊破旋風穀II",
                "collect":95001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1280
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.92.complete"}, true ] }
        ]
        }

    },
    {
        "questId":96,
        "title":"小粉紅大愛！",
        "desc":"村子裡突然流行起了粉紅熱，趕緊去抓幾隻粉紅狼蛛來當寵物賣，大賺一筆的機會到了！",
        "objects":[
            {
                "type":0,
                "label":"收集粉紅狼蛛",
                "collect":96001,
                "count":65
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2560
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.95.complete"}, true ] }
        ]
        }

    },
    {
        "questId":97,
        "questStage":45,
        "title":"傭兵劍士的討伐",
        "desc":"【旋風穀III】上的傭兵劍士，專門搶奪過路行人，比山賊還惡劣，為村民們除害吧！",
        "objects":[
            {
                "type":0,
                "label":"擊倒傭兵劍士【BOSS】",
                "collect":97001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1280
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.95.complete"}, true ] }
        ]
        }

    },
    {
        "questId":98,
        "questStage":45,
        "title":"找回失蹤的戀人",
        "desc":"雪麗因為與戀人吵架而一個人去了【旋風穀III】，可能會出事情，趕緊幫忙找回她吧。",
        "objects":[
            {
                "type":0,
                "label":"找到雪麗",
                "collect":98001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1320
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.97.complete"}, true ] }
        ]
        }

    },
    {
        "questId":99,
        "questStage":46,
        "title":"擊破黃金史萊姆",
        "desc":"渾身金色的史萊姆出現在了【旋風穀IV】，異常危險，前去擊倒它吧！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黃金史萊姆【BOSS】",
                "collect":99001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1280
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.97.complete"}, true ] }
        ]
        }

    },
    {
        "questId":100,
        "questStage":46,
        "title":"黃金三連星",
        "desc":"金色史萊姆找來小夥伴打算一雪前恥，目前正在【旋風穀IV】，前去擊倒它們！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黃金史萊姆【BOSS】",
                "collect":99001,
                "count":1
            },
            {
                "type":0,
                "label":"擊倒黃金史萊姆小夥伴【BOSS】",
                "collect":100001,
                "count":2
            }

        ],
        "prize":[
            {
                "type":1,
                "count":1280
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.99.complete"}, true ] }
        ]
        }

    },
    {
        "questId":101,
        "questStage":47,
        "title":"旋風穀挑戰任務I",
        "desc":"前往【旋風穀V】擊倒怪物通過關卡。",
        "objects":[
            {
                "type":0,
                "label":"通過旋風穀V",
                "collect":101001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1320
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.99.complete"}, true ] }
        ]
        }

    },
    {
        "questId":102,
        "questStage":48,
        "title":"旋風穀挑戰任務II",
        "desc":"前往【旋風穀VI】擊倒怪物通過關卡。",
        "objects":[
            {
                "type":0,
                "label":"通過旋風穀VI",
                "collect":102001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1320
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.101.complete"}, true ] }
        ]
        }

    },
    {
        "questId":103,
        "questStage":49,
        "title":"旋風谷主人",
        "desc":"旋風谷的主人兇惡山賊守在【旋風穀VII】擊倒它向下一個地牢邁進吧！",
        "objects":[
            {
                "type":0,
                "label":"兇惡山賊【BOSS】",
                "collect":103001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2560
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.102.complete"}, true ] }
        ]
        }

    },
    {
        "questId":104,
        "questStage":50,
        "title":"密道上的不速之客",
        "desc":"【叢林密道I】中出現了一群山賊，將他們的頭目拿下！",
        "objects":[
            {
                "type":0,
                "label":"擊倒兇惡山賊【BOSS】",
                "collect":104001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.103.complete"}, true ] }
        ]
        }

    },
    {
        "questId":105,
        "title":"黃金旋風",
        "desc":"叢林密道中的黃金史萊姆嚴重氾濫，影響前進，前去驅散掉一部分！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黃金史萊姆",
                "collect":105001,
                "count":60
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.104.complete"}, true ] }
        ]
        }

    },
    {
        "questId":106,
        "questStage":51,
        "title":"叢林遊擊隊",
        "desc":"通過【叢林密道II】打倒深處的叢林遊擊隊。",
        "objects":[
            {
                "type":0,
                "label":"通過叢林密道II",
                "collect":106001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.104.complete"}, true ] }
        ]
        }

    },
    {
        "questId":107,
        "title":"密林深處的怪物I",
        "desc":"村民在密林遇到了怪物，導致走散，去把他們救出來！",
        "objects":[
            {
                "type":0,
                "label":"救出村民1",
                "collect":107001,
                "count":1
            },
            {
                "type":0,
                "label":"救出村民2",
                "collect":107002,
                "count":1
            },
            {
                "type":0,
                "label":"救出村民3",
                "collect":107003,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.106.complete"}, true ] }
        ]
        }

    },
    {
        "questId":108,
        "questStage":54,
        "title":"密林深處的怪物II",
        "desc":"此前襲擊村民的怪物已經鎖定行蹤，目前在【叢林密道V】，為村民們出口氣！",
        "objects":[
            {
                "type":0,
                "label":"擊殺密林怪物",
                "collect":108001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.107.complete"}, true ] }
        ]
        }

    },
    {
        "questId":109,
        "questStage":52,
        "title":"哥布林的決心I",
        "desc":"最兇惡的地獄哥布林酋長目前在【叢林密道III】，前去擊倒它。",
        "objects":[
            {
                "type":0,
                "label":"擊倒地獄哥布林酋長【BOSS】",
                "collect":109001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.106.complete"}, true ] }
        ]
        }

    },
    {
        "questId":110,
        "questStage":53,
        "title":"哥布林的決心II",
        "desc":"地獄哥布林酋長逃往了【叢林密道IV】，乘勝追擊！",
        "objects":[
            {
                "type":0,
                "label":"擊倒地獄哥布林酋長【BOSS】",
                "collect":110001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.109.complete"}, true ] }
        ]
        }

    },
    {
        "questId":111,
        "questStage":54,
        "title":"來自叢林的挑戰I",
        "desc":"哥布林與山賊聯手，在【叢林密道V】集結，要對你進行挑戰！",
        "objects":[
            {
                "type":0,
                "label":"挑戰叢林密道V",
                "collect":111001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.110.complete"}, true ] }
        ]
        }

    },
    {
        "questId":112,
        "questStage":55,
        "title":"來自叢林的挑戰II",
        "desc":"哥布林與山賊聯手，在【叢林密道VI】集結，要對你進行挑戰！",
        "objects":[
            {
                "type":0,
                "label":"挑戰叢林密道VI",
                "collect":112001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.111.complete"}, true ] }
        ]
        }

    },
    {
        "questId":113,
        "questStage":26,
        "title":"找尋小小哥布林",
        "desc":"湯姆大叔家的小小哥布林走丟了，聽說混入【旋風穀V】",
        "objects":[
            {
                "type":0,
                "label":"找到小小哥布林",
                "collect":113001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.60.complete"}, true ] }
        ]
        }

    },
    {
        "questId":114,
        "title":"地獄收割者",
        "desc":"將地獄哥布林酋長一舉殲滅，不給它們翻身的餘地！",
        "objects":[
            {
                "type":0,
                "label":"擊殺地獄哥布林酋長",
                "collect":114001,
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.110.complete"}, true ] }
        ]
        }

    },
    {
        "questId":115,
        "questStage":56,
        "title":"密林征服者",
        "desc":"將密林深處的食人魔守衛擊倒就能到達巫師營地，前去征服密林吧！",
        "objects":[
            {
                "type":0,
                "label":"擊殺食人魔守衛【BOSS】",
                "collect":115001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3200
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.112.complete"}, true ] }
        ]
        }

    },
    {
        "questId":116,
        "questStage":57,
        "title":"尋找神秘草",
        "desc":"【巫師營地I】中生長著神秘草，具有很大的藥用價值。",
        "objects":[
            {
                "type":0,
                "label":"採集神秘草",
                "collect":116001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2450
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.115.complete"}, true ] }
        ]
        }

    },
    {
        "questId":117,
        "questStage":57,
        "title":"邪惡巫師的助手",
        "desc":"在【巫師營地I】中，巫師助手血色狼騎擊倒！",
        "objects":[
            {
                "type":0,
                "label":"擊倒血色狼騎【BOSS】",
                "collect":117001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.115.complete"}, true ] }
        ]
        }

    },
    {
        "questId":118,
        "title":"獸人壓制戰",
        "desc":"將巫師營地中的，獸人隊長進行清理",
        "objects":[
            {
                "type":0,
                "label":"擊倒獸人隊長",
                "collect":118001,
                "count":75
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.117.complete"}, true ] }
        ]
        }

    },
    {
        "questId":119,
        "questStage":58,
        "title":"巫師營地調查I",
        "desc":"對【巫師營地II】進行調查",
        "objects":[
            {
                "type":0,
                "label":"調查巫師營地II",
                "collect":119001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.117.complete"}, true ] }
        ]
        }

    },
    {
        "questId":120,
        "questStage":59,
        "title":"巫師營地調查II",
        "desc":"對【巫師營地III】進行調查",
        "objects":[
            {
                "type":0,
                "label":"調查巫師營地III",
                "collect":120001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2450
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.119.complete"}, true ] }
        ]
        }

    },
    {
        "questId":121,
        "questStage":60,
        "title":"巫師營地調查III",
        "desc":"對【巫師營地IV】進行調查",
        "objects":[
            {
                "type":0,
                "label":"調查巫師營地IV",
                "collect":121001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2450
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.120.complete"}, true ] }
        ]
        }

    },
    {
        "questId":122,
        "questStage":61,
        "title":"巫師營地調查IV",
        "desc":"對【巫師營地V】進行調查",
        "objects":[
            {
                "type":0,
                "label":"調查巫師營地V",
                "collect":122001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.121.complete"}, true ] }
        ]
        }

    },
    {
        "questId":123,
        "questStage":62,
        "title":"巫師營地調查V",
        "desc":"對【巫師營地VI】進行調查",
        "objects":[
            {
                "type":0,
                "label":"調查巫師營地VI",
                "collect":123001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2450
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.122.complete"}, true ] }
        ]
        }

    },
    {
        "questId":124,
        "questStage":63,
        "title":"巫師貼身護衛",
        "desc":"巫師的貼身護衛目前在【巫師營地VII】，擊倒他將巫師營地詢問巫師下落。",
        "objects":[
            {
                "type":0,
                "label":"擊倒巫師護衛【BOSS】",
                "collect":124001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3600
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.123.complete"}, true ] }
        ]
        }

    },
    {
        "questId":125,
        "title":"巫師的煉製結晶",
        "desc":"巫師的煉金術殘餘魔力形成結晶，或許是鍛造的最佳材料。",
        "objects":[
            {
                "type":0,
                "label":"收集煉製結晶I",
                "collect":125001,
                "count":2
            },
            {
                "type":0,
                "label":"收集煉製結晶II",
                "collect":125002,
                "count":2
            },
            {
                "type":0,
                "label":"收集煉製結晶III",
                "collect":125003,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.120.complete"}, true ] }
        ]
        }

    },
    {
        "questId":126,
        "title":"血色狼騎追殺令",
        "desc":"將巫師的走狗血色狼騎徹底剷除！",
        "objects":[
            {
                "type":0,
                "label":"擊倒血色狼騎",
                "collect":126001,
                "count":60
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3600
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.121.complete"}, true ] }
        ]
        }

    },
    {
        "questId":127,
        "questStage":62,
        "title":"被巫師捉走村民的下落",
        "desc":"巫師捉走了大量村民，前去【巫師營地VI】搭救",
        "objects":[
            {
                "type":0,
                "label":"營救村民",
                "collect":127001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1800
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.123.complete"}, true ] }
        ]
        }

    },
    {
        "questId":128,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"尋找小夥伴的牧師",
        "desc":"新手牧師被困在地牢裡，趕緊前去營救",
        "objects":[
            {
                "type":0,
                "label":"找到小夥伴的牧師",
                "collect":128001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "stage": 88
    },
    {
        "questId":129,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"驅逐野狼",
        "desc":"野狼又到發情期了，整晚叫喚讓人怎麼睡？！為村民們驅趕野狼吧！",
        "objects":[
            {
                "type":0,
                "label":"擊殺10只野狼",
                "collect":129001,
                "count":10
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "stage": 88
    },
    {
        "questId":130,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"討厭的哥布林",
        "desc":"賤賤的哥布林們真讓人討厭，去把他們趕跑吧！",
        "objects":[
            {
                "type":0,
                "label":"擊殺5只哥布林",
                "collect":130001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }
        ],
        "stage": 88
    },
    {
        "questId":131,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"尋找武器鍛造學徒",
        "desc":"湯姆大叔的學徒為了尋找鍛造材料一個人去了地下城情況可能非常危險，去把他找回來吧！",
        "objects":[
            {
                "type":0,
                "label":"找到湯姆大叔的學徒",
                "collect":131001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":760
            }
        ],
        "stage": 89
    },
    {
        "questId":132,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"礦石收集之旅",
        "desc":"湯姆大叔需要卡姆礦石，前往收集",
        "objects":[
            {
                "type":0,
                "label":"收集3枚卡姆礦石",
                "collect":132001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1500
            }
        ],
        "stage": 89
    },
    {
        "questId":133,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"閃靈草採集",
        "desc":"前往地下城採集神奇的閃靈草",
        "objects":[
            {
                "type":0,
                "label":"採集5株閃靈草",
                "collect":133001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 89
    },
    {
        "questId":134,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"找尋失蹤的村民",
        "desc":"好幾個村民都失蹤了，去把她們找回來吧！",
        "objects":[
            {
                "type":0,
                "label":"找尋失蹤的村民",
                "collect":134001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 90
    },
    {
        "questId":135,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        },
        "hidden": true,
        "title":"尋找被山賊捉走的村民",
        "desc":"尋找被山賊捉走的村民",
        "objects":[
            {
                "type":0,
                "label":"找到村民",
                "collect":135001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 90
    },
    {
        "questId":136,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        },
        "hidden": true,
        "title":"食人魔的困擾",
        "desc":"地下城冒出一批食人魔，太恐怖了，幫大家擊倒這些怪物！",
        "objects":[
            {
                "type":0,
                "label":"擊倒食人魔",
                "collect":136001,
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 90
    },
    {
        "questId":137,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"古老秘寶",
        "desc":"找到失蹤已久的古老秘寶！",
        "objects":[
            {
                "type":0,
                "label":"找到古之秘寶",
                "collect":137001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 91
    },
    {
        "questId":138,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"擊敗暗影狼騎",
        "desc":"擊殺暗影狼騎。",
        "objects":[
            {
                "type":0,
                "label":"打倒暗影狼騎",
                "collect":138001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 91
    },
    {
        "questId":139,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"考古學家的委託",
        "desc":"將地下城中上古戰士骷髏兵擊倒，把殘骸帶給考古學家研究",
        "objects":[
            {
                "type":0,
                "label":"擊倒骷髏兵",
                "collect":139001,
                "count":20
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 91
    },
    {
        "questId":140,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"尋找古怪的考古學家",
        "desc":"脾氣古怪的考古學家一個人走失在地下城中，去救他出來吧",
        "objects":[
            {
                "type":0,
                "label":"找尋失蹤的村民",
                "collect":140001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 92
    },
    {
        "questId":141,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"翡翠史萊姆的逆襲",
        "desc":"打倒兩坨讓人厭惡的翡翠史萊姆",
        "objects":[
            {
                "type":0,
                "label":"打倒翡翠史萊姆",
                "collect":141001,
                "count":2
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 92
    },
    {
        "questId":142,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"城管大隊出擊",
        "desc":"跟隨城管大隊一同出擊，對盜賊團夥進行掃蕩突擊！",
        "objects":[
            {
                "type":0,
                "label":"擊倒藍帽盜賊",
                "collect":142001,
                "count":6
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 92
    },
    {
        "questId":143,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"除草行動",
        "desc":"最近一種有毒的植物爆發式增長，趁未對人造成影響之前去清除部分。",
        "objects":[
            {
                "type":0,
                "label":"清除有毒植物",
                "collect":143001,
                "count":10
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 93
    },
    {
        "questId":144,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"擊敗恐怖劍士",
        "desc":"恐怖劍士四處為害，為村民剷除這個惡棍吧！",
        "objects":[
            {
                "type":0,
                "label":"打倒恐怖劍士",
                "collect":144001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 93
    },
    {
        "questId":145,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"死灰投斧怪的噩夢",
        "desc":"一群死灰投斧怪出現了，非常煩人，擊倒它們！",
        "objects":[
            {
                "type":0,
                "label":"擊倒死灰投斧怪",
                "collect":145001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 93
    },
    {
        "questId":146,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"採集迷之礦石",
        "desc":"湯姆大叔探測到了一種迷之礦石，前去地下城把這種礦石給採集過來",
        "objects":[
            {
                "type":0,
                "label":"找到迷之礦石",
                "collect":146001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 94
    },
    {
        "questId":147,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"擊敗惡霸山賊",
        "desc":"擊殺大惡霸山賊。",
        "objects":[
            {
                "type":0,
                "label":"打倒惡霸山賊",
                "collect":147001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 94
    },
    {
        "questId":148,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"恐怖的血蜘蛛",
        "desc":"不少村民被血蜘蛛給襲擊，前去擊倒血蜘蛛！",
        "objects":[
            {
                "type":0,
                "label":"擊倒血蜘蛛",
                "collect":148001,
                "count":8
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 94
    },
    {
        "questId":149,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"來自商隊的求救信號",
        "desc":"商隊遭到了襲擊，部分商隊成員失蹤，幫忙去把他們找回來！",
        "objects":[
            {
                "type":0,
                "label":"救出失蹤的商隊成員",
                "collect":149001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 95
    },
    {
        "questId":150,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"擊敗地獄哥布林酋長",
        "desc":"將地下城深處的地獄哥布林酋長一舉擊敗",
        "objects":[
            {
                "type":0,
                "label":"打倒地獄哥布林酋長",
                "collect":150001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 95
    },
    {
        "questId":151,
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }
        ,
        "hidden": true,
        "title":"黑色旋風",
        "desc":"有黑色旋風之稱的黑牙狼在地下城肆虐，擊敗它們！",
        "objects":[
            {
                "type":0,
                "label":"擊倒黑牙狼",
                "collect":151001,
                "count":9
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "stage": 95
    },
    {
        "questId":152,
        "title":"多姆村村長的蹤跡",
        "desc":"失蹤已久的村長大人被人在【多姆洞穴VII】發現，趕緊去把他救回來！",
        "objects":[
            {
                "type":0,
                "label":"救出多姆村村長",
                "collect":152001,
                "count":1
            }
        ],
        "prize":[ {
            "type":1,
            "count":500
        },{ "type":5, "func": "setFlag", "flag": "daily", "value": true } ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.-1.complete"}, true ] }
        ]
        }

    },
    {
        "questId":153,
        "questStage":104,
        "title":"踏上征程",
        "desc":"擊破首個地下城，踏出自己探險的第一步",
        "objects":[
            {
                "type":0,
                "label":"擊破首個地下城",
                "collect":153001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":0,
                "value":25,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "<": [ { "type": "getProperty", "key": "tutorialStage"}, 1000 ] }
        ]
        }

    },
    {
        "questId":154,
        "questStage":96,
        "title":"營救阿雅",
        "desc":"聽說鐵匠湯姆的女兒去【多姆洞穴I】幾天沒回來了，趕緊去看看吧。",
        "objects":[
            {
                "type":0,
                "label":"找到阿雅",
                "collect":154001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":250
            },
            {
                "type":3,
                "count":250
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.153.complete"}, true ] }
        ]
        }
    },
    {
        "questId":155,
        "questStage":105,
        "title":"鐵匠鋪重新開業",
        "desc":"幫助湯姆大叔尋找多姆礦石為鐵匠鋪重新開業做準備。",
        "objects":[
            {
                "type":0,
                "label":"收集3塊多姆礦石",
                "collect":155001,
                "count":3
            }
        ],
        "prize":[
            {
                "type":1,
                "count":150
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.154.complete"}, true ] }
        ]
        }
    },
    {
        "questId":156,
        "questStage":97,
        "title":"討伐大型史萊姆",
        "desc":"大型史萊姆是個麻煩，趕緊去【多姆洞穴II】幹掉它！",
        "objects":[
            {
                "type":0,
                "label":"擊倒大型史萊姆【BOSS】",
                "collect":156001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":150
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.155.complete"}, true ] }
        ]
        }
    },
    {
        "questId":157,
        "questStage":98,
        "title":"黑暗中的利刃",
        "desc":"黑暗中的利刃——哥布林投矛手目前在【多姆洞穴III】胡作非為。",
        "objects":[
            {
                "type":0,
                "label":"擊敗哥布林投矛手【BOSS】",
                "collect":157001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.156.complete"}, true ] }
        ]
        },
        "startDialogue":63
    },
    {
        "questId":158,
        "questStage":106,
        "title":"湯姆大叔的請求",
        "desc":"尋找湯姆大叔的鐵匠學徒，重振鐵匠鋪！",
        "objects":[
            {
                "type":0,
                "label":"找到湯姆大叔學徒",
                "collect":158001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.157.complete"}, true ] }
        ]
        },
        "startDialogue":35

    },
    {
        "questId":159,
        "questStage":99,
        "title":"哥布林投矛手的決心",
        "desc":"哥布林投矛手這次在【多姆洞穴IV】，帶上你的小夥伴討伐它吧！",
        "objects":[
            {
                "type":0,
                "label":"擊敗哥布林投矛手",
                "collect":159001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":250
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.158.complete"}, true ] }
        ]
        }
    },
    {
        "questId":160,
        "questStage":100,
        "title":"暗中的邪惡聯盟",
        "desc":"有人發現哥布林與野狼攜手，在【多姆洞穴V】伺機而動",
        "objects":[
            {
                "type":0,
                "label":"消滅哥布林狼騎",
                "collect":160001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":200
            }

        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.159.complete"}, true ] }
        ]
        }
    },
    {
        "questId":161,
        "questStage":107,
        "title":"調查神秘的黑影",
        "desc":"與卡爾和凱薩琳一起調查怪物異動的根源",
        "objects":[
            {
                "type":0,
                "label":"調查神秘的黑影",
                "collect":161001,
                "count":1
            }
        ],
        "prize":[

            {
                "type":1,
                "count":200
            }

        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.160.complete"}, true ] }
        ]
        }
    },
    {
        "questId":162,
        "questStage":101,
        "title":"解救村長",
        "desc":"村長去往了【多姆洞穴VI】，情況似乎不太妙，前去救出村長！",
        "objects":[
            {
                "type":0,
                "label":"成功營救村長",
                "collect":162001,
                "count":1
            }
        ],
        "prize":[ {
            "type":1,
            "count":500
        },{ "type":5, "func": "setFlag", "flag": "daily", "value": true } ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.161.complete"}, true ] }
        ]
        }
        ,
        "startDialogue":46,
        "endDialogue":47
    },
    {
        "questId":163,
        "questStage":102,
        "title":"多姆村英雄",
        "desc":"將【多姆洞穴VII】中的史萊姆大王擊倒，給村莊帶來安寧。",
        "objects":[
            {
                "type":0,
                "label":"擊倒巨型史萊姆【BOSS】",
                "collect":163001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":400
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.162.complete"}, true ] }
        ]
        }
    },
    {
        "questId":164,
        "title":"冒險征途的里程碑I",
        "desc":"將角色升至4級",
        "objects":[
            {
                "type":4,
                "label":"升級至4級",
                "count":4
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            },
            {
                "type":0,
                "value":538,
                "count":1
            }
        ]
    },
    {
        "questId":165,
        "title":"冒險征途的里程碑II",
        "desc":"將角色升至8級",
        "objects":[
            {
                "type":4,
                "label":"升級至8級",
                "count":8
            }
        ],
        "prize":[
            {
                "type":0,
                "value":853,
                "count":5
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.164.complete"}, true ] }
        ]
        }
    },
    {
        "questId":166,
        "title":"冒險征途的里程碑III",
        "desc":"將角色升至12級",
        "objects":[
            {
                "type":4,
                "label":"升級至12級",
                "count":12
            }
        ],
        "prize":[
            {
                "type":0,
                "value":853,
                "count":5
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.165.complete"}, true ] }
        ]
        }
    },
    {
        "questId":167,
        "title":"冒險征途的里程碑IV",
        "desc":"將角色升至15級",
        "objects":[
            {
                "type":4,
                "label":"升級至15級",
                "count":15
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.166.complete"}, true ] }
        ]
        }
    },
    {
        "questId":168,
        "title":"冒險征途的里程碑V",
        "desc":"將角色升至20級",
        "objects":[
            {
                "type":4,
                "label":"升級至20級",
                "count":20
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.167.complete"}, true ] }
        ]
        }
    },
    {
        "questId":169,
        "title":"突破天際的戰鬥力I",
        "desc":"將角色戰鬥力提升至300以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破300",
                "count":300
            }
        ],
        "prize":[
            {
                "type":1,
                "count":300
            }
        ]
    },
    {
        "questId":170,
        "title":"突破天際的戰鬥力II",
        "desc":"將角色戰鬥力提升至500以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破500",
                "count":500
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.169.complete"}, true ] }
        ]
        }
    },
    {
        "questId":171,
        "title":"突破天際的戰鬥力III",
        "desc":"將角色戰鬥力提升至800以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破800",
                "count":800
            }
        ],
        "prize":[
            {
                "type":1,
                "count":800
            },
            {
                "type":2,
                "count":20
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.170.complete"}, true ] }
        ]
        }
    },
    {
        "questId":172,
        "title":"突破天際的戰鬥力IV",
        "desc":"將角色戰鬥力提升至1300以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破1300",
                "count":1300
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1300
            },
            {
                "type":2,
                "count":40
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.171.complete"}, true ] }
        ]
        }
    },
    {
        "questId":173,
        "title":"突破天際的戰鬥力V",
        "desc":"將角色戰鬥力提升至1500以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破1500",
                "count":1500
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1500
            },
            {
                "type":2,
                "count":40
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.172.complete"}, true ] }
        ]
        }
    },
    {
        "questId":174,
        "title":"突破天際的戰鬥力VI",
        "desc":"將角色戰鬥力提升至2000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破2000",
                "count":2000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            },
            {
                "type":2,
                "count":40
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.173.complete"}, true ] }
        ]
        }
    },
    {
        "questId":175,
        "title":"突破天際的戰鬥力VII",
        "desc":"將角色戰鬥力提升至2500以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破2500",
                "count":2500
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            },
            {
                "type":2,
                "count":40
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.174.complete"}, true ] }
        ]
        }
    },
    {
        "questId":176,
        "title":"突破天際的戰鬥力VIII",
        "desc":"將角色戰鬥力提升至3000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破3000",
                "count":3000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            },
            {
                "type":2,
                "count":40
            },
            {
                "type":0,
                "value":612,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.175.complete"}, true ] }
        ]
        }
    },
    {
        "questId":177,
        "title":"突破天際的戰鬥力IX",
        "desc":"將角色戰鬥力提升至4000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破4000",
                "count":4000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":4000
            },
            {
                "type":2,
                "count":60
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.176.complete"}, true ] }
        ]
        }
    },
    {
        "questId":178,
        "title":"突破天際的戰鬥力X",
        "desc":"將角色戰鬥力提升至5000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破5000",
                "count":5000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":5000
            },
            {
                "type":2,
                "count":60
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.177.complete"}, true ] }
        ]
        }
    },
    {
        "questId":179,
        "title":"突破天際的戰鬥力XI",
        "desc":"將角色戰鬥力提升至6000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破6000",
                "count":6000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":6000
            },
            {
                "type":2,
                "count":60
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.178.complete"}, true ] }
        ]
        }
    },
    {
        "questId":180,
        "title":"突破天際的戰鬥力XII",
        "desc":"將角色戰鬥力提升至7000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破7000",
                "count":7000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":7000
            },
            {
                "type":2,
                "count":60
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.179.complete"}, true ] }
        ]
        }
    },
    {
        "questId":181,
        "title":"突破天際的戰鬥力XIII",
        "desc":"將角色戰鬥力提升至9000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破9000",
                "count":9000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":9000
            },
            {
                "type":2,
                "count":60
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.180.complete"}, true ] }
        ]
        }
    },
    {
        "questId":182,
        "title":"突破天際的戰鬥力XIV",
        "desc":"將角色戰鬥力提升至10000以上",
        "objects":[
            {
                "type":5,
                "label":"戰鬥力突破10000",
                "count":10000
            }
        ],
        "prize":[
            {
                "type":1,
                "count":10000
            },
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":870,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.181.complete"}, true ] }
        ]
        }
    },
    {
        "questId":183,
        "title":"評分送寶石",
        "desc":"跳轉到商店頁面對我們的遊戲進行評價吧，評價完成之後可以免費獲得100寶石哦！！\n(注：每個玩家只能獲得一次)",
        "objects":[
            {
                "type":6,
                "label":"給遊戲評分",
                "count":1
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.164.complete"}, true ] }
        ]
        }
    },
    {
        "questId":184,
        "questStage":64,
        "title":"探索死靈洞穴I",
        "desc":"對死靈洞穴I進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴I",
                "collect":184001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.124.complete"}, true ] }
        ]
        }
    },
    {
        "questId":185,
        "questStage":65,
        "title":"探索死靈洞穴II",
        "desc":"對死靈洞穴II進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴II",
                "collect":185001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.184.complete"}, true ] }
        ]
        }
    },
    {
        "questId":186,
        "questStage":66,
        "title":"探索死靈洞穴III",
        "desc":"對死靈洞穴III進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴III",
                "collect":186001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.185.complete"}, true ] }
        ]
        }
    },
    {
        "questId":187,
        "questStage":67,
        "title":"探索死靈洞穴IV",
        "desc":"對死靈洞穴IV進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴IV",
                "collect":187001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.186.complete"}, true ] }
        ]
        }
    },
    {
        "questId":188,
        "questStage":68,
        "title":"探索死靈洞穴V",
        "desc":"對死靈洞穴V進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴V",
                "collect":188001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.187.complete"}, true ] }
        ]
        }
    },
    {
        "questId":189,
        "questStage":69,
        "title":"探索死靈洞穴VI",
        "desc":"對死靈洞穴VI進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索死靈洞穴VI",
                "collect":189001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.188.complete"}, true ] }
        ]
        }
    },
    {
        "questId":190,
        "questStage":70,
        "title":"宗師的試煉",
        "desc":"死靈洞穴深處出現神秘人，前往調查",
        "objects":[
            {
                "type":0,
                "label":"調查神秘人",
                "collect":190001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2500
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.189.complete"}, true ] }
        ]
        },
        "startDialogue":70,
        "endDialogue":72
    },
    {
        "questId":191,
        "questStage":71,
        "title":"探索塔卡宮殿I",
        "desc":"對塔卡宮殿I進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿I",
                "collect":191001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.190.complete"}, true ] }
        ]
        }
    },
    {
        "questId":192,
        "questStage":72,
        "title":"探索塔卡宮殿II",
        "desc":"對塔卡宮殿II進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿II",
                "collect":192001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.191.complete"}, true ] }
        ]
        }
    },
    {
        "questId":193,
        "questStage":73,
        "title":"探索塔卡宮殿III",
        "desc":"對塔卡宮殿III進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿III",
                "collect":193001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.192.complete"}, true ] }
        ]
        }
    },
    {
        "questId":194,
        "questStage":74,
        "title":"探索塔卡宮殿IV",
        "desc":"對塔卡宮殿IV進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿IV",
                "collect":194001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.193.complete"}, true ] }
        ]
        }
    },
    {
        "questId":195,
        "questStage":75,
        "title":"探索塔卡宮殿V",
        "desc":"對塔卡宮殿V進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿V",
                "collect":195001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.194.complete"}, true ] }
        ]
        }
    },
    {
        "questId":196,
        "questStage":76,
        "title":"探索塔卡宮殿VI",
        "desc":"對塔卡宮殿VI進行探索",
        "objects":[
            {
                "type":0,
                "label":"探索塔卡宮殿VI",
                "collect":196001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.195.complete"}, true ] }
        ]
        }
    },
    {
        "questId":197,
        "questStage":77,
        "title":"卡塔討伐",
        "desc":"將領主卡塔擊敗，給大陸帶來和平",
        "objects":[
            {
                "type":0,
                "label":"擊敗卡塔",
                "collect":197001,
                "count":1
            }
        ],
        "prize":[
            {
                "type":1,
                "count":3000
            },
            {
                "type":2,
                "count":100
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.196.complete"}, true ] }
        ]
        },
        "endDialogue":75
    },
    {
        "questId":198,
        "title":"冒險征途的里程碑VI",
        "desc":"將角色升至25級",
        "objects":[
            {
                "type":4,
                "label":"升級至25級",
                "count":25
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.168.complete"}, true ] }
        ]
        }
    },
    {
        "questId":199,
        "title":"冒險征途的里程碑VII",
        "desc":"將角色升至30級",
        "objects":[
            {
                "type":4,
                "label":"升級至30級",
                "count":30
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.198.complete"}, true ] }
        ]
        }
    },
    {
        "questId":200,
        "title":"冒險征途的里程碑VIII",
        "desc":"將角色升至35級",
        "objects":[
            {
                "type":4,
                "label":"升級至35級",
                "count":35
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.199.complete"}, true ] }
        ]
        }
    },
    {
        "questId":201,
        "title":"冒險征途的里程碑IX",
        "desc":"將角色升至40級",
        "objects":[
            {
                "type":4,
                "label":"升級至40級",
                "count":40
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.200.complete"}, true ] }
        ]
        }
    },
    {
        "questId":202,
        "title":"冒險征途的里程碑X",
        "desc":"將角色升至45級",
        "objects":[
            {
                "type":4,
                "label":"升級至45級",
                "count":45
            }
        ],
        "prize":[
            {
                "type":2,
                "count":50
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.201.complete"}, true ] }
        ]
        }
    },
    {
        "questId":203,
        "title":"冒險征途的里程碑XI",
        "desc":"將角色升至50級",
        "objects":[
            {
                "type":4,
                "label":"升級至50級",
                "count":50
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.202.complete"}, true ] }
        ]
        }
    },
    {
        "questId":204,
        "title":"冒險征途的里程碑XII",
        "desc":"將角色升至55級",
        "objects":[
            {
                "type":4,
                "label":"升級至55級",
                "count":55
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.203.complete"}, true ] }
        ]
        }
    },
    {
        "questId":205,
        "title":"冒險征途的里程碑XIII",
        "desc":"將角色升至60級",
        "objects":[
            {
                "type":4,
                "label":"升級至60級",
                "count":60
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.204.complete"}, true ] }
        ]
        }
    },
    {
        "questId":206,
        "title":"冒險征途的里程碑XIV",
        "desc":"將角色升至65級",
        "objects":[
            {
                "type":4,
                "label":"升級至65級",
                "count":65
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.205.complete"}, true ] }
        ]
        }
    },
    {
        "questId":207,
        "title":"冒險征途的里程碑XV",
        "desc":"將角色升至70級",
        "objects":[
            {
                "type":4,
                "label":"升級至70級",
                "count":70
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.206.complete"}, true ] }
        ]
        }
    },
    {
        "questId":208,
        "title":"冒險征途的里程碑XVI",
        "desc":"將角色升至75級",
        "objects":[
            {
                "type":4,
                "label":"升級至75級",
                "count":75
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.207.complete"}, true ] }
        ]
        }
    },
    {
        "questId":209,
        "title":"冒險征途的里程碑XVII",
        "desc":"將角色升至80級",
        "objects":[
            {
                "type":4,
                "label":"升級至80級",
                "count":80
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.208.complete"}, true ] }
        ]
        }
    },
    {
        "questId":210,
        "title":"冒險征途的里程碑XVIII",
        "desc":"將角色升至85級",
        "objects":[
            {
                "type":4,
                "label":"升級至85級",
                "count":85
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.209.complete"}, true ] }
        ]
        }
    },
    {
        "questId":211,
        "title":"冒險征途的里程碑XIX",
        "desc":"將角色升至90級",
        "objects":[
            {
                "type":4,
                "label":"升級至90級",
                "count":90
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.210.complete"}, true ] }
        ]
        }
    },
    {
        "questId":212,
        "title":"冒險征途的里程碑XX",
        "desc":"將角色升至95級",
        "objects":[
            {
                "type":4,
                "label":"升級至95級",
                "count":95
            }
        ],
        "prize":[
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.211.complete"}, true ] }
        ]
        }
    },
    {
        "questId":213,
        "title":"冒險征途的里程碑XXI",
        "desc":"將角色升至100級",
        "objects":[
            {
                "type":4,
                "label":"升級至100級",
                "count":100
            }
        ],
        "prize":[
            {
                "type":2,
                "count":150
            },
            {
                "type":0,
                "value":539,
                "count":1
            }
        ],
        "cond":
        { "and": [
            { "==": [ { "type": "getProperty", "key": "quests.212.complete"}, true ] }
        ]
        }
    }
]
