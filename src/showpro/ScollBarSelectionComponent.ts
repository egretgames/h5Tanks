class ScollBlock extends egret.Shape{
    public rectW:number = 20;
    public pid:ScollBarSelectionComponent;
    public callback:any;

    constructor(posx:number, posy:number, parent:ScollBarSelectionComponent, callback:any){
        super();
        this.pid = parent;
        this.callback = callback;
        this.graphics.lineStyle ( 2, 0x000000);
        this.graphics.moveTo(this.rectW/2,0);
        this.graphics.lineTo(0,this.rectW);
        this.graphics.lineTo(0,this.rectW*2);
        this.graphics.lineTo(this.rectW,this.rectW*2);
        this.graphics.lineTo(this.rectW,this.rectW);
        this.graphics.lineTo(this.rectW/2,0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0,this.rectW,this.rectW,this.rectW);
        this.graphics.endFill();
        this.anchorOffsetX = this.width/2-1;
        this.x = posx;
        this.y = posy;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this)
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.endTouch,this)
    }
    public onTouch(event:egret.TouchEvent):void{
        console.log("onTouch");
        console.log(event);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveThis,this);
    }
    public endTouch(event:egret.TouchEvent):void{
        console.log("endTouch");
        console.log(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveThis,this);
    }
    public onMoveThis(event:egret.TouchEvent):void{
        
        this.x += event.localX-this.anchorOffsetX;
        if(this.x<100){
            this.x=100;
        } 
        if(this.x>1000+this.anchorOffsetX){
            this.x = 1000+this.anchorOffsetX;
        }
        console.log(this.x);
    }
    
}

class ScollBarSelectionComponent extends egret.DisplayObjectContainer{

    public startTime:Date;
    public endTime:Date;
    public timeLength:number;

    public timeLine:egret.Shape;
    // 线段的起始点坐标 线段两边各多出一个lineX的长度作为坐标轴延伸
    public lineX:number = 100;
    public lineY:number = 50;
    // 坐标轴有效线段的长度
    public lineWidht:number = 800;
    
    constructor(posx:number,posy:number,startTime:Date,timeLength:number){
        super();
        this.x = posx;
        this.y = posy;
        this.startTime = startTime;
        this.timeLength = timeLength;
        this.endTime = new Date(this.startTime.getTime()+this.timeLength);
        this.drawComponent();
    }

    public drawComponent():void{
        this.timeLine = new egret.Shape();
        	
        this.timeLine.graphics.lineStyle ( 1, 0x000000);
        this.timeLine.graphics.moveTo(0,this.lineY);
        this.timeLine.graphics.lineTo(this.lineWidht+this.lineX*2,this.lineY);
        this.timeLine.graphics.moveTo(this.lineX,this.lineY);
        this.timeLine.graphics.lineTo(this.lineX,this.lineY-15);
        this.timeLine.graphics.moveTo(this.lineX+this.lineWidht/2,this.lineY);
        this.timeLine.graphics.lineTo(this.lineX+this.lineWidht/2,this.lineY -15);
        this.timeLine.graphics.moveTo(this.lineX+this.lineWidht,this.lineY);
        this.timeLine.graphics.lineTo(this.lineX+this.lineWidht,this.lineY-15);

        this.addChild(this.timeLine);
        
    }
    public setData():void{
        this.removeChildren();
        this.drawComponent();

        let start = new eui.Label();
        start.text = this.startTime.getHours().toString()+":"+this.startTime.getMinutes().toString();
        start.size = 12;
        start.textColor = 0x000000;
        start.anchorOffsetX += start.width/2;
        start.x = this.lineX;
        start.y = this.lineY - 30;        
        this.addChild(start);

        let middleTime = new Date(this.startTime.getTime()+this.timeLength/2);
        let middle = new eui.Label();
        middle.text = middleTime.getHours().toString()+":"+middleTime.getMinutes().toString();
        middle.size = 12;
        middle.textColor = 0x000000;
        middle.anchorOffsetX += middle.width/2;
        middle.x = this.lineX+this.lineWidht/2;
        middle.y = this.lineY - 30;
        this.addChild(middle);

        let endTime = new Date(this.startTime.getTime()+this.timeLength/2);
        let end = new eui.Label();
        end.text = endTime.getHours().toString()+":"+endTime.getMinutes().toString();
        end.size = 12;
        end.textColor = 0x000000;
        end.anchorOffsetX += end.width/2;
        end.x = this.lineX+this.lineWidht;
        end.y = this.lineY - 30;
        this.addChild(end);

        let btnA = new ScollBlock(this.lineX,this.lineY+2,this,this.onSelectBarChanage);
        this.addChild(btnA);
        let btnB = new ScollBlock(this.lineX + this.lineWidht, this.lineY+2,this, this.onSelectBarChanage);
        this.addChild(btnB);
    }

    public onSelectBarChanage(event:egret.Event):void{

    }
}