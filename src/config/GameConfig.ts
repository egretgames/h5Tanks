class GameConfig {
    static frameRate: number = 60;
    static canvasWidth: number = 1000;
    static canvasHeight: number = 1000;
    public static initGameConfig():void{
        GameConfig.canvasWidth = GameMain.stage.stageWidth;
        GameConfig.canvasHeight = GameMain.stage.stageHeight;
        console.log(GameConfig.canvasWidth);
        console.log(GameConfig.canvasHeight);
    }
}