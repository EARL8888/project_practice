cc.Class({
    extends: cc.Component,

    properties: {
        normalBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        hoverBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        disBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        normalBtnEn: {
            type: cc.SpriteFrame,
            default: null
        },
        hoverBtnEn: {
            type: cc.SpriteFrame,
            default: null
        },
        disBtnEn: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    onLoad: function () {
        var self = this;

        // init
        var disBtn = window.nova.lan() == 'en' ? self.disBtnEn : self.disBtnZh;
        self.node.getComponent(cc.Sprite).spriteFrame = disBtn;
    },

    active: function(){
        var self = this;

        var lan = window.nova.lan();
        var normalBtn = lan == 'en' ? self.normalBtnEn : self.normalBtnZh;
        var hoverBtn = lan == 'en' ? self.hoverBtnEn : self.hoverBtnZh;
        var disBtn = lan == 'en' ? self.disBtnEn : self.disBtnZh;

        // active
        self.node.getComponent(cc.Sprite).spriteFrame = normalBtn;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event){
            self.node.getComponent(cc.Sprite).spriteFrame = hoverBtn;
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event){
            self.node.getComponent(cc.Sprite).spriteFrame = normalBtn;
            cc._canvas.style.cursor = 'default';
        });

        // bind
        self.node.on(cc.Node.EventType.TOUCH_END, function(){
            // dis btn
            self.node.getComponent(cc.Sprite).spriteFrame = disBtn;
            window.novaUtil.offEvent(self.node);
        });
    }
});