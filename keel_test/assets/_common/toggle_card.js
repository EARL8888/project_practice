cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var self = this;
        self.isTeacher = self.isTeacherMothed();
        self.cards = self.getCards();
        self.initEventBtn();
        self.initBtn();
    },

    initEventBtn: function() {
        var self = this;
        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            var timer = setInterval(function() {
                cc._canvas.style.cursor = 'pointer';
                clearInterval(timer);
            }, 100);
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // bind events
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            var nodeName = self.node.name;
            if (!nodeName) return;
            if (nodeName == "nextPageBtn") {
                self.nextPageBtn();
            } else if (nodeName == "upPageBtn") {
                self.upPageBtn();
            }
        });
    },

    isTeacherMothed: function() {
        return window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
    },

    initBtn: function() {
        var self = this;
        var upPageBtnNode = cc.find('Canvas/student/upPageBtn');
        var nextPageBtnNode = cc.find('Canvas/student/nextPageBtn');
        if (!self.isTeacher) {
            nextPageBtnNode.opacity = 0;
            nextPageBtnNode.zIndex = 0;
            upPageBtnNode.opacity = 0;
            upPageBtnNode.zIndex = 0;
        }
    },

    // 下一页
    nextPageBtn: function() {
        var self = this;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getNextCard(activeCard, self.cards);
            if (!nextCard) return;
            var canActive = null;
            var currentNode = cc.find('Canvas/student/cardList/' + activeCard);
            currentNode.opacity = 0;
            var nextNode = cc.find('Canvas/student/cardList/' + nextCard);
            nextNode.opacity = 255;
            nextNode.zIndex = 1;
            if (window.nova && window.nova.toggleCard && self.isTeacher) window.nova.toggleCard("nextPageBtn", false);
        }
    },

    //上一页
    upPageBtn: function() {
        var self = this;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var upCard = self.getUpCard(activeCard, self.cards);
            if (!upCard) return;

            var canActive = null;
            var currentNode = cc.find('Canvas/student/cardList/' + activeCard);
            currentNode.opacity = 0;
            var upNode = cc.find('Canvas/student/cardList/' + upCard);
            upNode.opacity = 255;
            upNode.zIndex = 1;
            if (window.nova && window.nova.toggleCard && self.isTeacher) window.nova.toggleCard("upPageBtn", false);
        }
    },

    getCards: function() {
        var cards = [];
        var node = cc.find('Canvas/student/cardList');
        if (!node || !node.children || !node.children.length) return;

        for (var i = 0; i < node.children.length; i++) {
            cards.push(node.children[i].name);
        }
        return cards.reverse();
    },

    canNextActiveCard: function() {
        var self = this;
        var res = false;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getNextCard(activeCard, self.cards);
            if (nextCard) res = true;
        }
        return res;
    },

    canUpActiveCard: function() {
        var self = this;
        var res = false;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getUpCard(activeCard, self.cards);
            if (nextCard) res = true;
        }
        return res;
    },

    getNodeName: function() {
        var nodeName;

        var node = cc.find('Canvas/student/cardList');
        if (!node) return nodeName;

        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].opacity == 255) nodeName = node.children[i].name;
        }
        return nodeName;
    },

    getNextCard: function(activeCard, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == activeCard) return i == cards.length - 1 ? cards[0] : cards[i + 1];
        }
    },
    getUpCard: function(activeCard, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == activeCard) return i == 0 ? cards[cards.length - 1] : cards[i - 1];
        }
    }
});