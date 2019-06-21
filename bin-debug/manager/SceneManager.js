// 场景管理器，用于场景跳转，场景切换
// 使用独立的显示层级，使用主显示层级低于UI层
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.releaseCurrentScene = function () {
        if (this.currentScene != null) {
            this.currentScene.removeChildren();
        }
    };
    SceneManager.jumpBySceneName = function (sceneName) {
        console.log();
        switch (sceneName) {
            case "qiufeng":
                SceneManager.releaseCurrentScene();
                this.currentScene = new QFdevScene();
                break;
            case "liyaowu":
                break;
            default:
                break;
        }
    };
    SceneManager.currentScene = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map