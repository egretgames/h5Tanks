// 游戏入口类，负责各个管理器的启动，显示层级管理（可能会剥离）
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMain = (function () {
    function GameMain(state) {
        GameMain.stage = state;
        // 初始化configs
        // 初始化helpers
        // 启动
        var start = new StartUpConfig();
        SceneManager.jumpBySceneName(start.startSceneName);
    }
    return GameMain;
}());
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map