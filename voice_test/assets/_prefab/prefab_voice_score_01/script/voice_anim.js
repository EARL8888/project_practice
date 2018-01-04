cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.init();
    },

    init: function() {
        var self = this;
        self.triggleClick();
        self.isTeacher = self.isTeacherMothed();
        self.studentShowAnim();
    },

    isTeacherMothed: function() {
        return window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
    },

    triggleClick: function() {
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
            self.voiceAnimShowOrStop_01();
            // send msg
            if (window.nova && window.nova.voiceAnimShowOrStop && self.isTeacher) window.nova.voiceAnimShowOrStop(self.node.name);
        });
    },

    voiceAnimShowOrStop: function() {
        var self = this;
        window.nova.get('voice_anim', function(msg) {
            var voice_anim = msg;
            console.log("voice_anim:" + voice_anim);
            if (voice_anim == 1) {
                self.getComponent(cc.Animation).stop("anim_01");
            } else {
                self.getComponent(cc.Animation).play("anim_01");
            }
        });
    },

    voiceAnimShowOrStop_01: function() {
        var self = this;
        window.nova.get('voice_anim', function(msg) {
            var voice_anim = msg;
            console.log("voice_anim_01:" + voice_anim);
            if (voice_anim == 1) {
                self.getComponent(cc.Animation).stop("anim_01");
                if (self.isTeacher) {
                    self.setState('voice_anim', '');
                }
            } else {
                self.getComponent(cc.Animation).play("anim_01");
                if (self.isTeacher) {
                    self.setState('voice_anim', 1);
                }
            }
        });
    },

    setState: function(name, tag) {
        setTimeout(function() {
            window.nova.set(name, tag);
        }, 500);
    },

    studentShowAnim: function() {
        var self = this;
        var voice_anim = window.nova.get('voice_anim', function(msg) {
            var voice_anim = msg;
            console.log("studentShowAnim:" + voice_anim);
            if (voice_anim == 1) {
                self.getComponent(cc.Animation).play("anim_01");
            } else {
                self.getComponent(cc.Animation).stop("anim_01");
            }
        });
    },

    voiceStopAnim: function() {
        var self = this;
        self.getComponent(cc.Animation).stop("anim_01");
        if (self.isTeacher) {
            self.setState('voice_anim', '');
        }
    },

    onDisable() {
        var self = this;
        if (self.isTeacher) {
            self.setState('voice_anim', '');
            console.log("进来onDisable");
        }
    },
});