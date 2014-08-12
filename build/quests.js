exports.data = [
    {
        "questId":0,
        "title":"劫后逢生",
        "desc":"传说中的魔龙再次出现，混沌的黑暗将再度降临，做好准备迎接挑战",
        "objects":[
            {
                "type":0,
                "label":"与魔龙交战，并且死里逃生。",
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
        "title":"找到汤姆大叔",
        "desc":"一直找不到汤姆大叔，听村民说见他去了【多姆洞穴I】，赶紧去看看吧。",
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
        }
        ,
        "endDialogue":11
    },{
            "questId":1,
            "title":"找到汤姆大叔的女儿",
            "desc":"听说汤姆大叔的女儿去了【多姆洞穴I】，赶紧去看看吧。",
            "objects":[
                {
                    "type":0,
                    "label":"找到汤姆大叔的女儿",
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
            }
            ,

            "endDialogue":30
        }]},
    {
        "questId":2,
        "title":"讨伐没节操史莱姆",
        "desc":"黏糊糊史莱姆卷土重来，害的村里妹子们都不敢出门，实在太没节操了，赶紧去【多姆洞穴II】干掉它！",
        "objects":[
            {
                "type":0,
                "label":"击倒黏糊糊史莱姆【BOSS】",
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
        }
        ,
        "endDialogue":17
    },
    {
        "questId":3,
        "title":"驱逐野狼",
        "desc":"野狼又到发情期了，整晚叫唤让人怎么睡？！为村民们驱赶野狼吧！",
        "objects":[
            {
                "type":0,
                "label":"击杀10只野狼",
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
        "title":"摊上大事了？！",
        "desc":"还记得不经意间被你打跑的猥琐哥布林吗？他爸可是酋长哥布林！现在他们要带哥布林村管大队来报仇，目前正在【多姆洞穴III】集结同伴。",
        "objects":[
            {
                "type":0,
                "label":"击败哥布林酋长【BOSS】",
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
        }
        ,
        "endDialogue":12
    },
    {
        "questId":5,
        "title":"寻找卡姆矿石",
        "desc":"山姆大叔想要一些卡姆矿石，在【多姆洞穴III】储量比较丰富哦",
        "objects":[
            {
                "type":0,
                "label":"采集3枚卡姆矿石",
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
        "title":"清理残余哥布林部队",
        "desc":"挫败了哥布林先锋部队，现在是扫荡残余部队的时候了！",
        "objects":[
            {
                "type":0,
                "label":"击败哥布林15只",
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
    "title":"寻找走失的村民",
    "desc":"卡琳为了帮父亲采药去了【多姆洞穴IV】，一直没回来，赶紧去把她找回来吧！",
    "objects":[
        {
            "type":0,
            "label":"寻找村民卡琳",
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
        "title":"寻找神奇草药",
        "desc":"答应卡琳帮她在【多姆洞穴IV】中，寻找到医治父亲的神奇草药。",
        "objects":[
            {
                "type":0,
                "label":"采集3株神奇草药",
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
        "title":"剿灭哥布林部落",
        "desc":"是时候给他们致命一击了，立刻前往【多姆洞穴IV】击败他们吧",
        "objects":[
            {
                "type":0,
                "label":"击倒哥布林酋长【BOSS】",
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
        "title":"寻找高阶卡姆矿石",
        "desc":"通过对卡姆矿石的研究，山姆大叔觉得能够得到在【多姆洞穴IV】的高纯度矿石，就能制作出给力装备！",
        "objects":[
            {
                "type":0,
                "label":"采集5枚高阶卡姆矿石",
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
        "title":"找到卡姆结晶",
        "desc":"在【多姆洞穴IV】发现卡姆矿石结晶，不过被黏糊糊史莱姆吞下去了，趁被它消化前，赶紧去夺过来！",
        "objects":[
            {
                "type":0,
                "label":"击倒黏糊糊史莱姆【BOSS】",
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
        "title":"哥布林野狼联手？",
        "desc":"哥布林和野狼勾结起来，似乎想对村子进行报复，赶紧去【多姆洞穴V】看看吧",
        "objects":[
            {
                "type":0,
                "label":"击败哥布林狼骑手【BOSS】",
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
        "title":"救出昔日的小伙伴们",
        "desc":"村民看到狼骑手抓住了一个战士和一个法师，目前正在【多姆洞穴VI】，去救他们吧！",
        "objects":[
            {
                "type":0,
                "label":"找到受困的小伙伴",
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
        }
        ,
        "startDialogue":13
    },
    {
        "questId":14,
        "title":"寻找小伙伴的牧师",
        "desc":"被捉的小伙伴果然不是凯瑟琳和卡尔，不过他们一同组队的牧师目前还在【多姆洞穴VI】迷路中",
        "objects":[
            {
                "type":0,
                "label":"找到小伙伴的牧师",
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
        "desc":"将【多姆洞穴VII】中的史莱姆击倒，给村庄带来安宁。",
        "objects":[
            {
                "type":0,
                "label":"击倒巨型史莱姆【BOSS】",
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
        "title":"史莱姆清道夫",
        "desc":"【多姆洞穴VII】史莱姆们又开始集结了，再次前往打败它们。",
        "objects":[
            {
                "type":0,
                "label":"击倒大史莱姆【BOSS】",
                "collect":15001,
                "count":1
            },{
                "type":0,
                "label":"击败史莱姆",
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
        "title":"探索密谋森林",
        "desc":"搜索【密谋森林I】寻找相关线索",
        "objects":[
            {
                "type":0,
                "label":"探索【密谋森林I】",
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
        "title":"走丢的雪莉",
        "desc":"雪莉去【密谋森林I】就再也没人见过了，帮村民们去找找吧",
        "objects":[
            {
                "type":0,
                "label":"找到雪莉",
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
        "title":"狼骑的逆袭",
        "desc":"没有得到教训的狼骑又想卷土重来，去【密谋森林II】击溃它们！",
        "objects":[
            {
                "type":0,
                "label":"击倒狼骑【BOSS】",
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
        "title":"不规矩的兽族兵",
        "desc":"兽族兵越来越猖狂，阻止它们对村庄造成巨大的伤害！",
        "objects":[
            {
                "type":0,
                "label":"讨伐兽族兵",
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
        "title":"兽族一锅端",
        "desc":"【密谋森林III】中发现有兽族在建哨站，似乎在盘算着什么阴谋！",
        "objects":[
            {
                "type":0,
                "label":"击败兽族投斧手【BOSS】",
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
        "title":"圣灵草",
        "desc":"又到圣灵草生长的季节，这只在【密谋森林III】中生长的草药，是村庄中最常用的医疗用品。",
        "objects":[
            {
                "type":0,
                "label":"收集圣灵草",
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
        "title":"火焰史莱姆！？",
        "desc":"凶猛的火焰史莱姆出现在【密谋森林IV】中，已经袭击了不少村民了，赶紧去击败它！",
        "objects":[
            {
                "type":0,
                "label":"击倒火焰史莱姆【BOSS】",
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
        "title":"火焰魔法结晶",
        "desc":"【密谋森林IV】中的火焰史莱姆的出现，产生了蕴含火焰力量的结晶，采集回来给汤姆大叔瞧瞧。",
        "objects":[
            {
                "type":0,
                "label":"收集火焰魔法结晶",
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
        "title":"灭虫大行动",
        "desc":"紫毒狼蛛们开始躁动不安了，到处都是它们的蜘蛛网，赶紧为民除害吧！",
        "objects":[
            {
                "type":0,
                "label":"讨伐紫毒狼蛛群",
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
        "title":"再战火焰史莱姆",
        "desc":"上次的火焰史莱姆一役没有将它彻底清除，现在它又恢复了，就在【密谋森林V】！",
        "objects":[
            {
                "type":0,
                "label":"击倒火焰史莱姆【BOSS】",
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
        "questStage":12,
        "title":"寻找武器锻造学徒",
        "desc":"汤姆大叔的学徒为了寻找锻造材料一个人去了【密谋森林VI】！情况可能非常危险，去把他找回来吧！",
        "objects":[
            {
                "type":0,
                "label":"找到汤姆大叔的学徒",
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
        "title":"收集锻造素材",
        "desc":"为汤姆大叔的学徒找到血狼的牙齿",
        "objects":[
            {
                "type":0,
                "label":"收集40个血狼牙",
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
        "questStage":12,
        "title":"寻找密谋森林的最深层入口",
        "desc":"成功通过【密谋森林VI】寻找到最深处的入口",
        "objects":[
            {
                "type":0,
                "label":"成功突破【密谋森林VI】",
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
        "questStage":13,
        "title":"解放密谋森林",
        "desc":"将【密谋森林VII】深处的怪物击败，为森林带来宁静",
        "objects":[
            {
                "type":0,
                "label":"击败食人魔怪【BOSS】",
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
        "questStage":13,
        "title":"食人魔终结者",
        "desc":"将【密谋森林VII】中的大小食人魔击倒！",
        "objects":[
            {
                "type":0,
                "label":"击败食人魔怪【BOSS】",
                "collect":30001,
                "count":1
            },
            {
                "type":0,
                "label":"击败食人魔",
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
        "desc":"【湖滨大道I】出现了一伙山贼，找到并击倒他们！",
        "objects":[
            {
                "type":0,
                "label":"击败山贼【BOSS】",
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
        "title":"救出商队成员",
        "desc":"商队在途经【湖滨大道II】时受到山贼的袭击，其中一个成员被抓走了，帮商队救出他吧！",
        "objects":[
            {
                "type":0,
                "label":"救出商队成员",
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
        "title":"商队守卫者I",
        "desc":"【湖滨大道II】上也出现了不少佣兵打劫商团，商团们肃清道路吧！",
        "objects":[
            {
                "type":0,
                "label":"将【湖滨大道II】的佣兵扫清",
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
        "title":"找寻失踪的宝箱",
        "desc":"商队成员救回了，不过一起的宝箱还没找到，前往【湖滨大道II】替他们找回宝箱。",
        "objects":[
            {
                "type":0,
                "label":"找回商队的宝箱",
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
        "desc":"食人魔出没在湖滨大道附近袭击商队，将它们赶走！",
        "objects":[
            {
                "type":0,
                "label":"讨伐食人魔",
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
        "title":"商队守卫者II",
        "desc":"肃清【湖滨大道III】上掠夺商队的坏人们！",
        "objects":[
            {
                "type":0,
                "label":"将【湖滨大道III】的佣兵扫清",
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
        "desc":"【湖滨大道III】出现了一只迷之怪物，袭击商队，并且抢走大量宝物。",
        "objects":[
            {
                "type":0,
                "label":"讨伐迷之怪物",
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
        "title":"矿石收集者",
        "desc":"商队带着数种神秘矿石来给汤姆大叔，不过在湖滨大道遇到山贼弄丢了，为汤姆大叔找回矿石。",
        "objects":[
            {
                "type":0,
                "label":"找到神秘矿石1",
                "collect":39001,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘矿石2",
                "collect":39002,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘矿石3",
                "collect":39003,
                "count":1
            },
            {
                "type":0,
                "label":"找到神秘矿石4",
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
        "title":"最讨厌弓箭！",
        "desc":"使用弓箭的游侠成了湖滨大道上商队的最大威胁，为保护商队的安全，击溃他们！",
        "objects":[
            {
                "type":0,
                "label":"击杀游侠",
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
        "title":"凑热闹的史莱姆",
        "desc":"原本宁静的【湖滨大道IV】，现在连史莱姆也来凑热闹，一并清除它们！",
        "objects":[
            {
                "type":0,
                "label":"击杀火焰史莱姆【BOSS】",
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
        "desc":"迷之怪物这回出现在了【湖滨大道IV】，趁它还没跑走，速度去击败它！",
        "objects":[
            {
                "type":0,
                "label":"击杀迷之怪物【BOSS】",
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
        "title":"找回商队宝箱",
        "desc":"迷之怪物已经被击倒，但商队的宝箱还在【湖滨大道IV】，去帮他们找回来吧。",
        "objects":[
            {
                "type":0,
                "label":"商队宝箱",
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
        "title":"迎头痛击",
        "desc":"山贼团伙出现在了【湖滨大道V】，前往那里给他们迎头一击！",
        "objects":[
            {
                "type":0,
                "label":"击倒山贼头目【BOSS】",
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
        "title":"救回雪莉",
        "desc":"山贼们为了报仇，把雪莉抓走了，目前他们在【湖滨大道VI】集结，赶紧把她救回来！",
        "objects":[
            {
                "type":0,
                "label":"救出雪莉",
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
        "title":"剿灭山贼",
        "questStage":20,
        "desc":"山贼头目和残党逃去了【湖滨大道VI】，将他们彻底赶走吧！",
        "objects":[
            {
                "type":0,
                "label":"击倒山贼头目【BOSS】",
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
        "title":"肃清商旅道路",
        "desc":"商旅道路上只剩下佣兵们在作乱了，把【湖滨大道VII】的佣兵们彻底肃清！",
        "objects":[
            {
                "type":0,
                "label":"击倒游侠兵长【BOSS】",
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
        "title":"佣兵双煞",
        "desc":"游侠兵长与流浪剑士一起出现了，前往【湖滨大道VII】击倒佣兵双煞！",
        "objects":[
            {
                "type":0,
                "label":"击倒游侠兵长【BOSS】",
                "collect":47001,
                "count":1
            },
            {
                "type":0,
                "label":"击倒流浪剑士【BOSS】",
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
        "title":"探索旋风谷",
        "desc":"前往【旋风谷I】探索，并击倒那里的怪物头领",
        "objects":[
            {
                "type":0,
                "label":"击倒死灰哥布林投矛手【BOSS】",
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
        "title":"给人添麻烦的考古学家",
        "desc":"顽固的考古学家去了【旋风谷II】考古，近期那边异常危险，去找到他并护送出来。",
        "objects":[
            {
                "type":0,
                "label":"找到考古学家",
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
        "title":"考古学家的委托",
        "desc":"旋风谷是曾经的古战场，因此有大量骷髅尸体，收集骷髅来做考古素材吧。",
        "objects":[
            {
                "type":0,
                "label":"收集骷髅",
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
        "title":"金色食人魔之谜",
        "desc":"有人在【旋风谷II】目击了金色的食人魔，或许就是那边近期异常的根源，前去调查一下吧。",
        "objects":[
            {
                "type":0,
                "label":"击倒金色食人魔【BOSS】",
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
        "title":"金色食人魔之谜II",
        "desc":"另一只金色食人魔目前正在【旋风谷III】徘徊，为保护大家安全，前去击倒它",
        "objects":[
            {
                "type":0,
                "label":"击倒金色食人魔【BOSS】",
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
        "title":"风之草",
        "desc":"【旋风谷III】中生长着一种名叫风之草的草药，商队目前急缺这种草药，拜托你去帮忙采集。",
        "objects":[
            {
                "type":0,
                "label":"收集风之草",
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
        "title":"风之秘宝",
        "desc":"风之草的药效没有完全激发出来，需要配合【旋风谷III】中的风之秘宝，前往那里找到并带回给商队。",
        "objects":[
            {
                "type":0,
                "label":"收集风之秘宝",
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
        "title":"秘宝小偷",
        "desc":"风之秘宝不在宝箱中，似乎被偷走了，继续搜寻秘宝的下落。",
        "objects":[
            {
                "type":0,
                "label":"找到风之秘宝",
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
        "title":"野兽集结I",
        "desc":"哥布林们在【旋风谷IV】中集结，非常可疑，前去调查。",
        "objects":[
            {
                "type":0,
                "label":"调查旋风谷IV",
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
        "title":"采集风之结晶",
        "desc":"汤姆大叔需要风之结晶可以在【旋风谷IV】中找到",
        "objects":[
            {
                "type":0,
                "label":"采集风之结晶",
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
        "title":"狼骑的复仇",
        "desc":"此前击溃了死灰狼骑的阴谋，这次它们为了报复把卡琳抓去了【旋风谷IV】。",
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
        "title":"野兽集结II",
        "desc":"死灰狼骑再度出现在【旋风谷V】，野兽们蠢蠢欲动，情况非常紧急。",
        "objects":[
            {
                "type":0,
                "label":"击倒死灰狼骑【BOSS】",
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
        "desc":"旋风谷中出现大量哥布林，率先剿灭死灰哥布林投矛手，给它们造成打击。",
        "objects":[
            {
                "type":0,
                "label":"击倒死灰哥布林投矛手",
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
        "title":"野兽集结III",
        "desc":"野兽们在【旋风谷VI】做最后的抵抗，前去击倒它们。",
        "objects":[
            {
                "type":0,
                "label":"将旋风谷VI的野兽清除",
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
        "title":"野兽们的幕后黑手",
        "desc":"终于找到幕后黑手了，正是躲在【旋风谷VII】的狂暴哥布林，打败它平息这场混乱吧。",
        "objects":[
            {
                "type":0,
                "label":"击倒狂暴哥布林投矛手【BOSS】",
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
        "title":"肃清残余部队",
        "desc":"将【旋风谷VII】的残余部队全部剿灭",
        "objects":[
            {
                "type":0,
                "label":"击倒狂暴哥布林投矛手【BOSS】",
                "collect":63001,
                "count":1
            },
            {
                "type":0,
                "label":"击倒死灰哥布林投矛手【BOSS】",
                "collect":64001,
                "count":1
            },
            {
                "type":0,
                "label":"击倒死灰狼骑【BOSS】",
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
        "title":"欢迎来到大草原",
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
        "title":"铲除在这些讨厌的佣兵",
        "desc":"暮色平原出现了大量流浪的佣兵，将他们打倒。",
        "objects":[
            {
                "type":0,
                "label":"击倒流浪剑士",
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
        "title":"霸气的蓝裤衩",
        "desc":"【暮色平原II】出现了穿着蓝裤衩的山贼头目，到处打劫，赶紧去击倒这个蓝裤衩吧！",
        "objects":[
            {
                "type":0,
                "label":"击倒蓝裤衩山贼头目【BOSS】",
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
        "title":"这次是小蓝帽哦！",
        "desc":"蓝帽游侠包围了整个暮色平原，再下去情况将很危险。",
        "objects":[
            {
                "type":0,
                "label":"击倒蓝帽游侠",
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
        "title":"暮色前哨战",
        "desc":"佣兵们在【暮色平原III】建立了前哨战，前去看看情况。",
        "objects":[
            {
                "type":0,
                "label":"通过暮色平原III",
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
        "desc":"佣兵抓走大量村民做人质，前去【暮色平原III】的前哨战搭救他们。",
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
        "title":"剿灭佣兵残党",
        "desc":"前哨战的残党聚集在了【暮色平原IV】，将他们彻底铲除！",
        "objects":[
            {
                "type":0,
                "label":"剿灭佣兵残党",
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
        "title":"翡翠突击",
        "desc":"【暮色平原V】上出现了翡翠史莱姆，专门躲在草丛中袭击村民。",
        "objects":[
            {
                "type":0,
                "label":"击倒翡翠史莱姆【BOSS】",
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
        "title":"翠绿怪兽",
        "desc":"【暮色平原V】出现了翠绿色的野兽，异常可怕。",
        "objects":[
            {
                "type":0,
                "label":"击倒翠绿怪兽【BOSS】",
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
        "desc":"【暮色平原VI】同时出现两只翡翠史莱姆，趁变更多之前消灭它们吧。",
        "objects":[
            {
                "type":0,
                "label":"击倒翡翠史莱姆【BOSS】",
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
        "title":"斗狼之魂",
        "desc":"【暮色平原VII】聚集着大量斗狼，似乎传说中的斗狼之魂即将降临。",
        "objects":[
            {
                "type":0,
                "label":"击倒斗狼之魂【BOSS】",
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
        "title":"野兽共斗",
        "desc":"将【暮色平原VII】上的两大怪物击倒。",
        "objects":[
            {
                "type":0,
                "label":"击倒斗狼之魂【BOSS】",
                "collect":75001,
                "count":1
            },
            {
                "type":0,
                "label":"击倒翡翠野兽【BOSS】",
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
        "title":"探索兽人营地",
        "desc":"探索【野蛮哨站I】。",
        "objects":[
            {
                "type":0,
                "label":"探索野蛮哨站I",
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
        "title":"扫清障碍",
        "desc":"野蛮哨站中的侦察兵黄色哥布林，阻碍了探索的进程，先扫清一下障碍吧。",
        "objects":[
            {
                "type":0,
                "label":"击倒黄色哥布林",
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
        "title":"击破部落哨岗",
        "desc":"将【野蛮哨站II】的前哨岗给击破，保证探查工作的进行",
        "objects":[
            {
                "type":0,
                "label":"击破野蛮哨站II",
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
        "title":"找回走失的杰克",
        "desc":"杰克一人去了【野蛮哨站II】找寻自己的父亲，至今没有音讯，前去看看。",
        "objects":[
            {
                "type":0,
                "label":"找到杰克",
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
        "title":"野蛮哨站的异动",
        "desc":"兽族小队长银灵狼骑兵目前在【野蛮哨站III】，前去探查情况。",
        "objects":[
            {
                "type":0,
                "label":"击倒银灵狼骑兵【BOSS】",
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
        "title":"神秘的佣兵",
        "desc":"在【野蛮哨站III】出现神秘的佣兵剑士，难道和杰克的父亲有什么关系？",
        "objects":[
            {
                "type":0,
                "label":"击倒佣兵剑士【BOSS】",
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
        "title":"野蛮哨站调查令I",
        "desc":"前往【野蛮哨站IV】进行深入调查，寻找神秘的佣兵。",
        "objects":[
            {
                "type":0,
                "label":"通过野蛮哨站IV",
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
        "title":"考古调查",
        "desc":"野蛮哨站出现了大量不死骷髅，收集残骸来给考古学家吧。",
        "objects":[
            {
                "type":0,
                "label":"收集大刀骷髅残骸",
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
        "title":"哥布林酋长的威胁",
        "desc":"哥布林们已经觉察到我们的探查，哥布林酋长正在【野蛮哨站V】集结部队对我们反击，前去击破它们！",
        "objects":[
            {
                "type":0,
                "label":"击倒哥布林酋长【BOSS】",
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
        "title":"还魂草传说I",
        "desc":"杰克的父亲为了寻找传说中的还魂草，踏上了佣兵之路，听说这种草生长在【野蛮哨站V】附近。",
        "objects":[
            {
                "type":0,
                "label":"收集还魂草",
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
        "title":"野蛮哨站调查令II",
        "desc":"深入调查兽人大本营【野蛮哨站VI】",
        "objects":[
            {
                "type":0,
                "label":"探索野蛮哨站VI",
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
        "title":"还魂草传说II",
        "desc":"杰克的父亲正是此前的佣兵剑士，但似乎失去了之前的记忆，赶紧去【野蛮哨站VI】把他带回来吧！",
        "objects":[
            {
                "type":0,
                "label":"打倒佣兵剑士【BOSS】",
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
        "title":"还魂草传说III",
        "desc":"杰克父亲已经恢复，据说是把迷魂草当成还魂草了，导致失去了理智，去【野蛮哨站VI】把这些害人的植物除尽吧。",
        "objects":[
            {
                "type":0,
                "label":"销毁迷魂草",
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
        "title":"野蛮哨站幕后黑手",
        "desc":"找到了一直潜伏着的剑士，现在躲在【野蛮哨站VII】，前去击败他！",
        "objects":[
            {
                "type":0,
                "label":"击败剑圣",
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
        "title":"挑战野蛮哨站",
        "desc":"【野蛮哨站VII】中的剑圣与兽族联手，你是否能够通过这个挑战？",
        "objects":[
            {
                "type":0,
                "label":"击败剑圣",
                "collect":90001,
                "count":1
            },
            {
                "type":0,
                "label":"击败银斧",
                "collect":91001,
                "count":2
            },
            {
                "type":0,
                "label":"击败金斧",
                "collect":91002,
                "count":2
            },
            {
                "type":0,
                "label":"击败翠灵",
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
        "title":"山贼的节操？",
        "desc":"号称只在山上抢劫的卡斯山贼头目，目前出现在了【断肠崖I】，去给他点教训吧。",
        "objects":[
            {
                "type":0,
                "label":"击败卡斯山贼头目【BOSS】",
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
        "title":"山崖矿石寻找之旅",
        "desc":"断肠崖的独有矿石让汤姆大叔激动不已，收集齐3种矿石给他吧！",
        "objects":[
            {
                "type":0,
                "label":"收集神秘矿石1",
                "collect":93001,
                "count":4
            },
            {
                "type":0,
                "label":"收集神秘矿石2",
                "collect":93002,
                "count":4
            },
            {
                "type":0,
                "label":"收集神秘矿石3",
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
        "title":"矿石结晶",
        "desc":"断肠崖的神秘矿石存在结晶，不过在【断肠崖VI】被强力的怪物守护着，去收集带给汤姆大叔吧！",
        "objects":[
            {
                "type":0,
                "label":"获得神秘矿石结晶",
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
        "title":"山贼的教训！",
        "desc":"卡斯山贼头目在【断肠崖II】招兵买马，看来上次没有尝到教训，再来给他们一记吧！",
        "objects":[
            {
                "type":0,
                "label":"击破断肠崖II",
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
        "title":"小粉红大爱！",
        "desc":"村子里突然流行起了粉红热，赶紧去抓几只粉红狼蛛来当宠物卖，大赚一笔的机会到了！",
        "objects":[
            {
                "type":0,
                "label":"收集粉红狼蛛",
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
        "title":"佣兵剑士的讨伐",
        "desc":"【断肠崖III】上的佣兵剑士，专门抢夺过路行人，比山贼还恶劣，为村民们除害吧！",
        "objects":[
            {
                "type":0,
                "label":"击倒佣兵剑士【BOSS】",
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
        "title":"找回失踪的恋人",
        "desc":"雪莉因为与恋人吵架而一个人去了【断肠崖III】，可能会出事情，赶紧帮忙找回她吧。",
        "objects":[
            {
                "type":0,
                "label":"找到雪莉",
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
        "title":"击破黄金史莱姆",
        "desc":"浑身金色的史莱姆出现在了【断肠崖IV】，异常危险，前去击倒它吧！",
        "objects":[
            {
                "type":0,
                "label":"击倒黄金史莱姆【BOSS】",
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
        "title":"黄金三连星",
        "desc":"金色史莱姆找来小伙伴打算一雪前耻，目前正在【断肠崖IV】，前去击倒它们！",
        "objects":[
            {
                "type":0,
                "label":"击倒黄金史莱姆【BOSS】",
                "collect":99001,
                "count":1
            },
            {
                "type":0,
                "label":"击倒黄金史莱姆小伙伴【BOSS】",
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
        "title":"断肠崖挑战任务I",
        "desc":"前往【断肠崖V】击倒怪物通过关卡。",
        "objects":[
            {
                "type":0,
                "label":"通过断肠崖V",
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
        "title":"断肠崖挑战任务II",
        "desc":"前往【断肠崖VI】击倒怪物通过关卡。",
        "objects":[
            {
                "type":0,
                "label":"通过断肠崖VI",
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
        "title":"断肠崖主人",
        "desc":"断肠崖的主人凶恶山贼守在【断肠崖VII】击倒它向下一个地牢迈进吧！",
        "objects":[
            {
                "type":0,
                "label":"凶恶山贼【BOSS】",
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
        "desc":"【丛林密道I】中出现了一群山贼，将他们的头目拿下！",
        "objects":[
            {
                "type":0,
                "label":"击倒凶恶山贼【BOSS】",
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
        "title":"黄金旋风",
        "desc":"丛林密道中的黄金史莱姆严重泛滥，影响前进，前去驱散掉一部分！",
        "objects":[
            {
                "type":0,
                "label":"击倒黄金史莱姆",
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
        "title":"丛林游击队",
        "desc":"通过【丛林密道II】打倒深处的丛林游击队。",
        "objects":[
            {
                "type":0,
                "label":"通过丛林密道II",
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
        "title":"密林深处的怪物I",
        "desc":"村民在密林遇到了怪物，导致走散，去把他们救出来！",
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
        "title":"密林深处的怪物II",
        "desc":"此前袭击村民的怪物已经锁定行踪，目前在【丛林密道V】，为村民们出口气！",
        "objects":[
            {
                "type":0,
                "label":"击杀密林怪物",
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
        "title":"哥布林的决心I",
        "desc":"最凶恶的地狱哥布林酋长目前在【丛林密道III】，前去击倒它。",
        "objects":[
            {
                "type":0,
                "label":"击倒地狱哥布林酋长【BOSS】",
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
        "title":"哥布林的决心II",
        "desc":"地狱哥布林酋长逃往了【丛林密道IV】，乘胜追击！",
        "objects":[
            {
                "type":0,
                "label":"击倒地狱哥布林酋长【BOSS】",
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
        "title":"来自丛林的挑战I",
        "desc":"哥布林与山贼联手，在【丛林密道V】集结，要对你进行挑战！",
        "objects":[
            {
                "type":0,
                "label":"挑战丛林密道V",
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
        "title":"来自丛林的挑战II",
        "desc":"哥布林与山贼联手，在【丛林密道VI】集结，要对你进行挑战！",
        "objects":[
            {
                "type":0,
                "label":"挑战丛林密道VI",
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
        "title":"找寻小小哥布林",
        "desc":"汤姆大叔家的小小哥布林走丢了，听说混入【旋风谷V】",
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
        "title":"地狱收割者",
        "desc":"将地狱哥布林酋长一举歼灭，不给它们翻身的余地！",
        "objects":[
            {
                "type":0,
                "label":"击杀地狱哥布林酋长",
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
        "desc":"将密林深处的食人魔守卫击倒就能到达巫师营地，前去征服密林吧！",
        "objects":[
            {
                "type":0,
                "label":"击杀食人魔守卫【BOSS】",
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
        "title":"寻找神秘草",
        "desc":"【巫师营地I】中生长着神秘草，具有很大的药用价值。",
        "objects":[
            {
                "type":0,
                "label":"采集神秘草",
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
        "title":"邪恶巫师的助手",
        "desc":"在【巫师营地I】中，巫师助手血色狼骑击倒！",
        "objects":[
            {
                "type":0,
                "label":"击倒血色狼骑【BOSS】",
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
        "title":"兽人压制战",
        "desc":"将巫师营地中的，兽人队长进行清理",
        "objects":[
            {
                "type":0,
                "label":"击倒兽人队长",
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
        "title":"巫师营地调查I",
        "desc":"对【巫师营地II】进行调查",
        "objects":[
            {
                "type":0,
                "label":"调查巫师营地II",
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
        "title":"巫师营地调查II",
        "desc":"对【巫师营地III】进行调查",
        "objects":[
            {
                "type":0,
                "label":"调查巫师营地III",
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
        "title":"巫师营地调查III",
        "desc":"对【巫师营地IV】进行调查",
        "objects":[
            {
                "type":0,
                "label":"调查巫师营地IV",
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
        "title":"巫师营地调查IV",
        "desc":"对【巫师营地V】进行调查",
        "objects":[
            {
                "type":0,
                "label":"调查巫师营地V",
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
        "title":"巫师营地调查V",
        "desc":"对【巫师营地VI】进行调查",
        "objects":[
            {
                "type":0,
                "label":"调查巫师营地VI",
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
        "title":"巫师贴身护卫",
        "desc":"巫师的贴身护卫目前在【巫师营地VII】，击倒他将巫师营地询问巫师下落。",
        "objects":[
            {
                "type":0,
                "label":"击倒巫师护卫【BOSS】",
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
        "title":"巫师的炼制结晶",
        "desc":"巫师的炼金术残余魔力形成结晶，或许是锻造的最佳材料。",
        "objects":[
            {
                "type":0,
                "label":"收集炼制结晶I",
                "collect":125001,
                "count":2
            },
            {
                "type":0,
                "label":"收集炼制结晶II",
                "collect":125002,
                "count":2
            },
            {
                "type":0,
                "label":"收集炼制结晶III",
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
        "title":"血色狼骑追杀令",
        "desc":"将巫师的走狗血色狼骑彻底铲除！",
        "objects":[
            {
                "type":0,
                "label":"击倒血色狼骑",
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
        "title":"被巫师捉走村民的下落",
        "desc":"巫师捉走了大量村民，前去【巫师营地VI】搭救",
        "objects":[
            {
                "type":0,
                "label":"营救村民",
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
        "title":"寻找小伙伴的牧师",
        "desc":"新手牧师被困在地牢里，赶紧前去营救",
        "objects":[
            {
                "type":0,
                "label":"找到小伙伴的牧师",
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
        "title":"驱逐野狼",
        "desc":"野狼又到发情期了，整晚叫唤让人怎么睡？！为村民们驱赶野狼吧！",
        "objects":[
            {
                "type":0,
                "label":"击杀10只野狼",
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
        "title":"讨厌的哥布林",
        "desc":"贱贱的哥布林们真让人讨厌，去把他们赶跑吧！",
        "objects":[
            {
                "type":0,
                "label":"击杀5只哥布林",
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
        "title":"寻找武器锻造学徒",
        "desc":"汤姆大叔的学徒为了寻找锻造材料一个人去了地下城情况可能非常危险，去把他找回来吧！",
        "objects":[
            {
                "type":0,
                "label":"找到汤姆大叔的学徒",
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
        "title":"矿石收集之旅",
        "desc":"汤姆大叔需要卡姆矿石，前往收集",
        "objects":[
            {
                "type":0,
                "label":"收集3枚卡姆矿石",
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
        "title":"闪灵草采集",
        "desc":"前往地下城采集神奇的闪灵草",
        "objects":[
            {
                "type":0,
                "label":"采集5株闪灵草",
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
        "title":"找寻失踪的村民",
        "desc":"好几个村民都失踪了，去把她们找回来吧！",
        "objects":[
            {
                "type":0,
                "label":"找寻失踪的村民",
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
        "title":"寻找被山贼捉走的村民",
        "desc":"寻找被山贼捉走的村民",
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
        "title":"食人魔的困扰",
        "desc":"地下城冒出一批食人魔，太恐怖了，帮大家击倒这些怪物！",
        "objects":[
            {
                "type":0,
                "label":"击倒食人魔",
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
        "title":"古老秘宝",
        "desc":"找到失踪已久的古老秘宝！",
        "objects":[
            {
                "type":0,
                "label":"找到古之秘宝",
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
        "title":"击败暗影狼骑",
        "desc":"击杀暗影狼骑。",
        "objects":[
            {
                "type":0,
                "label":"打倒暗影狼骑",
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
        "title":"考古学家的委托",
        "desc":"将地下城中上古战士骷髅兵击倒，把残骸带给考古学家研究",
        "objects":[
            {
                "type":0,
                "label":"击倒骷髅兵",
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
        "title":"寻找古怪的考古学家",
        "desc":"脾气古怪的考古学家一个人走失在地下城中，去救他出来吧",
        "objects":[
            {
                "type":0,
                "label":"找寻失踪的村民",
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
        "title":"翡翠史莱姆的逆袭",
        "desc":"打倒两坨让人厌恶的翡翠史莱姆",
        "objects":[
            {
                "type":0,
                "label":"打倒翡翠史莱姆",
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
        "title":"城管大队出击",
        "desc":"跟随城管大队一同出击，对盗贼团伙进行扫荡突击！",
        "objects":[
            {
                "type":0,
                "label":"击倒蓝帽盗贼",
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
        "title":"除草行动",
        "desc":"最近一种有毒的植物爆发式增长，趁未对人造成影响之前去清除部分。",
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
        "title":"击败恐怖剑士",
        "desc":"恐怖剑士四处为害，为村民铲除这个恶棍吧！",
        "objects":[
            {
                "type":0,
                "label":"打倒恐怖剑士",
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
        "title":"死灰投斧怪的噩梦",
        "desc":"一群死灰投斧怪出现了，非常烦人，击倒它们！",
        "objects":[
            {
                "type":0,
                "label":"击倒死灰投斧怪",
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
        "title":"采集迷之矿石",
        "desc":"汤姆大叔探测到了一种迷之矿石，前去地下城把这种矿石给采集过来",
        "objects":[
            {
                "type":0,
                "label":"找到迷之矿石",
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
        "title":"击败恶霸山贼",
        "desc":"击杀大恶霸山贼。",
        "objects":[
            {
                "type":0,
                "label":"打倒恶霸山贼",
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
        "desc":"不少村民被血蜘蛛给袭击，前去击倒血蜘蛛！",
        "objects":[
            {
                "type":0,
                "label":"击倒血蜘蛛",
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
        "title":"来自商队的求救信号",
        "desc":"商队遭到了袭击，部分商队成员失踪，帮忙去把他们找回来！",
        "objects":[
            {
                "type":0,
                "label":"救出失踪的商队成员",
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
        "title":"击败地狱哥布林酋长",
        "desc":"将地下城深处的地狱哥布林酋长一举击败",
        "objects":[
            {
                "type":0,
                "label":"打倒地狱哥布林酋长",
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
        "title":"黑色旋风",
        "desc":"有黑色旋风之称的黑牙狼在地下城肆虐，击败它们！",
        "objects":[
            {
                "type":0,
                "label":"击倒黑牙狼",
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
        "title":"多姆村村长的踪迹",
        "desc":"失踪已久的村长大人被人在【多姆洞穴VII】发现，赶紧去把他救回来！",
        "objects":[
            {
                "type":0,
                "label":"救出多姆村村长",
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
    "title":"踏上征程",
    "desc":"击破首个地下城，踏出自己探险的第一步",
    "objects":[
        {
            "type":0,
            "label":"击破首个地下城",
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
        "title":"营救阿雅",
        "desc":"听说铁匠汤姆的女儿去【多姆洞穴I】几天没回来了，赶紧去看看吧。",
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
        "title":"铁匠铺重新开业",
        "desc":"帮助汤姆大叔寻找多姆矿石为铁匠铺重新开业做准备。",
        "objects":[
            {
                "type":0,
                "label":"收集3块多姆矿石",
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
        "title":"讨伐大型史莱姆",
        "desc":"大型史莱姆是个麻烦，赶紧去【多姆洞穴II】干掉它！",
        "objects":[
            {
                "type":0,
                "label":"击倒大型史莱姆【BOSS】",
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
        "title":"黑暗中的利刃",
        "desc":"黑暗中的利刃——哥布林投矛手目前在【多姆洞穴III】胡作非为。",
        "objects":[
            {
                "type":0,
                "label":"击败哥布林投矛手【BOSS】",
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
        "title":"汤姆大叔的请求",
        "desc":"寻找汤姆大叔的铁匠学徒，重振铁匠铺！",
        "objects":[
            {
                "type":0,
                "label":"找到汤姆大叔学徒",
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
        "title":"哥布林投矛手的决心",
        "desc":"哥布林投矛手这次在【多姆洞穴IV】，带上你的小伙伴讨伐它吧！",
        "objects":[
            {
                "type":0,
                "label":"击败哥布林投矛手",
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
        "title":"暗中的邪恶联盟",
        "desc":"有人发现哥布林与野狼携手，在【多姆洞穴V】伺机而动",
        "objects":[
            {
                "type":0,
                "label":"消灭哥布林狼骑",
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
        "title":"调查神秘的黑影",
        "desc":"与卡尔和凯瑟琳一起调查怪物异动的根源",
        "objects":[
            {
                "type":0,
                "label":"调查神秘的黑影",
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
        "title":"解救村长",
        "desc":"村长去往了【多姆洞穴VI】，情况似乎不太妙，前去救出村长！",
        "objects":[
            {
                "type":0,
                "label":"成功营救村长",
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
        "title":"多姆村英雄",
        "desc":"将【多姆洞穴VII】中的史莱姆大王击倒，给村庄带来安宁。",
        "objects":[
            {
                "type":0,
                "label":"击倒巨型史莱姆【BOSS】",
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
        "title":"冒险征途的里程碑I",
        "desc":"将角色升至5级",
        "objects":[
            {
                "type":4,
                "label":"升级至5级",
                "count":5
            }
        ],
        "prize":[
            {
                "type":1,
                "count":500
            }
        ]
    },
    {
        "questId":165,
        "title":"冒险征途的里程碑II",
        "desc":"将角色升至25级",
        "objects":[
            {
                "type":4,
                "label":"升级至25级",
                "count":25
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1000
            },
            {
                "type":0,
                "value":538,
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
        "title":"冒险征途的里程碑III",
        "desc":"将角色升至35级",
        "objects":[
            {
                "type":4,
                "label":"升级至35级",
                "count":35
            }
        ],
        "prize":[
            {
                "type":1,
                "count":1500
            },
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":538,
                "count":5
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
        "title":"冒险征途的里程碑IV",
        "desc":"将角色升至40级",
        "objects":[
            {
                "type":4,
                "label":"升级至40级",
                "count":40
            }
        ],
        "prize":[
            {
                "type":1,
                "count":2000
            },
            {
                "type":2,
                "count":100
            },
            {
                "type":0,
                "value":538,
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
        "title":"冒险征途的里程碑V",
        "desc":"将角色升至45级",
        "objects":[
            {
                "type":4,
                "label":"升级至45级",
                "count":45
            }
        ],
        "prize":[
            {
                "type":2,
                "count":150
            },
            {
                "type":1,
                "count":5000
            },
            {
                "type":0,
                "value":613,
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
        "title":"突破天际的战斗力I",
        "desc":"将角色战斗力提升至300以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破300",
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
        "title":"突破天际的战斗力II",
        "desc":"将角色战斗力提升至500以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破500",
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
        "title":"突破天际的战斗力III",
        "desc":"将角色战斗力提升至800以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破800",
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
        "title":"突破天际的战斗力IV",
        "desc":"将角色战斗力提升至1300以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破1300",
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
        "title":"突破天际的战斗力V",
        "desc":"将角色战斗力提升至1500以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破1500",
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
        "title":"突破天际的战斗力VI",
        "desc":"将角色战斗力提升至2000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破2000",
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
        "title":"突破天际的战斗力VII",
        "desc":"将角色战斗力提升至2500以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破2500",
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
        "title":"突破天际的战斗力VIII",
        "desc":"将角色战斗力提升至3000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破3000",
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
        "title":"突破天际的战斗力IX",
        "desc":"将角色战斗力提升至4000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破4000",
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
        "title":"突破天际的战斗力X",
        "desc":"将角色战斗力提升至5000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破5000",
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
        "title":"突破天际的战斗力XI",
        "desc":"将角色战斗力提升至6000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破6000",
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
        "title":"突破天际的战斗力XII",
        "desc":"将角色战斗力提升至7000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破7000",
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
        "title":"突破天际的战斗力XIII",
        "desc":"将角色战斗力提升至9000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破9000",
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
        "title":"突破天际的战斗力XIV",
        "desc":"将角色战斗力提升至10000以上",
        "objects":[
            {
                "type":5,
                "label":"战斗力突破10000",
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
    }
]
