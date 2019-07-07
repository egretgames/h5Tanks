class CursorComponent extends egret.Shape {
    public rectW: number = 20;
    public pid: IhasMouseMoveEvent;
    public startX: number;
    public endX:number;
    public moveMasking:MouseMoveMasking;
    constructor(posx: number, posy: number, startX:number, endX:number,maskW:number,maskH:number, parent: IhasMouseMoveEvent) {
        super();
        this.startX = startX;
        this.endX = endX;
        this.pid = parent;
        this.drawThis();
        this.x = posx;
        this.y = posy;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endTouch, this)
        let x = posx - (maskW - endX + startX)/2;
        let y = posy - maskH/2;
        this.moveMasking = new MouseMoveMasking(x,y,maskW,maskH,this);
        this.pid.addChild(this);
        this.pid.addChild(this.moveMasking);
    }
    public drawThis():void{
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(0-this.rectW / 2, this.rectW);
        this.graphics.lineTo(0-this.rectW / 2, this.rectW * 2);
        this.graphics.lineTo(this.rectW/2, this.rectW * 2);
        this.graphics.lineTo(this.rectW/2, this.rectW);
        this.graphics.lineTo(0, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0-this.rectW / 2, this.rectW, this.rectW, this.rectW);
        this.graphics.endFill();
    }
    public onTouch(event: egret.TouchEvent): void {
        this.pid.setChildIndex(this.moveMasking,this.pid.numChildren-1);
        this.moveMasking.enable();
    }
    public endTouch(event: egret.TouchEvent): void {
        this.moveMasking.unable();
        this.pid.onMouseButtonDown();
    }
    public onMove(localX:number): void {
        this.x += localX;
        if (this.x < this.startX) {
            this.x = this.startX;
        }
        if (this.x > this.endX) {
            this.x = this.endX;
        }
        //this.pid.onBlockMove();
    }

}

class MouseMoveMasking extends egret.Shape{
    public cursor:CursorComponent;
    constructor(posx:number,posy:number,w:number,h:number, cursor:CursorComponent){
        super();
        this.cursor = cursor;
        this.graphics.beginFill(0xFF0000,0.5);
        this.graphics.drawRect(posx,posy,w,h);
        this.graphics.endFill();
        this.touchEnabled = true;
    }
    public enable():void{
        this.visible = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
    }
    public unable():void{
        this.visible = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
    }
    public onMoveThis(event:TouchEvent):void{
        this.cursor.
        // this.x += event.localX - this.anchorOffsetX;
        // if (this.x < this.startX) {
        //     this.x = this.startX;
        // }
        // if (this.x > this.endX + this.anchorOffsetX) {
        //     this.x = this.endX + this.anchorOffsetX;
        // }
        // this.listener.onMouseMove();
    }
}