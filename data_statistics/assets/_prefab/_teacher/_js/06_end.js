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
        },
        closeNormalBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        closeHoverBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        closeDisBtnZh: {
            type: cc.SpriteFrame,
            default: null
        },
        closeNormalBtnEn: {
            type: cc.SpriteFrame,
            default: null
        },
        closeHoverBtnEn: {
            type: cc.SpriteFrame,
            default: null
        },
        closeDisBtnEn: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    onLoad: function () {
        var self = this;

        // mark the button is end or close
        self.endflag = true;

        var games = require('../../../_common/_games');
        if(!games || !games.length) return;

        var isLast = false;
        var gameName = cc.director.getScene().name;
        for(var i=0; i<games.length; i++) {
            if(games[i].name === gameName && i == games.length - 1) isLast = true;
        }

        if(isLast){
            self.active();
        }else{
            self.node.destroy();
        }
    },

    active: function(){
        var self = this;

        var isEn = window.nova.lan() == 'en' ? true : false;
        var normalBtn = isEn ? self.normalBtnEn : self.normalBtnZh;
        var hoverBtn = isEn ? self.hoverBtnEn : self.hoverBtnZh;
        var disBtn = isEn ? self.disBtnEn : self.disBtnZh;

        // close button
        var closeNormalBtn = isEn ? self.closeNormalBtnEn : self.closeNormalBtnZh;
        var closeHoverBtn = isEn ? self.closeHoverBtnEn : self.closeHoverBtnZh;
        var closeDisBtn = isEn ? self.closeDisBtnEn : self.closeDisBtnZh;

        // active
        self.node.getComponent(cc.Sprite).spriteFrame = normalBtn;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event){
            if(self.endflag){
                self.node.getComponent(cc.Sprite).spriteFrame = hoverBtn;            
            }else{
                self.node.getComponent(cc.Sprite).spriteFrame = closeHoverBtn;                           
            }
            cc._canvas.style.cursor = 'pointer';
        });
        
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event){
            if(self.endflag){
                self.node.getComponent(cc.Sprite).spriteFrame = normalBtn;            
            }else{
                self.node.getComponent(cc.Sprite).spriteFrame = closeNormalBtn;                            
            }
            cc._canvas.style.cursor = 'default';
        });

        // bind event
        self.node.on(cc.Node.EventType.TOUCH_END, function(){
            if(self.endflag){
                self.showDiamonds(true);
                // set diamonds
                if(window.nova && window.nova.setDiamonds) window.nova.setDiamonds(true);
            }else{
                self.node.getComponent(cc.Sprite).spriteFrame = normalBtn;  
                self.endflag = true;
                // 隐藏排行榜
                if(window.nova && window.nova.setDiamonds) window.nova.setDiamonds(false);
                if(window.novaUtil && window.novaUtil.hideDiamonds)  window.novaUtil.hideDiamonds(); 
                window.nova.teacherShowDiamonds([],false);               
            }
        });

        // show
        self.node.opacity = 255;
    },

    showDiamonds: function(flag){
        var self = this;

        var isEn = window.nova.lan() == 'en' ? true : false;
        var closeNormalBtn = isEn ? self.closeNormalBtnEn : self.closeNormalBtnZh;
        self.node.getComponent(cc.Sprite).spriteFrame = closeNormalBtn;
        self.endflag = false;
        
    	// check
    	if(!window.WCRDocSDK) return;
    	if(!window.WCRDocSDK.getEnviornment) return;
    	if(!window.WCRDocSDK.getInstId) return;
    	if(!window.WCRDocSDK.getInnerInstId) return;
    	if(!window.WCRDocSDK.getUserId) return;
    	if(!window.WCRDocSDK.getUserToken) return;
    	if(!window.WCRDocSDK.getCV) return;

    	// vars
        var classId = window.WCRDocSDK.getClassId();
        if(!classId) return;

        var host;
        var env = window.WCRDocSDK.getEnviornment();
        if(env == 'develop') 	host = 'dev-api';
        if(env == 'test') 		host = 'test-api';
        if(env == 'preonline') 	host = 'pre-api';
        if(env == 'online') 	host = 'api';
        if(!host) return;

        // url
        var url		= 'https://' + host + '.weclassroom.com/nova/lesson/' + classId + '/award?target_id=all&version=' + window.WCRDocSDK.getCV();
        var appid 	= window.WCRDocSDK.getInstId();
        if(appid !== '0' && appid !== 0 && appid !== ''){
        	var orgId 		= window.WCRDocSDK.getInnerInstId();
        	var classId		= window.WCRDocSDK.getClassId();
        	var userId		= window.WCRDocSDK.getUserId();
        	var usertoken	= window.WCRDocSDK.getUserToken();
        	url += '&institution_id=' + orgId + '&lesson_id=' + classId + '&user_id=' + userId + '&third_token=' + usertoken;
        }
        
        // ajax
        window.novaUtil.ajax({
            url : url,
            onsuccess : function(s){
                self.showDiamondsUsers(s, flag);
            }
        });
    },

    showDiamondsUsers: function(s, flag){
    	var self = this;

        try{
            if(!s) return;

            var json = JSON.parse(s);
            if(json && json.status == '1' && json.data && json.data.count && json.data.count.length){
            	var appid = window.WCRDocSDK.getInstId();
                var realUsers = (appid !== '0' && appid !== 0 && appid !== '') ? self.getQLJUser(json) : self.getZBYUser(json);

                window.novaUtil.showDiamonds(realUsers);
                if(flag) window.nova.teacherShowDiamonds(realUsers, true);
            }
        }catch(e){
            console.log(e);
        }
    },
    
    getQLJUser: function(json){
    	var self = this;

    	var realUsers = [];
    	var users = JSON.parse(window.WCRDocSDK.getUserStatusList());
    	for(var i=0; i<users.length; i++){
    		var user = users[i];
    		
    		var userimg 	= user.userAvatar;
    		var username 	= user.username;
    		var userrank	= self.getUserCount(json.data.count, user.uid);
    		
    		realUsers.push({
    			userid		: user.uid,
    			userimg     : userimg,
                username    : username,
                userrank    : userrank
    		});
    	}
		realUsers.sort(function(a, b){
			return a.userrank !== b.userank ? (b.userrank - a.userrank) : (a.userid - b.userid);
		});

        return realUsers;
    },
    
    getUserCount: function(users, uid){
    	for(var i=0; i<users.length; i++){
    		if(users[i].id == parseInt(uid)) return users[i].count;
    	}
    	
    	return 0;
    },
    
    getZBYUser: function(json){
    	var realUsers = [];
    	var users = json.data.count;
    	for(var i=0; i<users.length; i++){
    		realUsers.push({
    			userimg     : users[i].pic,
                username    : users[i].name,
                userrank    : users[i].count
    		});
    	}
    	
    	return realUsers;
    }
});