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

    onLoad() {
        var self = this;
        self.node.opacity = 0;
    },

    showAnim: function() {
        var self = this;
        var selfNode = self.node;
        self.stopAllAnim()
        cc.find('Canvas/prefab_voice_score_01/bones').opacity = 255;
        selfNode.opacity = 255;
        var game = selfNode.getComponent(dragonBones.ArmatureDisplay);
        cc.audioEngine.playEffect(self.clickAudio, false);
        game.playAnimation(game._animationName, 1);

        setTimeout(function() {
            selfNode.opacity = 0;
            window.localStorage.setItem('rewards_btn', 1);
        }, 1500);
    },

    stopAnim: function() {
        var self = this;
        self.node.opacity = 0;
        cc.audioEngine.stopAll();
    },

    stopAllAnim: function() {
        var self = this;
        var _timeout = cc.find('Canvas/prefab_06_timeout');
        if (!_timeout) return;
        _timeout.opacity = 0;
        cc.audioEngine.stopAll();
    }
});