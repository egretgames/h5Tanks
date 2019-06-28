class ShowStage extends SceneBase{
    
    public data:AllData;
    public backLayer:BackLayer;
    public setDataLayer:SetDataLayer;


    constructor(){
        super();
    }
    public onAddToStage(event: egret.Event):void{
        this.data = new AllData();
        this.backLayer = new BackLayer();
        this.setDataLayer = new SetDataLayer();
        
        this.addChildAt(this.backLayer,0);
        this.addChildAt(this.setDataLayer,1);
    }

    public Update():void{

    }
}