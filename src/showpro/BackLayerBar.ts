class BackLayer extends egret.DisplayObjectContainer{
    
    public text:string;
    public barHeight:number = 40;
    public fontSize = 20;

    constructor(x:number,y:number,text:string){
        super();
        this.x = x;
        this.y = y;
        this.text = text;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    public onAddToStage(event: egret.Event):void{

        let back = new egret.Shape();
        back.graphics.beginFill(0xaecde9);
        back.graphics.drawRect( 0, 0, 1000,this.barHeight );
        back.graphics.endFill();
        this.addChild(back);

        let bar = new egret.TextField();
        bar.background = true;
        bar.backgroundColor = 0x5c9bd3;
        bar.size = this.fontSize;
        bar.textColor = 0xffffff;
        bar.width = 100;
        bar.height = this.barHeight;
        bar.text = this.text
        bar.textAlign = "center";
        bar.verticalAlign = "middle";
        bar.x = 0;
        this.addChild(bar);
    }
}