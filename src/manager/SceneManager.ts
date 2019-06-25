// 场景管理器，用于场景跳转，场景切换
// 使用独立的显示层级，使用主显示层级低于UI层

class SceneManager {

    public currentScene: SceneBase = null;
    public logoScene: LogoScene;
    public firstSceneName: string = "mainMenu";

    public releaseCurrentScene(): void {
        if (this.currentScene != null) {
            this.currentScene.removeChildren();
        }
    }

    public jumpToLogoScene(): void {
        this.releaseCurrentScene();
        this.logoScene = new LogoScene();
        GameMain.stage.addChildAt(GameMain.sceneManager.logoScene, 0);
        
    }

    public jumpToFirstScene(): void {
        if(this.logoScene){
            this.logoScene.removeChildren();
            this.logoScene = null;
        }
        this.jumpBySceneName(this.firstSceneName);
    }

    public jumpBySceneName(sceneName: string): void {
        console.log()
        switch (sceneName) {
            case "qiufeng":
                this.releaseCurrentScene();
                this.currentScene = new QFdevScene();
                break;
            case "mainMenu":
                this.releaseCurrentScene();
                this.currentScene = new MainMenuScene();
                break;
            case "liyaowu":
                break;  
            default:
                break;
        }
        GameMain.stage.addChildAt(this.currentScene, 0);
    }

}