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
        cocosAnalytics.CAAccount.loginSuccess({ 'userID': '101' });
        cocosAnalytics.onPause(true);
        cocosAnalytics.enableDebug(true);
        self.gameStart(sceneName); // 关卡开始
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