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

        var isEn = window.nova.lan() == 'en' ? true : false;
        var normalBtn = isEn ? self.normalBtnEn : self.normalBtnZh;
        var hoverBtn = isEn ? self.hoverBtnEn : self.hoverBtnZh;
        var disBtn = isEn ? self.disBtnEn : self.disBtnZh;

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

        // bind event
        self.node.on(cc.Node.EventType.TOUCH_END, function(){
            try{
                var imgs = [];
                var names = [];

                var _teacher = cc.find('Canvas/_teacher_drag') || cc.find('Canvas/_teacher_choice');
                if(!_teacher) return;

                var _teacherJs = _teacher.getComponent('_teacher');
                if(!_teacherJs) return;

                var rows = _teacherJs.rows1;
                if(!rows) return;
                getDatas();

                if(!imgs.length){
                    window.novaUtil.showConfirm({
                        type    : 'alert',
                        title   : isEn ? 'Prompt' : '提示',
                        text    : isEn ? 'No student completing the game' : '目前没有学生完成游戏！',
                        okText  : isEn ? 'Ok' : '确定'
                    });
                }else{
                    window.novaUtil.showConfirm({
                        type        : 'confirm',
                        title       : isEn ? 'Prompt' : '提示',
                        text        : isEn ? 'Are crown awards granted?' : '是否确认发放皇冠奖励？',
                        okText      : isEn ? 'Ok' : '确定',
                        canceltext  : isEn ? 'Cancel' : '取消'
                    }, function(){
                        imgs = [];
                        names = [];
                        getDatas();
                        window.novaUtil.showCrown({
                          imgs:imgs,
                          names:names  
                        });

                        // send msg
                        if(window.nova && window.nova.teacherShowCrown) window.nova.teacherShowCrown(imgs, names);
                    });
                }
                function getDatas(){
                    for(var i=0; i<rows.length; i++){
                        var node = rows[i];
                        if(i < 3 && node && node.opacity == 255){
                            // var mask = cc.find('userimg_mask', node);
                            // if(!mask) break;

                            // var children = mask.children;
                            // if(!children || !children.length) break;

                            // var child = children[0];
                            // if(!child) break;

                            // var sp = child.getComponent('cc.Sprite');
                            // if(!sp) break;

                            var usertime = cc.find("usertime", node);
                            if (!usertime) break;

                            var answerStatus = cc.find("answerStatus",node);
                            if (!answerStatus) break;

                            var doing = cc.find("doing", answerStatus);
                            if (!doing) break;

                            var wrong = cc.find('wrong', answerStatus);
                            if (!wrong) break;

                            // imgs.push(sp.spriteFrame.getTexture().url);
                            if (wrong.opacity == 0 && usertime.opacity == 255 ) {

                                if (_teacherJs.rankArray && _teacherJs.rankArray[i].userAvatar) imgs.push(_teacherJs.rankArray[i].userAvatar);

                                var nameNode = cc.find('username', node);
                                if (!nameNode) break;

                                names.push(nameNode.getComponent('cc.Label').string);
                            }
                        }
                    }
                }
            }catch(e){
                console.log(e);
            }
        });
    }
});