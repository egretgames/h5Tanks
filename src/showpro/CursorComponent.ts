class CursorComponent extends egret.Shape {
    public rectW: number = 20;
    public pid: IhasMouseMoveEvent;
    public startX: number;
    public endX:number;
    public moveMasking:MouseMoveMasking;
    constructor(posx: number, posy: number, startX:number, endX:number,maskX:number,maskY:number,maskW:number,maskH:number, parent: IhasMouseMoveEvent) {
        super();
        this.startX = startX;
        this.endX = endX;
        this.pid = parent;
        this.drawThis();
        this.x = posx;
        this.y = posy;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this)
        this.moveMasking = new MouseMoveMasking(maskX,maskY,maskW,maskH,this);
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
        this.pid.onMouseButtonDown();
    }
    public onMove(event:egret.TouchEvent): void {
        console.log(event.localX);
        console.log(this.moveMasking.x);
        this.x += event.localX-this.moveMasking.x-this.x;
        console.log(this.x);
        if (this.x < this.startX) {
            this.x = this.startX;
        }
        if (this.x > this.endX) {
            this.x = this.endX;
        }
        this.pid.onMouseMove(event);
    }

}

class MouseMoveMasking extends egret.Shape{
    public cursor:CursorComponent;
    constructor(posx:number,posy:number,w:number,h:number, cursor:CursorComponent){
        super();
        this.cursor = cursor;
        this.graphics.beginFill(0x000000,0.2);
        this.graphics.drawRect(posx,posy,w,h);
        this.graphics.endFill();
        this.touchEnabled = true;
        this.visible = false;
    }
    public enable():void{
        this.visible = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveInThis, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.unable, this);
    }
    public unable(event:egret.TouchEvent):void{
        this.visible = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveInThis, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.unable, this);
        this.cursor.endTouch(event);
    }
    public onMoveInThis(event:egret.TouchEvent):void{
        this.cursor.onMove(event);
    }
}