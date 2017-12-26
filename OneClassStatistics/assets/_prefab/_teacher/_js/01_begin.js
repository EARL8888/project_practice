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
        self.bindBtnEvents();
    },

    bindBtnEvents: function(){
        var self = this;

        var lan = window.nova.lan();
        var normalBtn = lan == 'en' ? self.normalBtnEn : self.normalBtnZh;
        var hoverBtn = lan == 'en' ? self.hoverBtnEn : self.hoverBtnZh;
        var disBtn = lan == 'en' ? self.disBtnEn : self.disBtnZh;

        // init
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
            // show anim
        	window.novaUtil.showTimeOut(self.activeOtherBtns);

            //initRows 开始游戏的init
            window.novaUtil.beginFlag = true;
            self.initData();

            // active other btns
            // self.activeOtherBtns();

            // dis btn
            self.disBtn();

            // teacher start
            if(window.nova && window.nova.teacherStart) window.nova.teacherStart();

            // set auth
            if(window.nova && window.nova.teacherSetAuth) window.nova.teacherSetAuth('true');
            
            // set begin
            if(window.nova && window.nova.setBegin) window.nova.setBegin();
        });
        
        // 禁止学生端事件点透
        if(cc.find('Canvas/student')) cc.find('Canvas/student').addComponent(cc.Button);
    },

    initData:function() {
        var studentCanAnswer = cc.find('Canvas/_teacher_drag') || cc.find('Canvas/_teacher_choice');
        if (studentCanAnswer) {
             var _teacherJs = studentCanAnswer.getComponent('_teacher');
             if (_teacherJs && _teacherJs.initRows) _teacherJs.initRows(true);
        }
    },
    
    disBtn: function(){
        var self = this;
        
        var disBtn = window.nova.lan() == 'en' ? self.disBtnEn : self.disBtnZh;
        self.node.getComponent(cc.Sprite).spriteFrame = disBtn;
        window.novaUtil.offEvent(self.node);
    },

    activeOtherBtns: function(){
        var self = this;

        var changeBtn = cc.find('Canvas/_teacher_drag/ui_di_03/btns/change') || cc.find('Canvas/_teacher_choice/ui_di_03/btns/change');
        if(changeBtn){
            var _changeJs = changeBtn.getComponent('04_change');
            if(_changeJs && _changeJs.active) _changeJs.active();
        }

        var crownBtn = cc.find('Canvas/_teacher_drag/ui_di_03/btns/crown') || cc.find('Canvas/_teacher_choice/ui_di_03/btns/crown');
        if(crownBtn){
            var _crownJs = crownBtn.getComponent('05_crown');
            if(_crownJs && _crownJs.active) _crownJs.active();
        }
    }
});