cc.Class({
    extends: cc.Component,

    properties: {
        choiceRightAudio: {
            default: null,
            url: cc.AudioClip
        },
        choiceWrongAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function () {
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
            var res = self.checkAnswer();
            if(res){
                // ---------------------不处理老师端-----------------------
                if(!window.WCRDocSDK.isTeacher()){
                    var node = new cc.Node('Sprite');
                    node.addComponent(cc.Button);
                    node.parent = cc.find('Canvas');
                    node.width = 2048;
                    node.height = 1152;
                }
            	// ---------------------------------------
                self.rightAnimation(self.node);
                cc.audioEngine.playEffect(self.choiceRightAudio, false);
                if(window.nova && window.nova.studentAnswer) window.nova.studentAnswer();
            }else{
                self.wrongAnimation(self.node);
                cc.audioEngine.playEffect(self.choiceWrongAudio, false);
                // ---------------------答错次数-------------
                window.novaUtil.wrongNum = window.localStorage.getItem('wrongNum');
                window.novaUtil.wrongNum++;
                window.localStorage.setItem('wrongNum',window.novaUtil.wrongNum);
                window.nova.studentWrongAnswer(window.novaUtil.wrongNum);
                // window.novaUtil.offEvent(self.node);
                // ------------------------------------
            }
        });
        
        window.novaUtil.tableLog([{
            name    : 'template_03_choice',
            version : '2.1.1'
        }]);
    },

    checkAnswer: function(){
        var self = this;

        var res = false;

        var sceneName = cc.director.getScene().name;
        var nodeName = self.getNodeName();
        var selfName = self.node.name;

        var games = require('_games');  
        for(var i=0; i<games.length; i++){
            var game = games[i];

            if(game.name == sceneName){
                for(var j=0; j<game.elements.length; j++){
                    var els = game.elements[j];

                    if(els.name == nodeName){
                        for(var k=0; k<els.actions.length; k++){
                            var action = els.actions[k];

                            if(action.action == 'click'){
                                for(var m=0; m<action.cmds.length; m++){
                                    if(action.cmds[m].name == 'choice'){
                                        if(action.cmds[m].target == selfName) res = true;

                                        break;
                                    }
                                }

                                break;
                            }
                        }

                        break;
                    }
                }

                break;
            }
        }

        return res;
    },

    getNodeName: function(){
        var nodeName;

        var node = cc.find('Canvas/kadui') || cc.find('Canvas/student/kadui');
        if(!node) return nodeName;

        for(var i=0; i<node.children.length; i++){
            if(node.children[i].opacity == 255) nodeName = node.children[i].name;
        }

        return nodeName;
    },

    rightAnimation : function(node){  
        var seq = cc.sequence(
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 1),
            cc.spawn(cc.tintTo(0.2, 226, 233, 121), cc.scaleTo(0.2, 0.95)),
            cc.scaleTo(0.15, 1),
            cc.scaleTo(0.1, 0.97),
            cc.scaleTo(0.05, 1), 
        );

        if(node) node.runAction(seq);
    },

    wrongAnimation : function(node){  
        var seq = cc.sequence(
            cc.spawn(cc.tintTo(0.2, 249, 202, 202), cc.scaleTo(0.2, 0.7)),
            cc.repeat(cc.sequence(cc.moveBy(0.05, 20, 0), cc.moveBy(0.05, -20, 0)), 3),
            cc.spawn(cc.scaleTo(0.3, 1), cc.tintTo(0, 255, 255, 255))
        );

        if(node) node.runAction(seq);
    },
    
    resetBtn: function(){
        this.node.runAction(cc.tintTo(0, 255, 255, 255));
    }
});