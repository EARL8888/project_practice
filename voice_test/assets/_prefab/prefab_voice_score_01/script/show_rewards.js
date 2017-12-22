cc.Class({
    extends: cc.Component,

    properties: {
        animNode: {
            default: null,
            type: cc.Node,
        }
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
            self.node.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // bind
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            var rewards_btn = window.localStorage.getItem('rewards_btn');
            if (!rewards_btn || rewards_btn == 1) {
                window.localStorage.setItem('rewards_btn', null);
                self.showAnim();
                if (window.nova && window.nova.teacherRewards) window.nova.teacherRewards(self.animNode.name);
            }
        });

        // 禁止学生端事件点透
        if (cc.find('Canvas/student')) cc.find('Canvas/student').addComponent(cc.Button);
    },



    hideButton: function() {
        var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
        if (!isTeacher) {
            this.node.opacity = 0;
        }
    },

    showAnim: function() {
        console.log(2);
        var self = this;
        if (!self.animNode) return;
        if (!self.animNode.getComponent('anim')) return;
        self.animNode.getComponent('anim').showAnim();
    }

});