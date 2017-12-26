/**
 * [description:动画播放模板]
 * [version:V1.0.0]
 */

cc.Class({
    extends: cc.Component,

    properties: {
        clickAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var self = this;
        self.node.opacity = 0;
    },

    showAnim: function() {
        var self = this;
        self.node.opacity = 255;
        cc.audioEngine.stopAll();
        self.getComponent(cc.Animation).play();
        var audioID = cc.audioEngine.play(self.clickAudio, false, 1);

        setTimeout(function() {
            self.node.opacity = 0;
            window.localStorage.setItem('rewards_btn', 1);
        }, 3000);
    },

    stopAnim: function() {
        var self = this;
        self.node.opacity = 0;
        cc.audioEngine.stopAll();
        self.getComponent(cc.Animation).stop();
    },
});