class ScrollBlock extends egret.Shape {
    public rectW: number = 20;
    public pid: ScrollBarSelectionComponent;

    constructor(posx: number, posy: number, parent: ScrollBarSelectionComponent) {
        super();
        this.pid = parent;
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.moveTo(this.rectW / 2, 0);
        this.graphics.lineTo(0, this.rectW);
        this.graphics.lineTo(0, this.rectW * 2);
        this.graphics.lineTo(this.rectW, this.rectW * 2);
        this.graphics.lineTo(this.rectW, this.rectW);
        this.graphics.lineTo(this.rectW / 2, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0, this.rectW, this.rectW, this.rectW);
        this.graphics.endFill();
        this.anchorOffsetX = this.width / 2 - 1;
        this.x = posx;
        this.y = posy;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endTouch, this)
    }
    public onTouch(event: egret.TouchEvent): void {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
    }
    public endTouch(event: egret.TouchEvent): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
        this.pid.onSelectBarChanage();
    }
    public onMoveThis(event: egret.TouchEvent): void {

        this.x += event.localX - this.anchorOffsetX;
        if (this.x < 100) {
            this.x = 100;
        }
        if (this.x > 1000 + this.anchorOffsetX) {
            this.x = 1000 + this.anchorOffsetX;
        }
        this.pid.onBlockMove();
    }

}

class ScrollBarSelectionComponent extends egret.DisplayObjectContainer {

    public pid: ShowButtonsLayer;
    public startTime: Date;
    public timeLength: number;

    public timeLine: egret.Shape;
    // 线段的起始点坐标 线段两边各多出一个lineX的长度作为坐标轴延伸
    public lineX: number = 50;
    public lineY: number = 50;
    // 坐标轴有效线段的长度
    public lineWidht: number = 700;

    public scrollBarBlockA: ScrollBlock;
    public scrollBarBlockB: ScrollBlock;
    public blockLabelA: eui.Label;
    public blockLabelB: eui.Label;

    constructor(posx: number, posy: number, pid: ShowButtonsLayer) {
        super();
        this.pid = pid;
        this.x = posx;
        this.y = posy;
        this.drawComponent();
    }

    public drawComponent(): void {
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
    public setData(): void {
        this.removeChildren();
        this.drawComponent();
        this.startTime = this.pid.data.userInputTime;
        let start = new eui.Label();
        start.text = this.startTime.getHours().toString() + ":" + this.startTime.getMinutes().toString();
        start.size = 12;
        start.textColor = 0x000000;
        start.anchorOffsetX += start.width / 2;
        start.x = this.lineX;
        start.y = this.lineY - 30;
        this.addChild(start);

        let middleTime = new Date(this.startTime.getTime() + this.pid.data.userInputTimeLength / 2);
        let middle = new eui.Label();
        middle.text = middleTime.getHours().toString() + ":" + middleTime.getMinutes().toString()+":"+middleTime.getSeconds().toString();
        middle.size = 12;
        middle.textColor = 0x000000;
        middle.anchorOffsetX += middle.width / 2;
        middle.x = this.lineX + this.lineWidht / 2;
        middle.y = this.lineY - 30;
        this.addChild(middle);

        let endTime = new Date(this.startTime.getTime() + this.pid.data.userInputTimeLength);
        let end = new eui.Label();
        end.text = endTime.getHours().toString() + ":" + endTime.getMinutes().toString()+":"+endTime.getSeconds().toString();
        end.size = 12;
        end.textColor = 0x000000;
        end.anchorOffsetX += end.width / 2;
        end.x = this.lineX + this.lineWidht;
        end.y = this.lineY - 30;
        this.addChild(end);

        this.scrollBarBlockA = new ScrollBlock(this.lineX, this.lineY + 2, this);
        this.addChild(this.scrollBarBlockA);
        this.scrollBarBlockB = new ScrollBlock(this.lineX + this.lineWidht, this.lineY + 2, this);
        this.addChild(this.scrollBarBlockB);

        this.blockLabelA = new eui.Label();
        this.blockLabelA.size = 16;
        this.blockLabelA.textColor = 0x000000;
        this.addChild(this.blockLabelA);
        this.blockLabelB = new eui.Label();
        this.blockLabelB.size = 16;
        this.blockLabelB.textColor = 0x000000;
        this.addChild(this.blockLabelB);


        this.onBlockMove();
    }
    public getTimeByBlockPosX(posX: number): Date {
        let ss: number = Math.max(posX - this.lineX, 1) * this.pid.data.userInputTimeLength / this.lineWidht;
        return new Date(this.pid.data.userInputTime.getTime() + ss);
    }
    public onBlockMove(): void {
        let timeA:Date = this.getTimeByBlockPosX(this.scrollBarBlockA.x);
        this.blockLabelA.text = timeA.getHours().toString() + ":" + timeA.getMinutes().toString() +":"+timeA.getSeconds().toString();
        this.blockLabelA.anchorOffsetX = this.blockLabelA.width / 2;
        this.blockLabelA.x = this.scrollBarBlockA.x;
        this.blockLabelA.y = this.scrollBarBlockA.y + 60;

        let timeB = this.getTimeByBlockPosX(this.scrollBarBlockB.x);
        this.blockLabelB.text = timeB.getHours().toString() + ":" + timeB.getMinutes().toString() +":"+timeB.getSeconds().toString();
        this.blockLabelB.anchorOffsetX = this.blockLabelB.width / 2;
        this.blockLabelB.x = this.scrollBarBlockB.x;
        this.blockLabelB.y = this.scrollBarBlockB.y + 60;
    }
    public onSelectBarChanage(): void {
        let pointA: Date = this.getTimeByBlockPosX(this.scrollBarBlockA.x);
        let pointB: Date = this.getTimeByBlockPosX(this.scrollBarBlockB.x);
        if (pointA > pointB) {
            this.pid.data.selectStartTime = pointB;
            this.pid.data.selectEndTime = pointA;
            this.pid.data.selectTimeLength = pointA.getTime() - pointB.getTime();
        } else {
            this.pid.data.selectStartTime = pointA;
            this.pid.data.selectEndTime = pointB;
            this.pid.data.selectTimeLength = pointB.getTime() - pointA.getTime();
        }
        this.pid.onScrollBarChanageStop();
    }
}