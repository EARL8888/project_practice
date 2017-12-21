cc.Class({
    extends: cc.Component,

    properties: {
        next: null,
        index: null,
        length: null,
        nextNormalBtn: {
            type: cc.SpriteFrame,
            default: null
        },
        nextHoverBtn: {
            type: cc.SpriteFrame,
            default: null
        },
        nextDisBtn: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    onLoad: function() {
        var self = this;

        self.initScene();
        self.initVars();
        self.initBtns();
        window.novaUtil.judgeEnv();
    },

    initScene: function() {
        var gameName = cc.director.getScene().name;

        // get
        window.nova.getScene(function(value) {
            if (!value) return;

            if (value == gameName) {
                window.nova.initStatus();
            } else {
                cc.director.loadScene(value);
            }
        });

        // preload
        var games = require('../../../_common/_games');
        if (!games || !games.length) return;

        for (var i = 0; i < games.length; i++) {
            if (games[i].name === gameName) {
                // index
                window.slideAPI.index = i;

                // preload
                if (i < games.length - 1) {
                    cc.director.preloadScene(games[i + 1].name, function(error) {
                        try {
                            if (error) console.log('预加载场景的回调判断(下一页)' + error.tostring());
                        } catch (e) {
                            console.log('预加载场景的回调判断(下一页)发生异常：' + error);
                        }
                    });
                }

                // auth
                if (window.nova && window.nova.teacherSetPkAuth) window.nova.teacherSetPkAuth();
                if (window.nova && window.nova.teacherSetAuth) window.nova.teacherSetAuth('false', games[i].normal);
            }
        }
    },

    initVars: function() {
        var self = this;

        // get vars
        var games = require('../../../_common/_games');
        if (games && games.length) {
            // vars
            var next;
            var sceneName = cc.director.getScene().name;
            self.length = games.length;

            // get
            for (var i = 0; i < games.length; i++) {
                if (games[i].name == sceneName) {
                    if (i !== (games.length - 1)) next = games[i + 1];
                    self.index = i;
                }
            }

            self.next = next;
        }
    },

    initBtns: function() {
        var self = this;

        if (!self.next) {
            self.node.getComponent(cc.Sprite).spriteFrame = self.nextDisBtn;
        } else {
            self.bindBtnEvents();
        }
    },

    bindBtnEvents: function() {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            self.node.getComponent(cc.Sprite).spriteFrame = self.nextHoverBtn;
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            self.node.getComponent(cc.Sprite).spriteFrame = self.nextNormalBtn;
            cc._canvas.style.cursor = 'default';
        });

        // change
        self.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            // set workspace
            window.novaUtil.setWorkspace();

            // off event
            self.node.getComponent(cc.Sprite).spriteFrame = self.nextDisBtn;
            window.novaUtil.offEvent(self.node);

            // change scene
            self.changeScene();
        });
    },

    changeScene: function() {
        var self = this;

        if (self.next) {
            // stop
            window.novaUtil.stopAll();

            // send msg
            if (window.nova && window.nova.teacherChange) window.nova.teacherChange(self.next.name);

            // change scene
            window.nova.clearStatus();
            window.nova.setScene(self.next.name);
            var s = cc.director.loadScene(self.next.name);

            // data upload
            var status = 0;
            var subopt = 'page';
            var code = 5002;
            var extra = '翻页成功';
            if (!s) {
                status = 1;
                extra = '翻页失败';
            }
            window.novaUtil.dataUpload(status, subopt, code, extra);

            // index
            var index = self.index + 1;
            index = index > (self.length - 1) ? (self.length - 1) : index;
            window.slideAPI.index = index;

            // reset time
            window.novaUtil.timerS = 1;
            window.novaUtil.startTimeS = 0;
            window.novaUtil.finishedStudentArray = [];
            window.novaUtil.startStudentListArray = [];
            window.novaUtil.beginFlag = false;

            // hide flag
            if (window.nova && window.nova.teacherHideFlag) window.nova.teacherHideFlag();
        }
    }
});