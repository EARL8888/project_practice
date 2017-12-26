cc.Class({
    extends: cc.Component,

    properties: {
        clickAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function() {
        this.init();
    },

    init: function() {
        var self = this;

        var games = require('_games');
        if (games && games.length) {
            var sceneName = cc.director.getScene().name;
            for (var i = 0; i < games.length; i++) {
                if (games[i].name == sceneName) self.initGame(games[i].elements);
            }
        }
    },

    initGame: function(els) {
        var self = this;

        if (els && els.length) {
            var nodeName = self.node._name;

            for (var i = 0; i < els.length; i++) {
                if (els[i].name == nodeName) self.initElement(els[i]);
            }
        }
    },

    initElement: function(el) {
        var self = this;

        // hide
        if (el.hide) self.node.opacity = 0;

        // scale
        if (el.scale) self.node.setScale(0, 1);

        // actions
        if (el.actions && el.actions.length) {
            var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
            for (var i = 0; i < el.actions.length; i++) {
                var action = el.actions[i];
                if (action.action == 'click' && isTeacher ) self.triggleClick(el, action.cmds);
            }
        }
    },

    triggleClick: function(data, cmds) {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // click
        self.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            var anim = '';
            var animState = '';
            var audioID = '';

            //stop animationAndMusic
            self.stopAlseAnimationAndMusic();
            // triggle
            if (self.node.parent.preNode != self.node) {
                for (var i = 0; i < cmds.length; i++) {
                    var cmd = cmds[i];
                    if (cmd.name == 'playAction') {
                        audioID = cc.audioEngine.playEffect(self.clickAudio, false);

                        cc.audioEngine.setFinishCallback(audioID, function() {
                            //播放完成停止动画
                            anim.stop(animState.name);
                        });
                    }
                    if (cmd.name == 'anim') {
                        anim = self.getComponent(cc.Animation);
                        if (anim) {
                            animState = anim.play(cmd.target);
                        }
                    }
                }
                self.node.parent.preNode = self.node;
                self.node.parent.animState = animState;
                self.node.parent.anim = anim;
            } else {
                self.node.parent.preNode = "";
            }

            // send msg
            if (window.nova && window.nova.teacherClickAndStopClick) window.nova.teacherClickAndStopClick(data, cmds);
        });
    },
    //停止其他节点的
    stopAlseAnimationAndMusic: function() {
        cc.audioEngine.stopAll();
        if (this.node.parent.animState && this.node.parent.anim) {
            this.node.parent.anim.stop(this.node.parent.animState.name);
        }
    },

});