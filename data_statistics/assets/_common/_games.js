/**
 * 游戏场景总配置文件，
 * 将每个游戏场景文件夹game_n下的game_n.js文件引入
 */
var games = [];
games.push(require('../src/game_00/game_00.js'));
games.push(require('../src/game_01/game_01.js'));
games.push(require('../src/game_02/game_02.js'));
games.push(require('../src/game_03/game_03.js'));

module.exports = games;