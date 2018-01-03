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
            self.voiceAnimShowOrStop();
            // send msg
            if (window.nova && window.nova.voiceAnimShowOrStop && self.isTeacher) window.nova.voiceAnimShowOrStop(self.node.name);
        });
    },

    voiceAnimShowOrStop: function() {
        var self = this;
        var voice_anim = window.localStorage.getItem('voice_anim');
        if (voice_anim == 1) {
            self.getComponent(cc.Animation).stop();
            window.localStorage.setItem('voice_anim', null);
        } else {
            self.getComponent(cc.Animation).play();
            window.localStorage.setItem('voice_anim', 1);
        }
    },

    onDisable() {
        window.localStorage.setItem('voice_anim', null);
    }
});