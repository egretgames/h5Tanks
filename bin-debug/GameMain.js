var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMain = (function () {
    function GameMain(state) {
        this.stage = state;
        UIManager.stage = this.stage;
    }
    return GameMain;
}());
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map