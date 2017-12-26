/**
 * [description:显示开始游戏倒计时]
 * [version:V1.0.0]
 */
cc.Class({
    extends: cc.Component,

    properties: {
        anim_01: {
            default: null,
            type: cc.Node,
        },
        anim_02: {
            default: null,
            type: cc.Node,
        },
        anim_03: {
            default: null,
            type: cc.Node,
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
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });
        // bind
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            self.stopOtherAnim();
            var countdown = window.localStorage.getItem('countdown');
            if (!countdown || countdown == 1) {
                // show anim
                window.novaUtil.showTimeOut_02();

                // teacher start
                if (window.nova && window.nova.teacherStart) window.nova.teacherStart_02();

                // set auth
                if (window.nova && window.nova.teacherSetAuth) window.nova.teacherSetAuth('true');
                window.localStorage.setItem('countdown', 0);
            }

        });
    },

    stopOtherAnim: function() {
        this.anim_01.getComponent('anim').stopAnim();
        this.anim_02.getComponent('anim').stopAnim();
        this.anim_03.getComponent('anim').stopAnim();
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