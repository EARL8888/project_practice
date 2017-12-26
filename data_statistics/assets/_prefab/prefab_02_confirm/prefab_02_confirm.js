cc.Class({
    extends: cc.Component,

    properties: {
        version:'2.1.1',
        titleNode: {
            default: null,
            type: cc.Node
        },
        closeNode: {
            default: null,
            type: cc.Node
        },
        textNode: {
            default: null,
            type: cc.Node
        },
        confirmNode: {
            default: null,
            type: cc.Node
        },
        cancelNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this.node.zIndex = 2;
    },

    eventBindFun: function(el, func){
        this.cursorFunc(el);
        el.on('touchstart', func);
    },

    cancelFunc: function() {
        this.ifConfirm = false;
        this.node.active = false;
        if(this.cancelBindFunc) {
            this.cancelBindFunc();
        }
    },

    confirmFunc: function() {
        this.ifConfirm = true;
        this.node.active = false;
        if(this.okBindFunc) {
            this.okBindFunc();
        }
    },

    /**
     * [initConfirm description]
     * @param  {[type]} option         [description]''||{type: 'confirm'|'alert',title:'', text:'',okText:'',canceltext:''}
     * @param  {[type]} okBindFunc     [description]
     * @param  {[type]} cancelBindFunc [description]
     * @return {[type]}                [description]
     */
    initConfirm: function(option, okBindFunc, cancelBindFunc) {
        this.node.active = true;
        if(typeof option === 'string') {
            this.textNode.getComponent(cc.Label).string = option;
        } else {
            if(option.type === 'alert') this.cancelNode.active = false;
            if(option.hideClose) this.closeNode.destroy();
            this.textNode.getComponent(cc.Label).string = option.text || '';
            this.titleNode.getComponent(cc.Label).string = option.title || '提示';
            this.confirmNode.children[0].getComponent(cc.Label).string = option.okText || '确定';
            this.cancelNode.children[0].getComponent(cc.Label).string = option.canceltext || '取消';
        }
        this.okBindFunc = okBindFunc;
        this.cancelBindFunc = cancelBindFunc;
        this.eventBindFun(this.confirmNode, this.confirmFunc.bind(this))
        this.eventBindFun(this.cancelNode, this.cancelFunc.bind(this))
        this.eventBindFun(this.closeNode, this.cancelFunc.bind(this))

        this.node.opacity = 255;
    },

    cursorFunc: function(el) {
        el.on('mouseenter', function() {
            cc._canvas.style.cursor = 'pointer';
        });
        el.on('mouseleave', function() {
            cc._canvas.style.cursor = 'default';
        });
    }
});