// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        console.log(navigator);
        // console.log(navigator.mediaDevices.getUserMedia);
        console.log(navigator.webkitGetUserMedia);
        console.log(navigator.mozGetUserMedia);
        console.log(navigator.msGetUserMedia);
        if (false) {
            console.log("您的浏览器不支持获取音频。");
        } else {
            // console.log("您的浏览器支持获取音频。");
            // navigator.mediaDevices.getUserMedia({ audio: true }, onSuccess, onError); //调用麦克风捕捉音频信息，成功时触发onSuccess函数，失败时触发onError函数
            // function onSuccess(stream) {
            //     audioContext = window.AudioContext || window.webkitAudioContext;
            //     context = new audioContext(); //创建一个管理、播放声音的对象
            //     liveSource = context.createMediaStreamSource(stream); //将麦克风的声音输入这个对象
            //     var levelChecker = context.createScriptProcessor(4096, 1, 1); //创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
            //     liveSource.connect(levelChecker); //将该分析对象与麦克风音频进行连接
            //     levelChecker.onaudioprocess = function(e) { //开始处理音频
            //         var buffer = e.inputBuffer.getChannelData(0); //获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
            //         //创建变量并迭代来获取最大的音量值
            //         var maxVal = 0;
            //         for (var i = 0; i < buffer.length; i++) {
            //             if (maxVal < buffer[i]) {
            //                 maxVal = buffer[i];
            //             }
            //         }
            //         //显示音量值
            //         console.log("您的音量值：" + Math.round(maxVal * 100));
            //         if (maxVal > .8) {
            //             //当音量值大于0.8时，显示“声音太响”字样，并断开音频连接
            //             console.log("您的声音太响了" + Math.round(maxVal * 100));
            //             liveSource.disconnect(levelChecker);
            //         }
            //     };
            // }

            // function onError() {
            //     console.log("获取音频时好像出了点问题。" + Math.round(maxVal * 100));
            // }

            var facingMode = "user";
            var constraints = {
                audio: false,
                video: {
                    facingMode: facingMode
                }
            }
            var browserName = navigator.userAgent.toLowerCase();
            if (browserName.indexOf("windows")<0) {
                navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                    video.srcObject = stream;
                    console.log("成功");
                    console.log(stream);
                    console.log(video.srcObject);

                });
            }
        }


    }
});