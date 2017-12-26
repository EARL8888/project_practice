cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // change
        self.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            self.changeScene();
        });
    },

    changeScene: function() {
        var self = this;

        var games = require('_games');
        if (games && games.length) {
            // vars
            var prev;
            var next;
            var sceneName = cc.director.getScene().name;
            console.log(sceneName);
            // get
            for (var i = 0; i < games.length; i++) {
                if (games[i].name == sceneName) {
                    if (i !== 0) prev = games[i - 1];
                    if (i !== (games.length - 1)) next = games[i + 1];
                }
            }

            // change
            console.log(prev, next, self.node.name);
            if (self.node.name == 'pre' && prev) {
                if (window.nova && window.nova.teacherChange) window.nova.teacherChange(prev.name);
                window.nova.setScene(prev.name);
                cc.director.loadScene(prev.name);
            }
            cc.log('没进入');
            if (self.node.name == 'next' && next) {
                cc.log('进入');
                if (window.nova && window.nova.teacherChange) window.nova.teacherChange(next.name);
                window.nova.setScene(next.name);
                cc.director.loadScene(next.name);
            }
        }
    }
});