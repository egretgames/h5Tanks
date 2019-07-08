// 游戏入口类，负责各个管理器的启动，显示层级管理（可能会剥离）

class GameMain {

    public static stage: egret.Stage;
    public static data: AllData;
    public static showStage:ShowStage;


    public constructor(stage: egret.Stage) {
        GameMain.stage = stage;
        GameMain.data = new AllData()

        let urlloader:egret.URLLoader = new egret.URLLoader();
        let urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.url = "resource/NativeConfig.json";
        urlloader.load(urlreq);
        urlloader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
    }
    private onComplete(event: egret.Event): void 
    {       
        let data = event.target.data;
        GameMain.data.nativeConfig =  JSON.parse(data);
        GameMain.data.webRoot = GameMain.data.nativeConfig.net.root;
        GameMain.showStage = new ShowStage(GameMain.data);
        GameMain.stage.addChild(GameMain.showStage);
    }
    

}