// 场景管理器，用于场景跳转，场景切换
// 使用独立的显示层级，使用主显示层级低于UI层

class SceneManager {
    public static currentScene: SceneBase = null;

    public static releaseCurrentScene(): void {
        if(this.currentScene!= null){
            this.currentScene.removeChildren();
        }
    }

    public static jumpBySceneName(sceneName: string): void {
        console.log()
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
        GameMain.stage.addChild(this.currentScene);
    }

}