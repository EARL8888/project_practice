cc.Class({
    extends: cc.Component,

    properties: {
        clickAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function () {
        this.init();
    },
    
    init: function(){
        var self = this;
        
        var games = require('_games');  
        if(games && games.length){
            var sceneName = cc.director.getScene().name;
            for(var i=0; i<games.length; i++){
                if(games[i].name == sceneName) self.initGame(games[i].elements);
            }
        }
        
        window.novaUtil.tableLog([{
        	name 	: 'template_01_click',
        	version	: '2.1.1'
        }]);
    },
    
    initGame: function(els){
        var self = this;
        
        if(els && els.length){
            var nodeName = self.node._name;
            for(var i=0; i<els.length; i++){
                if(els[i].name == nodeName) self.initElement(els[i]);
            }
        }
    },
    
    initElement: function(el){
        var self = this;

        // hide
        if(el.hide) self.node.opacity = 0;
        
        // scale
        if(el.scale) self.node.setScale(0, 1);
        
        // actions
        if(el.actions && el.actions.length){
        	var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
            for(var i=0; i<el.actions.length; i++){
                var action = el.actions[i];
                if(action.action == 'click' && isTeacher) self.triggleClick(el, action.cmds);
            }
        }
    },
    
    triggleClick: function(data, cmds){
        var self = this;
        
        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event){
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event){
            cc._canvas.style.cursor = 'default';
        });
        
        // click
        self.node.on(cc.Node.EventType.TOUCH_END, function(event){
            // stop
        	window.novaUtil.stopAll();

            // triggle
            for(var i=0; i<cmds.length; i++){
                var cmd = cmds[i];
                
                if(cmd.name == 'hide')  cc.find('Canvas/student/' + cmd.target).opacity = 0;
                if(cmd.name == 'show')  cc.find('Canvas/student/' + cmd.target).opacity = 255;
                if(cmd.name == 'open')  self.openIt(cmd.target);
                if(cmd.name == 'close') self.closeIt(cmd.target);
                if(cmd.name == 'play')  cc.audioEngine.playEffect(self.clickAudio, false);    
                if(cmd.name == 'scale') self.node.runAction(cc.sequence(cc.scaleTo(0.08, 1.2, 1.2), cc.scaleTo(0.08, 1, 1)));
                if(cmd.name == 'anim'){
                    var anim = self.getComponent(cc.Animation);
                    if(anim) anim.play(cmd.target);   
                }
            }

            // send msg
            if(window.nova && window.nova.teacherClick) window.nova.teacherClick(data, cmds);
        });
    },
    
    openIt: function(target){
        var self = this;
        
        var beginAction = cc.scaleTo(0.1, 0, 1);
        var endAction = cc.callFunc(function(){
            var action1 = cc.scaleTo(0.1, 1, 1);
            var action2 = cc.scaleTo(0.1, 1.1);
            
            cc.find('Canvas/student/' + target).runAction(cc.sequence(action1, action2));
        });            
        
        var finished = cc.callFunc(function(){
        	window.nova.syncStatus();
        }, this);
        
        self.node.runAction(cc.sequence(beginAction, endAction, finished));
    },
    
    closeIt: function(target){
        var self = this;
        
        var action1 = cc.scaleTo(0.1, 1);
        var action2 = cc.scaleTo(0.1, 0, 1);
        var endAction = cc.callFunc(function(){
            cc.find('Canvas/student/' + target).runAction(cc.scaleTo(0.1, 1, 1));    
        }); 
        
        var finished = cc.callFunc(function(){
        	window.nova.syncStatus();
        }, this);
        
        self.node.runAction(cc.sequence(action1, action2, endAction, finished));
    }
});