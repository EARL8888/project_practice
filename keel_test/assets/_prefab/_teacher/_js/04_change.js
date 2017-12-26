cc.Class({
    extends: cc.Component,

    properties: {
        cards: null,
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

        // get cards
        self.cards = self.getCards();

        // init card
        self.initCard();

        // init
        var disBtn = window.nova.lan() == 'en' ? self.disBtnEn : self.disBtnZh;
        self.node.getComponent(cc.Sprite).spriteFrame = disBtn;
    },

    getCards: function(){
        var self = this;

        var cards = [];
        var sceneName = cc.director.getScene().name;
        var nodeName = self.getNodeName();

        var games = require('../../../_common/_games');  
        for(var i=0; i<games.length; i++){
            var game = games[i];

            if(game.name == sceneName){
                for(var j=0; j<game.elements.length; j++){
                    cards.push(game.elements[j].name);
                }

                break;
            }
        }

        return cards;
    },

    initCard: function(){
        var node = cc.find('Canvas/student/kadui');
        if(!node || !node.children || !node.children.length) return;
        
        for(var i=0; i<node.children.length; i++){
            var cNode = node.children[i];
            if(cNode.opacity == 255){
                cNode.zIndex = 1;
                break;
            }
        }
    },

    active: function(){
        var self = this;

        // play music
        self.playMusic();
        
        // send msg
        var activeCardNode = self.getNodeName(); 
        if(window.nova && window.nova.teacherCard && activeCardNode && self.cards.length) window.nova.teacherCard(activeCardNode, self.cards,true);
        // active
        var canActive = self.canActiveCard();
        if(!canActive) return;

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

        // bind events
        self.node.on(cc.Node.EventType.TOUCH_END, function(){
            // reset rows
            var _teacher = cc.find('Canvas/_teacher_choice');
            if(!_teacher) return;

            var _teacherJs = _teacher.getComponent('_teacher');
            if(!_teacherJs) return;

            //clear studentArray
            window.novaUtil.finishedStudentArray = [];
            window.novaUtil.startStudentListArray = [];

            _teacherJs.resetRows();

            // change card
            var activeCard = self.getNodeName();
            if(activeCard && self.cards.length){
                var nextCard = self.getNextCard(activeCard, self.cards);
                if(!nextCard){
                    // dis
                    self.disBtn();
                    
                    // set end
                    if(window.nova && window.nova.setEnd) window.nova.setEnd();
                    
                    return;
                }
                
                var canActive = null;
                var currentNode = cc.find('Canvas/student/kadui/' + activeCard);

                // ----------------------------切换卡片动效---------------------
                currentNode.zIndex = 2;
                var anim1 = cc.moveBy(0.4, -500, 20);
                var anim2 = cc.rotateBy(0.4, -30);
                var anim3 = cc.scaleBy(0.4, 0.6);
                var anim4 = cc.fadeOut(0.4, 0);
                var anim5 = cc.callFunc(function(){
                	currentNode.opacity = 0;
                	// send msg
                	if(window.nova && window.nova.teacherCard) window.nova.teacherCard(activeCard, self.cards, false);
                	disB();
                },currentNode)
                currentNode.runAction(cc.sequence(cc.spawn(anim1,anim2,anim3,anim4),anim5));
                // ----------------------------切换卡片动效---------------------

                var nextNode = cc.find('Canvas/student/kadui/' + nextCard);
                nextNode.opacity = 255;
                nextNode.zIndex = 1;
                window.novaUtil.playMusic(nextNode, '01_click', 'clickAudio');
                function disB(){
                    canActive = self.canActiveCard();
                    if(!canActive){
                        // dis
                        self.disBtn();
                        
                        // set end
                        if(window.nova && window.nova.setEnd) window.nova.setEnd();
                    }
                }
            }

            // hide flag
            if(window.nova && window.nova.teacherHideFlag) window.nova.teacherHideFlag();
        });
    },

    canActiveCard: function(){
        var self = this;

        var res = false;
        var activeCard = self.getNodeName();
        if(activeCard && self.cards.length){
            var nextCard = self.getNextCard(activeCard, self.cards);
            if(nextCard) res = true;
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

    getNextCard: function(activeCard, cards){
        for(var i=0; i<cards.length; i++){
            if(cards[i] == activeCard) return i == cards.length - 1 ? null : cards[i + 1];
        }
    },

    playMusic: function(){
        var self = this;

        var nodeName = self.getNodeName();
        var node = cc.find('Canvas/student/kadui/' + nodeName);
        
        window.novaUtil.playMusic(node, '01_click', 'clickAudio');
    },
    
    disBtn: function(){
        var self = this;
        
        var disBtn = window.nova.lan() == 'en' ? self.disBtnEn : self.disBtnZh;
        self.node.getComponent(cc.Sprite).spriteFrame = disBtn;
        
        window.novaUtil.offEvent(self.node);
    }
});