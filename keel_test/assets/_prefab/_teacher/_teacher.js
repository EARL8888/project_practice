cc.Class({
    extends: cc.Component,

    properties: {
    	version:'2.1.1',
        rows1: [],
        rows2: [],
        rankIndex: 0,
        rankArray: [],
        rank1En: {
            type: cc.SpriteFrame,
            default: null
        },
        rank1Zh: {
            type: cc.SpriteFrame,
            default: null
        },
        rank2En: {
            type: cc.SpriteFrame,
            default: null
        },
        rank2Zh: {
            type: cc.SpriteFrame,
            default: null
        }
    },
    onLoad: function() {
        var self = this;

        // init fps
        self.initFPS();

        // show version
        window.novaUtil.showVersion();

        // show teacher or student
        if (window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher()) {
            // scale student scene
            var node = cc.find('Canvas/student');
            if (node) {
                var scaleAction = cc.scaleTo(0.1, 1);
                var moveAction = cc.place(0, 0);
                node.runAction(cc.sequence(scaleAction, moveAction));
            }

            // timer
            window.novaUtil.timer(self, cc.find('ui_di_03/time_txt', self.node));

            // init rank
            self.initRank();

            // show teacher
            var btns;
            // self.node._name: _teacher节点，在不同场景下的场景名
            var nodeName = self.node._name;

            if (nodeName == '_teacher') btns = [];
            if (nodeName == '_teacher_drag') btns = ['begin', 'crown'];
            if (nodeName == '_teacher_stroke') btns = ['begin', 'crown'];
            if (nodeName == '_teacher_choice') btns = ['begin', 'change', 'crown'];
            if (nodeName == '_teacher_pk') btns = ['confirm', 'again', 'change'];

            if (btns) {
                window.novaUtil.showTeacher(btns);

                if (btns.length) {
                    // get rows    初始化学生名单
                    self.rows1 = self.getRows();
                } else {
                    cc.find('ui_rank_01', self.node).destroy();
                }
            }

            //show page count 
            var games = require('../../_common/_games');
            var gameName = cc.director.getScene().name;
            for (var i = 0; i < games.length; i++) {
                if (games[i].name === gameName) {
                    if (games && games.length) {
                        cc.find('ui_di_03/pageCount', self.node).getComponent(cc.RichText).string = '<color=#ffffff>( </color><color=#F1DF10>' + (i + 1) + '</color><color=#ffffff>/' + games.length + ' )</color>';
                        break;
                    }
                }
            }

            //teacher size
            cc.view.setDesignResolutionSize(3036, 1366, cc.ResolutionPolicy.SHOW_ALL);
            self.node.opacity = 255;
        }
    },

    initFPS: function(){
        var fps = window.novaUtil.search('fps') || '10';
        if(!fps) return;

        var fpsN = parseInt(fps);
        if(isNaN(fpsN)) return;

        cc.game.setFrameRate(fpsN);
    },

    initRank: function() {
        var self = this;

        var lan = window.nova.lan();
        var rank1 = lan == 'en' ? self.rank1En : self.rank1Zh;

        // init
        cc.find('ui_rank_01', self.node).getComponent(cc.Sprite).spriteFrame = rank1;
    },

    /**
     * get rows 学生名单（已答完，未答完）
     */
    getRows: function() {
        var self = this;
        // ui_rank_01节点下是已答完人的名字排行     ui_rank_02节点下是未答完人的名字排行
        var rowPaths = [
            'ui_rank_01/rank_01',
            'ui_rank_01/rank_02',
            'ui_rank_01/rank_03',
            'ui_rank_01/rank_04',
            'ui_rank_01/rank_05',
            'ui_rank_01/rank_06',
            'ui_rank_01/rank_07',
            'ui_rank_01/rank_08',
            'ui_rank_01/rank_09',
            'ui_rank_01/rank_10',
            'ui_rank_01/rank_11',
            'ui_rank_01/rank_12',
            'ui_rank_01/rank_13',
            'ui_rank_01/rank_14',
            'ui_rank_01/rank_15',
            'ui_rank_01/rank_16'
        ];

        var rows = [];
        for (var i = 0; i < rowPaths.length; i++) {
            var row = cc.find(rowPaths[i], self.node);
            row.opacity = 0;

            rows.push(row);
        }

        return rows;
    },

    /**
     * init rows
     */
    initRows: function(isOnce) {
        var self = this;
        self.rankIndex = 0;
        var users = JSON.parse(window.WCRDocSDK.getUserStatusList());
        if (!users || !users.length) return;

        //console.log('进来时的数据' + users.length);
        console.log(window.novaUtil.beginFlag);

        var rows = self.rows1;
        var newRows = [];
        if (isOnce) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].online == 'true') {
                    newRows.push(users[i]);
                }
            }
            window.novaUtil.startStudentListArray = newRows;
        } else {
            newRows = self.answerStatusSort(users);
        }

        //console.log('进行数据存储' + JSON.stringify(window.novaUtil.beginFlag));
        var flag = window.novaUtil.beginFlag ? 'true' : 'false';
         //console.log('1111111::' + flag);
        window.nova.updateStudentStatus({start:window.novaUtil.startStudentListArray,finish:window.novaUtil.finishedStudentArray,beginFlag:flag});

        users = newRows;

        if (users && users.length && rows && rows.length) {
            var index = 0;
            for (var i = 0; i < rows.length; i++) {
                rows[i].opacity = 0;
                if (i < users.length) self.genRow(rows[index++], users[i]);
            }
            self.rankArray = users;
        }
    },

    //finish answer  
    answerStatusSort: function(dataArray) {
        var finishedArray = [];
        var unfinshedArray = [];
        if (!dataArray.length) return;
        for (var i = 0; i < dataArray.length; i++) {
            var data = dataArray[i];
            var finishedstudent = this.judgeStudentFinished(data, 'true');
            if (finishedstudent) {
                finishedArray.push(finishedstudent);
            } else {
                var wrongStudent = this.judgeStudentFinished(data, 'false');
                if (wrongStudent) {
                    unfinshedArray.push(wrongStudent);
                } else {
                    if (this.isInitializationExists(data)) unfinshedArray.push(data);
                }
            }
        }
        // //进行排序  需要修改
        // 
        
        if (finishedArray && finishedArray.length > 0) this.sort(finishedArray, 'usertime');
        if (unfinshedArray && unfinshedArray.length > 0) this.sort(unfinshedArray, 'uid');
        return finishedArray.concat(unfinshedArray);
    },

    //judge status
    judgeStudentFinished: function(data, status) {
         
        if (!window.novaUtil.finishedStudentArray) return false; 
        for (var i = 0; i < window.novaUtil.finishedStudentArray.length; i++) {
            var student = window.novaUtil.finishedStudentArray[i];
            // console.log(student)
            if (student.json.userList[0].uid == data.uid && student.json.userList[0].status == status) {
                if (student.usertime || student.usertime == 0) data.usertime = student.usertime;
                data.json = student.json;
                return data;
            }
        }
        return false;
    },

    //Initialization exists
    isInitializationExists: function(data) {
        if (window.novaUtil.startStudentListArray) {
            for (var i = 0; i < window.novaUtil.startStudentListArray.length; i++) {
                if (window.novaUtil.startStudentListArray[i].uid == data.uid) {
                    return true;
                }
            }
        }
        if (data.online == 'true'){
            window.novaUtil.startStudentListArray.push(data);
            return true;  
        } 

        return false;
    },

    // sort
    sort: function(dataArray, sortName) {
        for (var i = 0; i < dataArray.length - 1; i++) {
            for (var j = 0; j < dataArray.length - i - 1; j++) {
                if ((dataArray[j][sortName] > dataArray[j + 1][sortName]) || (sortName == 'usertime' && dataArray[j][sortName] == dataArray[j + 1][sortName] && dataArray[j].uid > dataArray[j + 1].uid )) {
                    var swap = dataArray[j];
                    dataArray[j] = dataArray[j + 1];
                    dataArray[j + 1] = swap;
                }
            }
        }
    },

    // 判断答题状态
    studentAnswerStatus: function(user) {
        var status = null;
        if (user && user.json) {
            status = user.json.userList[0].status == "true" ? true : false;
            return status;
        }

        return false;
    },

    // 处理学生在线还是离线
    genRow: function(node, user) {
        //console.log('执行gen');
        var self = this;
        var userrank = cc.find('userrank', node);
        // var userimg = cc.find('userimg_mask', node);
        var username = cc.find('username', node);
        var usertime = cc.find('usertime', node);
        var answerStatus = cc.find('answerStatus', node);
        var doing = cc.find('doing', answerStatus);
        var wrong = cc.find('wrong', answerStatus);
        var rank_img = cc.find('rank_img', userrank);
        var rank_txt = cc.find('rank_txt', userrank);

        usertime.opacity = 0;
        doing.opacity = 0;
        wrong.opacity = 0;
        rank_img.opacity = 0;
        rank_txt.opacity = 0;


        if (!userrank || !username || !usertime) return;
        console.log(1111);
        var studentAnswerStatus = self.studentAnswerStatus(user);

        if (userrank.opacity) {
            if (self.rankIndex < 3 && studentAnswerStatus) {
                rank_img.opacity = 255;
            } else if (studentAnswerStatus) {
                rank_txt.getComponent(cc.Label).string = self.rankIndex + 1;
                rank_txt.opacity = 255;
            } else {
                rank_txt.getComponent(cc.Label).string = "-";
                rank_txt.opacity = 255;
            }
            self.rankIndex++;
        }

        if (username) username.getComponent(cc.Label).string = user.username;
        //console.log('user.online:' + user.online);
        username.color = user.online == 'true' ? cc.color(7, 7, 7) : cc.color(240, 14, 14);
        // 学生离线，答题时间变成红色
        usertime.color = user.online == 'true' ? cc.color(7, 7, 7) : cc.color(240, 14, 14);
 
        if (usertime) {
            console.log("user.usertime:"+user.usertime)
            user.usertime = user.usertime == 0 ? 1 : user.usertime;
            if (user.usertime) {
                usertime.getComponent(cc.Label).string = user.usertime;
                usertime.opacity = 255;
            } else if (user.json && user.json.userList[0].wrong) {
                usertime.getComponent(cc.Label).string = user.json.userList[0].wrong;
                wrong.opacity = 255;
                usertime.opacity = 255;
            } else {
                // 学生离线，不显示‘正在答题中’
                doing.opacity = user.online == 'true' ? 255 : 0;
            }
        }
        if (window.novaUtil.beginFlag) {
            node.opacity = 255;
        }
    },

    /**
     * modify rows
     */
    modifyRows: function(user) {

        var self = this;

        if (user.json && user.json.userList[0].status == 'true') {

            console.log(window.novaUtil.timerS - window.novaUtil.startTimeS);
            user.usertime = (user.usertime || (window.novaUtil.timerS - window.novaUtil.startTimeS));
            console.log("user.TimeimeTimeimeTimeime:"+user.usertime)
        }

        if (!window.novaUtil.finishedStudentArray.length) window.novaUtil.finishedStudentArray.push(user);
        var ishasUser = false;
        for (var i = 0; i < window.novaUtil.finishedStudentArray.length; i++) {
            var data = window.novaUtil.finishedStudentArray[i];
            if (user.json.userList[0].uid == data.json.userList[0].uid) {
                window.novaUtil.finishedStudentArray[i] = user;
                ishasUser = true;
                break;
            }
        }
        if(!ishasUser){
            window.novaUtil.finishedStudentArray.push(user);
        }

        // send msg
        if (window.nova && window.nova.teacherShowFlag && user.json.userList[0].status == 'true') window.nova.teacherShowFlag(JSON.stringify(user.json));
        self.initRows(false);
        // init
        // if(self.ClearTimeoutId) return;
        // self.ClearTimeoutId = setTimeout(function(){
        //     self.initRows(false);
        //     //console.log("发送了:"+self.ClearTimeoutId);
        //     self.ClearTimeoutId =null;
        // },300)
        //console.log("self.ClearTimeoutId:"+self.ClearTimeoutId)
    },

    /**
     *  reset rows when changing card
     */
    resetRows: function() {
        var self = this;

        // init
        self.rankIndex = 0;
        self.rankUids = [];
        var rows = self.rows1;
        for(var i=0; i<rows.length; i++){
            rows[i].opacity = 0;
        }
        window.novaUtil.beginFlag = true;
        self.initRows(true);
    },

    /**
     * init btns
     */
    initBtns: function(btns) {
        var self = this;

        var pnode = cc.find('ui_di_03/btns', self.node);
        var children = pnode.children;
        if (children && children.length) {
            for (var i = 0; i < children.length; i++) {
                var node = children[i];
                if (!self.inBtns(node._name, btns) && node.name != 'end') {
                    node.destroy();
                }
            }
        }
        // window.novaUtil.beginFlag = false;
        self.node.opacity = 255;
    },

    inBtns: function(name, btns) {
        var inBtns = false;
        if (btns && btns.length) {
            for (var i = 0; i < btns.length; i++) {
                if (btns[i] == name) {
                    inBtns = true;
                    break;
                }
            }
        }

        return inBtns;
    }
});