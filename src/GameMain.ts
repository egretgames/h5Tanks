// 游戏入口类，负责各个管理器的启动，显示层级管理（可能会剥离）

class GameMain {

    public static stage: egret.Stage;

    public static sceneManager:SceneManager;
    public static uiManager: UIManager;

    public constructor(state: egret.Stage) {
        GameMain.stage = state;
        console.log(state);
        // 初始化configs

        // 初始化helpers

        // 启动
        let start = new StartUpConfig();
        SceneManager.jumpBySceneName(start.startSceneName);
    }
}