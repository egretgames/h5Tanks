class MainMenuScene extends SceneBase {
    constructor(){
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    protected onAddToStage(event: egret.Event) {
        //this.load(this.initMovieClip);
        var label:eui.Label = new eui.Label();
        label.text = "这里是 mainmenu场景，默认的第一个场景";
        label.size = 100;
        this.addChild(label);
    }
    protected Update():void{
        
    }
}