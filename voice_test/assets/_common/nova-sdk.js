!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.uuidv4=n()}}(function(){return function n(e,r,o){function t(f,u){if(!r[f]){if(!e[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var l=r[f]={exports:{}};e[f][0].call(l.exports,function(n){var r=e[f][1][n];return t(r?r:n)},l,l.exports,n,e,r,o)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<o.length;f++)t(o[f]);return t}({1:[function(n,e,r){function o(n,e){var r=e||0,o=t;return o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]}for(var t=[],i=0;i<256;++i)t[i]=(i+256).toString(16).substr(1);e.exports=o},{}],2:[function(n,e,r){(function(n){var r,o=n.crypto||n.msCrypto;if(o&&o.getRandomValues){var t=new Uint8Array(16);r=function(){return o.getRandomValues(t),t}}if(!r){var i=new Array(16);r=function(){for(var n,e=0;e<16;e++)0===(3&e)&&(n=4294967296*Math.random()),i[e]=n>>>((3&e)<<3)&255;return i}}e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(n,e,r){function o(n,e,r){var o=e&&r||0;"string"==typeof n&&(e="binary"==n?new Array(16):null,n=null),n=n||{};var f=n.random||(n.rng||t)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,e)for(var u=0;u<16;++u)e[o+u]=f[u];return e||i(f)}var t=n("./lib/rng"),i=n("./lib/bytesToUuid");e.exports=o},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});

(function(global) {

    function WCRInteractiveDocSDK() {

        var that = this;

        // SDK使用方响应老师发送的消息
        var outer_msg_callback_;


        // 需要优先调用setup进行初始化
        var config_inited_ = false;
        var config_ = {};

        var SDKTYPE = {
            ST_UNKNOWN: 0,
            ST_MESSAGEHANDLE: 1,
            ST_DIRECTCALL: 2
        };

        var sdk_type_ = SDKTYPE.ST_UNKNOWN;
        var doc_id_ = "";

        var init_completed_ = false;

        this.log = function(msg) {
            // if (!document.getElementById("wcr_log")) {
            //     var logContainer = document.createElement("div");
            //     logContainer.id = "wcr_log";
            //     document.body.appendChild(logContainer);
            // }
            // var pi = document.createElement("p");
            // pi.innerHTML = msg;
            // var logContainer = document.getElementById("wcr_log");
            // logContainer.insertBefore(pi, logContainer.firstChild);
        }

        this.setup = function(config, setup_complete) {
            this.detactSDKType();
            if (this.sdk_type_ == SDKTYPE.ST_UNKNOWN) {
                setup_complete(-1, "unknown client");
                return;
            }


            if (this.sdk_type_ == SDKTYPE.ST_DIRECTCALL) {
                // user setting
                var user = JSON.parse(window.WCRDocJSSDK.getUser());
                if (user["isTeacher"] == true) { // teacher
                    config_["isTeacher"] = true;
                } else {
                    config_["isTeacher"] = false;
                }
                config_["classId"] = user["classId"];
                config_["classTitle"] = user["classTitle"];
                config_["classType"] = user["classType"];
				config_["remoteUrl"] = user["remoteUrl"];
                config_["userId"] = user["userId"];
                config_["userName"] = user["userName"];
                config_["userAvatar"] = user["userAvatar"];
				config_["token"] = user["token"];
                config_["innerInstId"] = user["innerInstId"];
                config_["enviroment"] = user["enviroment"];
                config_["guid"] = user["guid"];
                config_["instid"] = user["instid"];
                config_["cv"] = user["cv"];
                        
                // set callback
                window.WCRDocJSSDK.setMsgCallback(this.persistentCallback(this.onMessageReceived));
                outer_msg_callback_ = config["msg_callback"];

                that.doc_id_ = window.WCRDocJSSDK.getDocId();

                init_completed_ = true;
                var completeInfo = {
                    'classId': user["classId"],
                    'userId': user["userId"]
                }
                setup_complete(0, completeInfo);
            } else if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {

                var messagebody = {
                    "msg_callback": this.persistentCallback(this.onMessageReceived)
                };
                var message = { 
                    'message' : 'setup',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        var error = content["error"];

                        if (error) {
                            setup_complete(error, content["description"]);
                            return;
                        }
                        config_["isTeacher"] = content["isTeacher"];
                        config_["classId"] = content["classId"];
                        config_["classTitle"] = content["classTitle"];
                        config_["classType"] = content["classType"];
						config_["remoteUrl"] = content["remoteUrl"];
                        config_["userId"] = content["userId"];
                        config_["userName"] = content["userName"];
                        config_["userAvatar"] = content["userAvatar"];
						config_["token"] = content["token"];
                        config_["innerInstId"] = content["innerInstId"];
                        config_["enviroment"] = content["enviroment"];
                        config_["guid"] = content["guid"];
                        config_["instid"] = content["instid"];
                        config_["cv"] = content["cv"];

                        that.doc_id_ = content["docId"];

                        init_completed_ = true;
                        var completeInfo = {
                            'classId': content["classId"],
                            'userId': content["userId"]
                        };
                        setup_complete(0, completeInfo);
                    }) 
                };
                outer_msg_callback_ = config["msg_callback"];
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            }
        };

        this.oneshotCallback = function(callback) {
            var randomFunctionName = "ONESHOT_" + uuidv4() + "_";
            randomFunctionName = randomFunctionName.replace(/-/g, '_');
            
            global[randomFunctionName] = function(content) {
                callback(content);
                delete global[randomFunctionName];
            }
            return randomFunctionName;
        }

        this.persistentCallback = function(callback) {
            var randomFunctionName = "PERSISTENT_" + uuidv4() + "_";
            randomFunctionName = randomFunctionName.replace(/-/g, '_');

            global[randomFunctionName] = function(content) {
                callback(content);
            }
            return randomFunctionName;
        }

        this.detactSDKType = function() {
            if (window.webkit != undefined
                && window.webkit.messageHandlers != undefined 
                && window.webkit.messageHandlers.WCRDocJSSDK != undefined) {
                this.sdk_type_ = SDKTYPE.ST_MESSAGEHANDLE;
            } else if (window.WCRDocJSSDK) {
                this.sdk_type_ = SDKTYPE.ST_DIRECTCALL;
            } else {
                this.sdk_type_ = SDKTYPE.ST_UNKNOWN;
            }
        };

        // 获取当前文档的DOC ID
        this.getDocId = function() {
            return this.doc_id_;
        };

        // 获取当前文档所在的用户角色
        this.isTeacher = function() {
            return config_["isTeacher"];
        };

        // 获取当前用户的id
        this.getUserId = function() {
            return config_["userId"];
        }

        // 获取当前用户名称
        this.getUserName = function() {
            return config_["userName"];
        }

        // 获取当前用户的头像
        this.getUserAvatar = function() {
            return config_["userAvatar"];
        }
		
		// 获取当前用户的token
        this.getUserToken = function() {
            return config_["token"];
        }

        // 获取机构id
        this.getInnerInstId = function() {
            return config_["innerInstId"];
        }

        // 获取当前课堂的id
        this.getClassId = function() {
            return config_["classId"];
        }

        // 获取当前课堂的title
        this.getClassTitle = function() {
            return config_["classTitle"];
        }

        // 获取当前课堂的课程类型
        this.getClassType = function() {
            return config_["classType"];
        }

        // 获取当前课堂的绑定课件远程地址
        this.getRemoteUrl = function() {
            return config_["remoteUrl"];
        }
        
        //获取客户端的环境类型 "develop" 、"test"、"preonline"、  "online",
        this.getEnviornment = function() {
            return config_["enviroment"];
        }
        
        // 获取GUID
        this.getGuid = function() {
            return config_["guid"];
        }
        
        //获取版本号
        this.getCV = function() {
            return config_["cv"];
        }
        
        // 获取app id
        this.getInstId = function() {
            return config_["instid"];
        }

        // 老师向学生发送开始答题消息
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        // @starttime: 答题开始时间
        // @timeout: 从开始事件到题目过期的间隔(s) 
        this.sendStartTesting = function(docid, tid, starttime, timeout) {
            if (!this.isTeacher()) {
                that.log("! student permission denied");
                return false;
            }
            var msg = "start.test";
            var msgBody = {
                "docid": docid,
                "tid": tid,
                "starttime": starttime,
                "timeout": timeout,
            };
            this.sendMessage(msg, msgBody);
        };

        // 老师向学生发送结束答题消息
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        this.sendStopTesting = function(docid, tid) {
            if (!this.isTeacher()) {
                that.log("! student permission denied");
                return false;
            }
            var msg = "stop.test";
            var msgBody = {
                "docid": docid,
                "tid": tid,
            };
            this.sendMessage(msg, msgBody);
        };

        // 向老师发送答题结果
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        // @score: int 当前的综合评分
        // @maxscore: int score的最大值
        // @animation: int 得分动画(0 没有动画, 1 WonderFul动画, 2 得分动画, 3 超时动画)
        this.sendTestingScore = function(docid, tid, score, maxscore, animation) {
            if (this.isTeacher()) {
                that.log("! teacher permission denied");
                return false;
            }
            if (!animation)
                animation = 0;
            var msg = "report.test.score";
            var msgBody = {
                "docid": docid,
                "tid": tid,
                "score": score,
                "maxscore": maxscore,
                "animation": animation
            };
            this.sendMessage(msg, msgBody);
        };

        this.sendMessage = function(msg, msgBody) {
            if (!init_completed_) {
                return;
            }

            that.log("Message->: " + msg);
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "msg": msg,
                    "body": msgBody
                };
                var message = { 
                    'message' : 'sendMessage',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        // send complete
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.sendMessage(msg, JSON.stringify(msgBody));
            }
        };

        this.sendMessageWithCallback = function(msg, msgBody, callback) {
            if (!init_completed_) {
                return;
            }

            that.log("Message->: " + msg);
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "msg": msg,
                    "body": msgBody
                };
                var message = { 
                    'message' : 'sendMessageWithCallback',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(callback) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.sendMessageWithCallback(msg, JSON.stringify(msgBody), this.oneshotCallback(callback));
            }
        };

        // native   support
        // string   type "read_syllable" "read_word" "read_sentence"
        // string   language "en_us" "zh_cn"
        // jsonObj  data 
        //             "read_word" : {"words": ['1', '2' ...]}
        //             "sentence"  : {"sentence": "xxxxxx"}
        // int      timeout (s)
        // callback function(content){} 
        //          content = { "notify": "xxx",  "body": {}}
        this.startSpeechEvaluation = function(type, language, data, timeout, callback) {
            if (!init_completed_) {
                that.log("! startSpeechEvaluation failed - init not complete");
                return;
            }

            if (!callback) {
                that.log("! startSpeechEvaluation failed - callback is null");
                return;
            }

            if (language != "zh_cn" && language != "en_us") {
                that.log("! startSpeechEvaluation failed - language is invalid");
                return;
            }

            var messagebody = {
                "timeout": timeout,
                "type": type,
                "language": language,
                "data": data
            };
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var message = { 
                    'message' : 'startSpeechEvaluation',
                    'body' : messagebody,
                    'callback' : this.persistentCallback(function(content) {
                        callback(content);
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.startSpeechEvaluation(JSON.stringify(messagebody)
                    , this.persistentCallback(function(content) {
                        callback(content);
                    }));
            }
        };

        // 检测是否当前正在进行跟读
        // callback function(content){} 
        //          content = { "result": true|false}
        this.duringSpeechEvaluation = function(callback) {
            var messagebody = {};
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var message = { 
                    'message' : 'duringSpeechEvaluation',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        callback(content);
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.duringSpeechEvaluation(JSON.stringify(messagebody)
                    , this.oneshotCallback(function(content) {
                        callback(content);
                    }));
            }
        };
        
        // stop on going speech evaluation
        this.stopSpeechEvaluation = function() {
            that.log("stopSpeechEvaluation");
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {};
                var message = { 
                    'message' : 'stopSpeechEvaluation',
                    'body' : messagebody 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.stopSpeechEvaluation();
            }
        };

        // 获取最终的成绩结果
        this.getFinalScore = function(callback) {
            that.log("getFinalScore");
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {};
                var message = { 
                    'message' : 'getFinalScore',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        callback(content);
                    })  
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.getFinalScore(this.oneshotCallback(function(content) {
                        callback(content);
                    }));
            }
        };

        this.endDoc = function(info) {
            that.log("endDoc");
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "info" : info
                };
                var message = { 
                    'message' : 'endDoc',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        callback(content);
                    })  
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.endDoc(info);
            }
        }

        this.onMessageReceived = function(content) {
            that.log("Message<-: " + content["msg"]);
            if (outer_msg_callback_) {
                outer_msg_callback_(content);
            }
        };

        //获取客户端的当前语言设置 "en" 或者 "zh"
        this.getCurrentLanguage = function() {
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                return "zh";
            } else {
                return (window.WCRDocJSSDK && window.WCRDocJSSDK.getCurrentLanguage) ? window.WCRDocJSSDK.getCurrentLanguage() : 'zh';
            }
        };

        //外链打开，用系统默认的程序打开链接
        this.openUrlByExternal = function(url) {
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "url" : url
                };
                var message = {
                    'message' : 'openUrlByExternal',
                    'body' : messagebody
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                return window.WCRDocJSSDK.openUrlByExternal(url);
            }
        };

        //设置文本到系统剪贴板
        this.copyToClipboard = function(text) {
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "text" : text
                };
                var message = {
                    'message' : 'copyToClipboard',
                    'body' : messagebody
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.copyToClipboard(text);
            }
        };
        
        /*
        {"docId":"xxx","privilege":"true|false","userList":[{"uid":"xxx","authorize":"true|false", "docMode":"true|false", "showBar":"true|false"},...,{}]}
        */
        this.setAuthorizeUsers = function(json) {
            if (!this.isTeacher()) {
                that.log("[setAuthorizeUsers]! student permission denied");
                return;
            }
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                window.WCRDocJSSDK.setAuthorizeUsers(json);
            }
        };

        this.getAuthorizeUsers = function(json) {
            if (!this.isTeacher()) {
                that.log("[getAuthorizeUsers]! student permission denied");
                return "{}";
            }
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                return window.WCRDocJSSDK.getAuthorizeUsers();
            }
        };

        this.setupCourseWorKSpace = function(x, y, width, height) {
            if (!this.isTeacher()) {
                that.log("[setupCourseWorKSpace]! student permission denied");
                return "{}";
            }
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                return window.WCRDocJSSDK.setupCourseWorKSpace(x, y, width, height);
            }
        };

        this.setupICourseVersion = function(version) {
            if (!this.isTeacher()) {
                that.log("[setupICourseVersion]! student permission denied");
                return "{}";
            }
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                return window.WCRDocJSSDK.setupICourseVersion(version);
            }
        };
        
        //client will notify the user change message by the msg_callback of setup
        //[{"uid":"xxx",online:"true|false","username":"xxx", "userAvatar":"xxx"},...,{}]      
        this.getUserStatusList = function() {
            if (!this.isTeacher()) {
                that.log("[getUserStatusList]! student permission denied");
                return "{}";
            }
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                return window.WCRDocJSSDK.getUserStatusList();
            }
        }

        //{"docId":"xxx","userList"[{"uid":"xxx",status:"true|false"},...,{}]}
        this.setUsersAnswerStatus = function(json) {
            if (!this.isTeacher()) {
                that.log("[getUserStatusList]! student permission denied");
                return;
            }
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                window.WCRDocJSSDK.setUsersAnswerStatus(json);
            }
        }

        /*
		{"docId":"xxx","privilege":"true|false", "docId":"xxx", "userList":[{"uid":"xxx", "mute":"true|false", "authorize":"true|false", "docMode":"true|false", "showBar":"true|false", "x":"30","y":"40","width":"160","height":"90"},...,{}]}
		x&y&width&height = -1表示视频窗口还原回顶部,mute 表示是否静音true表示取消PK，false表示PK， x&y&width&height= -1表述归位回去
        同时支持1~16人，具体看支持的性能
        */
        this.setUsersPKList = function(json) {
            if (!this.isTeacher()) {
                that.log("[getUserStatusList]! student permission denied");
                return;
            }

            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                //ios get do it by native control which send from teacher.
            } else {
                window.WCRDocJSSDK.setUsersPKList(json);
            }
        }

        //js写日志到c++日志库接口
        this.web_log = function (msg) {
            if (window.WCRDocJSSDK && window.WCRDocJSSDK.web_log) {
                window.WCRDocJSSDK.web_log('[course][web_log]msg:' + msg);
            }
        }
		
        //js通知qt课件版本号
        this.setupICourseVersion = function(version) {
            
            if (!this.isTeacher()) {
                
                that.log("[setupICourseVersion]! student permission denied");
                
                return "{}";
           
            }
            
            
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                
                //ios get do it by native control which send from teacher.
            
            } else {
                
                return window.WCRDocJSSDK.setupICourseVersion(version);
            
            }
        
        }
    }

    var g_wcrDocSDK = new WCRInteractiveDocSDK();

    global.WCRDocSDK = g_wcrDocSDK;

    global.WCRInteractiveDocSDK = WCRInteractiveDocSDK;

})(window);

window.novaUtil = {};

/**
 * 初始化
 */
window.novaUtil.wrongNum = 0;
window.novaUtil.beginFlag = false;
window.novaUtil.finishedStudentArray = [];
window.novaUtil.startStudentListArray = [];
if(!window.localStorage.getItem('wrongNum')) window.localStorage.setItem('wrongNum' , 0);

/**
 * log
 * 上报日志
 */
window.novaUtil.log = function(desc){
	var classId = window.WCRDocSDK.getClassId();
	var userId	= window.WCRDocSDK.getUserId();
	var game 	= (cc && cc.director && cc.director.getScene && cc.director.getScene()) ? cc.director.getScene().name : null;

    var url = 'https://in.weclassroom.com/nova/log';
    window.novaUtil.ajax({
        url : url,
        type: 'POST',
        data: {
        	classid	: classId,
        	userid	: userId,
        	game 	: game,
        	desc	: desc
        }
    });
};

/**
 * load scene
 * 加载游戏场景
 */
window.novaUtil.loadScene = function(name, cb){
	window.novaUtil.log('02_进入loadScene方法');
	if(!cc || !name) return;
	
	window.novaUtil.log('03_开始翻页到：' + name);
	var s = cc.director.loadScene(name, function(){
		window.novaUtil.log('05_翻页完成后回调');
		if(cb) cb();
	});
	window.novaUtil.log('04_翻页的结果是：' + s);
	
    var status 	= 0;
    var subopt 	= 'page';
    var code 	= 5002;
    var extra 	= '翻页成功';
    if(!s){
        status = 1;
        extra = '翻页失败';
    }
    window.novaUtil.dataUpload(status,subopt,code,extra);
};

/**
 * play music
 * @param node		节点
 * @param jsName	节点对应js
 * @param mName		节点对应music
 */
window.novaUtil.playMusic = function(node, jsName, mName){
    var js = node.getComponents(jsName);
    if(js && js.length && js[0][mName]) cc.audioEngine.playEffect(js[0][mName], false);      
};

/**
 * off event
 * @param node	节点
 */
window.novaUtil.offEvent = function(node){
	node.targetOff(cc.Node.EventType.TOUCH_END);
    node.targetOff(cc.Node.EventType.TOUCH_START);
    node.targetOff(cc.Node.EventType.TOUCH_MOVE);
    node.targetOff(cc.Node.EventType.MOUSE_ENTER);
    node.targetOff(cc.Node.EventType.MOUSE_LEAVE);
    node.targetOff(cc.Node.EventType.TOUCH_CANCEL);
    
    cc._canvas.style.cursor = 'default';
};

/**
 * 停止动画和声音
 */
window.novaUtil.stopAll = function(){
	if(!cc) return;
	cc.audioEngine.stopAll();
	
    var student = cc.find('Canvas/student');
    if(!student) return;
    
    student.stopAllActions();
};

/**
 * 添加图像节点
 * @param url		地址
 * @param pnode		父节点
 * @param width		宽度
 * @param height	高度
 * @param callback	回调函数
 */
window.novaUtil.addImgNode = function(url, pnode, width, height, callback){
	if(cc && url && pnode){
		cc.loader.load(url, function(err, texture){
            var cnodes = pnode.children;
            if(cnodes && cnodes.length) cnodes[0].destroy();

			var node = createImgNode(texture);
			node.parent = pnode;
			
			if(width) node.width = width;
			if(height) node.height = height;
			if(callback) callback(node);
		});
	}
};
function createImgNode(texture){
	var node = new cc.Node('Sprite');
	
	var sp = node.addComponent(cc.Sprite);
	sp.SizeMode = cc.Sprite.SizeMode.CUSTOM;
	sp.spriteFrame = new cc.SpriteFrame(texture);
	
	return node;
}

/**
 * show teacher
 * @param btns，按钮数组，confirm-确认分组，again-再来一轮，change-切换卡片，begin-开始游戏，crown-奖励皇冠
 */
window.novaUtil.showTeacher = function(btns){
	var _teacher_normal	= cc.find('Canvas/_teacher');
	var _teacher_drag	= cc.find('Canvas/_teacher_drag');
	var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
	var _teacher_choice = cc.find('Canvas/_teacher_choice');
	var _teacher_pk 	= cc.find('Canvas/_teacher_pk');
	
	var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk
	if(_teacher){
		var _teacherJs = _teacher.getComponent('_teacher');
		if(_teacherJs && _teacherJs.initBtns) _teacherJs.initBtns(btns);
	}
};

/**
 * [confirm description]弹出二次确认框函数''||{type: 'confirm'|'alert',title:'', text:'',okText:'',canceltext:''}
 * @param  {[type]} text           [description]二次确认框的文字描述
 * @param  {[type]} okBindFunc     [description]确认的方法传入，需要bind自己的this
 * @param  {[type]} cancelBindFunc [description]取消的方法传入，需要bind自己的this
 * @return {[type]}                [description]
 */
window.novaUtil.showConfirm = function(option, okBindFunc, cancelBindFunc){
	var _confirm = cc.find('Canvas/prefab_02_confirm');
	if(_confirm){
		var _confirmJs = _confirm.getComponent('prefab_02_confirm');
		if(_confirmJs && _confirmJs.initConfirm) _confirmJs.initConfirm(option, okBindFunc, cancelBindFunc);
	}
};

/**
 * show crown
 * 展示奖励皇冠页面
 * @param imgs，用户头像数组
 */
window.novaUtil.showCrown = function(body){
    var _crown = cc.find('Canvas/prefab_03_crown');
    if(!_crown) return;

    var index           = 3;
    var nodes           = ['rank_01', 'rank_02', 'rank_03'];
    var defaultsImgs    = ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1902468542,2120439953&fm=200&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1531392329,2869685141&fm=200&gp=0.jpg','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4267222417,1017407570&fm=200&gp=0.jpg'];
    var realImgs        = body.imgs || defaultsImgs;
    var defaultsNames   = ['name1', 'name2', 'name3'];
    var realNames       = body.names || defaultsNames;

    var nodeAarr = [];
    for(var i=0; i<index; i++){
        var parentNode = cc.find(nodes[i], _crown);

        if(i < realImgs.length){
            window.novaUtil.addImgNode(realImgs[i], cc.find(nodes[i] + '_mask', parentNode), 300, 300);
            if(cc.find(nodes[i] + '_name', parentNode)) cc.find(nodes[i] + '_name', parentNode).getComponent('cc.Label').string = realNames[i];

            nodeAarr.push(parentNode);
            
            var fn1 = cc.callFunc(function(){
            	if(!nodeAarr || nodeAarr.length < 2 || !nodeAarr[1]) return;
            	
            	nodeAarr[1].opacity = 255;
            	nodeAarr[1].runAction(cc.sequence(cc.scaleTo(0.25, 1),fn2,cc.delayTime(3),cc.scaleTo(0,1, 0)));
            	
            	var hg = cc.find('hg', nodeAarr[1]);
            	if(!hg) return;
            	
                hg.runAction(cc.repeat(cc.sequence(cc.fadeIn(0.5, 0),cc.fadeOut(0.5, 1)),5));
            });

            nodeAarr[0].opacity = 255;
            nodeAarr[0].runAction(cc.sequence(cc.scaleTo(0.25, 1),fn1,cc.delayTime(3),cc.scaleTo(0,1, 0)));
            var hg = cc.find('hg', nodeAarr[0]);
            hg.runAction(cc.repeat(cc.sequence(cc.fadeIn(0.5, 0),cc.fadeOut(0.5, 1)),5));
          
            var fn2 = cc.callFunc(function(){
            	if(!nodeAarr || nodeAarr.length < 3 || !nodeAarr[2]) return;
                
            	nodeAarr[2].opacity = 255;
                nodeAarr[2].runAction(cc.sequence(cc.scaleTo(0.25, 1),cc.delayTime(3),cc.scaleTo(0,1, 0)));
                
                var hg = cc.find('hg', nodeAarr[2]);
                if(!hg) return;

                hg.runAction(cc.repeat(cc.sequence(cc.fadeIn(0.5, 0),cc.fadeOut(0.5, 1)),5));
            });
            // -----------------------------------
        }else{
            parentNode.opacity = 0;
        }
    }

    cc.find('background', _crown).opacity = 120;
    _crown.opacity = 255;
    // -----------------播放声音--------------------
    var audioS = _crown.getComponent('prefab_03_crown').crownAudio;
    cc.audioEngine.play(audioS,false,1);
    // --------------------------------------

    setTimeout(function(){
        _crown.opacity = 0;
        cc.audioEngine.uncache(audioS);
    }, 3000);
};

/**
 * show diamonds
 * 展示钻石排行榜页面
 * @param users，用户对象数据，对象包含username，userimg，userrank
 */
window.novaUtil.showDiamonds = function(users){
	var _diamonds = cc.find('Canvas/prefab_04_diamonds');
	if(!_diamonds) return;
	
	var rows = diamondsGetRows(_diamonds);
	if(rows && rows.length && users && users.length){
		for(var i=0; i<users.length; i++){
			if(i < rows.length) diamondsGenRow(rows[i], users[i]);
		}
	}
	
	_diamonds.opacity = 255;
};
function diamondsGetRows(node){
	var rowPaths = [
		'rank_bg/rank_01/row_01',
		'rank_bg/rank_01/row_02',
		'rank_bg/rank_01/row_03',
		'rank_bg/rank_01/row_04',
		'rank_bg/rank_02/row_01',
		'rank_bg/rank_02/row_02',
		'rank_bg/rank_02/row_03',
		'rank_bg/rank_02/row_04',
		'rank_bg/rank_03/row_01',
		'rank_bg/rank_03/row_02',
		'rank_bg/rank_03/row_03',
		'rank_bg/rank_03/row_04',
		'rank_bg/rank_04/row_01',
		'rank_bg/rank_04/row_02',
		'rank_bg/rank_04/row_03',
		'rank_bg/rank_04/row_04'
	];

	var rows = [];
	for(var i=0; i<rowPaths.length; i++){
		var row = cc.find(rowPaths[i], node);
		row.opacity = 0;

		rows.push(row);
	}

	return rows;
}
function diamondsGenRow(node, user){
	var self = this;

	var username = cc.find('username', node);
	var userrank = cc.find('userrank', node);
	var userimg = cc.find('userimg_mask', node);

	if(username) username.getComponent(cc.Label).string = user.username;
	if(userrank) userrank.getComponent(cc.Label).string = user.userrank;
	if(userimg) window.novaUtil.addImgNode(user.userimg, userimg, 80, 80);

	node.opacity = 255;
}

/**
 * 隐藏排行榜
 */
window.novaUtil.hideDiamonds = function(){
    var _diamonds = cc.find('Canvas/prefab_04_diamonds');
    if(!_diamonds) return;
    
    _diamonds.opacity = 0;
};

/**
 * show suceess
 * 通关完成动效
 */
window.novaUtil.showSuccess = function(){
    var _success = cc.find('Canvas/prefab_05_success');
    if(!_success) return;
    
    var audio = _success.getComponent("prefab_05_success").completeAudio;
    if(audio) cc.audioEngine.playEffect(audio, false);
    
    _success.opacity = 255;
    
    var game = cc.find('_success', _success).getComponent(dragonBones.ArmatureDisplay);
    game.playAnimation('newAnimation', 1);
    game.addEventListener(dragonBones.EventObject.COMPLETE, function(){
    	_success.opacity = 0;
    }, game);
};


/**
 * show showTimeOut
 * 倒计时动效
 */
window.novaUtil.showTimeOut = function(cb){
    var _timeout = cc.find('Canvas/prefab_06_timeout');
    if(!_timeout) return;

    timeoutRotateAnimation(_timeout);
    timeoutCountDown(cb);
};

/**
 * show facsimile
 * 临摹答题失败动效
 */
window.novaUtil.showFacsimile = function(){
    var _facsimile = cc.find('Canvas/prefab_07_facsimile');
    if(!_facsimile) return;
    
    var failureAnimat = cc.find('Canvas/prefab_07_facsimile/_facsimileFailure');
    if(!failureAnimat) return;
    
    failureAnimat.scaleX = 1;
    failureAnimat.scaleY = 1;
    _facsimile.opacity = 255;
    
    var audio = _facsimile.getComponent("prefab_07_facsimile").facsimileAudio;
    if(audio) cc.audioEngine.playEffect(audio, false);
    
    var game = cc.find('_facsimileFailure', _facsimile).getComponent(dragonBones.ArmatureDisplay);
    game.playAnimation('newAnimation', 1);
    game.addEventListener(dragonBones.EventObject.COMPLETE, function(){
        _facsimile.runAction(cc.fadeTo(0.38,0));
        failureAnimat.runAction(cc.scaleTo(0.38,0.2))
    }, game);
};

function timeoutRotateAnimation(node){
	if(!node) return;
	
	node.opacity = 255;
    cc.audioEngine.play(node.getComponent('prefab_06_timeout').timeOutAudio,false,1);
	node.addComponent(cc.Button);
	
	cc.find('mask/l', node).runAction(cc.rotateBy(1.5, -180));
	setTimeout(function(){
		cc.find('mask1/r', node).runAction(cc.rotateBy(1.5, -180));
	}, 1500);
}
function timeoutCountDown(cb){
	var i = 3;
	timeoutAnimFn(i);
	
	var timer = setInterval(function(){
		var node = cc.find('Canvas/prefab_06_timeout/number' + i);
		if(node) node.opacity = 0;
		
		if(--i < 0){
            clearInterval(timer);
            var timeOutNode = cc.find('Canvas/prefab_06_timeout');
            if(!timeOutNode) return;
            
            timeOutNode.destroy();
            cc.audioEngine.uncache(timeOutNode.getComponent('prefab_06_timeout').timeOutAudio);
            if(cb && typeof(cb) == 'function') cb();

            return;
		}
		
		timeoutAnimFn(i);
	}, 1000);
}
function timeoutAnimFn(i){
	var timeOutNum = cc.find('Canvas/prefab_06_timeout/number' + i);
	if(!timeOutNum) return;
	
	var anim1 = cc.scaleTo(0.5,1);
	var anim2 = cc.scaleTo(0.5,1);
    timeOutNum.opacity = 255;
    timeOutNum.runAction(cc.sequence(anim1,anim2));
}

/**
 * show version
 */
window.novaUtil.showVersion = function(){
	// teacher
	var _teacher_normal	= cc.find('Canvas/_teacher');
	var _teacher_drag	= cc.find('Canvas/_teacher_drag');
	var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
	var _teacher_choice = cc.find('Canvas/_teacher_choice');
	var _teacher_pk 	= cc.find('Canvas/_teacher_pk');
	
	var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
	var _teacherVersion = _teacher ? _teacher.getComponent('_teacher').version : null;
	
	// confirm
	var _confirm = cc.find('Canvas/prefab_02_confirm');
	var _confirmVersion = _confirm ? _confirm.getComponent('prefab_02_confirm').version : null;

	// crown
	var _crown = cc.find('Canvas/prefab_03_crown');
	var _crownVersion = _crown ? _crown.getComponent('prefab_03_crown').version : null;

	// diamonds
	var _diamonds = cc.find('Canvas/prefab_04_diamonds');
	var _diamondsVersion = _diamonds ? _diamonds.getComponent('prefab_04_diamonds').version : null;

	// success
	var _success = cc.find('Canvas/prefab_05_success');
	var _successVersion = _success ? _success.getComponent('prefab_05_success').version : null;
	
	// timeout
	var _timeout = cc.find('Canvas/prefab_06_timeout');
	var _timeoutVersion = _timeout ? _timeout.getComponent('prefab_06_timeout').version : null;
	
	// fps
	var fps = cc ? cc.game.config.frameRate : null;
	
	// table
	var table = [];
	table.push({
		name : 'game_fps',
		version: fps
	});
	table.push({
		name : 'nova_sdk',
		version: '2.1.5'
	});
	table.push({
		name : 'prefab_01_teacher',
		version: _teacherVersion
	});
	table.push({
		name : 'prefab_02_confirm',
		version: _confirmVersion
	});
	table.push({
		name : 'prefab_03_crown',
		version: _crownVersion
	});
	table.push({
		name : 'prefab_04_diamonds',
		version: _diamondsVersion
	});
	table.push({
		name : 'prefab_05_success',
		version: _successVersion
	});
	table.push({
		name : 'prefab_06_timeout',
		version: _timeoutVersion
	});
	
	window.novaUtil.tableLog(table);
};

/**
 * table log
 */
window.novaUtil.tableLog = function(table){
	console.table(table);
	if(window.WCRDocSDK && window.WCRDocSDK.web_log) window.WCRDocSDK.web_log(JSON.stringify(table));
};

/**
 * timer
 * 计时器
 * @param self，当前节点
 * @param node，需要设置计时器的label节点
 */
window.novaUtil.timerS 		= 1;
window.novaUtil.startTimeS 	= 0;
window.novaUtil.timer = function(self, node){
    self.schedule(function() {
        node.getComponent(cc.Label).string = timeH(window.novaUtil.timerS) + ":" + timerM(window.novaUtil.timerS) + ':' + timerS(window.novaUtil.timerS);
        window.novaUtil.timerS++;
    }, 1);
};

// timer second
function timerS(s) {
    var realS = parseInt((s % 3600) % 60);
    return realS < 10 ? ('0' + realS) : realS;
}

// time minute
function timerM(s) {
    var realM = parseInt((s % 3600) / 60);
    return realM < 10 ? ('0' + realM) : realM;
}

// time hour
function timeH(s) {
    var realH = parseInt(s / 3600);
    realH = realH < 10 ? ('0' + realH) : realH;

    return realH < 100 ? realH : '99';
}

/**
 * search
 * 获取url后参数中的value
 */
window.novaUtil.search = function(key){
	var res;
	
	var s = location.search;
	if(s){
		s = s.substr(1);
		if(s){
			var ss = s.split('&');
			for(var i=0; i<ss.length; i++){
				var sss = ss[i].split('=');
				if(sss && sss[0] == key) res = sss[1]; 
			}
		}
	}
	
	return res;
};

/**
 * ajax
 * 
 * url
 * type
 * data
 * dataType
 * timeout
 * headers
 * ontimeout
 * onerror
 * onfail
 * onsuccess
 */
window.novaUtil.ajax = function(options){
	var url			= options.url;
	var type 		= options.type || 'GET';
	var data		= options.data;
	var dataType	= options.dataType || 'text';
	var timeout		= options.timeout || 3000;
	var headers		= options.headers;
	var ontimeout	= options.ontimeout;
	var onerror		= options.onerror;
	var onfail		= options.onfail;
	var onsuccess	= options.onsuccess;
	
	if(!url) return;
	
	// xhr
	var xhr 			= new XMLHttpRequest();
	xhr.timeout 		= timeout;
	xhr.responseType 	= dataType;

	// open and headers
	xhr.open(type, url, true);
	if(headers){
		for(var key in headers) xhr.setRequestHeader(key, headers[key]);
	}
	
	// get
	xhr.onreadystatechange = function(){
	    if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
	    	if(onsuccess) onsuccess(xhr.responseText);
	    }else{
	    	if(onfail) onfail(xhr.responseText);
	    }
	};
	
	// on event
	if(ontimeout) xhr.ontimeout = ontimeout;
	if(onerror) xhr.onerror = onerror;
	
	// send data
	var formData;
	if(data){
		formData = new FormData();
		for(var key in data) formData.append(key, data[key]);
	}
	
	if(formData){
		xhr.send(formData);
	}else{
		xhr.send();
	}
};

/**
 * data upload
 * status	状态
 * subopt	事件
 * code		事件代码
 * extra	解释
 */
window.novaUtil.dataUpload = function(status, subopt, code, extra){
    // vars
    var timestr		= timeStr();
    var uid 		= window.WCRDocSDK.getUserId();
    var innerInstId	= window.WCRDocSDK.getInnerInstId();
    var lid 		= window.WCRDocSDK.getClassId();
    var utype 		= window.WCRDocSDK.isTeacher() ? 'teacher' : 'student';
	var uname 		= window.WCRDocSDK.getUserName();
	var cv          = window.WCRDocSDK.getCV();
    var guid        = window.WCRDocSDK.getGuid();
	var instid      = window.WCRDocSDK.getInstId();
    var jigouid     = instid == 0 ? ('&instid=' + instid + '&innerInstId=' + innerInstId) : ('&instid=' + instid);
    var nav 		= navigator.appVersion;
    var os 			= 'windows';
    if(nav.indexOf('Windows') !== -1)   os = 'windows'; 
    if(nav.indexOf('Android') !== -1)   os = 'android';    
    if(nav.indexOf('OS') !== -1)        os = 'ios'; 
    
    // url
    var domain = window.WCRDocSDK.getEnviornment() == 'online' ? 's' : 'test-s';
    var url = 'https://' + domain + '.weclassroom.com/critical.gif?';
	var finalUrl = url + 'time=' + timestr + '&guid=' + guid + '&cv=' + cv + '&os=' + os + '&uid=' + uid + '&utype=' + utype + jigouid + '&uname=' + uname + '&lid=' + lid + '&opt=key_tip' + '&module=doc' + '&subopt=' + subopt + '&status=' + status + '&code=' + code + '&extra=' + extra;	

    // ajax
    window.novaUtil.ajax({
    	url : finalUrl
    });
};
function timeStr(){
	var now = new Date();
	
	var year = now.getFullYear();       //年
	var month = now.getMonth() + 1;     //月
	var day = now.getDate();            //日
	
	var hh = now.getHours();            //时
	var mm = now.getMinutes();          //分
	var ss = now.getSeconds(); 
	
	var clock = year + "-";
	
	if(month < 10) clock += "0";
	
	clock += month + "-";
	
	if(day < 10) clock += "0";
	
	clock += day + " ";
	
	if(hh < 10) clock += "0";
	
	clock += hh + ":";
	
	if (mm < 10) clock += '0'; 
	
	clock += mm + ":"; 
	
	if (ss < 10) clock += '0'; 
	
	clock += ss; 
	return(clock); 
}

/**
 * judge env
 */
window.novaUtil.judgeEnv = function(){
	if(!window.WCRDocSDK || !window.WCRDocSDK.getEnviornment || !window.WCRDocSDK.getRemoteUrl) return;

	var env = window.WCRDocSDK.getEnviornment();
    if(env != 'online') return;
    
    var courseUrl = window.WCRDocSDK.getRemoteUrl();
	
    var url = 'https://in.weclassroom.com/pcourse/nova/check';
    window.novaUtil.ajax({
        url : url,
        type: 'POST',
        data: {
        	url : courseUrl
        },
        onsuccess : function(s){
        	if(!s) return;
        	
        	try{
        		var json = JSON.parse(s);
        		if(json && json.type == 'success'){
        			var isEn = window.nova.lan() == 'en' ? true : false;
        			
        			window.novaUtil.showConfirm({
        				type 		: 'alert',
        				title		: isEn ? 'Prompt' : '提示',
						text 		: isEn ? 'The courseware has not been tested and can not be used!' : '该课件未通过测试，无法使用！',
						okText		: isEn ? 'Ok' : '确定',
						hideClose	: true
        			}, function(){
        				cc.find('Canvas').destroy();
        			});
        		}
        	}catch(e){
        		console.log(e);
        	}
        }
    });
};

/**
 * set workspace
 */
window.novaUtil.setWorkspace = function(){
    var docHeightProportion	= document.documentElement.clientHeight / 490;
    var docWidthProportion 	= docHeightProportion;

    if(window.WCRDocSDK && window.WCRDocSDK.setupICourseVersion) window.WCRDocSDK.setupICourseVersion('1.1');
    if(window.WCRDocSDK && window.WCRDocSDK.setupCourseWorKSpace) window.WCRDocSDK.setupCourseWorKSpace(191.5 * docWidthProportion, 38 * docHeightProportion, 735 * docWidthProportion, 413 * docHeightProportion);
};

/**
 * sdk setup
 */
WCRDocSDK.setup({
	'msg_callback' : receiveCoursewareMessage
}, function(err, description){
	if(err) return;
	
	window.novaUtil.setWorkspace();
});

/**
 * receive and handler 
 */
function receiveCoursewareMessage(content){
    try {
    	// teacher
    	if(content.msg == 'nova.teacher.start') 					handlerTeacherStartTimeOut(content.body);
    	if(content.msg == 'nova.teacher.change') 					handlerTeacherChange(content.body);
    	if(content.msg == 'nova.teacher.crown')						handlerTeacherCrown(content.body);
    	if(content.msg == 'nova.teacher.diamonds')					handlerTeacherDiamonds(content.body);
        if(content.msg == 'nova.teacher.click') 					handlerTeacherClick(content.body);
        if(content.msg == 'nova.teacher.drag') 						handlerTeacherDrag(content.body);
        if(content.msg == 'nova.teacher.card') 						handlerTeacherCard(content.body);
        if(content.msg == 'nova.teacher.cardPk') 					switchCard(content.body);
        if(content.msg == 'nova.teacher.studentConfirmGroup') 		studentConfirmGroup(content.body);
        if(content.msg == 'nova.teacher.goodRightClick') 			goodRightClick(content.body);
        if(content.msg == 'nova.teacher.goodLeftClick') 			goodLeftClick(content.body);
        if(content.msg == 'nova.teacher.studentRestart') 			studentRestart(content.body);
        if(content.msg == 'nova.teacher.changeCommonPeopleLeft') 	changeCommonPeopleLeft(content.body);
        if(content.msg == 'nova.teacher.changeCommonPeopleRight')	changeCommonPeopleRight(content.body);
        if(content.msg == 'nova.teacher.clickAndStop') 				handlerTeacherClickAndStop(content.body);

        //语文倒计时
        if (content.msg == 'nova.teacher.start.02') handlerTeacherStartTimeOut_02(content.body);
        //语文老师奖励
        if (content.msg == 'nova.teacher.rewards') handlerTeacherStartRewards(content.body);
        //语文上下页切换卡片
        if (content.msg == 'nova.teacher.toggle.card') handlerTeacherToggleCard(content.body);
        
        // student
        if(content.msg == 'nova.student.answer') 					handlerStudentAnswer(content.body && content.body.body ? content.body.body : content.body);
        if (content.msg == 'nova.student.wrongAnswer') 				handlerStudentWrongAnswer(content.body && content.body.body ? content.body.body : content.body);
        
        // client
        if(content.msg == 'docNotifyMessage.roomUserOnlineListChange') handlerClientUpdate();
    }catch(e){
    	console.log(e);
    }
}

// handler teacher start time out
function handlerTeacherStartTimeOut(){
    window.novaUtil.wrongNum = 0;
    window.novaUtil.showTimeOut();
    
    window.localStorage.setItem('wrongNum',0);
};

// handler teacher change
function handlerTeacherChange(body){
	window.novaUtil.log('01_收到翻页消息：' + (body ? JSON.stringify(body) : body));
	
	if(body && body.name){
		window.nova.studentDragLength = 0;
		window.novaUtil.loadScene(body.name,function(){
			 window.novaUtil.stopAll();
		});
	} 
}

// handler teacher crown
function handlerTeacherCrown(body){
	window.novaUtil.showCrown(body);
}

//handler teacher diamonds
function handlerTeacherDiamonds(body){
    if(body.isShow){
        window.novaUtil.showDiamonds(body.users);
    }else{
        window.novaUtil.hideDiamonds(); 
    }
}

// handler teacher click
function handlerTeacherClick(body){
	if(cc && body && body.name && body.cmds){
		var node = cc.find('Canvas/student/' + body.name) || cc.find('Canvas/student/kadui/' + body.name);
		
		var cmds = body.cmds;
		for(var i=0; i<cmds.length; i++){
			var cmd = cmds[i];
			
			if(cmd.name == 'hide') 	cc.find('Canvas/student/' + cmd.target).opacity = 0;
			if(cmd.name == 'show') 	cc.find('Canvas/student/' + cmd.target).opacity = 255;
			if(cmd.name == 'play') 	playMusic(node, '01_click', 'clickAudio');
			if(cmd.name == 'scale')	node.runAction(cc.sequence(cc.scaleTo(0.08, 1.2, 1.2), cc.scaleTo(0.08, 1, 1)));
			if(cmd.name == 'anim'){
				var anim = node.getComponent(cc.Animation);
				if(anim) anim.play(cmd.target);   
			}
			if(cmd.name == 'open'){
				var self = this;
				
				var beginAction = cc.scaleTo(0.1, 0, 1);
				var endAction = cc.callFunc(function(){
					var action1 = cc.scaleTo(0.1, 1, 1);
					var action2 = cc.scaleTo(0.1, 1.1);
					
					cc.find('Canvas/student/' + cmd.target).runAction(cc.sequence(action1, action2));
				});            
				
				node.runAction(cc.sequence(beginAction, endAction));
			}
			if(cmd.name == 'close'){
				var self = this;
				
				var action1 = cc.scaleTo(0.1, 1);
				var action2 = cc.scaleTo(0.1, 0, 1);
				var endAction = cc.callFunc(function(){
					cc.find('Canvas/student/' + cmd.target).runAction(cc.scaleTo(0.1, 1, 1));    
				}); 
				
				node.runAction(cc.sequence(action1, action2, endAction));
			}
		}
	}
}

// handle teacher  clic music  And  Animation 
function handlerTeacherClickAndStop(body) {
    var anim = '';
    var animState = '';
    var audioID = '';

    if (cc && body && body.name && body.cmds) {
        var node = cc.find('Canvas/student/' + body.name) || cc.find('Canvas/student/kadui/' + body.name);
        var cmds = body.cmds;

        // stop
        cc.audioEngine.stopAll();
        if(node.parent.anim && node.parent.animState) node.parent.anim.stop(node.parent.animState.name);

        if (node.parent.preNode != node) {
            for (var i = 0; i < cmds.length; i++) {
                var cmd = cmds[i];
                if (cmd.name == 'playAction') {
                    var js = node.getComponents('anim_click');
                    if (js && js.length && js[0]['clickAudio']) {
                        audioID = cc.audioEngine.playEffect(js[0]['clickAudio'], false);
                        cc.audioEngine.setFinishCallback(audioID, function() {
                            anim.stop(animState.name);
                        })
                    }
                }

                if (cmd.name == 'anim') {
                    anim = node.getComponent(cc.Animation);
                    if (anim) {
                        animState = anim.play(cmd.target);
                    }
                }
            }
            node.parent.preNode = node;
            node.parent.anim = anim;
            node.parent.animState = animState;
        } else {
            node.parent.preNode = "";
        }
    }
}

// handler teacher drag
window.novaDrag = {};
window.novaDrag.init = [];
window.novaDrag.area = null;

function handlerTeacherDrag(body){
	if(cc && body.action && body.name && body.cmds){
		var node = cc.find('Canvas/student/' + body.name);
		if(!node) return;
		
		if(body.action == 'drag_start'){
			window.novaDrag.area = calcArea(body.cmds);
			
            node.zIndex = 1000;
		}

		if(body.action == 'drag_ing'){
            node.x += body.x;
            node.y += body.y;
		}

		if(body.action == 'drag_end'){
			var judge = judgeDrag(node.x, node.y, window.novaDrag.area);
			
			if(judge){
				node.runAction(cc.scaleTo(0.1, 1.0));
				
				playMusic(node, '02_drag', 'dragRightAudio');
			}else{
				var initVars = getInitVars(body.name);
				
				node.x = initVars.x;
				node.y = initVars.y;
				node.zIndex = initVars.i;
				node.runAction(cc.scaleTo(0.1, 1));
				
				playMusic(node, '02_drag', 'dragWrongAudio');
			}
		}
	}
}

function calcArea(cmds){
	var targetNode = cc.find('Canvas/student/' + cmds[0].target);
	if(!targetNode) return null;

	var x = targetNode.x;
	var y = targetNode.y;
	var width = targetNode.width;
	var height = targetNode.height;
	
	var ss = [];
	ss.push(x + parseInt(width / 2));
	ss.push(x - parseInt(width / 2));
	ss.push(y + parseInt(height / 2));
	ss.push(y - parseInt(height / 2));
	
	return ss;
}

function judgeDrag(x, y, area){
	return area ? (x < area[0] && x > area[1] && y < area[2] && y > area[3]) : false;
}

function getInitVars(name){
	var obj = {};
	
	for(var i=0; i<window.novaDrag.init.length; i++){
		var item = window.novaDrag.init[i]; 
		if(name == item.name){
			obj.x = item.x;
			obj.y = item.y;
			obj.i = item.i;
			
			break;
		}
	}
	
	return obj;
}

function playMusic(node, jsName, mName){
    var js = node.getComponents(jsName);
    if(js && js.length && js[0][mName]) cc.audioEngine.playEffect(js[0][mName], false);      
}

// handler teacher card
function handlerTeacherCard(body){
    var activeCard 		= body.activeCard;
    var cards 			= body.cards;
    var isInitialization= body.isInitialization;

    if(cc.find('Canvas/Sprite')) cc.find('Canvas/Sprite').destroy();
    if (activeCard && cards.length && !isInitialization) {
        var currentNode = cc.find('Canvas/student/kadui/' + activeCard);
        if(!currentNode) return;

        // ----------------------------------------
        currentNode.zIndex = 1002;
        var anim1 = cc.moveBy(0.4, -500, 20);
        var anim2 = cc.rotateBy(0.4, -30);
        var anim3 = cc.scaleBy(0.4, 0.6);
        var anim4 = cc.fadeOut(0.4, 0);
        currentNode.runAction(cc.spawn(anim1,anim2,anim3,anim4));
        // --------------------------------------------
        
        window.novaUtil.wrongNum = 0;
        window.localStorage.setItem('wrongNum',0);

        var nextNode = cc.find('Canvas/student/kadui/' + self.getNextCard(activeCard, cards));
        nextNode.opacity = 255;
        nextNode.zIndex = 1000;
        playMusic(nextNode, '01_click', 'clickAudio');
        // reset card
        var kadui = [
                     'Canvas/student/choice_01',
                     'Canvas/student/choice_02',
                     'Canvas/student/choice_03',
                     'Canvas/student/choice_04'
                     ];
        for(var i=0; i<kadui.length; i++){
        	var choiceNode = cc.find(kadui[i]);
        	if(choiceNode){
        		var choiceJs = choiceNode.getComponent('03_choice');
        		if(choiceJs && choiceJs.resetBtn) choiceJs.resetBtn();
        	}
        }
    }else{
        var currentNode = cc.find('Canvas/student/kadui/'+ activeCard);
        // ------------延迟加载a的发声-------------------------
        var timer = setInterval(function(){
            if(!cc.find('Canvas/prefab_06_timeout')){
                playMusic(currentNode, '01_click', 'clickAudio');
                clearInterval(timer);
            } 
        },300);
        // ---------------------------------------------------
    }
}

function getNextCard(activeCard, cards){
    for(var i=0; i<cards.length; i++){
        if(cards[i] == activeCard) return i == cards.length - 1 ? null : cards[i + 1];
    }
}

// pk
function switchCard() {
    cc.find('Canvas/game').getComponent("stuGame").switchCard();
}
function studentConfirmGroup(content){
    cc.find('Canvas/game').getComponent("stuGame").studentConfirmGroup(JSON.parse(content.imgs));
}
function goodRightClick(content){
    cc.find('Canvas/game').getComponent("stuGame").goodRightClick(content.imgs);
}
function goodLeftClick(content){
    cc.find('Canvas/game').getComponent("stuGame").goodLeftClick(content.imgs);
}
function studentRestart(content){
    cc.find('Canvas/game').getComponent("stuGame").studentRestart(content.imgs);
}
function changeCommonPeopleLeft(content){
    cc.find('Canvas/game').getComponent("stuGame").changeCommonPeopleLeft(content.imgs);
}
function changeCommonPeopleRight(content){
    cc.find('Canvas/game').getComponent("stuGame").changeCommonPeopleRight(content.imgs);
}

// handler student answer
function handlerStudentAnswer(user){
	if(cc){
		var _teacher_normal	= cc.find('Canvas/_teacher');
		var _teacher_drag	= cc.find('Canvas/_teacher_drag');
		var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
		var _teacher_choice = cc.find('Canvas/_teacher_choice');
		var _teacher_pk 	= cc.find('Canvas/_teacher_pk');
		
		var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
		if(_teacher){
			var _teacherJs = _teacher.getComponent('_teacher');
			if(_teacherJs && _teacherJs.modifyRows) _teacherJs.modifyRows(user);
			
			// redis
			if(window.nova && window.nova.updateStudent) window.nova.updateStudent(user);
			
			// auth
			if(window.nova && window.nova.teacherSetAuthSingle) window.nova.teacherSetAuthSingle(user.uid);

			// --------------教师收到学生作答结果，并且出现小红旗=------------
			var status = 0;
			var subopt = 'get_student_answer';
			var code = 5004;
			var extra = '收到学生完成作答';
			window.novaUtil.dataUpload(status,subopt,code,extra);
			// ----------------------------------------------------------------
		}
	}
}

// handler student wrong answer
function handlerStudentWrongAnswer(user) {
    var _teacher_normal = cc.find('Canvas/_teacher');
    var _teacher_drag   = cc.find('Canvas/_teacher_drag');
    var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
    var _teacher_choice = cc.find('Canvas/_teacher_choice');
    var _teacher_pk     = cc.find('Canvas/_teacher_pk');
    
    var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
    if(_teacher){
        var _teacherJs = _teacher.getComponent('_teacher');
        if(_teacherJs && _teacherJs.modifyRows) _teacherJs.modifyRows(user);
        console.log('_teacher');

        // redis
        if(window.nova && window.nova.updateStudent) window.nova.updateStudent(user);
    }
};

//handler client update
function handlerClientUpdate() {
    if (!cc) return;

    var _teacher_normal = cc.find('Canvas/_teacher');
    var _teacher_drag = cc.find('Canvas/_teacher_drag');
    var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
    var _teacher_choice = cc.find('Canvas/_teacher_choice');
    // var _teacher_pk = cc.find('Canvas/_teacher_pk');
    var  _teacher_pk = cc.find('Canvas/game');

    var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
    if (!_teacher) return;
    
    var _teacherJs = null;
    if (_teacher == _teacher_pk) {
    _teacherJs = _teacher.getComponent('teaGame');
    }else{
       _teacherJs = _teacher.getComponent('_teacher');  
    }
    if (!_teacherJs || !_teacherJs.initRows) return;

    window.nova.getStudentStatus(function(value){
        if (value){
            var result = JSON.parse(value);  
            window.novaUtil.startStudentListArray = result.start;
            window.novaUtil.finishedStudentArray = result.finish;
            window.novaUtil.beginFlag = result.beginFlag == 'true' ? true : false;
        }
        
        _teacherJs.initRows();
    });
}

/**
 * nova common
 */
window.nova = {};
window.nova.lan = function(){
	return window.WCRDocSDK && window.WCRDocSDK.getCurrentLanguage && window.WCRDocSDK.getCurrentLanguage() == 'en'? 'en' : 'zh';
};
window.nova.docId = function(){
	return window.WCRDocSDK && window.WCRDocSDK.docId ? window.WCRDocSDK.docId() : null;
};
window.nova.isTeacher = function(){
	return window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
};
window.nova.userList = function(){
	return window.WCRDocSDK && window.WCRDocSDK.getUserStatusList ? window.WCRDocSDK.getUserStatusList() : null;
};

/**
 * nova teacher
 */
window.nova.teacherStart = function(){
	if(!window.nova.isTeacher()) return;
	
    // record start time
    window.novaUtil.startTimeS = window.novaUtil.timerS + 3;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.start', {});
};
window.nova.teacherChange = function(name){
	if(!window.nova.isTeacher()) return;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.change', {
		name : name
	});
};
window.nova.teacherSetPkAuth = function(){
	if(!window.nova.isTeacher()) return;
	
	if(window.WCRDocSDK && window.WCRDocSDK.getUserStatusList && window.WCRDocSDK.getDocId && window.WCRDocSDK.setUsersPKList){
		var users = JSON.parse(window.WCRDocSDK.getUserStatusList());
		if(!users || !users.length) return;

		var ss = [];
		for(var i=0; i<users.length; i++){
			ss.push({
				uid         		: users[i].uid,
				mute				: 'false',
				authorize			: 'false',
				docMode				: 'true',
				showBar				: 'false',
				x					: '-1',
				y					: '-1',
				width				: '-1',
				height				: '-1'
			});
		}
		if(!ss.length) return;
		
		var docId = window.WCRDocSDK.getDocId();
		var obj = {
			docId       		: docId,
			authorizePrivilege	: 'false',
			videoPrivilege		: 'false',
			userList    		: ss
		};
		window.WCRDocSDK.setUsersPKList(JSON.stringify(obj));
    }
};
window.nova.teacherSetAuth = function(auth, n){
	if(!window.nova.isTeacher()) return;
	
    if(window.WCRDocSDK && window.WCRDocSDK.setAuthorizeUsers && window.WCRDocSDK.getUserStatusList && window.WCRDocSDK.getDocId){
        var users = JSON.parse(window.WCRDocSDK.getUserStatusList());
        if(!users || !users.length) return;

        var ss = [];
        for(var i=0; i<users.length; i++){
            ss.push({
                uid         : users[i].uid,
                authorize   : auth,
                docMode     : n ? 'true' : auth,
                showBar     : 'false'
            });
        }
        if(!ss.length) return;

        var docId = window.WCRDocSDK.getDocId();
        var obj = {
    		docId       		: docId,
			authorizePrivilege	: n ? 'false' : 'true',
			videoPrivilege		: 'false',
			userList    		: ss
        };

        window.WCRDocSDK.setAuthorizeUsers(JSON.stringify(obj));
    }
};
window.nova.teacherSetAuthSingle = function(userid){
	if(!window.nova.isTeacher()) return;
	
	if(window.WCRDocSDK && window.WCRDocSDK.setAuthorizeUsers && window.WCRDocSDK.getDocId){
		var ss = [{
			uid         : userid,
			authorize   : 'false',
			docMode     : 'false',
			showBar     : 'false'
		}];
		
		var docId = window.WCRDocSDK.getDocId();
		var obj = {
			docId       		: docId,
			authorizePrivilege	: 'true',
			videoPrivilege		: 'false',
			userList    		: ss
		};
		
		window.WCRDocSDK.setAuthorizeUsers(JSON.stringify(obj));
	}
};
window.nova.teacherShowCrown = function(imgs, names){
	if(!window.nova.isTeacher()) return;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.crown', {
		imgs : imgs,
		names: names
	});
};
window.nova.teacherShowDiamonds = function(users, isShow){
	if(!window.nova.isTeacher()) return;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.diamonds', {
		users : users,
        isShow : isShow
	});
};
window.nova.teacherClick = function(data, cmds){
	if(!window.nova.isTeacher()) return;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.click', {
		name : data.name,
		cmds : cmds
	});
	
	// sync status
    window.nova.syncStatus();
};
window.nova.teacherClickAndStopClick = function(data, cmds) {
    if (!window.nova.isTeacher()) return;

    // send msg
    window.WCRDocSDK.sendMessage('nova.teacher.clickAndStop', {
        name: data.name,
        cmds: cmds
    });

    // sync status
    window.nova.syncStatus();
};
window.nova.teacherDrag = function(action, data, cmds, x, y){
	if(!window.nova.isTeacher()) return;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.drag', {
		action	: action,
		name 	: data.name,
		cmds 	: cmds,
		x		: x,
		y		: y
	});
	
	// sync status
	if(action == 'drag_end') window.nova.syncStatus();
};
window.nova.teacherCard = function(activeCard, cards, isInitialization){
	if(!window.nova.isTeacher()) return;
	
	if(cc.find('Canvas/Sprite')) cc.find('Canvas/Sprite').destroy();
    
	// record the time of change card
    window.novaUtil.startTimeS = window.novaUtil.timerS;
	
	// send msg
	window.WCRDocSDK.sendMessage('nova.teacher.card', {
		activeCard : activeCard,
		cards : cards,
        isInitialization : isInitialization
	});
	
    if (!isInitialization) {
        // hide flag
        window.nova.teacherHideFlag();

        // set auth
        window.nova.teacherSetAuth('true');

        // sync status
        window.nova.syncStatus();
        
        // clear
        window.nova.set(window.nova.key() + '_student', '');
    }
};
window.nova.teacherShowFlag = function(json){
	if(!window.nova.isTeacher()) return;

	// send msg
	window.WCRDocSDK.setUsersAnswerStatus(json);
};
window.nova.teacherHideFlag = function(){
	try{
		if(!window.nova.isTeacher()) return;
		
		var users = JSON.parse(window.nova.userList());
		if(!users || !users.length) return;
		
		var ss = [];
		for(var i=0; i<users.length; i++){
			ss.push({
				uid: users[i].uid,
				status: 'false'
			});
		}
		
		// send msg
		window.WCRDocSDK.setUsersAnswerStatus(JSON.stringify({
			docId: window.nova.docId(),
			userList: ss
		}));
	}catch(e){
		console.log(e);
	}
};

/**
 * nova student
 */
window.nova.studentDragLength = 0;
window.nova.studentDragAnswer = function(els){
	window.nova.studentDragLength++;
	if(window.nova.studentDragLength == els) window.nova.studentAnswer();
};
window.nova.studentAnswer = function(){
	if(window.nova.isTeacher()) return;
	
	var docId		= window.WCRDocSDK.getDocId();
	var userId		= window.WCRDocSDK.getUserId();
	var userName	= window.WCRDocSDK.getUserName();
	var userImg		= window.WCRDocSDK.getUserAvatar();
	
	// status set
	var setStudentState = {
		docId: docId,
		userList: [{
			uid: userId,
			status: 'true'
		}]
	};
	
	// status change
	window.nova.studentDragLength = 0;
	window.WCRDocSDK.sendMessage('nova.student.answer', {
		uid 		: userId,
		username	: userName,
		userAvatar	: userImg,
		json		: setStudentState
	});

	// show success
	window.novaUtil.showSuccess(); 
	
	// -------------------学生完成作答--------------
	var status = 0;
	var subopt = 'student_answer';
	var code = 5003;
	var extra = '学生完成作答';
	window.novaUtil.dataUpload(status,subopt,code,extra);
	// -----------------------------------------------
};

// 学生答错
window.nova.studentWrongAnswer = function(wrongNum){
    if(window.nova.isTeacher()) return;
    
    var docId       = window.WCRDocSDK.getDocId();
    var userId      = window.WCRDocSDK.getUserId();
    var userName    = window.WCRDocSDK.getUserName();
    var userImg     = window.WCRDocSDK.getUserAvatar();
    
    // status set
    var setStudentState = {
        docId: docId,
        userList: [{
            uid: userId,
            status: 'false',
            wrong: window.novaUtil.wrongNum
        }]
    };
    
    window.WCRDocSDK.sendMessage('nova.student.wrongAnswer', {
        uid         : userId,
        username    : userName,
        userAvatar  : userImg,
        json        : setStudentState
    });
};

/**
 * nova key set get
 */
window.nova.key = function(){
	var appId 	= window.WCRDocSDK.getInstId();
	var orgId 	= window.WCRDocSDK.getInnerInstId();
	var classId = window.WCRDocSDK.getClassId();
	var docId	= window.WCRDocSDK.getDocId();
	var key 	= appId + '_' + orgId + '_' + classId + '_' + docId;

	return key;
};
window.nova.set = function(name, value){
	window.WCRDocSDK.sendMessageWithCallback('nova.status.set', {
		name : name,
		value: value
	}, function(content){
//		console.log('redis set:' + JSON.stringify(content));
	});
};
window.nova.get = function(name, cb){
	// redis
	window.WCRDocSDK.sendMessageWithCallback('nova.status.get', {
		name : name,
	}, function(content){
		cb(content.msg);
//		console.log('redis get:' + JSON.stringify(content));
	});
};

/**
 * nova set get scene
 */
window.nova.setScene = function(name){
	try{
		var key = window.nova.key() + '_scene';
		var value = name || cc.director.getScene().name;
		
		window.nova.set(key, value);
	}catch(e){
		console.log(e);
	}
};
window.nova.getScene = function(cb){
	try{
		var key = window.nova.key() + '_scene';
		
		window.nova.get(key, cb);
	}catch(e){
		console.log(e);
	}
};

/**
 * nova set get clear status
 */
window.nova.setStatus = function(value){
	var key = window.nova.key() + '_status';
	
	window.nova.set(key, value);
};
window.nova.getStatus = function(cb){
	var key = window.nova.key() + '_status';
	
	window.nova.get(key, cb);
};
window.nova.clearStatus = function(){
	// status
	window.nova.setStatus('');
	
	// key
	var key = window.nova.key();
	
	// clear
	window.nova.set(key + '_begin', 		'');
	window.nova.set(key + '_end', 			'');
	window.nova.set(key + '_student', 		'');
    window.nova.set(key + '_studentStatus', '');
	window.nova.set(key + '_teacherStatus',	'');
	window.nova.set(key + '_stuStatus', 	'');
	window.nova.set(key + '_goodLabel', 	'');
};

/**
 * nova sync status
 */
window.nova.syncStatus = function(){
	if(!window.nova.isTeacher()) return;
	
	setTimeout(function(){
		if(cc && cc.find('Canvas')){
			// scene
			window.nova.setScene();
			
			// status
			var node = cc.find('Canvas');
			var allNodeStatus = childrenStatus(node, node.name);
			
			window.nova.setStatus(JSON.stringify(allNodeStatus));
		}
	}, 400);
};
function childrenStatus(node, nodeName){
	var ss = [];
	if(node && node.children && node.children.length){
		for(var i=0; i<node.children.length; i++){
			var cNode = node.children[i];
			var cNodeName = nodeName + '/' + cNode.name;

			if(cNodeName.indexOf('Canvas/student') > -1){
				ss.push({
					name 		: cNodeName,
					x			: cNode.x,
					y			: cNode.y,
					width		: cNode.width,
					height		: cNode.height,
					rotationX	: cNode.rotationX,
					rotationY 	: cNode.rotationY,
					scaleX 		: cNode.scaleX,
					scaleY 		: cNode.scaleY,
					skewX 		: cNode.skewX,
					skewY 		: cNode.skewY,
					opacity 	: cNode.opacity,
					zIndex 		: cNode.zIndex
				});
				
				if(cNode.children && cNode.children.length) ss = ss.concat(childrenStatus(cNode, cNodeName));
			}
		}
	}

	return ss;
};

/**
 * nova init status
 */
window.nova.initStatus = function(){
	setTimeout(function(){
		// init node
		window.nova.getStatus(function(value){
			if(!cc || !value) return;
			
			try{
				var els = JSON.parse(value);
				if(els && els.length){
					// init node
					for(var i=0; i<els.length; i++) initNode(els[i]);
					
					// not student
					var node = cc.find('Canvas/student');
					if(window.nova.isTeacher() || !node) return;
					
					// init student
	            	var moveAction = cc.place(0, 0);
	                var scaleAction = cc.scaleTo(0, 1);
	                node.runAction(cc.sequence(moveAction, scaleAction));
				}
			}catch(e){
				console.log(e);
			}
		});
		
		// init begin
		initBegin();
		
		// init end
		initEnd();
		
		// init rank
		initRank();
		
		// init diamonds
		initDiamonds();
	}, 400);
};
function initNode(el){
	var node = cc.find(el.name);
	if(node){
		node.x			= el.x;
		node.y			= el.y;
		node.width		= el.width;
		node.height		= el.height;
		node.rotationX	= el.rotationX;
		node.rotationY 	= el.rotationY;
		node.scaleX 	= el.scaleX;
		node.scaleY 	= el.scaleY;
		node.skewX 		= el.skewX;
		node.skewY 		= el.skewY;
		node.opacity 	= el.opacity;
		node.zIndex 	= el.zIndex;
	}
}
function initBegin(){
	window.nova.getBegin(function(s){
		if(s == 'true'){
			var beginBtn = cc.find('Canvas/_teacher_drag/ui_di_03/btns/begin') || cc.find('Canvas/_teacher_choice/ui_di_03/btns/begin');
	        if(beginBtn){
	            var _beginJs = beginBtn.getComponent('01_begin');
	            if(_beginJs && _beginJs.disBtn) _beginJs.disBtn();
	            if(_beginJs && _beginJs.activeOtherBtns) _beginJs.activeOtherBtns();
	        }
	        
	        // set auth
            if(window.nova && window.nova.teacherSetAuth) window.nova.teacherSetAuth('true');
		}
	});
}
function initEnd(){
	window.nova.getEnd(function(s){
		if(s == 'true'){
	        var changeBtn = cc.find('Canvas/_teacher_drag/ui_di_03/btns/change') || cc.find('Canvas/_teacher_choice/ui_di_03/btns/change');
	        if(changeBtn){
	            var _changeJs = changeBtn.getComponent('04_change');
	            if(_changeJs && _changeJs.disBtn) _changeJs.disBtn();
	        }
		}
	});
}
function initRank(){
    window.nova.getStudentStatus(function(value){
        if(value){
            var result = JSON.parse(value);  
            
            window.novaUtil.startStudentListArray = result.start;
            window.novaUtil.finishedStudentArray = result.finish;
            window.novaUtil.beginFlag = result.beginFlag == 'true' ? true : false;
        }
        
        handlerClientUpdate();
    });
	
	window.nova.getStudent(function(value){
		try{
			if(!value) return;
			
			var users = JSON.parse(value);
			if(!users || !users.length) return;
			
			for(var i=0; i<users.length; i++) initStudentAnswer(users[i]);
		}catch(e){
			console.log(e);
		}
	});
}
function initStudentAnswer(user){
	if(cc){
		var _teacher_normal	= cc.find('Canvas/_teacher');
		var _teacher_drag	= cc.find('Canvas/_teacher_drag');
		var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
		var _teacher_choice = cc.find('Canvas/_teacher_choice');
		var _teacher_pk 	= cc.find('Canvas/_teacher_pk');
		
		var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
		if(_teacher){
			var _teacherJs = _teacher.getComponent('_teacher');
			if(_teacherJs && _teacherJs.modifyRows) _teacherJs.modifyRows(user);
			// ------------教师刷新教室，学生如果答题完毕，同步之前状态--------------
			if(user.json.userList[0].status === 'true'){
				window.nova.teacherSetAuthSingle(user.json.userList[0].uid);
				if (window.nova && window.nova.teacherShowFlag) window.nova.teacherShowFlag(JSON.stringify(user.json));
			} 
		}
	}
}
function initDiamonds(){
	window.nova.getDiamonds(function(s){
		if(s == 'true'){
			if(!cc) return;

			var _teacher_normal	= cc.find('Canvas/_teacher');
			var _teacher_drag	= cc.find('Canvas/_teacher_drag');
			var _teacher_stroke = cc.find('Canvas/_teacher_stroke');
			var _teacher_choice = cc.find('Canvas/_teacher_choice');
			var _teacher_pk 	= cc.find('Canvas/_teacher_pk');
			var _teacher = _teacher_normal || _teacher_drag || _teacher_stroke || _teacher_choice || _teacher_pk;
			if(!_teacher) return;

			var _end = cc.find('ui_di_03/btns/end', _teacher);
			if(!_end) return;

			var _endJs = _end.getComponent('06_end');
			if(_endJs && _endJs.showDiamonds) _endJs.showDiamonds(false);
		}
	});
}

/**
 * nova set get begin
 */
window.nova.setBegin = function(){
	// begin
	var key = window.nova.key() + '_begin';
	window.nova.set(key, 'true');
	
	// scene
	window.nova.setScene();
};
window.nova.getBegin = function(cb){
	var key = window.nova.key() + '_begin';
	
	window.nova.get(key, cb);
};

/**
 * nova set get end
 */
window.nova.setEnd = function(){
	var key = window.nova.key() + '_end';
	window.nova.set(key, 'true');
};
window.nova.getEnd = function(cb){
	var key = window.nova.key() + '_end';
	
	window.nova.get(key, cb);
};

/**
 * nova set get diamonds
 */
window.nova.setDiamonds = function(isShowDiamonds){
	var key = window.nova.key() + '_diamonds';
	window.nova.set(key, isShowDiamonds ? 'true' : 'false');
};
window.nova.getDiamonds = function(cb){
    var key = window.nova.key() + '_diamonds';
    
    window.nova.get(key, cb);
};

/**
 * nova set get student
 */
window.nova.setStudent = function(value){
	var key = window.nova.key() + '_student';
	window.nova.set(key, value);
};
window.nova.getStudent = function(cb){
	var key = window.nova.key() + '_student';
	
	window.nova.get(key, cb);
};
window.nova.updateStudent = function(user){
	window.nova.getStudent(function(value){
		try{
			var users = [];
			
			if(value){
				users = JSON.parse(value);
				users = users && users.length ? users : [];
			}
			
			users.push(user);
			window.nova.setStudent(JSON.stringify(users));
		}catch(e){
			console.log(e);
		}
	});
};

/**
 * nova set get student status
 */
window.nova.setStudentStatus = function(value){
    var key = window.nova.key() + '_studentStatus';
    window.nova.set(key, value);
};
window.nova.getStudentStatus = function(cb){
    var key = window.nova.key() + '_studentStatus';
    
    window.nova.get(key, cb);
};
window.nova.updateStudentStatus = function(startAndFinishData){
    window.nova.setStudentStatus(JSON.stringify(startAndFinishData));
};

/*pk*/
window.nova.switchCard = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.cardPk', {
            imgs : imgs
        });
    }
};
window.nova.studentConfirmGroup = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.studentConfirmGroup', {
            imgs : imgs
        });
    }
};
window.nova.goodLeftClick = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.goodLeftClick', {
            imgs : imgs
        });
    }
};
window.nova.goodRightClick = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.goodRightClick', {
            imgs : imgs
        });
    }
};
window.nova.studentRestart = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.studentRestart', {
            imgs : imgs
        });
    }
};
window.nova.changeCommonPeopleLeft = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.changeCommonPeopleLeft', {
            imgs : imgs
        });
    }
};
window.nova.changeCommonPeopleRight = function(imgs){
    if(window.WCRDocSDK.isTeacher()){
        window.WCRDocSDK.sendMessage('nova.teacher.changeCommonPeopleRight', {
            imgs : imgs
        });
    }
};

window.nova.setTeacherStatus = function(obj){
  var key = window.nova.key() + '_teacherStatus';
  var teacherObj = JSON.stringify(obj);
  window.nova.set(key, teacherObj);
};

window.nova.getTeacherStatus = function(cb){
  var key = window.nova.key() + '_teacherStatus'; 
  window.nova.get(key, cb);
};

window.nova.setStuStatus = function(obj){
  var key = window.nova.key() + '_stuStatus';
  var stuObj = JSON.stringify(obj);
  window.nova.set(key, stuObj);
};

window.nova.getStuStatus = function(cb){
  var key = window.nova.key() + '_stuStatus'; 
  window.nova.get(key, cb);
};

window.nova.setGoodLabel = function(obj){
  var key = window.nova.key() + '_goodLabel';
  var labelObj = JSON.stringify(obj);
  window.nova.set(key, labelObj);
};

window.nova.getGoodLabel = function(cb){
  var key = window.nova.key() + '_goodLabel'; 
  window.nova.get(key, cb);
};

//slide api
window.slideAPI = {};
window.slideAPI.index = 0;
window.slideAPI.gotoFirstSlide = gotoFirstSlide;
window.slideAPI.gotoPreviousStep = gotoPreviousStep;
window.slideAPI.gotoNextStep = gotoNextStep;
window.slideAPI.gotoLastSlide = gotoLastSlide;
window.slideAPI.gotoSlide = gotoSlide;
window.slideAPI.gotoSlideStep = gotoSlideStep;
window.slideAPI.currentSlideIndex = currentSlideIndex;
window.slideAPI.currentSlideStep = currentSlideStep;
window.slideAPI.slidesCount = slidesCount;
window.slideAPI.slidesInfo = slidesInfo;
window.slideAPI.slideType = slideType;
window.slideAPI.stepCount = stepCount;
window.slideAPI.gotoNextSlide = gotoNextSlide;
window.slideAPI.gotoPreviousSlide = gotoPreviousSlide;
window.slideAPI.shouldShowPageControlBar = shouldShowPageControlBar;

function shouldShowPageControlBar() {
    return false;
}

function gotoSlideStep() {
}

function gotoPreviousSlide() {
}

function gotoNextSlide() {
}

function stepCount() {
    return 1;
}

// goto first
function gotoFirstSlide() {
}

// goto previous
function gotoPreviousStep() {
}

// goto next
function gotoNextStep() {
}

// goto last
function gotoLastSlide() {
}

// goto slide
function gotoSlide(i) {
}

// current slide
function currentSlideIndex(){
	return window.slideAPI.index;
}

// current slide step
function currentSlideStep() {
    return 0;
}

// slide count
function slidesCount(){
	if(!cc) return 0;

	var _teacher = cc.find('Canvas/_teacher') || cc.find('Canvas/_teacher_choice') || cc.find('Canvas/_teacher_drag');
	var next = _teacher ? cc.find('ui_di_03/next', _teacher) : cc.find('Canvas/teacherBackground/gameBack/next');
	if(!next) return 0;
	
	var nextJs = next.getComponent('00_next');
	if(!nextJs) return 0;
	
	return nextJs.length;
}

// slide info
function slidesInfo() {
    return [];
}

// slide type
function slideType() {
    return 'nova';
}

//reload
setInterval(function(){
	if(!window.WCRDocSDK || !window.WCRDocSDK.isTeacher || window.WCRDocSDK.isTeacher()) return;
	
    window.nova.getScene(function(value){
    	if(!value || !cc || !cc.director || !cc.director.getScene) return;

        if(value != cc.director.getScene().name){
        	window.novaUtil.log('目前场景' + cc.director.getScene().name + '和服务器场景' + value + '不一致，开始刷新课件');
        	setTimeout(function(){
        		window.location.reload();
        	}, 200);
        }
    });
}, 8000);

/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
   var ss = [];
   ss.push('错误信息：');
   ss.push(errorMessage);
   ss.push('\r\n');
   ss.push('出错文件：');
   ss.push(scriptURI);
   ss.push('\r\n');
   ss.push('出错行号：');
   ss.push(lineNumber);
   ss.push('\r\n');
   ss.push('出错列号：');
   ss.push(columnNumber);
   ss.push('\r\n');
   ss.push('错误详情：');
   ss.push(errorObj ? JSON.parse(errorObj) : 'none');

   console.log(ss.join(''));

   window.novaUtil.log(ss.join(''));
}

/**
 * [teacherRewards 语文奖励]
 * @param  {[type]} nodeName [动画节点]
 */
window.nova.teacherRewards = function(nodeName) {
    if (!window.nova.isTeacher()) return;
    // send msg
    window.WCRDocSDK.sendMessage('nova.teacher.rewards', {
        nodeName: nodeName
    });
};

//语文奖励
function handlerTeacherStartRewards(body) {
    window.novaUtil.showRewards(body);
};

/**
 * 语文教师奖励
 */
window.novaUtil.showRewards = function(body) {
    if (!body) return;
    showRewardsAnimation(body);
};

/**
 * [showRewardsAnimation 显示奖励动画]
 * @param  {[type]} body [动画节点]
 */
function showRewardsAnimation(body) {
    var node = cc.find('Canvas/prefab_voice_score_01/bones/' + body.nodeName);
    if (!node) return;
    if (!node.getComponent('anim')) return;
    node.getComponent('anim').showAnim();
}

/**
 * 语文倒计时
 */
window.nova.teacherStart_02 = function(nodeName) {
    if (!window.nova.isTeacher()) return;
    // send msg
    window.WCRDocSDK.sendMessage('nova.teacher.start.02', {
        nodeName: nodeName
    });
};

//语文倒计时
function handlerTeacherStartTimeOut_02(nodeName) {
    window.novaUtil.showTimeOut_02(nodeName);
};

/**
 * 语文倒计时动效
 */
window.novaUtil.showTimeOut_02 = function(nodeName) {
    console.log(nodeName);
    if(nodeName.nodeName){
        var node = cc.find('Canvas/prefab_voice_score_01/' + nodeName.nodeName);
    }else{
        var node = cc.find('Canvas/prefab_voice_score_01/' + nodeName);
    }
    if (!node) return;
    if (!node.getComponent('countdown')) return;
    node.getComponent('countdown').stopOtherAnim();
    var _timeout = cc.find('Canvas/prefab_06_timeout');
    if (!_timeout) return;
    timeoutRotateAnimation_02(_timeout);
    timeoutCountDown_02();
};

/**
 * 语文倒计时
 * @param  {[type]} node [动画节点]
 */
function timeoutRotateAnimation_02(node) {
    node.opacity = 255;
    cc.audioEngine.play(node.getComponent('prefab_06_timeout').timeOutAudio, false, 1);

    cc.find('mask/l', node).runAction(cc.rotateBy(1.5, -180));
    setTimeout(function() {
        cc.find('mask1/r', node).runAction(cc.rotateBy(1.5, -180));
    }, 1500);
}
function timeoutCountDown_02() {
    var i = 3;
    timeoutAnimFn_02(i);

    var timer = setInterval(function() {
        var node = cc.find('Canvas/prefab_06_timeout/number' + i);
        if (node) node.opacity = 0;

        if (--i < 0) {
            clearInterval(timer);
            window.localStorage.setItem('countdown', 1);
            return;
        }

        timeoutAnimFn_02(i);
    }, 1000);
}
function timeoutAnimFn_02(i) {
    var anim1 = cc.scaleTo(0.5, 1);
    var anim2 = cc.scaleTo(0.5, 1);
    var timeOutNum = cc.find('Canvas/prefab_06_timeout/number' + i);

    if (timeOutNum) {
        timeOutNum.opacity = 255;
        timeOutNum.runAction(cc.sequence(anim1, anim2));
    } else if (i == 0) {
        var node = cc.find('Canvas/prefab_06_timeout');
        if (node) node.opacity = 0;
    }
}

/**
 * 语文切换卡片
 * @param  {[type]}  marking          [按钮标记（nextPageBtn、upPageBtn）]
 * @param  {Boolean} isInitialization [description]
 */
window.nova.toggleCard = function(marking, isInitialization) {
    if (!window.nova.isTeacher()) return;
    if (cc.find('Canvas/Sprite')) cc.find('Canvas/Sprite').destroy();
    // record the time of change card
    window.novaUtil.startTimeS = window.novaUtil.timerS;
    // send msg
    window.WCRDocSDK.sendMessage('nova.teacher.toggle.card', {
        marking: marking,
        isInitialization: isInitialization
    });
    if (!isInitialization) {
        // sync status
        window.nova.syncStatus();
        // clear
        window.nova.set(window.nova.key() + '_student', '');
    }
};

/**
 * 语文学生端接受卡片切换
 * @param  {[type]} body [按钮标记（nextPageBtn、upPageBtn）]
 * @return {[type]}      [description]
 */
function handlerTeacherToggleCard(body) {
    var marking = body.marking;
    var isInitialization = body.isInitialization;
    if (marking && !isInitialization) {
        if (marking == "nextPageBtn") {
            var node = cc.find('Canvas/student/nextPageBtn');
            if (!node) return;
            if (!node.getComponent('toggle_card')) return;
            node.getComponent('toggle_card').nextPageBtn();
        } else if (marking == "upPageBtn") {
            var node = cc.find('Canvas/student/upPageBtn');
            if (!node) return;
            if (!node.getComponent('toggle_card')) return;
            node.getComponent('toggle_card').upPageBtn();
        }
    }
};