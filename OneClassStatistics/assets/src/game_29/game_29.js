module.exports = {
    "name": "game_29",
    "elements": [{
        "name": "00_i_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "00_i"
            }]
        }]
    }, {
        "name": "00_u_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "00_u"
            }]
        }]
    }, {
        "name": "00_uu_back",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "open",
                "target": "00_uu"
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
        "name": "00_i",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_i_back"
            }]
        }]
    }, {
        "name": "00_u",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_u_back"
            }]
        }]
    }, {
        "name": "00_uu",
        "hide": false,
        "scale": true,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "close",
                "target": "00_uu_back"
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