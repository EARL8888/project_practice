/**
 * [description:数据统计js]
 * [version:V1.0.0]
 */
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.init();
    },

    init: function() {
        var self = this;
        var sceneName = cc.director.getScene().name;
        self._login(sceneName);
        cocosAnalytics.onPause(true);
        self.gameStart(sceneName); // 关卡开始
        // 自定义事件
        // 参数：事件ID（必填）, 不得超过30个字符
        // cocosAnalytics.CAEvent.onEvent({
        //     eventName: "打开游戏"
        // });
        self._loginOut(sceneName);
        //开启/关闭本地日志的输出
        // cocosAnalytics.enableDebug(true);
    },

    _login: function(sceneName) {
        var games = require('_games');
        if (!games || !games.length) return;
        if (sceneName != games[0].name) return;
        var userId = window.WCRDocSDK.getUserId();
        if (!userId) userId = '1';
        cocosAnalytics.CAAccount.loginStart();
        cocosAnalytics.CAAccount.loginSuccess({ 'userID': userId });
    },

    _loginOut: function(sceneName) {
        var games = require('_games');
        if (!games || !games.length) return;
        if (sceneName != games[games.length - 1].name) return;
        var userId = window.WCRDocSDK.getUserId();
        if (!userId) userId = '1';
        cocosAnalytics.CAAccount.logout({ 'userID': userId })
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
        cocosAnalytics.CAAccount.setLevel(self.sceneName);
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