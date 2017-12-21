cc.Class({
    extends: cc.Component,

    properties: {
        version: '2.1.1',
        timeOutAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function () {
        // window.novaUtil.showTimeOut();
    }
});
