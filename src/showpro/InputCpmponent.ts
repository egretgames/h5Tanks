class InputComponent extends egret.DisplayObjectContainer{

    public valLimit:number;
    public callback:any;
    public comWidth:number;
    public comHeight:number;

    public constructor(x:number, y:number, componentWidth:number, componentHeight:number, limit:number,callback:any) {
        super();
        this.x = x;
        this.y = y;
        this.comWidth = componentWidth;
        this.comHeight =  componentHeight;
        this.valLimit = limit;
        this.callback = callback;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event):void{

        // var shape:egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0x0000ff);
        // shape.graphics.drawRect(200, 0, 100, 100);
        // shape.graphics.endFill();
        // this.addChild(shape);

        let up = new egret.TextField();
        up.border = true;
        up.borderColor = 0x000000;
        up.size = this.comHeight/3 - 3;
        up.textColor = 0x000000;
        up.width = this.comWidth;
        up.height = this.comHeight/3;
        up.text = "↑↓";
        up.textAlign = "center";
        up.verticalAlign = "center";
        up.x = 0;
        up.y = 0; 
        this.addChild(up);   
        
    }
}