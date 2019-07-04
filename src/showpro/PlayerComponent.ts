class PlayerComponent extends egret.DisplayObjectContainer{

    public pid: PlayAnimationLayer;

    public timeLine: egret.Shape;
    public lineX: number = 50;
    public lineY: number = 50;
    public lineWidht: number = 700;

    public btnReset:egret.TextField;
    public btnStartPlay: egret.TextField;
    public btnEndPlay: egret.TextField;
    public scrollBarBlock: ScrollBlock;
    public blockLabelA: eui.Label;
    public blockLabelB: eui.Label;

    constructor(posx:number,posy:number, parent:PlayAnimationLayer){
        super();
        
        this.x = posx;
        this.y = posy;
        this.pid = parent;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage():void{

        this.timeLine = new egret.Shape();
        this.timeLine.graphics.lineStyle(2, 0x222222);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineWidht + this.lineX, this.lineY);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX, this.lineY - 15);
        // this.timeLine.graphics.moveTo(this.lineX + this.lineWidht / 2, this.lineY);
        // this.timeLine.graphics.lineTo(this.lineX + this.lineWidht / 2, this.lineY - 15);
        this.timeLine.graphics.moveTo(this.lineX + this.lineWidht, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX + this.lineWidht, this.lineY - 15);

        this.addChild(this.timeLine);
    }
    public redrawComponent():void{

    }
}