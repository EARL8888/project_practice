module.exports = {
    "name": "game_13",
    "elements": [{
        "name": "00_a_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "ka_a"
            }]
        }]
    }, {
        "name": "00_o_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "ka_o"
            }]
        }]
    }, {
        "name": "00_e_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "ka_e"
            }]
        }]
    }, {
        "name": "00_boom_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "play",
                "target": "this"
            }, {
                "name": "open",
                "target": "00_boom"
            }]
        }]
    }, {
        "name": "ka_a",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_a_back"
            }]
        }]
    }, {
        "name": "ka_o",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_o_back"
            }]
        }]
    }, {
        "name": "ka_e",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_e_back"
            }]
        }]
    }, {
        "name": "00_boom",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_boom_back"
            }]
        }]
    }]
}