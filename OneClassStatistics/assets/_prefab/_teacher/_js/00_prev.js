cc.Class({
    extends: cc.Component,

    properties: {
        prev: null,
        index: null,
        length: null,
        prevNormalBtn: {
            type: cc.SpriteFrame,
            default: null
        },
        prevHoverBtn: {
            type: cc.SpriteFrame,
            default: null
        },
        prevDisBtn: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    onLoad: function () {
        var self = this;
        
        self.initScene();
        self.initVars();
        self.initBtns();
    },
    
    initScene: function(){
        var gameName = cc.director.getScene().name;
        
        // preload
        var games = require('../../../_common/_games');
        if(!games || !games.length) return;

        for(var i=0; i<games.length; i++) {
            if(games[i].name === gameName && i !== 0) cc.director.preloadScene(games[i-1].name);
        }
    },

    initVars: function(){
        var self = this;

        // get vars
        var games = require('../../../_common/_games');
        if(games && games.length){
            // vars
            var prev;
            var sceneName = cc.director.getScene().name;
            
            // get
            for(var i=0; i<games.length; i++){
                if(games[i].name == sceneName){
                    if(i !== 0) prev = games[i - 1];
                    self.index = i;
                }
            }
            
            self.prev = prev;
        }
    },

    initBtns: function(){
        var self = this;

        if(!self.prev){
            self.node.getComponent(cc.Sprite).spriteFrame = self.prevDisBtn;
        }else{
            self.bindBtnEvents();
        }
    },

    bindBtnEvents: function(){
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event){
            self.node.getComponent(cc.Sprite).spriteFrame = self.prevHoverBtn;
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event){
            self.node.getComponent(cc.Sprite).spriteFrame = self.prevNormalBtn;
            cc._canvas.style.cursor = 'default';
        });
        
        // change
        self.node.on(cc.Node.EventType.TOUCH_END, function(event){
            // set workspace
            window.novaUtil.setWorkspace();
            
            // off event
            self.node.getComponent(cc.Sprite).spriteFrame = self.prevDisBtn;
            window.novaUtil.offEvent(self.node);
            
            // change scene
            self.changeScene();
        });
    },
    
    changeScene: function(){
        var self = this;
        
        if(self.prev){
            // stop
            window.novaUtil.stopAll();
            
            // send msg
            if(window.nova && window.nova.teacherChange) window.nova.teacherChange(self.prev.name);

            // change scene
            window.nova.clearStatus();
            window.nova.setScene(self.prev.name);
            var s = cc.director.loadScene(self.prev.name);
            
            // data upload
            var status  = 0;
            var subopt  = 'page';
            var code    = 5002;
            var extra   = '翻页成功';
            if(!s){
                status  = 1;
                extra   = '翻页失败';
            }
            window.novaUtil.dataUpload(status, subopt, code, extra);
            
            // index
            var index = self.index - 1;
            index = index < 0 ? 0 : index;  
            window.slideAPI.index = index;

            // reset time
            window.novaUtil.timerS = 1;
            window.novaUtil.startTimeS = 0;
            window.novaUtil.finishedStudentArray = [];
            window.novaUtil.startStudentListArray = [];
            window.novaUtil.beginFlag = false;

            // hide flag
            if(window.nova && window.nova.teacherHideFlag) window.nova.teacherHideFlag();
        }
    }
});