class ButtonBlock extends egret.Shape{
    public rectColor:number = 0x888888;
    public rectWidth:number;
    public rectHeight:number;
    public rectBorderColor:number = 0x222222;
    constructor(x:number, y:number, w:number,h:number){
        super();
        this.x = x;
        this.y = y;
        this.rectWidth = w;
        this.rectHeight = h;
        this.drawRect(this.rectColor,this.rectBorderColor);
    }
    public drawRect(color:number,borderColor:number):void{
        this.graphics.clear();
        this.graphics.beginFill(color);
        this.graphics.drawRect(0,0,this.rectWidth,this.rectHeight);
        this.graphics.endFill();
        this.graphics.lineStyle(2,borderColor);
        this.graphics.drawRect(0,0,this.rectWidth,this.rectHeight);       
    }
}
class ButtonID extends eui.Label{
    constructor(x:number, y:number, idSize:number,text:string){
        super(text);
        this.x = x;
        this.y = y;
        this.textColor = 0xFF0000;
    }    
}
class ButtonTable extends egret.DisplayObjectContainer{

    public buttonArray:Array<ButtonBlock> = new Array<ButtonBlock>();
    public labelArray:Array<eui.Label> = new Array<eui.Label>();

    public bgWidth:number = 720;
    public bgHeight:number = 400;
    public intervalH:number = 20;
    public blockH:number = 30;
    public blockW:number = 300;
    public idSize:number = 14;

    constructor(x:number,y:number){
        super();
        this.x = x;
        this.y = y;
        this.drawLabels();
    }
    public drawLabels():void{
        for(let i = 0;i<16;i++){
            if(i<8){
                this.buttonArray[i] = new ButtonBlock(this.intervalH*2,this.intervalH + (this.intervalH+this.blockH) * i,this.blockW,this.blockH);
                this.labelArray[i] = new ButtonID(this.intervalH, this.intervalH + (this.intervalH+this.blockH) * i, 14,i.toString());
            } else {
                this.buttonArray[i] = new ButtonBlock(this.intervalH*4+this.blockW, this.intervalH + (this.intervalH+this.blockH) * (i-8),this.blockW,this.blockH);
                this.labelArray[i] = new ButtonID(this.intervalH*5+this.blockW*2, this.intervalH + (this.intervalH+this.blockH) * (i-8), 14,i.toString());
            }
            this.addChild(this.labelArray[i])
            this.addChild(this.buttonArray[i]);
        }
    }
}