/*
 * @Author: liutingting
 * @Date:   2017-11-06 15:33:24
 * @Last Modified by:   earl
 * @Last Modified time: 2017-12-26 20:42:19
 */
/**
 * 游戏场景总配置文件，
 * 将每个游戏场景文件夹game_n下的game_n.js文件引入
 */
var games = [];

games.push(require('../src/game_01/game_01.js'));
games.push(require('../src/game_02/game_02.js'));

module.exports = games;