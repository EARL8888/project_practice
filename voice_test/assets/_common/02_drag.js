cc.Class({
    extends: cc.Component,

    properties: {
        elements: 0,
        dragRightAudio: {
            default: null,
            url: cc.AudioClip
        },
        dragWrongAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function() {
        this.init();
    },

    init: function() {
        var self = this;

        var games = require('_games');
        if (games && games.length) {
            var sceneName = cc.director.getScene().name;
            for (var i = 0; i < games.length; i++) {
                if (games[i].name == sceneName) self.initGame(games[i].elements);
            }
        }

        window.novaUtil.tableLog([{
            name: 'template_02_drag',
            version: '2.1.1'
        }]);
    },

    initGame: function(els) {
        var self = this;

        if (els && els.length) {
            var length = 0;
            var nodeName = self.node._name;
            for (var i = 0; i < els.length; i++) {
                if (els[i].name == nodeName) self.initElement(els[i]);
                if (els[i].actions[0].cmds[0].target != 'null') length++;
            }

            self.elements = length;
        }
    },

    initElement: function(el) {
        var self = this;

        // hide
        if (el.hide) self.node.opacity = 0;

        // scale
        if (el.scale) self.node.setScale(0, 1);

        // zindex
        if (el.zindex) self.node.zIndex = el.zindex;

        // actions
        if (el.actions && el.actions.length) {
            for (var i = 0; i < el.actions.length; i++) {
                var action = el.actions[i];

                if (action.action == 'drag') self.triggleDrag(el, action.cmds);
            }
        }
    },

    triggleDrag: function(data, cmds) {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // drag
        var initX = self.node.x;
        var initY = self.node.y;
        var initZIndex = self.node.zIndex;
        var targetArea = self.calcArea(cmds);
        var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
        var _teacher_drag = cc.find('Canvas/_teacher_drag');
        var canSendMsg = window.nova && window.nova.teacherDrag && !_teacher_drag;

        // finished
        var finished = cc.callFunc(function() {
            window.nova.syncStatus();
        }, this);

        // init
        window.novaDrag.init.push({
            x: initX,
            y: initY,
            i: initZIndex,
            name: data.name
        });

        self.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            self.node.zIndex = 1000;

            // send msg
            if (canSendMsg) window.nova.teacherDrag('drag_start', data, cmds);
        });

        self.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            var delta = event.touch.getDelta();

            var moveX = isTeacher ? delta.x / 1 : delta.x;
            var moveY = isTeacher ? delta.y / 1 : delta.y;

            //judge move with the square (-440, 240)可活动的范围
            var result = isTeacher ? self.judgeSquare(self.node.x + moveX, self.node.y + moveY) : true;
            if (result) {
                self.node.x += moveX;
                self.node.y += moveY;

                // send msg
                if (canSendMsg) window.nova.teacherDrag('drag_ing', data, cmds, moveX, moveY);
            }
        });

        self.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            var judge = self.judgeDrag(self.node.x, self.node.y, targetArea);

            if (judge) {
                self.node.runAction(cc.sequence(cc.scaleTo(0.1, 1), finished));
                self.node.x = cc.find('Canvas/student/' + cmds[0].target).x;
                self.node.y = cc.find('Canvas/student/' + cmds[0].target).y;
                cc.audioEngine.playEffect(self.dragRightAudio, false);

                self.judgeResult();

                if (!window.nova.isTeacher()) window.novaUtil.offEvent(self.node);
            } else {
                self.node.x = initX;
                self.node.y = initY;
                self.node.zIndex = initZIndex;
                self.node.runAction(cc.sequence(cc.scaleTo(0.1, 1), finished));
                cc.audioEngine.playEffect(self.dragWrongAudio, false);

                window.novaUtil.wrongNum = window.localStorage.getItem('wrongNum');
                window.novaUtil.wrongNum++;
                window.localStorage.setItem('wrongNum', window.novaUtil.wrongNum);
                window.nova.studentWrongAnswer(window.novaUtil.wrongNum);
            }

            // send msg
            if (canSendMsg) window.nova.teacherDrag('drag_end', data, cmds);
        });

        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
            self.node.x = initX;
            self.node.y = initY;
            self.node.zIndex = initZIndex;
            self.node.runAction(cc.sequence(cc.scaleTo(0.1, 1), finished));
            cc.audioEngine.playEffect(self.dragWrongAudio, false);

            window.novaUtil.wrongNum++;
            window.nova.studentWrongAnswer(window.novaUtil.wrongNum);

            // send msg
            if (canSendMsg) window.nova.teacherDrag('drag_end', data, cmds);
        });
    },

    calcArea: function(cmds) {
        var targetNode = cc.find('Canvas/student/' + cmds[0].target);
        if (!targetNode) return null;

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
    },

    judgeSquare: function(nodeX, nodeY) {
        if (!nodeX && !nodeY) return;

        var targetNode = cc.find('Canvas/student/background');
        if (!targetNode) return;

        var x = targetNode.x;
        var y = targetNode.y;
        var width = targetNode.width;
        var height = targetNode.height;

        var ss = [];
        ss.push(x + parseInt(width / 2));
        ss.push(x - parseInt(width / 2));
        ss.push(y + parseInt(height / 2));
        ss.push(y - parseInt(height / 2));

        return this.judgeDrag(nodeX, nodeY, ss);
    },

    judgeDrag: function(x, y, area) {
        return area ? (x < area[0] && x > area[1] && y < area[2] && y > area[3]) : false;
    },

    judgeResult: function() {
        if (window.nova && window.nova.studentDragAnswer) window.nova.studentDragAnswer(this.elements);
    }
});