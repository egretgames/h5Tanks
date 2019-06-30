class ShowStage extends SceneBase{
    
    public data:AllData;
    public backLayer:BackLayer;
    public setDataLayer:SetDataLayer;
    public buttonsState:ShowButtonsState;

    constructor(){
        super();
        this.data = new AllData();
    }
    public onAddToStage(event: egret.Event):void{
        
        this.setDataLayer = new SetDataLayer();
        this.backLayer = new BackLayer(0,250,"数据概览");
        this.buttonsState = new ShowButtonsState(0,300);
        
        
        this.addChildAt(this.backLayer,1);
        this.addChildAt(this.setDataLayer,2);
        this.addChildAt(this.buttonsState,3);
    }

    public Update():void{

    }
}