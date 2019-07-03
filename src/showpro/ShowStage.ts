class ShowStage extends SceneBase{
    
    public data:AllData;
    public setDataLayer:SetDataLayer;
    public backLayer1:BackLayer;
    public backLayer2:BackLayer;
    public buttonsLayer1:ShowButtonsLayer;
    public buttonsLayer2:PlayAnimationLayer;

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
        this.backLayer1 = new BackLayer(0,250,"数据概览");
        this.backLayer2 = new BackLayer(960,250,"数据播放");
        this.buttonsLayer1 = new ShowButtonsLayer(0,300);
        this.buttonsLayer2 = new PlayAnimationLayer(900,300);
        
        
        this.addChild(this.setDataLayer);
        this.addChild(this.backLayer1);
        this.addChild(this.backLayer2);
        this.addChild(this.buttonsLayer1);
        this.addChild(this.buttonsLayer2);
       
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