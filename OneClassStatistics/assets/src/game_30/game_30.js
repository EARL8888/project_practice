/**
 * 看图选择模版配置文件
 *  elements：可交互元素数组
 *      name：       该元素名称，需要和该节点名称一致
 *      hide：       初始化时是否显示该元素，true不显示，false显示
 *      actions：    该元素的交互动作
 *          action： 看图选择为click
 *          cmds：   点击后执行的行为数组
 *              name：   
 *                  play，点击后播放的声音
 *                  choice，该元素对应的选项元素
 */
module.exports = {
    name: 'game_30',
    elements: [{
        name: "01_i",
        hide: false,
        actions: [{
            action: "click",
            cmds: [{
                name: "play",
                target: "this"
            }, {
                name: "choice",
                target: "choice_01"
            }]
        }]
    }, {
        name: "02_u",
        hide: true,
        actions: [{
            action: "click",
            cmds: [{
                name: "play",
                target: "this"
            }, {
                name: "choice",
                target: "choice_02"
            }]
        }]
    }, {
        name: "03_uu",
        hide: true,
        actions: [{
            action: "click",
            cmds: [{
                name: "play",
                target: "this"
            }, {
                name: "choice",
                target: "choice_03"
            }]
        }]
    }]
}