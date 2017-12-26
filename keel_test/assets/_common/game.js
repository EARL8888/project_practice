cc.Class({
    extends: cc.Component,

    properties: {
        allPoint: [],
        t: null,
        _r: "",
        width: 640,
    },

    onLoad: function() {
        // 初始化参数
        this.lineWidth = 60;
        this.strokeColor = cc.color(120, 110, 230);
        this.isClearMode = false;
        this.group = this.addComponent('R.group');

        this.touchListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this.node);
        console.log("initinit")

    },


    onTouchBegan: function(touch, event) {
        console.log("onTouchBegan")
        clearTimeout(this.t);
        // 初始一条线的数据
        this.dataDict = {};
        this.dataDict.dataEvent = 'draw';

        // 获取开始时间点
        this.dataDict.startTime = new Date().getTime();

        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        this.allPoint.push(new Point(touchLoc.x, this.width - touchLoc.y));
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        // 从group获取一条Path实例
        var path = this.group.addPath();
        path.fillColor = 'none';

        // 判断是否是橡皮擦状态
        if (this.isClearMode) {

            path.lineWidth = 50;
            path.strokeColor = cc.color(255, 255, 255);
        } else {

            path.lineWidth = this.lineWidth;
            path.strokeColor = this.strokeColor;
        }

        this.dataDict.strokeColor = path.strokeColor.toHEX("#rrggbb");
        this.dataDict.lineWidth = path.lineWidth;

        // 初始化点数组，并赋值开始位置的点
        this.points = [touchLoc];

        // this.allPoint.push(new Point(touchLoc.x,touchLoc.y));
        return true;
    },

    onTouchMoved: function(touch, event) {
        var self = this;
        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        var areaLocal = this.node.parent.convertToNodeSpaceAR(touchLoc);
        var ist = self.judgeSquare(areaLocal.x, areaLocal.y);
        //console.log("ist:"+ist);
        if(!ist) return;
        this.allPoint.push(new Point(touchLoc.x, this.width - touchLoc.y));
        var touchLoc1 = this.node.parent.convertToNodeSpaceAR(touchLoc);
        //console.log("2222:"+ self.judgeSquare(touchLoc1.x, touchLoc1.y))

        // 添加到点数组内
        this.points.push(touchLoc1);

        // 获取当前画的path实例，并更新内部展现点数据
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);
    },

    onTouchEnded: function(touch, event) {
        var self = this;
        // 获取触摸点数据
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);

        // 获取结束时间点
        this.dataDict.endTime = new Date().getTime();

        // 将点数组转化为相对于node宽高的映射位置
        this.pointDicts = [];
        for (var i = 0; i < this.points.length; i++) {

            let point = this.points[i];
            var pointDict = {};
            pointDict.x = point.x / this.node.width;
            pointDict.y = point.y / this.node.height;
            this.pointDicts.push(pointDict);
        }
        this.dataDict.points = this.pointDicts;

        let sendData = this.dataDict;
        cc.log("allPoint=%o", this.allPoint);
        this.t = setTimeout(function() {
            var result = new DollarRecognizer();
            var log = result.Recognize(self.allPoint, false);
            var _confirm = cc.find('Canvas/prefab_02_confirm');    

            if (self.node.name == log.Name && log.Score >= 0.7) {
                // 传递消息给教师端发送对于错的信息
                if (window.nova && window.nova.studentAnswer) window.nova.studentAnswer();
                cc.eventManager.removeListener( self.touchListener);
            } else {
                
                if (!window.nova.isTeacher()) window.novaUtil.showFacsimile();
                
                window.novaUtil.wrongNum = window.localStorage.getItem('wrongNum');
                window.novaUtil.wrongNum++;
                window.localStorage.setItem('wrongNum',window.novaUtil.wrongNum);
                window.nova.studentWrongAnswer(window.novaUtil.wrongNum);
                
                self.clearAll();
            }
        }, 2000);
    },
    judgeSquare: function(nodeX, nodeY) {
        if (!nodeX && !nodeY) return;

        var targetNode = cc.find('Canvas/student');
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

    judgeDrag: function(x, y, area){
        return area ? (x < area[0] && x > area[1] && y < area[2] && y > area[3]) : false;
    },
    // 清屏
    clearAll: function() {
        this.group.ctx.clear();
        this.group.children = [];
        this.isClearMode = false;

        // 初始化清屏的数据
        this.dataDict = {};
        this.dataDict.dataEvent = 'clear';
        this.allPoint = [];
    },
    //make points
    makePoint(content) {
        let result = "";
        let temp = JSON.parse(content);
        for (let i = 0; i < temp.length; i++) {
            result += "new Point(" + temp[i].x + "," + temp[i].y + "),"
        }
        return result;
    },

});