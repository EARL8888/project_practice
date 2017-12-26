cc.Class({
    extends: cc.Component,

    properties: {
        version:'2.1.1',
        crownAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function () {
        this.node.opacity = 0;
        this.node.zIndex = 3;
    }
});