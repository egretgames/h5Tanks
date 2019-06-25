class GameConfig {
    static frameRate: number = 60;
    static canvasWidth: number = 1920;
    static canvasHeight: number = 1080;
    public static initGameConfig():void{
        GameConfig.canvasWidth = GameMain.stage.stageWidth;
        GameConfig.canvasHeight = GameMain.stage.stageHeight;
        console.log(GameConfig.canvasWidth);
        console.log(GameConfig.canvasHeight);
    }
}