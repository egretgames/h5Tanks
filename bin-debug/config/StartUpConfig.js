var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StartUpConfig = (function () {
    //public startSance: SceneBase;
    function StartUpConfig() {
        this.startSceneName = "qiufeng";
        this.setStartMod();
    }
    StartUpConfig.prototype.setStartMod = function () {
    };
    return StartUpConfig;
}());
__reflect(StartUpConfig.prototype, "StartUpConfig");
//# sourceMappingURL=StartUpConfig.js.map