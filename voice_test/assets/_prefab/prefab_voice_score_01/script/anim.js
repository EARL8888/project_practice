// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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