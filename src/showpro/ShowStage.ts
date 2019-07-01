class ShowStage extends SceneBase{
    
    public data:AllData;
    public backLayer:BackLayer;
    public setDataLayer:SetDataLayer;
    public buttonsLayer1:ShowButtonsLayer;

    constructor(){
        super();
        this.data = new AllData();
        // this.x = 0;
        // this.y = 0;
        // this.width = 10000;
        // this.height = 10000;
    }
    public onAddToStage(event: egret.Event):void{
        
        this.setDataLayer = new SetDataLayer();
        this.backLayer = new BackLayer(0,250,"数据概览");
        this.buttonsLayer1 = new ShowButtonsLayer(0,300);
        
        
        this.addChildAt(this.backLayer,1);
        this.addChildAt(this.setDataLayer,2);
        this.addChildAt(this.buttonsLayer1,3);
       
    }
    //  this.addEventListener(mouse.MouseEvent.MOUSE_WHEEL,this.onMouseWheel,this);
    // public onMouseWheel(event:MouseEvent):void{
    //     console.log(event);
    // }
    public Update():void{

    }
    public onGetDataOk():void{
        this.buttonsLayer1.setData();
    }
}