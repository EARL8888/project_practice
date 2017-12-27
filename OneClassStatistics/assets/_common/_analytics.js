cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.init();
    },

    init: function() {
        var self = this;
        var sceneName = cc.director.getScene().name;
        cocosAnalytics.CAAccount.loginStart();
        cocosAnalytics.CAAccount.loginSuccess({ 'userID': '101'});
        cocosAnalytics.onPause(true);
        self.gameStart(sceneName); // 关卡开始

        // 自定义事件
        // 参数：事件ID（必填）, 不得超过30个字符
        cocosAnalytics.CAEvent.onEvent({
            eventName: "打开游戏"
        });
        //开启/关闭本地日志的输出
        cocosAnalytics.enableDebug(true);
    },

    onDisable: function() {
        var self = this;
        var sceneName = cc.director.getScene().name;
        cocosAnalytics.onResume(true);
        self.gameEnd(sceneName);
    },

    gameStart: function(sceneName) {
        var self = this;
        self.sceneName = sceneName;
        cocosAnalytics.CALevels.begin({
            level: self.sceneName
        })
    },

    gameEnd: function(sceneName) {
        var self = this;
        self.sceneName = sceneName;
        cocosAnalytics.CALevels.complete({
            level: self.sceneName
        })
    }

});