/**
 * [description:显示开始游戏倒计时]
 * [version:V1.0.0]
 */
cc.Class({
    extends: cc.Component,

    properties: {
        normalBtn: {
            type: cc.SpriteFrame,
            default: null
        },
        hoverBtn: {
            type: cc.SpriteFrame,
            default: null
        },
    },

    onLoad: function() {
        var self = this;
        self.bindBtnEvents();
        self.hideButton();
    },

    bindBtnEvents: function() {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
            self.node.getComponent(cc.Sprite).spriteFrame = self.hoverBtn;
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
            self.node.getComponent(cc.Sprite).spriteFrame = self.normalBtn;
        });
        // bind
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            self.stopOtherAnim();
            var countdown = window.localStorage.getItem('countdown');
            if (!countdown || countdown == 1) {
                // show anim
                window.novaUtil.showTimeOut_02(self.node.name);

                // teacher start
                if (window.nova && window.nova.teacherStart) window.nova.teacherStart_02(self.node.name);

                // set auth
                if (window.nova && window.nova.teacherSetAuth) window.nova.teacherSetAuth('true');
                window.localStorage.setItem('countdown', 0);
            }

        });
    },

    stopOtherAnim: function() {
        var self = this;
        cc.find('Canvas/prefab_voice_score_01/bones').opacity = 0;
    },

    hideButton: function() {
        var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
        if (!isTeacher) {
            this.node.opacity = 0;
        }
    },

    stopAnim: function() {
        var self = this;
        self.node.opacity = 0;
        cc.audioEngine.stopAll();
    }
});