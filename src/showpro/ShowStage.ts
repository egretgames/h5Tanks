class ShowStage extends SceneBase{
    
    public data:AllData;
    public backLayer:BackLayer;
    public setDataLayer:SetDataLayer;
    public buttonsLayer1:ShowButtonsLayer;

    constructor(){
        super();
        this.data = new AllData();
    }
    public onAddToStage(event: egret.Event):void{
        
        this.setDataLayer = new SetDataLayer();
        this.backLayer = new BackLayer(0,250,"数据概览");
        this.buttonsLayer1 = new ShowButtonsLayer(0,300);
        
        
        this.addChildAt(this.backLayer,1);
        this.addChildAt(this.setDataLayer,2);
        this.addChildAt(this.buttonsLayer1,3);
    }

    public Update():void{

    }
    public onGetDataOk():void{
        this.buttonsLayer1.setData();
    }
}