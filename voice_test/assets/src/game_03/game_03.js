module.exports = {
    "name": "game_03",
    "elements": [{
        "name": "rabbit",
        "hide": false,
        "actions": [{
            "action": "click",
            "cmds": [{
                "name": "playAction",
                "target": "this"
            }, {
                "name": "anim",
                "target": "m_01"
            }]
        }]
    }]
}