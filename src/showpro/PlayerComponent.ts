class PlayerComponent extends egret.DisplayObjectContainer{

    public pid: PlayAnimationLayer;

    public timeLine: egret.Shape;
    public lineX: number = 50;
    public lineY: number = 50;
    public lineWidht: number = 700;

    constructor(posx:number,posy:number, parent:PlayAnimationLayer){
        super();
        this.x = posx;
        this.y = posy;
        this.pid = parent;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage():void{

        this.timeLine = new egret.Shape();
        this.timeLine.graphics.lineStyle(1, 0x000000);
        this.timeLine.graphics.moveTo(0, this.lineY);
        this.timeLine.graphics.lineTo(this.lineWidht + this.lineX * 2, this.lineY);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX, this.lineY - 15);
        this.timeLine.graphics.moveTo(this.lineX + this.lineWidht / 2, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX + this.lineWidht / 2, this.lineY - 15);
        this.timeLine.graphics.moveTo(this.lineX + this.lineWidht, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX + this.lineWidht, this.lineY - 15);

        this.addChild(this.timeLine);
    }
}