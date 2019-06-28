// 游戏入口类，负责各个管理器的启动，显示层级管理（可能会剥离）

class GameMain {

    public static stage: egret.Stage;

    public static sceneManager:SceneManager;
    public static uiManager: UIManager;
    public static resManager: ResManager;

    public static showStage:ShowStage;


    public constructor(stage: egret.Stage) {
        GameMain.stage = stage;
        stage.scaleMode = egret.StageScaleMode.NO_SCALE;

        // 初始化 场景管理工具 ui管理工具 资源管工具
        //GameMain.resManager = new ResManager();
        //GameMain.sceneManager = new SceneManager();
        //GameMain.uiManager = new UIManager();

        // 初始化 配置类 各个配置类均为静态类 用于存储各种配置
        //GameConfig.initGameConfig();
        
        //GameMain.sceneManager.jumpToLogoScene();
        GameMain.showStage = new ShowStage();
        stage.addChild(GameMain.showStage);
    }

}