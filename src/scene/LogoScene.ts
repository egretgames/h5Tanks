class LogoScene extends egret.DisplayObjectContainer {
    public logoTextZH: egret.TextField;
    public logoTextEN: egret.TextField;
    public backGround: egret.Shape;
    public showState:number = 0;
    private timeOnEnterFrame:number = 0;
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
        
    }
    public onAddToStage(event: egret.Event): void {

        let backGround = new egret.Shape();
        backGround.graphics.beginFill(0x000000);
        backGround.graphics.drawRect(0, 0, GameConfig.canvasWidth, GameConfig.canvasHeight);
        backGround.graphics.endFill();

        this.logoTextEN = new egret.TextField();
        this.logoTextEN.fontFamily = "Arial";
        this.logoTextEN.textColor = 0xFFFFFF;
        this.logoTextEN.size = GameConfig.canvasHeight / 20;
        this.logoTextEN.text = "Present By";
        this.logoTextEN.alpha = 0;
        
        this.logoTextZH = new egret.TextField();
        this.logoTextZH.fontFamily = "Arial";
        this.logoTextZH.textColor = 0xFFFFFF;
        this.logoTextZH.size = GameConfig.canvasHeight / 10;
        this.logoTextZH.text = "邱枫和李耀武工作室";
        this.logoTextZH.alpha = 0;
        
        this.logoTextEN.x = (GameConfig.canvasWidth - this.logoTextZH.width) / 2;
        this.logoTextZH.x = (GameConfig.canvasWidth - this.logoTextZH.width) / 2;
        this.logoTextEN.y = GameConfig.canvasHeight / 2 - this.logoTextZH.height - this.logoTextEN.height;
        this.logoTextZH.y = GameConfig.canvasHeight / 2 - this.logoTextZH.height;

        this.addChild(backGround);
        this.addChild(this.logoTextEN);
        this.addChild(this.logoTextZH);
        //this.showState = 1;
    }
    public onUpdate(e: egret.Event) {
        let now = egret.getTimer();

        if(this.showState == 0){
            let alphaChanage = (now - this.timeOnEnterFrame)/3000;
            if(this.logoTextZH.alpha+alphaChanage>1){
                this.logoTextZH.alpha = 1;
                this.logoTextEN.alpha = 1;
                this.showState = 1;
            }else{
                this.logoTextEN.alpha+=alphaChanage;
                this.logoTextZH.alpha+=alphaChanage;
            }
        }else{
            console.log(GameMain.resManager.isResConfigReady);
            if(GameMain.resManager.isResConfigReady){
                GameMain.sceneManager.jumpToFirstScene();
            }
        }

        this.timeOnEnterFrame = egret.getTimer();
    }
}