abstract class UIBase extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    }

    protected abstract onAddToStage(event: egret.Event):void

    
    private onUpdate(e: egret.Event) {
        this.Update();
    }
    // UI 基类，不一定需要Update方法，没有把update方法定义为抽象方法，如果UI子类需要，可以重写
    protected Update():void{}
}