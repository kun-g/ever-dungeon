exports.data = [
  {
    "skillId": 0,
    "label":"盾墙",
    "icon": "skill-warrior1.png",
    "desc": "用坚实的盾牌来格挡攻击，抵消伤害，格挡次数随等级增加。",
    "slotId": 0,
    "config": {
      "basic" : {
        "spellAction": 2,
        "spellEffect": 45,
        "spellDelay": 0.3
      },
      "targetSelection": {
        "pool": "self"
      },
      "triggerCondition": [
        { "type": "countDown", "cd": 10 }
      ],
      "action": [
        { "type": "installSpell", "spell": 1}
      ],
      "levelConfig": [
        {"level": 1},
        {"level": 2},
        {"level": 3}
      ]
    }
  },
  {
    "skillId": 1,
    "slotId": -1,
    "config": {
      "basic": {
        "buffEffect": 42,
        "spellAction": 4,
        "spellEffect": 46,
        "spellDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onBePhysicalDamage" },
        { "type": "event", "event": "onBePhysicalRangeDamage" },
          { "type": "event", "event": "onBeSpellDamage" },
          { "type": "event", "event": "onBeSpellRangeDamage" },
          { "type": "targetMutex", "mutex": "reinforce" }
      ],
      "availableCondition": [
        { "type": "effectCount" }
      ],
      "action": [
        { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} },
          {"type": "setMyMutex", "mutex": "reinforce", "count": 1 }
      ],
      "levelConfig": [
        {"count": 1},
        {"count": 2},
        {"count": 3}
      ]
    }
  },
  {
    "skillId": 2,
    "label":"援护",
    "icon": "skill-warrior2.png",
    "desc":"战士运用自身厚实的装备保护队友，为其承受伤害，技能等级越高，所受伤害越少。",
    "slotId": 1 ,
    "config": {
      "basic" : {
        "spellAction":4,
        "spellEffect": 9,
        "targetEffect": 1 ,
        "spellDelay": 0,
        "targetDelay": 0
      },
      "targetSelection": {
        "pool": "target",
        "filter": [{"type":"alive"},{"type":"visible"}]
      },
      "triggerCondition": [
        { "type": "event", "event": "onTeammateBePhysicalDamage" },
        { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
        { "type": "chance", "chance": 0.45 },
        { "type": "targetMutex", "mutex": "reinforce" },
          {"type":"alive"}
      ],
      "action": [
        {"type": "modifyVar", "x": "damage" },
        {"type": "setTargetMutex", "mutex": "reinforce", "count": 1 },
        {"type": "setMyMutex", "mutex": "reinforce", "count": 1 },
        {"type": "replaceTar" },
        {"type": "ignoreHurt" }
      ],
      "levelConfig": [
        { "formular": {"environment": {"damage":0.8}} },
        { "formular": {"environment": {"damage":0.7}} },
        { "formular": {"environment": {"damage":0.5}} }
      ]
    }
  },
	{
    "skillId": 3,
    "label": "自愈",
    "icon": "skill-warrior3.png",
    "desc":"战士在受到治疗时，能够获得额外的生命值回复，回复值与韧性值有关。",
    "slotId": 2,
    "config": {
      "basic" : { },
      "triggerCondition": [
        { "type": "event", "event": "onBeHeal" }
      ],
      "targetSelection": {
        "pool": "self",
          "filter": [{"type":"alive"},{"type":"visible"}]
      },
      "action": [
        { "type": "modifyVar", "x": "hp" }
      ],
      "levelConfig" : [
        { "formular": {"tar":{"strong":0.1},"environment": {"hp": 1}, "c": 2} },
        { "formular": {"tar":{"strong":0.1}, "environment": {"hp": 1}, "c": 8} },
        { "formular": {"tar":{"strong":0.15}, "environment": {"hp": 1}, "c": 15} }
      ]
    }
	},
	{
    "skillId": 4,
    "label":"奋勇一击",
    "icon": "skill-warrior4.png",
    "desc":"战士攻击时有一定概率使出全力一击，造成的伤害与生命值有关。",
    "slotId": 3,
    "config": {
      "basic" : {
        "spellEffect": 4,
        "targetEffect": 7,
        "spellDelay": 0.3,
        "targetDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onTarget" },
        { "type": "chance", "chance": 0.15}
      ],
        "targetSelection": {
            "pool": "target"
        },
      "action": [
        { "type": "modifyVar", "x": "damage", "formular": {"src": {"health":0.18,"attack":1}} },
          {"type": "blink","delay":0.3,"time":0.08},
          {"type":"shock","delay":0.3,"range":5,"time":0.2}
      ]
    }
	},
	{
    "skillId": 5,
    "label":"闪电",
    "icon": "skill-mage1.png",
    "desc":"召唤闪电，对一名敌人造成伤害，伤害值与法师攻击力相关。",
    "slotId": 0,
    "config": {
      "basic": {
        "spellAction": 1
      },
      "triggerCondition": [
        { "type": "countDown", "cd": 10 }
      ],
      "targetSelection": {
        "pool": "objects",
        "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
      },
      "action": [
        { "type": "damage","damageType":"Spell","isRange":true,"delay":0.8},
        {"type": "playEffect","effect":44,"act":"self"},
        {"type": "playEffect","effect":0,"act":"target","delay":0.6},
          {"type": "blink","delay":0.6,"time":0.08},
          {"type":"shock","delay":0.6,"range":5,"time":0.2}
      ],
      "levelConfig" : [
        { "formular": {"src":{"attack":0.8}} },
        { "formular": {"src":{"attack":1}} },
        { "formular": {"src":{"attack":1.2}} }
      ]
    }
	},
	{
    "skillId": 6,
    "label":"过载",
    "icon": "skill-mage2.png",
    "desc":"攻击造成暴击时，法师能够施展法术过载，对全体敌人造成伤害，伤害值与攻击力相关。",
    "slotId": 3,
    "config":{
      "basic":{
        "spellEffect": 29,
        "spellDelay": 0.6,
        "targetDelay": 0.9
      },
      "triggerCondition": [
          {"type": "event", "event": "onCriticalDamage" },
          {"type": "chance", "chance": 0.8}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"}]
      },
      "action": [
        {"type": "damage","damageType":"Spell","isRange":true,"formular": {"src":{"attack":0.3},"c":15}},
          {"type": "playEffect","effect":4,"act":"self"}
      ]
    }
	},
	{
    "skillId": 7,
    "label":"炎甲",
    "icon": "skill-mage3.png",
    "desc":"法师使用一层火焰魔法保护自己，当受到攻击时，对敌人造成伤害，伤害值与攻击力有关。",
    "slotId":2,
    "config":{
      "basic":{
        "spellEffect": 32,
        "targetEffect": 10,
        "spellDelay": 0.3,
        "targetDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onBePhysicalDamage" },
        { "type": "chance", "chance": 0.3 }
      ],
      "action": [
        { "type": "damage","damageType":"Spell" }
      ],
      "targetSelection": {
        "pool": "source",
          "filter": [{"type":"alive"},{"type":"visible"}]
      },
      "levelConfig":[
        {"formular": {"src":{"attack":0.2},"c":2}},
        {"formular": {"src":{"attack":0.3},"c":10}},
        {"formular": {"src":{"attack":0.4},"c":15}}
      ]
    }
	},
	{
    "skillId": 8,
    "label":"治愈",
    "icon": "skill-priest1.png",
    "desc":"对队伍中生命值最低的成员进行回复，回复值与命中值相关。",
    "slotId": 0,
    "config": {
      "basic": {
        "spellAction":1,
        "spellEffect": 47,
        "targetEffect": 48,
        "spellDelay": 0.3,
        "targetDelay": 0.7
      },
      "triggerCondition": [
        { "type": "countDown", "cd": 10 }
      ],
      "targetSelection": {
         "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"sort","by":"health"},{"type":"count","count":1}]
      },
      "action": [
        { "type": "heal" }
      ],
      "levelConfig" : [
        {"formular": { "src":{"accuracy":0.15}, "c": 5 }},
        {"formular": { "src":{"accuracy":0.15}, "c": 10 }},
        {"formular": { "src":{"accuracy":0.15}, "c": 20 }}
      ]
    }
	},
	{
    "skillId": 9,
    "label":"宽恕",
    "icon": "skill-priest2.png",
    "desc":"当牧师对敌人造成伤害时，有一定几率能回复我方队友生命值，回复生命值与命中值相关。",
    "slotId": 1,
    "config": {
      "basic": {
        "targetEffect": 3,
        "targetDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onPhysicalDamage" },
        { "type": "chance", "chance":0.6 }
      ],
      "action": [
        { "type": "heal"}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"sort","by":"health"},{"type":"count","count":1}]
      },
      "levelConfig" : [
        { "formular":{"src":{"accuracy":0.1},"c": 3} },
        { "formular":{"src":{"accuracy":0.15},"c": 10} },
        { "formular":{"src":{"accuracy":0.2},"c": 20} }
      ]
    }
	},
	{
    "skillId": 10,
    "label":"救赎",
    "icon": "skill-priest3.png",
    "desc":"牧师成功击杀敌人时，能够有一定概率短时间提升全体成员的攻击力。",
    "slotId": 2,
    "config":{
      "basic":{
        "spellAction": 1,
        "spellEffect": 4,
        "targetEffect": 13,
        "spellDelay": 0.3,
        "targetDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onKill" },
        { "type": "chance", "chance":0.3 }
      ],
      "action": [
            {"type":"delay"},
            {"type": "installSpell", "spell": 14 }
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "levelConfig" : [
        { "level": 1 }, { "level": 2 }, { "level": 3 }
      ]
    }
  },
	{
    "skillId": 11,
    "label":"奇迹之光",
    "icon": "skill-priest4.png",
    "desc":"当我方成员受到致命一击时，牧师能够一定概率召唤奇迹之光，使其吸收此次伤害。",
    "slotId": 3,
    "config": {
      "basic": {
        "spellAction": 1,
        "spellEffect": 4,
        "targetEffect": 33,
        "spellDelay": 0.3,
        "targetDelay": 0.3
      },
      "triggerCondition": [
        { "type": "event", "event": "onTeammateBeDeathStrike" },
        { "type": "event", "event": "onBeDeathStrike" },
          {"type":"alive"},
        { "type": "chance", "chance": 0.4 },
        { "type": "targetMutex", "mutex": "lightOfMiracel" }
      ],
      "targetSelection": {
        "pool": "target",
          "filter": [{"type":"alive"},{"type":"visible"}]
      },
      "action": [
        {"type": "heal", "formular": {"environment":{"damage":1}}},
        {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
        {"type": "setTargetMutex", "mutex": "lightOfMiracel", "count": 1 }
      ]
    }
	},
	{
    "skillId": 12,
    "label":"元素爆发",
    "icon": "skill-mage4.png",
    "desc":"法师每次攻击能够增加自身暴击值，直至造成暴击后清空。",
    "slotId": 1,
    "config":{
      "targetSelection": { "pool": "self" },
      "triggerCondition": [
          { "type": "event", "event": "onCriticalDamage", "count": 1 }
      ],
      "installAction": [
          { "type": "removeSpell", "spell": 33},
          { "type": "installSpell", "spell": 33}
      ],
      "action": [
          { "type": "removeSpell", "spell": 33},
          { "type": "installSpell", "spell": 33}
      ],
      "levelConfig":[{"level":1},{"level":2},{"level":3}]
    }
  },
  {
    "skillId": 13,
    "label":"援护",
    "icon": "skill-warrior2.png",
    "desc":"战士运用自身厚实的装备保护队友，为其承受伤害，技能等级越高，所受伤害越少。",
    "slotId": 1 ,
    "config": {
      "basic" : {
        "spellAction":4,
        "spellEffect": 9,
        "targetEffect": 1 ,
        "spellDelay": 0,
        "targetDelay": 0
      },
      "targetSelection": {
          "pool": "target",
          "filter": [{"type":"alive"},{"type":"visible"}]
      },
      "triggerCondition": [
          { "type": "event", "event": "onTeammateBePhysicalDamage" },
          { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
          { "type": "chance", "chance": 1 },
          {"type":"alive"},
          { "type": "targetMutex", "mutex": "reinforce" }
      ],
      "action": [
        {"type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0.4}} },
        {"type": "setMyMutex", "mutex": "reinforce", "count": 1 },
        {"type": "setTargetMutex", "mutex": "reinforce", "count": 1 },
        {"type": "replaceTar" },
        {"type": "ignoreHurt" }
      ]
    }
  },
  {
    "skillId": 14,
    "config": {
      "installAction": [
        { "type": "setProperty" }
      ],
      "uninstallAction": [
        { "type": "resetProperty" }
      ],
      "buffType":"AttackBuff",
      "availableCondition": [
        { "type": "event", "event": "onBeginBattleTurn", "eventCount": 2 }
      ],
      "levelConfig" : [
        { "modifications": {"attack":{"src":{"attack":0.5},"c":2}}},
        { "modifications": {"attack":{"src":{"attack":0.5},"c":5}}},
        { "modifications": {"attack":{"src":{"attack":0.5},"c":15}}}
      ]
    }
  },
  {
    "skillId": 15,
    "label":"草药",
    "desc":"对生命值最少的队友进行恢复",
    "config": {
      "basic": {
        "targetEffect": 19
      },
      "triggerCondition": [
        {"type" :"card", "id": 0}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"sort","by":"health"},{"type":"count","count":1}]
      },
      "action":[
        {"type": "heal", "formular": {"tar":{"strong":1}, "c":5}},
        {"type": "costCard", "card":0}
      ]
    }
  },
  {
    "skillId": 16,
    "label":"万能药",
    "desc":"恢复一切异常状态",
    "config": {
      "basic": {
        "targetEffect": 14
      },
      "triggerCondition": [
        {"type" :"card", "id": 1}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "action":[
        {"type": "clearDebuff"},
        {"type": "costCard", "card":1}
      ]
    }
  },
  {
    "skillId": 17,
    "label":"复活十字章",
    "desc":"被击倒后重生",
    "config": {
      "basic": {
        "targetEffect": 22
      },
      "triggerCondition": [
        {"type" :"card", "id": 4},
        {"type" :"event", "event": "onTeammateBeKill"},
        {"type" :"event", "event": "onBeKill"}
      ],
      "targetSelection": {
        "pool": "target"
      },
      "action":[
        {"type": "resurrect"},
        {"type": "costCard", "card":4}
      ]
    }
  },
  {
    "skillId": 18,
    "label":"极速之靴",
    "desc":"提升全体回避率",
    "config": {
      "basic": {
        "targetEffect": 16
      },
      "triggerCondition": [
        {"type" :"card", "id": 5}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "action":[
        {"type": "costCard", "card":5},
        {"type":"installSpell", "spell": 22}
      ]
    }
  },
  {
    "skillId": 19,
    "label":"集中药水",
    "desc":"提升全体命中值",
    "config": {
      "basic": {
        "targetEffect": 15
      },
      "triggerCondition": [
        {"type" :"card", "id": 6}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "action":[
        {"type": "costCard", "card":6},
        {"type":"installSpell", "spell": 23}
      ]
    }
  },
  {
    "skillId": 20,
    "label":"怪力药水",
    "desc":"短时间内提升全体攻击力",
    "config": {
      "basic": {
        "targetEffect": 13
      },
      "triggerCondition": [
        {"type" :"card", "id": 7}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "action":[
        {"type": "costCard", "card":7},
        {"type":"installSpell", "spell": 24}
      ]
    }
  },
  {
    "skillId": 21,
    "label":"时间沙漏",
    "desc":"立即恢复技能冷却",
    "config": {
      "basic": {
        "targetEffect": 14
      },
      "triggerCondition": [
        {"type" :"card", "id": 8}
      ],
      "targetSelection": {
          "pool": "objects",
          "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
      },
      "action":[
        {"type": "costCard", "card":8},
        {"type": "resetSpellCD"}
      ]
    }
  },
  {
    "skillId": 22,
    "config": {
      "installAction":[
        { "type": "setProperty",  "modifications": {"reactivity":{"src":{"reactivity":1},"c":40}} }
      ],
      "uninstallAction": [
        { "type": "resetProperty" }
      ],
      "buffType":"RoleBuff",
      "availableCondition": [
        { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
      ]
    }
  },
  {
    "skillId": 23,
    "config": {
      "installAction":[
        { "type": "setProperty",  "modifications": {"accuracy":{"src":{"accuracy":1},"c":40}} }
      ],
      "uninstallAction": [
        { "type": "resetProperty" }
      ],
      "buffType":"RoleBuff",
      "availableCondition": [
        { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
      ]
    }
  },
  {
    "skillId": 24,
    "config": {
      "installAction":[
        { "type": "setProperty",  "modifications": {"attack":{"src":{"attack":1}}} }
      ],
      "uninstallAction": [
        { "type": "resetProperty" }
      ],
      "buffType":"AttackBuff",
      "availableCondition": [
        { "type": "event", "event": "onEndBattleTurn", "eventCount": 1 }
      ]
    }
  },
  {
    "skillId": 25,
    "label":"地牢指针",
    "desc":"立刻显示下一层出口位置",
    "config": {
      "basic": {
        "targetEffect": 14
      },
      "triggerCondition": [
        {"type" :"card", "id": 3}
      ],
      "action":[
        {"type": "costCard", "card":3},
        {"type": "showExit"}
      ]
    }
  },
  { "skillId": 26,
    "label":"远程攻击",
    "config": {
          "triggerCondition": [
              {"type" :"event", "event":"onBattleTurnEnd" },
              {"type" :"event", "event":"onMoveTurnEnd" }
          ],
          "targetSelection": {
              "pool": "objects",
              "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
          },
          "action":[
              {"type": "rangeAttack"}
          ]
      }
  },
  {
    "skillId": 27,
    "label":"直接现身",
    "config": {
        "triggerCondition": [
            {"type":"event", "event":"onEnterLevel" }
        ],
        "targetSelection": {
            "pool": "self"
        },
        "action": [
                {"type": "showUp"}
      ]
    }
  },
  {
      "skillId": 28,
      "label":"传送",
      "config": {
          "triggerCondition": [
              {"type":"event","event":"onBePhysicalDamage"},
              {"type":"event","event":"onBePhysicalRangeDamage"},
              {"type":"event","event":"onBeSpellDamage"},
              {"type":"event","event":"onBeSpellRangeDamage"},
              {"type":"alive"}
          ],
          "targetSelection":{
              "pool":"self",
              "filter": [{"type":"alive"}]
          },
          "action": [
              {"type": "delay"},
              {"type":"playEffect","effect":20,"pos":"self"},
              {"type":"playAction","motion":6,"pos":"self"},
              {"type": "delay"},
              {"type": "randTeleport"},
              {"type": "delay"},
              {"type":"playEffect","effect":21,"pos":"self"},
              {"type":"playAction","motion":5,"pos":"self"}
          ]
      }
  },
  {
      "skillId": 29,
      "label":"束缚",
      "config": {
          "basic": {
              "targetEffect": 17 ,
              "targetDelay": 0.3
          },
          "triggerCondition": [
              {"type":"event","event":"onPhysicalDamage"},
              { "type": "chance", "chance": 0.3 }
          ],
          "targetSelection":{
              "pool":"target",
              "filter": [{"type":"alive"}]
          },
          "action": [
                  {"type": "installSpell","spell": 30}
          ]
      }
  },
  {
      "skillId": 30,
      "config": {
          "installAction":[
              {
                  "type": "setProperty","modifications": {"reactivity":{"src":{"reactivity":-0.5}},"speed":{"src":{"speed":-0.5}}}}
          ],
          "uninstallAction": [
              { "type": "resetProperty" }
          ],
          "buffType":"RoleDebuff",
          "availableCondition": [
              { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
          ]
      }
  },
  {
      "skillId": 31,
        "label":"史莱姆分裂",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onBeKill"}
                ],
            "targetSelection":{
                "pool":"self"
            },
            "action": [{"type": "createMonster","effect":21,"randomPos":true}] ,
            "levelConfig" : [
              { "objectCount":2,"monsterID":19},
              { "objectCount":4,"monsterID":19,"withKey":true},
              { "objectCount":2,"monsterID":51},
              { "objectCount":4,"monsterID":51,"withKey":true},
              { "objectCount":2,"monsterID":83},
              { "objectCount":4,"monsterID":83,"withKey":true},
              { "objectCount":2,"monsterID":115},
              { "objectCount":4,"monsterID":115,"withKey":true}
          ]
      }
  },
  {"skillId": 32,
      "label":"狼骑士",
      "config": {
          "triggerCondition": [
              {"type":"event","event":"onBeKill"}
          ],
          "targetSelection":{
              "pool":"self"
          },
          "action": [{"type": "createMonster"}] ,
          "levelConfig" : [
              { "monsterID":5},
              { "monsterID":22,"withKey":true},
              { "monsterID":37},
              { "monsterID":54,"withKey":true},
              { "monsterID":69},
              { "monsterID":86,"withKey":true},
              { "monsterID":101},
              { "monsterID":118,"withKey":true}
          ]
      }
  },
  {"skillId": 33,
    "config": {
        "action":[
            { "type": "setProperty"}
        ],
        "targetSelection":{ "pool":"Self" },
        "uninstallAction": [
            { "type": "resetProperty" },
            { "type": "shock", "delay":0.3, "range":5, "time":0.2 }
        ],
        "triggerCondition": [
            { "type":"event", "event":"onBeginBattleTurn" }
        ],
        "levelConfig":[
            { "modifications": {"critical":{"c":1}}, "level": 1},
            { "modifications": {"critical":{"c":2}}, "level": 2},
            { "modifications": {"critical":{"c":4}}, "level": 3}
        ]
    }
  },
  { "skillId": 34,
      "label":"先制攻击",
      "config": {
          "triggerCondition": [
              {"type":"event","event":"onShow"}
          ],
          "targetSelection":{
              "pool": "objects",
              "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
          },
          "action": [
              {"type": "attack"}
          ]
      }

  },
  {
      "skillId": 35,
      "label":"落石",
      "config": {
          "basic":{
              "spellAction": 1
          },
          "triggerCondition": [
              {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true }
           ],
          "targetSelection": {
              "pool": "blocks",
              "blocks":[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
              "filter": [{"type":"shuffle"},{"type":"count","count":8}]
          },
          "action":[
              {"type":"installSpell", "spell": 36,"delay":{"base":1.6,"range":3}},
              {"type":"shock","delay":1.6,"range":20,"time":2}
          ]
      }
  },
  { "skillId": 36,
      "config":{
          "installAction":[
              {"type": "damage","damageType":"Spell","isRange":true,"delay":0.4,"formular": {"c":150}},
              {"type": "playEffect","effect":18,"pos":"self"}
          ],
          "targetSelection": {
              "pool": "objects",
              "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
          },
          "availableCondition": [
              { "type": "event", "event": "onTurnEnd" }
          ]
      }
  },
  { "skillId": 37,
      "label":"boss光环",
      "config": {
          "triggerCondition": [
              { "type": "event","event":"onShow" }
          ],
          "targetSelection": {
              "pool": "self",
              "filter": [{"type":"alive"}]
          },
          "action": [
              {"type":"delay" },
              {"type": "playEffect","effect":35,"pos":"self"}
          ]
      }
  },
    {
    "abtest": [
  {
      "skillId": 38,
      "label":"boss战1",
      "config": {
          "triggerCondition": [
              {"type":"event", "event":"onEnterLevel" }
          ],
          "targetSelection": {
              "pool": "self"
          },
          "action": [
              {"type": "delay","delay":0.3},
              {"type":"chainBlock","source":[0,1,2,3,4,5,6,7,8,9,10,11,13,14],"target":12},
              {"type": "kill"},
              {"type":"changeBGM"},
              {"type": "delay"},
              {"type":"playSound","sound":"dragon.mp3"},
              {"type":"dialog","dialogId":3},
              {"type": "delay","delay":1},
              {"type":"shock","delay":0,"range":20,"time":0.9},
              {"type": "delay","delay":0.3},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":0},
              {"type":"openBlock","block":1},
              {"type":"openBlock","block":2},
              {"type":"openBlock","block":3},
              {"type":"openBlock","block":4},
              {"type": "delay","delay":0.3},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":5},
              {"type":"openBlock","block":6},
              {"type":"openBlock","block":7},
              {"type":"openBlock","block":8},
              {"type":"openBlock","block":9},
              {"type": "delay","delay":0.3},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":10},
              {"type":"openBlock","block":11},
              {"type":"openBlock","block":12},
              {"type":"openBlock","block":13},
              {"type":"openBlock","block":14},
              {"type": "delay","delay":0.3},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":15},
              {"type":"openBlock","block":19},
              {"type": "delay","delay":0.3},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":20},
              {"type":"openBlock","block":21},
              {"type":"openBlock","block":22},
              {"type":"openBlock","block":23},
              {"type":"openBlock","block":24},
              {"type": "delay","delay":1.5},
              {"type":"shock","delay":0,"range":20,"time":0.2},
              {"type":"openBlock","block":25},
              {"type":"openBlock","block":26},
              {"type":"openBlock","block":27},
              {"type":"openBlock","block":28},
              {"type":"openBlock","block":29},
              {"type": "delay","delay":1},
              {"type":"playSound","sound":"dragon.mp3"},
              {"type": "delay","delay":8},
              {"type":"createMonster","count":1,"monsterID":133,"pos":12,"collectID":1000},
              {"type":"shock","delay":0.8,"range":10,"time":0.3},
              {"type":"shock","delay":3,"range":10,"time":0.3},
              {"type":"shock","delay":4.7,"range":10,"time":0.3},
              {"type":"shock","delay":5.2,"range":10,"time":0.3},
              {"type":"changeBGM","music":"boss.mp3"},
              {"type": "delay"},
              {"type":"dialog","dialogId":4}
          ]
      }},
        {
            "skillId": 38,
            "label":"boss战1",
            "config": {
                "triggerCondition": [
                    {"type":"event", "event":"onEnterLevel" }
                ],
                "targetSelection": {
                    "pool": "self"
                },
                "action": [
                    {"type": "delay","delay":0.3},
                    {"type":"chainBlock","source":[0,1,2,3,4,5,6,7,8,9,10,11,13,14],"target":12},
                    {"type": "kill"},
                    {"type":"changeBGM"},
                    {"type": "delay"},
                    {"type":"playSound","sound":"dragon.mp3"},
                    {"type": "delay","delay":1},
                    {"type":"shock","delay":0,"range":20,"time":0.9},
                    {"type": "delay","delay":0.3},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":0},
                    {"type":"openBlock","block":1},
                    {"type":"openBlock","block":2},
                    {"type":"openBlock","block":3},
                    {"type":"openBlock","block":4},
                    {"type": "delay","delay":0.3},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":5},
                    {"type":"openBlock","block":6},
                    {"type":"openBlock","block":7},
                    {"type":"openBlock","block":8},
                    {"type":"openBlock","block":9},
                    {"type": "delay","delay":0.3},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":10},
                    {"type":"openBlock","block":11},
                    {"type":"openBlock","block":12},
                    {"type":"openBlock","block":13},
                    {"type":"openBlock","block":14},
                    {"type": "delay","delay":0.3},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":15},
                    {"type":"openBlock","block":19},
                    {"type": "delay","delay":0.3},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":20},
                    {"type":"openBlock","block":21},
                    {"type":"openBlock","block":22},
                    {"type":"openBlock","block":23},
                    {"type":"openBlock","block":24},
                    {"type": "delay","delay":1.5},
                    {"type":"shock","delay":0,"range":20,"time":0.2},
                    {"type":"openBlock","block":25},
                    {"type":"openBlock","block":26},
                    {"type":"openBlock","block":27},
                    {"type":"openBlock","block":28},
                    {"type":"openBlock","block":29},
                    {"type": "delay","delay":1},
                    {"type":"playSound","sound":"dragon.mp3"},
                    {"type": "delay","delay":8},
                    {"type":"createMonster","count":1,"monsterID":133,"pos":12,"collectID":1000},
                    {"type":"shock","delay":0.8,"range":10,"time":0.3},
                    {"type":"shock","delay":3,"range":10,"time":0.3},
                    {"type":"shock","delay":4.7,"range":10,"time":0.3},
                    {"type":"shock","delay":5.2,"range":10,"time":0.3},
                    {"type":"changeBGM","music":"boss.mp3"},
                    {"type": "delay"}
                ]
            }}
    ]
  },{
    "abtest": [
  {
      "skillId": 39,
      "label":"boss战2",
      "config": {
          "triggerCondition": [
              {"type" :"event", "event":"onBeDeathStrike"}
          ],
          "targetSelection": {
              "pool": "self"
          },
          "action":[
              {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
              {"type": "delay","delay":0.3},
              {"type": "delay","delay":2},
              {"type":"castSpell","spell":40},
              {"type": "delay","delay":3},
              {"type":"castSpell","spell":41},
              {"type": "delay","delay":3},
              {"type":"castSpell","spell":42},
              {"type": "delay","delay":2},
              {"type": "collect","collectID":1000},
              {"type": "delay","delay":0.3},
              {"type": "endDungeon","result":2}
          ]
      }
  },{
            "skillId": 39,
            "label":"boss战2",
            "config": {
                "triggerCondition": [
                    {"type" :"event", "event":"onBeDeathStrike"}
                ],
                "targetSelection": {
                    "pool": "self"
                },
                "action":[
                    {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
                    {"type": "delay","delay":0.3},
                    {"type":"dialog","dialogId":5},
                    {"type": "delay","delay":2},
                    {"type":"castSpell","spell":40},
                    {"type": "delay","delay":3},
                    {"type":"dialog","dialogId":6},
                    {"type":"castSpell","spell":41},
                    {"type": "delay","delay":3},
                    {"type":"castSpell","spell":42},
                    {"type": "whiteScreen","time":5,"mode":0,"color":1},
                    {"type":"dialog","dialogId":7},
                    {"type": "collect","collectID":1000},
                    {"type": "delay","delay":0.3},
                    {"type": "endDungeon","result":2}
                ]
            }
        }
    ]
},
  {
      "skillId": 40,
      "label":"龙复活",
      "config": {
          "basic": {
              "spellAction": 3
          },
          "targetSelection": {
              "pool": "self"
          },
          "action":[
              {"type": "blink","delay":0.6,"time":0.08},
              {"type":"shock","delay":0.5,"range":20,"time":2}
          ]
      }
  },
  {
      "skillId": 41,
      "label":"全屏落石",
      "config": {
          "basic":{
              "spellAction": 1

          },
          "targetSelection": {
              "pool": "blocks",
              "blocks":[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
              "filter": [{"type":"shuffle"},{"type":"count","count":8}]
          },
          "action":[
              {"type":"installSpell", "spell": 44,"delay":{"base":1.6,"range":5}},
              {"type":"shock","delay":1.6,"range":20,"time":2}
          ]
      }
  },
  {
      "skillId": 42,
      "label":"龙息",
      "config": {
          "triggerCondition": [
              {"type": "countDown", "cd": 6 },
              {"type" :"event", "event":"onTurnEnd" }
          ],
          "targetSelection": {
              "pool": "objects",
              "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"}]
          },
          "action":[
              {"type": "damage","damageType":"Spell","isRange":true,"delay":3.6,"formular": {"c":50}},
              {"type": "blink","delay":1.7,"time":0.08},
              {"type": "playEffect","effect":10,"pos":"target","delay":3.6} ,
              {"type":"shock","delay":1.6,"range":20,"time":2},
              {"type":"playAction","motion":2,"pos":"self"}
          ]
      }
  },
  {
      "skillId": 43,
      "label":"法师复活",
      "desc":"重生",
      "config": {
          "basic": {
              "spellAction": 1,
              "spellEffect": 4,
              "targetEffect": 1,
              "spellDelay": 0.3,
              "targetDelay": 0.3
          },
          "triggerCondition": [
              { "type": "event", "event": "onTeammateBeDeathStrike" },
              { "type": "event", "event": "onBeDeathStrike" }
          ],
          "targetSelection": {
              "pool": "target"
          },
          "action": [
              { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} },
              {"type": "heal","self":true,"formular": {"tar":{"c":150}}}
          ]
      }
  },
  {
      "skillId": 44,
      "config":{
          "installAction":[
              {"type": "playEffect","effect":18,"pos":"self"},
              {"type":"shock","delay":0.5,"range":20,"time":0.3}
          ],
          "targetSelection": {
              "pool": "blocks"
          },
          "availableCondition": [
              { "type": "event", "event": "onTurnEnd" }
          ]
      }
  },
  {
      "skillId": 45,
      "label":"狂暴",
      "config": {
          "basic" : {
              "spellEffect": 28
          },
          "installAction":[
              { "type": "setProperty",  "modifications": {"attack":{"c":6}} }
          ],
          "triggerCondition": [
              {"type": "property", "property":"health","to": 60 },
              {"type":"event","event":"onBattleTurnEnd"}
          ],
          "targetSelection": {
              "pool": "self"
          },
          "buffType":"RoleBuff"
      }
  },
  {
      "skillId": 46,
      "label":"食人魔无敌buff",
      "config": {
          "basic": {
              "spellEffect": 1,
              "spellDelay": 0.3
          },
          "triggerCondition": [
              { "type": "event", "event": "onBePhysicalDamage" },
              { "type": "event", "event": "onBePhysicalRangeDamage" },
              { "type": "event", "event": "onBeSpellDamage" },
              { "type": "event", "event": "onBeSpellRangeDamage" }
          ],
          "availableCondition": [
              { "type": "effectCount","count":6 }
          ],
          "action": [
              { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} }
          ]
      }
  },
  {
      "skillId": 47,
      "label":"食人魔重生",
      "config": {
          "basic" : {
              "spellEffect": 3
          },
          "triggerCondition": [
              {"type" :"event", "event":"onBeDeathStrike"}
          ],
          "targetSelection": {
              "pool": "self"
          },
          "availableCondition": [
              { "type": "effectCount","count":1 }
              ],
          "action":[
              {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
              {"type": "delay","delay":1},
              {"type": "heal", "formular": { "src":{"speed":10}}},
              {"type": "installSpell", "spell": 46}
              ]
      }
  },
  { "skillId": 48,
      "label": "宝箱",
      "config": {
          "triggerCondition": [
              { "type": "event", "event": "onBeActivate" }
          ],
          "targetSelection":{
              "pool":"self",
              "filter": [{"type":"alive"},{"type": "visible"}]
          },
          "action": [
              { "type": "dropItem", "dropList": [
                  {"weight":5, "item":0},
                  {"weight":5, "item":1},
                  {"weight":0, "item":2},
                  {"weight":5, "item":3},
                  {"weight":2, "item":4},
                  {"weight":5, "item":5},
                  {"weight":5, "item":6},
                  {"weight":5, "item":7},
                  {"weight":5, "item":8},
                  {"weight":0, "item":9}
                  ]
              },
              {"type":"playAction","motion":1,"pos":"self"},
              {"type":"delay"},
              {"type":"kill"}
          ]
      }
  },
  {
    "skillId": 49,
    "label": "DropCard",
    "config": {
      "triggerCondition": [
        { "type": "event", "event": "onBeDeathStrike" },
        { "type": "chance", "chance": 0.08 }
      ],
      "action": [
        { "type": "dropItem", "dropList": [
                                {"weight":5, "item":0},
                                {"weight":5, "item":1},
                                {"weight":0, "item":2},
                                {"weight":5, "item":3},
                                {"weight":2, "item":4},
                                {"weight":5, "item":5},
                                {"weight":5, "item":6},
                                {"weight":5, "item":7},
                                {"weight":5, "item":8},
                                {"weight":0, "item":9}
                              ]
        },
          {"type":"playEffect","effect":23,"delay":0.3,"pos":"self"},
          {"type":"delay"},
          {"type":"kill"}
      ]
    }
  },
  {
    "skillId": 50,
    "label": "测试数据",
    "config": {
      "action": [],
      "availableCondition": [
        { "type": "effectCount", "count": 1 },
        { "type": "tick", "tickType": "Battle", "ticks": 2 },
        { "type": "tick", "tickType": "Move", "ticks": 1 }
      ]
    }
  },
    {
        "skillId": 51,
        "label":"剑雨",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":5}]
            },
            "action":[
                {"type":"installSpell", "spell": 52,"delay":{"base":0,"range":1}}
            ]
        }
    },
    { "skillId": 52,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
                ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"delay":0.4,"formular": {"c":35}},
                {"type": "playEffect","effect":24,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 53,
        "label":"召唤小游侠",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 6 },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self"
            },
            "action": [{"type": "createMonster","objectCount":1,"effect":21,"randomPos":true,"monsterID":13}]
        }
    },
    {
        "skillId": 54,
        "label":"分身",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 5 },
                {"type":"visible"},
                {"type": "property", "property":"health","to": 120 },
                {"type":"event","event":"onBeEndBattleTurn"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"role-id","roleID":148}]
            },
            "action": [
                {"type":"kill"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "createMonster","objectCount":3,"randomPos":true,"effect":21,"monsterID":148}]
        }
    },
    {
        "skillId": 55,
        "label":"boss战BGM",
        "config": {
            "triggerCondition": [
                {"type":"event", "event":"onEnterLevel" }
            ],
            "targetSelection": {
                "pool": "self"
            },
            "action": [
                {"type":"changeBGM","music":"boss.mp3"}
            ]
        }
    },
    {
        "skillId": 56,
        "label":"召唤小史莱姆",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 6 },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"}
            ],
            "action": [
                {"type":"playAction","motion":8,"pos":"self"},
                {"type": "createMonster","objectCount":4,"randomPos":true,"monsterID":19},
                {"type": "setMyMutex", "mutex": "shilaimu","effect":21, "count": 3}]
        }
    },
    {
        "skillId": 57,
        "label":"吸收史莱姆",
        "config": {
            "basic" : {
                "spellEffect": 3
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd"},
                {"type": "myMutex", "mutex": "shilaimu" },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"role-id","roleID":19}]
            },
            "action": [
                {"type":"playAction","motion":7,"pos":"self"},
                {"type": "heal","self":true,"formular": {"tar":{"c":10}}},
                {"type": "setMyMutex", "mutex": "shilaimu", "count": 9999},
                {"type":"kill"}
            ]
        }
    },
    {
        "skillId": 58,
        "label":"召唤小哥布林",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":4,"reset":true },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"}
            ],
            "action": [{"type": "createMonster","objectCount":2,"effect":21,"randomPos":true,"monsterID":7}]
        }
    },
    {
        "skillId": 59,
        "label":"哥布林投手1",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","from":150} ,
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":1},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 60,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 60,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"delay":0.4,"formular": {"c":75}},
                {"type": "playEffect","effect":30,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 61,
        "label":"哥布林投手2",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","to":150},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":3},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 60,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 62,
        "label":"召唤狼群",
        "config": {
            "basic":{
            "spellEffect": 3
        },
            "triggerCondition": [
                {"type": "countDown", "cd": 4 },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"}
            ],
            "action": [
                {"type": "createMonster","objectCount":2,"effect":21,"randomPos":true,"monsterID":69},
                {"type": "setMyMutex", "mutex": "langqun", "count": 2}]
        }
    },
    {
        "skillId": 63,
        "label":"吸收狼群",
        "config": {
            "basic" : {
                "spellEffect": 3
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd"},
                {"type": "myMutex", "mutex": "langqun" },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"role-id","roleID":69}]

            },
            "action": [
                {"type": "heal","self":true,"formular": {"tar":{"c":100}}},
                {"type": "setMyMutex", "mutex": "langqun", "count": 9999},
                {"type":"kill"}
            ]
        }
    },
    {
        "skillId": 64,
        "label":"狼王蓄力",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 65},
                { "type": "installSpell", "spell": 65}
            ],
            "action": [
                {"type": "setMyMutex", "mutex": "xuli", "count": 1},
                { "type": "removeSpell", "spell": 65},
                { "type": "installSpell", "spell": 65}
            ]
        }
    },
    {"skillId": 65,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"critical":{"c":5}}},
                { "type": "setProperty","modifications": {"attack":{"c":15}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"},
                {"type": "myMutex", "mutex": "xuli" }
            ]
        }
    },
    {
        "skillId": 66,
        "label":"流血伤害",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onPhysicalDamage"},
                { "type": "chance", "chance": 0.3 }
            ],
            "targetSelection":{
                "pool":"target",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type": "installSpell","spell": 67},
                {"type": "installSpell","spell": 68}
            ]
        }
    },
    {
        "skillId": 67,
        "config": {
            "installAction":[
                {"type": "setProperty","modifications": {"attack":{"src":{"attack":-0.2}}}}
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 3}
            ]
        }
    },
    {
        "skillId": 68,
        "config": {
            "action":[
                {"type": "damage","damageType":"Bleed","formular": {"src":{"c":20}}}
            ],
            "targetSelection":
            { "pool":"self",
                "filter": [{"type":"alive"}]},
            "buffType":"HealthDebuff",
            "triggerCondition":[
                { "type": "event", "event": "onBattleTurnEnd"},
                { "type": "event", "event": "onMoveTurnEnd"}

            ],
            "availableCondition": [
                { "type": "effectCount", "count":3}
            ]
        }
    },
    {
        "skillId": 69,
        "label":"剑气1",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"} ,
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"count","count":1},{"type":"anchor","anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":1,"y":1},{"x":-1,"y":1},{"x":-1,"y":-1},{"x":1,"y":-1}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 70,"delay":0.3}
            ]
        }
    },
    {
        "skillId": 70,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"formular": {"c":150}},
                {"type": "playEffect","effect":25,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 71,
        "label":"剑圣自愈",
        "config": {
            "basic":{
                "spellEffect": 3
            },
            "triggerCondition": [
                {"type" :"countDown","cd":5},
                {"type" :"event","event":"onTurnBegin"},
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type": "heal","self":true,"formular": {"c":80}}
            ]
        }
    },
    {
        "skillId": 72,
        "label":"剑圣无敌",
        "config": {
            "triggerCondition": [
                {"type" :"countDown","cd":10},
                {"type" :"event","event":"onTurnBegin"},
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type": "installSpell", "spell": 73},
                {"type": "playEffect","effect":28,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 73,
        "label":"剑圣无敌buff",
        "config": {
            "basic": {
                "spellEffect": 1,
                "spellDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                { "type": "event", "event": "onBeSpellDamage" },
                { "type": "event", "event": "onBeSpellRangeDamage" }
            ],
            "availableCondition": [
                { "type": "effectCount","count":2 }
            ],
            "action": [
                { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} },
                {"type": "playEffect","effect":1,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 74,
        "label":"npc激活",
        "config": {
        "targetSelection":{
            "pool":"self",
            "filter": [{"type":"alive"},{"type":"visible"}]
        },
        "triggerCondition": [
                { "type": "event", "event": "onBeActivate" }
            ],
            "action": [
                {"type":"playSound","sound":"NPC.mp3"},
                { "type": "kill"}
            ]
        }
    },
    {
        "skillId": 75,
        "label":"游侠分身",
        "config": {
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
        "triggerCondition": [
            { "type": "event", "event": "onBeDamage" }
        ],
        "action": [
            { "type": "kill"}
        ]
        }
    },
    {
        "skillId": 76,
        "label":"暴击特效",
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onPhysicalDamage" }
            ],
        "action":[
            { "type": "shock", "delay":0.3, "range":5, "time":0.2 }
            ]
        }
    },
    {
        "skillId": 77,
        "label":"牧师补血+",
        "icon": "skill-priest2.png",
        "desc":"当牧师对敌人造成伤害时，有一定几率能回复我方队友生命值，回复生命值与命中值相关。",
        "slotId": 1,
        "config": {
            "basic": {
                "targetEffect": 3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onPhysicalDamage" },
                { "type": "chance", "chance":1 }
            ],
            "action": [
                { "type": "heal","formular":{"c": 3}}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"sort","by":"health"},{"type":"count","count":1}]
            }
        }
    },
    {
    "skillId": 78,
    "label":"boss战1",
    "config": {
        "triggerCondition": [
            {"type":"event", "event":"onEnterLevel" }
        ],
        "targetSelection": {
            "pool": "self"
        },
        "action": [
            {"type": "delay","delay":0.3},
            {"type":"chainBlock","source":[0,1,2,3,4,5,6,7,8,9,10,11,13,14],"target":12},
            {"type": "kill"},
            {"type":"changeBGM"},
            {"type": "delay"},
            {"type":"playSound","sound":"dragon.mp3"},
            {"type":"dialog","dialogId":43},
            {"type": "delay","delay":1},
            {"type":"shock","delay":0,"range":20,"time":0.9},
            {"type": "delay","delay":0.3},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":0},
            {"type":"openBlock","block":1},
            {"type":"openBlock","block":2},
            {"type":"openBlock","block":3},
            {"type":"openBlock","block":4},
            {"type": "delay","delay":0.3},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":5},
            {"type":"openBlock","block":6},
            {"type":"openBlock","block":7},
            {"type":"openBlock","block":8},
            {"type":"openBlock","block":9},
            {"type": "delay","delay":0.3},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":10},
            {"type":"openBlock","block":11},
            {"type":"openBlock","block":12},
            {"type":"openBlock","block":13},
            {"type":"openBlock","block":14},
            {"type": "delay","delay":0.3},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":15},
            {"type":"openBlock","block":19},
            {"type": "delay","delay":0.3},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":20},
            {"type":"openBlock","block":21},
            {"type":"openBlock","block":22},
            {"type":"openBlock","block":23},
            {"type":"openBlock","block":24},
            {"type": "delay","delay":1.5},
            {"type":"shock","delay":0,"range":20,"time":0.2},
            {"type":"openBlock","block":25},
            {"type":"openBlock","block":26},
            {"type":"openBlock","block":27},
            {"type":"openBlock","block":28},
            {"type":"openBlock","block":29},
            {"type": "delay","delay":1},
            {"type":"playSound","sound":"dragon.mp3"},
            {"type": "delay","delay":8},
            {"type":"createMonster","count":1,"monsterID":166,"pos":12},
            {"type":"shock","delay":0.8,"range":10,"time":0.3},
            {"type":"shock","delay":3,"range":10,"time":0.3},
            {"type":"shock","delay":4.7,"range":10,"time":0.3},
            {"type":"shock","delay":5.2,"range":10,"time":0.3},
            {"type":"changeBGM","music":"boss.mp3"},
            {"type": "delay"},
            {"type":"dialog","dialogId":44}
        ]
    }},
    {
    "skillId": 79,
    "label":"boss战2",
    "config": {
        "triggerCondition": [
            {"type" :"event", "event":"onBeDeathStrike"}
        ],
        "targetSelection": {
            "pool": "self"
        },
        "action":[
            {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
            {"type": "delay","delay":2},
            {"type":"castSpell","spell":40},
            {"type": "delay","delay":3},
            {"type":"castSpell","spell":80},
            {"type":"dialog","dialogId":45},
            {"type": "delay","delay":2},
            {"type": "collect","collectID":161001},
            {"type": "delay","delay":0.3},
            {"type": "endDungeon","result":2}
        ]
    }
    },
    {
        "skillId": 80,
        "label":"全屏落石+",
        "config": {
            "basic":{
                "spellAction":2
            },
            "targetSelection": {
                "pool": "blocks",
                "blocks":[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
                "filter": [{"type":"shuffle"},{"type":"count","count":38}]
            },
            "action":[
                {"type":"installSpell", "spell": 44,"delay":{"base":1.6,"range":5}},
                {"type":"shock","delay":1.6,"range":20,"time":8}
            ]
        }
    },
    {
        "skillId": 81,
        "label":"启程",
        "config": {
            "triggerCondition": [
                {"type":"event", "event":"onEnterLevel" }
            ],
            "targetSelection": {
                "pool": "self"
            },
            "action":[
                {"type": "whiteScreen","time":0.1,"mode":0},
                {"type": "kill"},
                {"type": "delay","delay":2},
                {"type":"dialog","dialogId":18},
                {"type": "delay","delay":1},
                {"type": "whiteScreen","time":1,"mode":1},
                {"type": "delay","delay":4},
                {"type":"tutorial","tutorialId":0}
            ]
        }
    },
    {
        "skillId": 82,
        "label": "宝箱",
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeActivate"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                { "type": "dropItem", "dropList": [
                    {"weight":5, "item":7}
                ]
                },
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill"}
            ]
        }
    },
    {
        "skillId":83,
        "label":"扣除生命值",
        "desc":"我方全体掉血",
        "config": {
               "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                {"type": "damage","delay":1, "formular": {"src":{"strong":0.5}}},
                {"type": "playEffect","delay":1},
                {"type": "blink","delay":1,"time":0.08},
                {"type":"shock","delay":1,"range":5,"time":0.2},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
            ],
            "levelConfig":[
                {"effect":10,"pos":"target"},
                {"effect":34,"pos":"target"}
            ]
      }
    },
      {
          "skillId":84,
          "label":"全体生命值",
          "desc":"全体回血",
          "config": {
             "triggerCondition": [
              {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
          },
          "action":[
              {"type":"delay"},
              {"type": "heal", "delay":1.3,"formular": {"src":{"strong":0.5}, "c":5}},
              {"type": "playEffect","delay":1.3,"effect":19,"pos":"target"} ,
              {"type":"playAction","motion":1,"pos":"self"},
              {"type":"delay"},
              {"type":"kill","self": true}
          ]
          }
      },
    {
        "skillId":85,
        "label":"转换阵营",
        "desc":"我方阵营",
        "config": {
            "triggerCondition": [
                {"type" :"event","event": "onEnterLevel"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"}]
            },
            "action":[
                {"type":"changeFaction","name":"hero"}
            ]
        }
    },
    {
        "skillId":86,
        "label":"转换阵营",
        "desc":"敌方阵营",
        "config": {
            "triggerCondition": [
                {"type" :"event","event": "onEnterLevel"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"}]
            },
            "action":[
                {"type":"changeFaction","name":"monster"}
            ]
        }
    },
    {
        "skillId": 87,
        "label":"全体加速",
        "desc":"我方全体攻击加速",
        "config": {

                 "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                { "type": "installSpell", "spell": 88,"delay":1.5},
                {"type": "playEffect","effect":37,"pos":"target","delay":1.5},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}

            ]
        }
    },
    {
        "skillId":88,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"speed":{"src":{"speed":3},"c":20}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 89,
        "label":"上升攻击力",
        "desc":"我方全体攻击上升",
        "config": {
               "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                { "type": "installSpell", "spell": 90,"delay":1.5} ,
                {"type": "playEffect","effect":13,"pos":"target","delay":1.5} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}

            ]
        }
    },
    {
        "skillId":90,
        "config": {
            "installAction":[
                { "type": "setProperty","modifications": {"attack":{"src":{"attack":1}}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 91,
        "label":"降低攻击力",
        "desc":"我方全体攻击降低",
        "config": {
              "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },

            "action":[
                {"type":"delay"},
                { "type": "installSpell", "spell": 92,"delay":1.5} ,
                {"type": "playEffect","effect":38,"pos":"target","delay":1.5},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
            ]
        }
    },
    {
        "skillId":92,
        "config": {
            "installAction":[
                { "type": "setProperty","modifications": {"attack":{"src":{"attack":-0.5}}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 93,
        "label":"中毒",
        "desc":"我方全体持续掉血",
        "config": {

            "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                {"type": "installSpell", "spell": 94},
                {"type": "playEffect","effect":36,"pos":"target","delay":2.0},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}

            ]
        }
    },
    {
        "skillId": 94,
            "config": {
                "basic" : {
                    "buffEffect": 36
                },
            "action":[
                {"type": "damage","damageType":"poison","formular": {"src":{"health":0.1}}}
            ],
            "targetSelection":
            { 
              "pool":"self",
                "filter": [{"type":"alive"}]
            },
            "buffType":"HealthDebuff",
            "triggerCondition":[
                { "type": "event", "event": "onEndBattleTurn"}
            ],
            "availableCondition": [
                { "type": "effectCount", "count":3}
            ]
            }
    },
    {
        "skillId": 95,
        "label":"无敌",
        "desc":"我方全体无敌",
        "config":{

            "triggerCondition":[
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                { "type": "installSpell", "spell": 96,"delay":0.3},
                { "type": "removeSpell", "spell": 98},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill", "self": true}
            ]
        }
    },
    {
        "skillId": 96,
        "config": {
            "basic" : {
                "buffEffect": 42
            },
            "action":[
                {"type": "ignoreHurt" },
                {"type": "playEffect","delay":0.3,"effect":1,"pos":"self"},
                {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}}
            ],
            "targetSelection":
            { "pool":"self",
              "filter": [{"type":"alive"}]},
            "buffType":"RoleBuff",
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                { "type": "event", "event": "onBeSpellDamage" },
                { "type": "event", "event": "onBeSpellRangeDamage" },
                { "type": "targetMutex", "mutex": "reinforce" },
                { "type": "targetMutex", "mutex": "lightOfMiracel" }
            ],
                "availableCondition": [
                { "type": "effectCount", "count":1}
            ]
        }
    },
    {
        "skillId": 97,
        "label":"攻击吸收",
        "desc":"我方全体攻击吸收",
        "config": {

             "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                { "type": "installSpell", "spell": 98}  ,
                { "type": "removeSpell", "spell": 96},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}

            ]
        }
    },
    {
        "skillId": 98,
        "config": {
            "basic" : {
                "buffEffect": 40
            },
           "triggerCondition": [
                   { "type": "event", "event": "onBePhysicalDamage" },
                   { "type": "event", "event": "onBePhysicalRangeDamage" },
                   { "type": "event", "event": "onBeSpellDamage" },
                   { "type": "event", "event": "onBeSpellRangeDamage" },
               { "type": "targetMutex", "mutex": "reinforce" },
               { "type": "targetMutex", "mutex": "lightOfMiracel" }
           ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"}]
            },

            "buffType":"RoleBuff",
            "action": [
                {"type": "ignoreHurt"},
                {"type": "heal","delay":0.3, "formular": {"environment":{"damage":1}}},
                {"type": "playEffect","effect":19,"pos":"target","delay":0.3},
                {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}}
            ],
            "availableCondition": [
                { "type": "effectCount", "count":1}
           ]
    }
    },
    {
        "skillId": 99,
        "label":"清除buff",
        "desc":"清除我方所有buff",
        "config": {
         "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                {"type":"delay"},
                {"type":"clearDebuff","delay":1.8},
                {"type":"clearBuff","delay":1.8} ,
                {"type": "playEffect","effect":41,"pos":"target","delay":1.8},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
             ]
            }
    },
    {
        "skillId": 100,
        "config": {
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "installAction": [
                {"type": "kill"}
            ],
            "availableCondition": [
                { "type": "event", "event": "onTurnEnd", "eventCount": 1 }
                ]
        }
    },
    {
        "skillId":101,
        "label":"火元素",
        "desc":"死后自爆",
        "slotId": 0,
        "config": {

            "triggerCondition": [
                {"type" :"event","event": "onkill"}
            ],
            "targetSelection": {
                "pool": "Enemy",
                "filter": ["alive", "visible"]
            },
            "action":[
                {"type": "damage", "formular": {"src":{"strong":0.5}}},
                {"type": "playEffect"},
                {"type":"delay"}
           ]
        }
    },
       {"skillId":102,
        "label":"元素",
        "desc":"死后降低命中",
        "slotId": 0,
        "config": {
                "triggerCondition": [
                {"type" :"event","event": "onkill"}
            ],
            "targetSelection": {
                "pool": "Enemy",
                "filter": ["alive", "visible"]
            },
            "action":[
                { "type": "installSpell", "spell": 103}
               ]
             }
    },
        {
        "skillId":103,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"accuracy":{"src":{"accuracy":1},"c":40}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"DeBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 104,
        "label":"元素",
        "desc":"死后全体攻击减速",
        "slotId": 0,
        "config": {
                "triggerCondition": [
                {"type" :"event","event": "onKill"}
            ],
            "targetSelection": {
                "pool": "Enemy",
                "filter": ["alive", "visible"]
            },
            "action":[
                { "type": "installSpell", "spell": 105}
              ]
           }
    },
    {
        "skillId":105,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"speed":{"src":{"speed":3},"c":20}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"DeBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 106,
        "label":"盾兵",
        "icon": "待定",
        "desc":"可以替其他怪物抵挡伤害（援护）。",
        "slotId": 0 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "Target",
                "filter": ["alive", "visible"]
            },
            "triggerCondition": [
                { "type": "event", "event": "onTeammateBePhysicalDamage" },
                { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
                { "type": "chance", "chance": 0.45 },
                { "type": "targetMutex", "mutex": "reinforce" },
                {"type":"alive"}
            ],
            "action": [
                {"type": "modifyVar", "x": "damage" },
                {"type": "setTargetMutex", "mutex": "reinforce", "count": 1 },
                {"type": "setMyMutex", "mutex": "reinforce", "count": 1 },
                {"type": "replaceTar" },
                {"type": "ignoreHurt" }
            ],
            "levelConfig": [
                { "formular": {"environment": {"damage":0.8}} },
                { "formular": {"environment": {"damage":0.7}} },
                { "formular": {"environment": {"damage":0.5}} }
            ]
        }
    },
    {
        "skillId": 107,
        "label":"回避",
        "desc":"回避提高",
        "slotId": 0,
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"}
            ],
            "targetSelection": {
                "pool": "Self",
                "filter": ["alive", "visible"]
            },
            "action":[
                { "type": "installSpell", "spell": 108}
            ]
        }
    },
    {
        "skillId": 108,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"reactivity":{"src":{"reactivity":1},"c":40}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },

    {
        "skillId": 109,
        "label":"降低攻击力",
        "desc":"降低玩家攻击力",
        "slotId": 0,
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"}
            ],
            "targetSelection": {
                "pool": "Enemy",
                "filter": ["alive", "visible"]
            },
            "action":[
                { "type": "installSpell", "spell": 110} ,
                {"type":"delay"}

            ]
        }
    },
    {
        "skillId":110,
        "config": {
            "installAction":[
                { "type": "setProperty","modifications": {"attack":{"src":{"attack":-0.5}}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {"skillId": 111,
        "label":"食人魔自身加速",
        "desc":"攻击加速",
        "slotId": 0,
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"} ,
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "Self",
                "filter": ["alive", "visible"]
            },
            "action":[
                { "type": "installSpell", "spell": 112}
           ]
        }
    },
    {
        "skillId":112,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"speed":{"src":{"speed":3},"c":20}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId":113,
        "config": {
            "installAction":[
                { "type": "setProperty",  "modifications": {"speed":{"src":{"speed":3},"c":20}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },

    {
        "skillId": 114,
        "label":"剑雨教程",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":5}]
            },
            "action":[
                {"type":"installSpell", "spell": 115,"delay":{"base":0,"range":1}}
            ]
        }
    },
    { "skillId": 115,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"delay":0.4,"formular": {"c":10}},
                {"type": "playEffect","effect":24,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 116,
        "label":"召唤小游侠教程",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 6 },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" } ,
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self"
            },
            "action": [{"type": "createMonster","objectCount":1,"effect":21,"randomPos":true,"monsterID":13}]
        }
    },
    {
        "skillId": 117,
        "label":"分身教程",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 5 },
                {"type":"visible"},
                {"type": "property", "property":"health","to": 300 },
                {"type":"event","event":"onBeEndBattleTurn"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"role-id","roleID":148}]
            },
            "action": [
                {"type":"kill"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "createMonster","objectCount":3,"randomPos":true,"effect":21,"monsterID":148}]
        }
    }, {
        "skillId": 118,
        "label":"召唤小哥布林教程",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":5,"reset":true },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" } ,
                {"type":"alive"}
            ],
            "action": [{"type": "createMonster","objectCount":1,"effect":21,"randomPos":true,"monsterID":7}]
        }
    },
    {
        "skillId": 119,
        "label":"哥布林投手1",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","from":150} ,
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":1},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 120,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 120,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Physical","isRange":true,"delay":0.4,"formular": {"c":10}},
                {"type": "playEffect","effect":30,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 121,
        "label":"哥布林投手2",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","to":150},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":3},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 120,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 122,
        "label":"土豪哥布林现身",
        "desc":"onshow",
        "config": {

            "triggerCondition": [
                {"type" :"event","event": "onShow"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"}]
            },
            "action":[
                {"type":"delay"} ,
                {"type":"playEffect","effect":4,"pos":"self"},
                {"type": "installSpell", "spell": 123}

            ]
        }
    },
    {
        "skillId": 123,
        "label":"土豪哥布林逃跑2",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":10,"reset":true },
                {"type":"visible"},
                {"type" :"event", "event":"onTurnEnd" }
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action":[
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"} ,
                {"type":"kill", "cod": 1}
            ]
        }
    },
    {
        "skillId": 124,
        "label":"普通传送",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onBePhysicalDamage"},
                {"type":"event","event":"onBePhysicalRangeDamage"},
                {"type":"event","event":"onBeSpellDamage"},
                {"type":"event","event":"onBeSpellRangeDamage"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type": "delay"},
                {"type":"playEffect","effect":20,"pos":"self"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "delay"},
                {"type":"playEffect","effect":21,"pos":"self"}
            ]
        }
    },
    { "skillId": 125,
        "label":"赏金怪提示",
        "config": {
            "triggerCondition": [
                { "type": "event","event":"onShow" }
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type":"delay" },
                {"type": "playEffect","effect":43,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 126,
        "label":"装备达人格挡",
        "icon": "skill-warrior1.png",
        "desc": "用坚实的盾牌来格挡攻击，抵消伤害，格挡次数随等级增加。",
        "slotId": 0,
        "config": {
            "basic" : {
                "spellEffect": 4,
                "targetEffect": 1 ,
                "spellDelay": 0.3
            },
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "countDown", "cd": 10 },
                {"type" :"event","event":"onTurnBegin"}
            ],
            "action": [
                { "type": "installSpell", "spell": 127}
            ],
            "levelConfig": [
                {"level": 1},
                {"level": 2},
                {"level": 3}
            ]
        }
    },
    {
        "skillId": 127,
        "slotId": -1,
        "config": {
            "basic": {
                "buffEffect": 42,
                "spellAction": 1,
                "spellEffect": 1,
                "spellDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                { "type": "event", "event": "onBeSpellDamage" },
                { "type": "event", "event": "onBeSpellRangeDamage" },
                { "type": "targetMutex", "mutex": "reinforce" }
            ],
            "availableCondition": [
                { "type": "effectCount" }
            ],
            "action": [
                { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} },
                {"type": "setMyMutex", "mutex": "reinforce", "count": 1 }
            ],
            "levelConfig": [
                {"count": 1},
                {"count": 2},
                {"count": 3}
            ]
        }
    },
    {
        "skillId": 128,
        "label":"pk盾墙",
        "icon": "skill-warrior1.png",
        "desc": "用坚实的盾牌来格挡攻击，抵消伤害，格挡次数随等级增加。",
        "slotId": 0,
        "config": {
            "basic" : {
                "spellAction": 2,
                "spellEffect": 45,
                "targetEffect": 1 ,
                "spellDelay": 0.3
            },
            "targetSelection": {
                "pool": "self"
            },
            "triggerCondition": [
                { "type":"event","event":"onTurnEnd", "eventCount": 5,"reset":true },
                { "type": "chance", "chance": 0.3}
            ],
            "action": [
                { "type": "installSpell", "spell": 129}
            ],
            "levelConfig": [
                {"level": 1},
                {"level": 2}
            ]
        }
    },
    {
        "skillId": 129,
        "slotId": -1,
        "config": {
            "basic": {
                "buffEffect": 42,
                "spellAction": 4,
                "spellEffect":46,
                "spellDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                { "type": "event", "event": "onBeSpellDamage" },
                { "type": "event", "event": "onBeSpellRangeDamage" },
                { "type": "targetMutex", "mutex": "reinforce" } ,
                {"type":"alive"}
            ],
            "availableCondition": [
                { "type": "effectCount" }
            ],
            "action": [
                { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} },
                {"type": "setMyMutex", "mutex": "reinforce", "count": 1 }
            ],
            "levelConfig": [
                {"count": 1},
                {"count": 2}
            ]
        }
    },
    {
        "skillId": 130,
        "label":"pk援护",
        "icon": "skill-warrior2.png",
        "desc":"战士运用自身厚实的装备保护队友，为其承受伤害，技能等级越高，所受伤害越少。",
        "slotId": 1 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onTeammateBePhysicalDamage" },
                { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
                { "type": "chance", "chance": 0.5 },
                { "type": "targetMutex", "mutex": "reinforce" },
                {"type":"alive"}
            ],
            "action": [
                {"type": "modifyVar", "x": "damage" },
                {"type": "setTargetMutex", "mutex": "reinforce", "count": 1 },
                {"type": "setMyMutex", "mutex": "reinforce", "count": 1 },
                {"type": "replaceTar" },
                {"type": "ignoreHurt" }
            ],
            "levelConfig": [
                { "formular": {"environment": {"damage":0.9}} },
                { "formular": {"environment": {"damage":0.8}} }
            ]
        }
    },
    {
        "skillId": 131,
        "label": "pk自愈",
        "icon": "skill-warrior3.png",
        "desc":"战士在受到治疗时，能够获得额外的生命值回复，回复值与韧性值有关。",
        "slotId": 2,
        "config": {
            "basic" : { },
            "triggerCondition": [
                { "type":"event","event":"onTurnEnd", "eventCount": 8,"reset":true },
                { "type": "chance", "chance": 0.3},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                { "type": "heal"}
            ],
            "levelConfig" : [
                {"formular": { "src":{"strong":0.15}, "c": 2 }},
                {"formular": { "src":{"strong":0.15}, "c": 8 }}
            ]
        }
    },
    {
        "skillId": 132,
        "label":"闪电pk",
        "icon": "skill-mage1.png",
        "desc":"召唤闪电，对一名敌人造成伤害，伤害值与法师攻击力相关。",
        "slotId": 0,
        "config": {
            "basic": {
                "spellAction": 1
            },
            "triggerCondition": [
                { "type":"event","event":"onTurnEnd", "eventCount": 5,"reset":true },
                { "type": "chance", "chance": 0.3},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
            },
            "action": [
                { "type": "damage","damageType":"Spell","isRange":true },
                {"type": "playEffect","effect":44,"pos":"self"},
                {"type": "playEffect","effect":0,"pos":"target","delay":0.6},
                {"type": "blink","delay":0.6,"time":0.08},
                {"type":"shock","delay":0.6,"range":5,"time":0.2}
            ],
            "levelConfig" : [
                { "formular": {"src":{"attack":0.8}} },
                { "formular": {"src":{"attack":1}} }
            ]
        }
    },
    {"skillId": 133,
        "config": {
            "action":[
                { "type": "setProperty"}
            ],
            "targetSelection":{ "pool":"Self" },
            "uninstallAction": [
                { "type": "resetProperty" },
                { "type": "shock", "delay":0.3, "range":5, "time":0.2 }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onTurnEnd" }
            ],
            "levelConfig":[
                { "modifications": {"critical":{"c":1}}, "level": 1},
                { "modifications": {"critical":{"c":2}}, "level": 2}
            ]
        }
    },
    {
        "skillId": 134,
        "label":"炎甲ok",
        "icon": "skill-mage3.png",
        "desc":"法师使用一层火焰魔法保护自己，当受到攻击时，对敌人造成伤害，伤害值与攻击力有关。",
        "slotId":2,
        "config":{
            "basic":{
                "spellEffect": 32,
                "targetEffect": 10,
                "spellDelay": 0.3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onBeDamage" },
                { "type": "chance", "chance": 0.3 }
            ],
            "action": [
                { "type": "damage","damageType":"Spell" }
            ],
            "targetSelection": {
                "pool": "source",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "levelConfig":[
                {"formular": {"src":{"attack":0.2},"c":2}},
                {"formular": {"src":{"attack":0.3},"c":10}}
            ]
        }
    },
    {
        "skillId": 135,
        "label":"治愈pk",
        "icon": "skill-priest1.png",
        "desc":"对队伍中生命值最低的成员进行回复，回复值与命中值相关。",
        "slotId": 0,
        "config": {
            "basic": {
                "spellAction":1,
                "spellEffect": 47,
                "targetEffect": 48,
                "spellDelay": 0.3,
                "targetDelay": 0.7
            },
            "triggerCondition": [
                { "type":"event","event":"onTurnEnd", "eventCount": 5,"reset":true },
                { "type": "chance", "chance": 0.3},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"shuffle"},{"type":"count","count":1}]
            },
            "action": [
                { "type": "heal" }
            ],
            "levelConfig" : [
                {"formular": { "src":{"accuracy":0.15}}},
                {"formular": { "src":{"accuracy":0.25}}}
            ]
        }
    },
    {
        "skillId":136,
        "config": {
            "installAction": [
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackBuff",
            "availableCondition": [
                { "type": "event", "event": "onBeginBattleTurn", "eventCount": 1 }
            ],
            "levelConfig" : [
                { "modifications": {"attack":{"src":{"attack":0.5},"c":5}}},
                { "modifications": {"attack":{"src":{"attack":0.5},"c":15}}}
            ]
        }
    },
    {
        "skillId": 137,
        "label":"pk救赎",
        "icon": "skill-priest3.png",
        "desc":"牧师成功击杀敌人时，能够有一定概率短时间提升全体成员的攻击力。",
        "slotId": 2,
        "config":{
            "basic":{
                "spellAction": 1,
                "spellEffect": 4,
                "targetEffect": 13,
                "spellDelay": 0.3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                { "type":"event","event":"onTurnEnd", "eventCount": 8,"reset":true },
                { "type": "chance", "chance": 0.3},
                {"type":"alive"}
            ],
            "action": [
                {"type":"delay"},
                {"type": "installSpell", "spell": 136 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"shuffle"},{"type":"count","count":1}]
            },
            "levelConfig" : [
                { "level": 1 }, { "level": 2 }
            ]
        }
    },
    {
        "skillId": 138,
        "label":"奇迹之光pk",
        "icon": "skill-priest4.png",
        "desc":"当我方成员受到致命一击时，牧师能够一定概率召唤奇迹之光，使其吸收此次伤害。",
        "slotId": 3,
        "config": {
            "basic": {
                "spellAction": 1,
                "spellEffect": 4,
                "targetEffect": 33,
                "spellDelay": 0.3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onTeammateBeDeathStrike" },
                { "type": "event", "event": "onBeDeathStrike" },
                {"type":"alive"},
                { "type": "chance" },
                { "type": "targetMutex", "mutex": "lightOfMiracel" }
            ],
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type": "heal", "formular": {"environment":{"damage":1}}},
                {"type": "modifyVar", "x": "damage", "formular": {"environment":{"c":0}}},
                {"type": "setTargetMutex", "mutex": "lightOfMiracel", "count": 1 }
            ],
            "levelConfig" : [
                {  "chance": 0.25 }, {  "chance": 0.4 }
            ]
        }
    },
    {
        "skillId": 139,
        "label":"元素爆发pk",
        "icon": "skill-mage4.png",
        "desc":"法师每次攻击能够增加自身暴击值，直至造成暴击后清空。",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onCriticalDamage", "count": 1 }
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 133},
                { "type": "installSpell", "spell": 133}
            ],
            "action": [
                { "type": "removeSpell", "spell": 133},
                { "type": "installSpell", "spell": 133}
            ],
            "levelConfig":[{"level":1},{"level":2}]
        }
    },
    {
        "skillId": 140,
        "label":"哥布林投手1",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","from":150},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":1},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 60,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 141,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"delay":0.4,"formular": {"c":100}},
                {"type": "playEffect","effect":30,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 142,
        "label":"哥布林投手2",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"property","property":"health","to":150},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "blocks",
                "filter": [{"type":"shuffle"},{"type":"count","count":3},{"type":"anchor", "anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":0,"y":0}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 60,"delay":{"base":0.3}}
            ]
        }
    },
    {
        "skillId": 143,
        "label":"吸收狼群",
        "config": {
            "basic" : {
                "spellEffect": 3
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd"},
                {"type": "myMutex", "mutex": "langqun" },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"role-id","roleID":69}]

            },
            "action": [
                {"type": "heal","self":true,"formular": {"tar":{"c":140}}},
                {"type": "setMyMutex", "mutex": "langqun", "count": 9999},
                {"type":"kill"}
            ]
        }
    },
    {
        "skillId": 144,
        "label":"狼王蓄力",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 145},
                { "type": "installSpell", "spell": 145}
            ],
            "action": [
                {"type": "setMyMutex", "mutex": "xuli", "count": 1},
                { "type": "removeSpell", "spell": 145},
                { "type": "installSpell", "spell": 145}
            ]
        }
    },
    {"skillId": 145,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"critical":{"c":15}}},
                { "type": "setProperty","modifications": {"attack":{"c":25}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"},
                {"type": "myMutex", "mutex": "xuli" }
            ]
        }
    },
    {
        "skillId": 146,
        "label":"流血伤害",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onPhysicalDamage"},
                { "type": "chance", "chance": 0.3 }
            ],
            "targetSelection":{
                "pool":"target",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type": "installSpell","spell": 147},
                {"type": "installSpell","spell": 148}
            ]
        }
    },
    {
        "skillId": 147,
        "config": {
            "installAction":[
                {"type": "setProperty","modifications": {"attack":{"src":{"attack":-0.2}}}}
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 3}
            ]
        }
    },
    {
        "skillId": 148,
        "config": {
            "action":[
                {"type": "damage","damageType":"Bleed","formular": {"src":{"c":30}}}
            ],
            "targetSelection":
            { "pool":"self",
                "filter": [{"type":"alive"}]},
            "buffType":"HealthDebuff",
            "triggerCondition":[
                { "type": "event", "event": "onBattleTurnEnd"},
                { "type": "event", "event": "onMoveTurnEnd"}

            ],
            "availableCondition": [
                { "type": "effectCount", "count":3}
            ]
        }
    },
    {
        "skillId": 149,
        "label":"剑气1",
        "config": {
            "basic":{
                "spellAction": 1
            },
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":3,"reset":true },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"count","count":1},{"type":"anchor","anchor":[{"x":1,"y":0},{"x":-1,"y":0},{"x":0,"y":-1},{"x":0,"y":1},{"x":1,"y":1},{"x":-1,"y":1},{"x":-1,"y":-1},{"x":1,"y":-1}]}]
            },
            "action":[
                {"type":"installSpell", "spell": 150,"delay":0.3}
            ]
        }
    },
    {
        "skillId": 150,
        "config":{
            "installAction":[
                {"type":"playEffect","effect":26,"pos":"self"}
            ],
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd","eventCount":2 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"same-block"},{"type":"same-faction","faction":"hero"},{"type":"alive"},{"type":"visible"}]
            },
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"Spell","isRange":true,"formular": {"c":230}},
                {"type": "playEffect","effect":25,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 151,
        "label":"剑圣自愈",
        "config": {
            "basic":{
                "spellEffect": 3
            },
            "triggerCondition": [
                {"type" :"countDown","cd":5},
                {"type" :"event","event":"onTurnBegin"},
                {"type":"visible"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type": "heal","self":true,"formular": {"c":180}}
            ]
        }
    },
    {
        "skillId": 152,
        "label":"pk传送",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onBattleTurnEnd"},
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type": "delay"},
                {"type":"playEffect","effect":20,"pos":"self"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "delay"},
                {"type":"playEffect","effect":21,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 153,
        "label": "boss掉落",
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeDeathStrike" }
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                { "type": "dropPrize"},
                {"type":"delay","delay":0.3},
                {"type": "playEffect","effect":49,"pos":"self"},
                {"type":"delay"},
                {"type":"kill"}]
        }
    },
    {
        "skillId": 154,
        "label": "小兵掉落",
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeDeathStrike" },
                { "type": "chance", "chance": 0.1 }
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                { "type": "dropPrize"},
                {"type":"delay","delay":0.3},
                {"type": "playEffect","effect":49,"pos":"self"},
                {"type":"delay"},
                {"type":"kill"}]
        }
    },
    {
        "skillId": 155,
        "label": "宝箱掉落",
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onBeActivate" }
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                { "type": "dropPrize"},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill"}]
        }
    },
    {
        "skillId": 156,
        "label":"每回合传送",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type": "delay"},
                {"type":"playEffect","effect":20,"pos":"self"},
                {"type":"playAction","motion":6,"pos":"self"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "delay"},
                {"type":"playEffect","effect":21,"pos":"self"},
                {"type":"playAction","motion":5,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 156,
        "label":"闪避特效",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"Dodge" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type":"playEffect","effect":20,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 157,
        "label":"吸血",
        "config": {
            "basic": {
                "targetEffect": 3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                {"type" :"event", "event":"onPhysicalDamage" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type": "heal","formular":{"src":{"attack":0.1},"c": 5}}
            ]
        }
    },
    {
        "skillId": 158,
        "label":"减速",
        "config": {
            "basic": {
                "targetEffect": 17,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                {"type" :"event", "event":"onPhysicalDamage" },
                { "type": "chance", "chance": 0.3 },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"target",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type": "installSpell","spell": 160}
            ]
        }
    },
    {
        "skillId": 159,
        "label":"中毒",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onPhysicalDamage" },
                { "type": "chance", "chance": 1 },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"target",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action":[
                {"type":"delay"},
                {"type": "installSpell", "spell": 94},
                {"type": "playEffect","effect":36,"pos":"target","delay":2.0},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}

            ]
        }
    },
    {
        "skillId": 160,
        "config": {
            "installAction":[
                {
                    "type": "setProperty","modifications": {"speed":{"src":{"speed":-0.5}}}
                }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ]
        }
    },
    {
        "skillId": 161,
        "label":"蓄力暴击",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 162},
                { "type": "installSpell", "spell": 162}
            ],
            "action": [
                {"type": "setMyMutex", "mutex": "xuli", "count": 1},
                { "type": "removeSpell", "spell": 162},
                { "type": "installSpell", "spell": 162}
            ]
        }
    },
    {
        "skillId": 162,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"critical":{"c":15}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"},
                {"type": "myMutex", "mutex": "xuli" }
            ]
        }
    },
    {
        "skillId": 163,
        "label":"蓄力速度",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 164},
                { "type": "installSpell", "spell": 164}
            ],
            "action": [
                {"type": "setMyMutex", "mutex": "xuli", "count": 1},
                { "type": "removeSpell", "spell": 164},
                { "type": "installSpell", "spell": 164}
            ]
        }
    },
    {
        "skillId": 164,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"speed":{"c":5}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"},
                {"type": "myMutex", "mutex": "xuli" }
            ]
        }
    },
    {
        "skillId": 165,
        "label":"蓄力攻击",
        "slotId": 1,
        "config":{
            "targetSelection": { "pool": "self" },
            "triggerCondition": [
                { "type": "event", "event": "onBeEndBattleTurn", "count": 1 },
                {"type":"visible"},
                {"type":"alive"}
            ],
            "installAction": [
                { "type": "removeSpell", "spell": 166},
                { "type": "installSpell", "spell": 166}
            ],
            "action": [
                {"type": "setMyMutex", "mutex": "xuli", "count": 1},
                { "type": "removeSpell", "spell": 166},
                { "type": "installSpell", "spell": 166}
            ]
        }
    },
    {
        "skillId": 166,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"attack":{"c":25}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "triggerCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"},
                {"type": "myMutex", "mutex": "xuli" }
            ]
        }
    },
    {
        "skillId": 167,
        "label":"减攻加血",
        "config":{
            "triggerCondition": [
                {"type": "property", "property":"health","to": 60 },
                {"type":"event","event":"onBattleTurnEnd"}
            ],
            "targetSelection":{
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type":"delay"},
                { "type": "installSpell", "spell": 92,"delay":1.5} ,
                {"type": "heal", "delay":1.3,"formular": {"src":{"strong":0.5}, "c":5}},
                {"type": "playEffect","delay":1.3,"effect":19,"pos":"target"} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
            ]
        }
    },
    {
        "skillId": 168,
        "label":"减血加攻",
        "config":{
            "triggerCondition": [
                {"type": "property", "property":"health","to": 60 },
                {"type":"event","event":"onBattleTurnEnd"}
            ],
            "targetSelection":{
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type":"delay"},
                {"type":"installSpell", "spell": 24},
                {"type": "damage","delay":1, "formular": {"src":{"strong":0.5}}},
                {"type": "playEffect","delay":1},
                {"type": "blink","delay":1,"time":0.08},
                {"type":"shock","delay":1,"range":5,"time":0.2},
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
            ]
        }
    },
    {
        "skillId": 169,
        "label":"加攻加血",
        "config":{
            "triggerCondition": [
                {"type": "property", "property":"health","to": 60 },
                {"type":"event","event":"onBattleTurnEnd"}
            ],
            "targetSelection":{
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type":"delay"},
                {"type":"installSpell", "spell": 24},
                {"type": "heal", "delay":1.3,"formular": {"src":{"strong":0.5}, "c":5}},
                {"type": "playEffect","delay":1.3,"effect":19,"pos":"target"} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type":"delay"},
                {"type":"kill","self": true}
            ]
        }
    },
    { "skillId": 170,
        "label":"远程攻击",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onBattleTurnEnd" },
                {"type" :"event", "event":"onMoveTurnEnd" }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
            },
            "action":[
                {"type": "rangeAttack"}
            ]
        }
    },
    {
        "skillId": 171,
        "label":"概率传送",
        "config": {
            "triggerCondition": [
                {"type":"event","event":"onBePhysicalDamage"},
                {"type":"event","event":"onBePhysicalRangeDamage"},
                {"type":"event","event":"onBeSpellDamage"},
                {"type":"event","event":"onBeSpellRangeDamage"},
                { "type": "chance", "chance":0.6 },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"}]
            },
            "action": [
                {"type": "delay"},
                {"type":"playEffect","effect":20,"pos":"self"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "delay"},
                {"type":"playEffect","effect":21,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 172,
        "label":"闪避反击",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"Dodge" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"},{"type":"count","count":1}]
            },
            "action": [
                {"type": "attack"}
            ]
        }
    },
    {
        "skillId": 173,
        "label":"暴击特效",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onCriticalDamage" },
                {"type":"alive"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type":"playEffect","effect":20,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 174,
        "label":"二次攻击",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onPhysicalDamage" },
                { "type": "chance", "chance": 0.3 }
            ],
            "targetSelection":{
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type": "attack"}
            ]
        }
    },
    {
        "skillId": 175,
        "label":"二次攻击暴击加成",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onSecondaryAttack" }
            ],
            "targetSelection":{
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                { "type": "installSpell", "spell": 176}
            ]
        }
    },
    {
        "skillId": 176,
        "config": {
            "action":[
                {"type": "playEffect","effect":28,"pos":"self"},
                { "type": "setProperty","modifications": {"critical":{"c":5}}}
            ],
            "targetSelection":{ "pool":"self" },
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"RoleBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 1 }
            ]
        }
    },
    {
        "skillId": 177,
        "label":"X回合加一次攻击力",
        "config": {
            "triggerCondition": [
                {"type": "countDown", "cd": 6 },
                {"type" :"event", "event":"onTurnEnd" }
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action":[
                {"type":"delay"},
                {"type": "playEffect","effect":13,"pos":"self","delay":1.5} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type": "setProperty","modifications": {"attack":{"src":{"attack":0.5},"c":2}}}
            ]
        }
    },
    {
        "skillId": 178,
        "label":"传送2",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"},
                { "type": "chance", "chance":0.5 }
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [
                {"type": "delay"},
                {"type":"playEffect","effect":20,"pos":"self"},
                {"type":"playAction","motion":6,"pos":"self"},
                {"type": "delay"},
                {"type": "randTeleport"},
                {"type": "delay"},
                {"type":"playEffect","effect":21,"pos":"self"},
                {"type":"playAction","motion":5,"pos":"self"}
            ]
        }
    },
    {
        "skillId": 179,
        "label":"溅射",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onPhysicalDamage" }
            ],
            "targetSelection":{
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                { "type": "removeSpell", "spell": 180},
                { "type": "installSpell", "spell": 180}
            ]
        }
    },
    {
        "skillId": 180,
        "config": {
            "basic" : {
                "buffEffect": 36
            },
            "targetSelection":{
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"}]
            },
            "buffType":"HealthBuff",
            "availableCondition": [
                { "type": "effectCount", "count":1}
            ],
            "action":[
                {"type": "damage","damageType":"poison","formular": {"src":{"health":0.1}}}
            ]
        }
    },
    {
        "skillId": 181,
        "label":"死后复活一次",
        "config": {
            "basic": {
                "targetEffect": 22
            },
            "triggerCondition": [
                {"type" :"event", "event": "onBeKill"}
            ],
            "targetSelection": {
                "pool": "self"
            },
            "action":[
                {"type": "resurrect"}
            ],
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 1 }
            ]
        }
    },
    {
        "skillId": 182,
        "label":"元素",
        "desc":"死后全体加无敌",
        "slotId": 0,
        "config": {
            "triggerCondition": [
                {"type" :"event","event": "onBeDeathStrike"}
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"not-me"} ]
            },
            "action":[
                { "type": "installSpell", "spell": 183}
            ]
        }
    },
    {
        "skillId": 183,
        "config": {
            "basic": {
                "spellEffect": 1,
                "spellDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                { "type": "event", "event": "onBeSpellDamage" },
                { "type": "event", "event": "onBeSpellRangeDamage" }
            ],
            "availableCondition": [
                { "type": "effectCount","count":6 }
            ],
            "action": [
                { "type": "modifyVar", "x": "damage", "formular": {"environment": {"damage":0}} }
            ]
        }
    },
    {
        "skillId": 184,
        "label":"嗜血",
        "config": {
            "basic" : {
                "spellEffect": 28
            },
            "installAction":[
                { "type": "setProperty",  "modifications": {"attack":{"c":6}} },
                { "type": "setProperty",  "modifications": {"speed":{"src":{"speed":3},"c":20}} }
            ],
            "triggerCondition": [
                {"type":"event","event":"onShow"}
            ],
            "targetSelection": {
                "pool": "self"
            },
            "buffType":"RoleBuff"
        }
    },
    {
        "skillId": 185,
        "label":"援护2",
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onTeammateBePhysicalDamage" },
                { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
                { "type": "chance", "chance": 0.45 },
                { "type": "targetMutex", "mutex": "reinforce" },
                {"type":"alive"}
            ],
            "action": [
                {"type": "modifyVar", "x": "damage" },
                {"type": "setTargetMutex", "mutex": "reinforce", "count": 1 },
                {"type": "setMyMutex", "mutex": "reinforce", "count": 1 },
                {"type": "replaceTar" },
                {"type": "ignoreHurt" }
            ],
            "levelConfig": [
                { "formular": {"environment": {"damage":0.8}} }
            ]
        }
    },
    {
        "skillId": 186,
        "label":"分裂",
        "config": {
            "triggerCondition": [
                {"type" :"event", "event":"onTurnEnd" },
                {"type":"alive"},
                { "type": "chance", "chance":0.5 }
            ],
            "targetSelection":{
                "pool":"self",
                "filter": [{"type":"alive"},{"type": "visible"}]
            },
            "action": [{"type": "createMonster","effect":21,"randomPos":true}] ,
            "levelConfig" : [
                { "objectCount":2,"monsterID":19},
                { "objectCount":4,"monsterID":19,"withKey":true},
                { "objectCount":2,"monsterID":51},
                { "objectCount":4,"monsterID":51,"withKey":true},
                { "objectCount":2,"monsterID":83},
                { "objectCount":4,"monsterID":83,"withKey":true},
                { "objectCount":2,"monsterID":115},
                { "objectCount":4,"monsterID":115,"withKey":true}
            ]
        }
    },
    {
        "skillId": 187,
        "label":"弱变强",
        "config":{
            "triggerCondition":[
                {"type":"countDown","cd":10},
                {"type":"event","event":"onTurnEnd"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter":[{"type":"alive"},{"type":"visible"}]
            },
            "action":[
                {"type":"delay"},
                {"type": "playEffect","effect":13,"pos":"self","delay":1.5} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type": "setProperty","modifications": {"health":{"src":{"health":0.5}}} },
                {"type": "setProperty","modifications": {"attack":{"src":{"attack":0.5}}} },
                {"type": "setProperty","modifications": {"critical":{"src":{"critical":0.5}}} },
                {"type": "setProperty","modifications": {"strong":{"src":{"strong":0.5}}} },
                {"type": "setProperty","modifications": {"accuracy":{"src":{"accuracy":0.5}}} },
                {"type": "setProperty","modifications": {"reactivity":{"src":{"reactivity":0.5}}} },
                {"type": "setProperty","modifications": {"speed":{"src":{"speed":0.5}}} },
                {"type": "setScale","modifications": {"scale":{"src":{"scale":0.1}}} }
            ]
        }
    },
    {
        "skillId": 188,
        "label":"强变弱",
        "config":{
            "triggerCondition":[
                {"type":"countDown","cd":10},
                {"type":"event","event":"onTurnEnd"}
            ],
            "targetSelection":{
                "pool":"self",
                "filter":[{"type":"alive"},{"type":"visible"}]
            },
            "action":[
                {"type":"delay"},
                {"type": "playEffect","effect":13,"pos":"self","delay":1.5} ,
                {"type":"playAction","motion":1,"pos":"self"},
                {"type": "setProperty","modifications": {"health":{"src":{"health":-0.5}}} },
                {"type": "setProperty","modifications": {"attack":{"src":{"attack":-0.5}}} },
                {"type": "setProperty","modifications": {"critical":{"src":{"critical":-0.5}}} },
                {"type": "setProperty","modifications": {"strong":{"src":{"strong":-0.5}}} },
                {"type": "setProperty","modifications": {"accuracy":{"src":{"accuracy":-0.5}}} },
                {"type": "setProperty","modifications": {"reactivity":{"src":{"reactivity":-0.5}}} },
                {"type": "setProperty","modifications": {"speed":{"src":{"speed":-0.5}}} },
                {"type": "setScale","modifications": {"scale":{"src":{"scale":-0.1}}} }
            ]
        }
    },
    {
        "skillId": 189,
        "label":"怒之力",
        "icon": "skill-warrior1.png",
        "desc": "降低命中1回合，提高攻击力2回合。",
        "slotId": 0,
        "config": {
            "basic" : {
                "spellAction": 2,
                "spellEffect": 45,
                "spellDelay": 0.3
            },
            "targetSelection": {
                "pool": "self"
            },
            "triggerCondition": [
                { "type": "countDown", "cd": 10 }
            ],
            "action": [
                { "type": "installSpell", "spell": 190},
                { "type": "installSpell", "spell": 191}
            ],
            "levelConfig": [
                {"level": 1},
                {"level": 2},
                {"level": 3}
            ]
        }
    },
    {
        "skillId": 190,
        "config": {
            "installAction":[
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 2 }
            ],
            "levelConfig":[
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 1},
                { "modifications": {"attack":{"src":{"attack":1.5}}}, "level": 2},
                { "modifications": {"attack":{"src":{"attack":2.5}}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 191,
        "config": {
            "installAction":[
                { "type": "setProperty","modifications": {"accuracy":{"src":{"accuracy":-0.95}}} }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"DeBuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn", "eventCount": 1 }
            ]
        }
    },
    {
        "skillId": 192,
        "label":"血之狂怒",
        "icon": "skill-warrior2.png",
        "desc":"狂战士将累积受到的伤害在下一轮攻击中反馈给敌人。",
        "slotId": 1 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onPhysicalDamage" },
                {"type":"alive"}
            ],
            "action": [
                { "type": "modifyVar", "x": "damage" },
                {"type": "blink","delay":0.3,"time":0.08},
                {"type":"shock","delay":0.3,"range":5,"time":0.2}
            ],
            "levelConfig": [
                { "formular": {"src": {"health":0.5,"attack":1}}  },
                { "formular": {"src": {"health":0.8,"attack":1}}  },
                { "formular": {"src": {"health":1.2,"attack":1}}  }
            ]
        }
    },
    {
        "skillId": 193,
        "label":"咆哮",
        "icon": "skill-warrior2.png",
        "desc":"几率降低怪物命中。",
        "slotId": 2 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "Enemy",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onMonsterShow" },
                {"type":"alive"}
            ],
            "action": [
                { "type": "resetProperty" }
            ],
            "levelConfig": [
                { "chance":0.3,"modifications": {"accuracy":{"c":-10}}, "level": 1},
                { "chance":0.4,"modifications": {"accuracy":{"c":10}}, "level": 2},
                { "chance":0.4,"modifications": {"accuracy":{"c":-15}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 194,
        "label":"复仇之力",
        "icon": "skill-warrior2.png",
        "desc":"怪物攻击队友并造成伤害时，狂战士有几率立即报复攻击该生物。",
        "slotId": 3 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onTeammateBePhysicalDamage" },
                { "type": "event", "event": "onTeammateBePhysicalRangeDamage" },
                {"type":"alive"}
            ],
            "action": [
                { "type": "damage","damageType":"Spell","isRange":true,"delay":0.8},
                {"type": "playEffect","effect":44,"act":"self"},
                {"type": "playEffect","effect":0,"act":"target","delay":0.6},
                {"type": "blink","delay":0.6,"time":0.08},
                {"type":"shock","delay":0.6,"range":5,"time":0.2}
            ],
            "levelConfig": [
                { "chance":0.2,"formular": {"src":{"attack":0.5}}, "level": 1},
                { "chance":0.25,"formular": {"src":{"attack":0.7}}, "level": 2},
                { "chance":0.3,"formular": {"src":{"attack":0.9}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 195,
        "label":"寒冰箭",
        "icon": "skill-mage1.png",
        "desc":"对场上多个怪物造成伤害。",
        "slotId": 0,
        "config": {
            "basic": {
                "spellAction": 1
            },
            "triggerCondition": [
                { "type": "countDown", "cd": 10 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"},{"type":"shuffle"}]
            },
            "action": [
                { "type": "damage","damageType":"Spell","isRange":true,"delay":0.8},
                {"type": "playEffect","effect":44,"act":"self"},
                {"type": "playEffect","effect":0,"act":"target","delay":0.6},
                {"type": "blink","delay":0.6,"time":0.08},
                {"type":"shock","delay":0.6,"range":5,"time":0.2}
            ],
            "levelConfig" : [
                { "count":2,"formular": {"src":{"attack":0.4}}, "level": 1},
                { "count":3,"formular": {"src":{"attack":0.4}}, "level": 2},
                { "count":4,"formular": {"src":{"attack":0.55}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 196,
        "label": "魔力漩涡",
        "icon": "skill-warrior3.png",
        "desc":"场上敌人越多,魔导师的攻击力也随之增强。",
        "slotId": 1,
        "config": {
            "basic" : {
                "spellAction": 2,
                "spellEffect": 45,
                "spellDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onEndBattleTurn", "count": 1  }
            ],
            "targetSelection": {
                "pool": "self",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                { "type": "removeSpell", "spell": 197},
                { "type": "installSpell", "spell": 197}
            ],
            "levelConfig" : [
                {"level": 1},
                {"level": 2},
                {"level": 3}
            ]
        }
    },
    {
        "skillId": 197,
        "config": {
            "installAction":[
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type":"event", "event":"onBattleTurnEnd" },
                { "type":"event", "event":"onMoveTurnEnd" },
                {"type":"visible"}
            ],
            "levelConfig":[
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 1},
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 2},
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 198,
        "label": "死亡诅咒",
        "icon": "skill-warrior3.png",
        "desc":"被大法师攻击的目标，承受额外的伤害，一回合。",
        "slotId": 2,
        "config": {
            "triggerCondition": [
                { "type": "event", "event": "onPhysicalDamage" },
                { "type": "chance", "chance": 0.3 },
                {"type":"alive"}
            ],
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "action": [
                {"type":"delay"},
                { "type": "installSpell", "spell": 199},
                {"type": "playEffect","effect":36,"pos":"target","delay":2.0},
                {"type":"playAction","motion":1,"pos":"self"}
            ],
            "levelConfig" : [
                {"level": 1},
                {"level": 2},
                {"level": 3}
            ]
        }
    },
    {
        "skillId": 199,
        "config": {
            "basic" : {
                "buffEffect": 36
            },
            "targetSelection":
            {
                "pool":"self",
                "filter": [{"type":"alive"}]
            },
            "installAction":[
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"DeDebuff",
            "availableCondition": [
                { "type":"event", "event":"onBattleTurnEnd" ,"count":1},
                {"type":"visible"}
            ],
            "levelConfig":[
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 1},
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 2},
                { "modifications": {"attack":{"src":{"attack":1}}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 200,
        "label":"法术大师",
        "icon": "skill-mage2.png",
        "desc":"大法师释放的法术和攻击有几率攻击复数敌人。",
        "slotId": 3,
        "config":{
            "basic":{
                "spellEffect": 29,
                "spellDelay": 0.6,
                "targetDelay": 0.9
            },
            "triggerCondition": [
                {"type": "event", "event": "onAttack" },
                {"type": "event", "event": "onSpell" }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"attackable"}]
            },
            "action": [
                { "type": "setCount" }
            ],
            "levelConfig":[
                { "chance":0.2,"modifications": {"count":{"src":{"c":1}}}, "level": 1},
                { "chance":0.25,"modifications": {"count":{"src":{"c":1}}}, "level": 2},
                { "chance":0.3,"modifications": {"count":{"src":{"c":2}}}, "level": 3}
            ]
        }
    },
    {
        "skillId": 201,
        "label":"祈祷",
        "icon": "skill-priest1.png",
        "desc":"群体治疗。",
        "slotId": 0,
        "config": {
            "basic": {
                "spellAction":1,
                "spellEffect": 47,
                "targetEffect": 48,
                "spellDelay": 0.3,
                "targetDelay": 0.7
            },
            "triggerCondition": [
                { "type": "countDown", "cd": 10 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
            },
            "action": [
                { "type": "heal" }
            ],
            "levelConfig" : [
                {"formular": { "src":{"accuracy":0.1}}},
                {"formular": { "src":{"accuracy":0.15} }},
                {"formular": { "src":{"accuracy":0.25} }}
            ]
        }
    },
    {
        "skillId": 202,
        "label":"狂热",
        "icon": "skill-priest3.png",
        "desc":"当主教击杀一个单位时,速度与攻击提升。",
        "slotId": 1,
        "config":{
            "basic":{
                "spellAction": 1,
                "spellEffect": 4,
                "targetEffect": 13,
                "spellDelay": 0.3,
                "targetDelay": 0.3
            },
            "triggerCondition": [
                { "type": "event", "event": "onKill" }
            ],
            "action": [
                {"type":"delay"},
                {"type": "installSpell", "spell": 203 }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"}]
            },
            "levelConfig" : [
                { "level": 1 }, { "level": 2 }, { "level": 3 }
            ]
        }
    },
    {
        "skillId": 203,
        "config": {
            "installAction": [
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"DeBuff",
            "availableCondition": [
                { "type": "event", "event": "onBeginBattleTurn", "eventCount": 2 }
            ],
            "levelConfig" : [
                { "chance":0.1,"modifications": [{"attack":{"src":{"attack":0.3}}},{"speed":{"src":{"speed":0},"c":10}}]},
                { "chance":0.15,"modifications": [{"attack":{"src":{"attack":0.4}}},{"speed":{"src":{"speed":0},"c":15}}]},
                { "chance":0.2,"modifications": [{"attack":{"src":{"attack":0.5}}},{"speed":{"src":{"speed":0},"c":25}}]}
            ]
        }
    },
    {
        "skillId": 204,
        "label":"庇佑",
        "icon": "skill-priest1.png",
        "desc":"发现怪物后给生命值最低的队友补XX点HP。",
        "slotId": 2,
        "config": {
            "basic": {
                "spellAction":1,
                "spellEffect": 47,
                "targetEffect": 48,
                "spellDelay": 0.3,
                "targetDelay": 0.7
            },
            "triggerCondition": [
                { "type": "event", "event":"onMonsterShow"  }
            ],
            "targetSelection": {
                "pool": "objects",
                "filter": [{"type":"alive"},{"type":"visible"},{"type":"target-faction-with-flag","flag":"healable"},{"type":"sort","by":"health"},{"type":"count","count":1}]
            },
            "action": [
                { "type": "heal" }
            ],
            "levelConfig" : [
                { "chance":0.4,"formular": { "src":{"accuracy":0.2}}},
                { "chance":0.5,"formular": { "src":{"accuracy":0.25}}},
                { "chance":0.6,"formular": { "src":{"accuracy":0.35}}}
            ]
        }
    },
    {
        "skillId": 205,
        "label":"放逐",
        "icon": "skill-warrior2.png",
        "desc":"攻击牧师的敌人有几率减少攻击力 持续X回合。",
        "slotId": 3 ,
        "config": {
            "basic" : {
                "spellAction":4,
                "spellEffect": 9,
                "targetEffect": 1 ,
                "spellDelay": 0,
                "targetDelay": 0
            },
            "targetSelection": {
                "pool": "target",
                "filter": [{"type":"alive"},{"type":"visible"}]
            },
            "triggerCondition": [
                { "type": "event", "event": "onBePhysicalDamage" },
                { "type": "event", "event": "onBePhysicalRangeDamage" },
                {"type":"alive"}
            ],
            "action": [
                { "type": "installSpell", "spell": 206}
            ]
        }
    },
    {
        "skillId": 206,
        "config": {
            "installAction":[
                { "type": "setProperty" }
            ],
            "uninstallAction": [
                { "type": "resetProperty" }
            ],
            "buffType":"AttackDebuff",
            "availableCondition": [
                { "type": "event", "event": "onEndBattleTurn"}
            ],
            "levelConfig":[
                { "chance":0.15,"modifications": {"attack":{"src":{"attack":-0.2}}},"eventCount": 2, "level": 1},
                { "chance":0.15,"modifications": {"attack":{"src":{"attack":-0.3}}},"eventCount": 3, "level": 2},
                { "chance":0.25,"modifications": {"attack":{"src":{"attack":-0.4}}},"eventCount": 3, "level": 3}
            ]
        }
    }
];