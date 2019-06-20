class SceneBase extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    }

    private onLoad(event: egret.Event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    }

    
    private onUpdate(e: egret.Event) {
        this.Update();
    }
    // ts没有虚方法虚方法，该方法由子类重写完成
    // 帧刷新方法，update frame方法，该方法的调用速度取决于游戏设置的固定帧率 GameConfig.frameRate
    public Update():void{

    }
}