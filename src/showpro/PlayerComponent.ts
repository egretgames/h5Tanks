class PlayButton extends egret.TextField{
    public pid:PlayerComponent;
    public callback:any;
    public fontSize:number = 20;
    constructor(x:number,y:number,text:string,pid:PlayerComponent,callback:any){
        super();
        this.pid = pid;
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = 20;
        this.background = true;
        this.backgroundColor = 0x5c9bd3;
        this.size = this.fontSize;
        this.textColor = 0xffffff;
        this.width = this.fontSize * 4;
        this.height = this.fontSize + 4;
        this.textAlign = "center";
        this.verticalAlign = "middle";
        this.touchEnabled = true;
        this.callback = callback;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,callback,pid);
    }
    public onClick(event:TouchEvent):void{
        this.callback();
    }
}
class TimeCursor extends egret.Shape{
    public rectW: number = 20;
    public pid: PlayerComponent;
    public minX:number;
    public maxX:number;

    constructor(posx: number, posy: number,minX:number,maxX:number, parent: PlayerComponent) {
        super();
        this.minX = minX;
        this.maxX = maxX;
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
        this.pid.stop();
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
    }
    public endTouch(event: egret.TouchEvent): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveThis, this);
        this.pid.onSelectBarChanage(this.x);
    }
    public onMoveThis(event: egret.TouchEvent): void {
        this.x += event.localX - this.anchorOffsetX;
        if (this.x < this.minX) {
            this.x = this.minX;
        }
        if (this.x > this.maxX - this.anchorOffsetX) {
            this.x = this.maxX - this.anchorOffsetX;
        }
        this.pid.setCurrentTimeByCursorX(this.x);
    }
} 
class PlayerComponent extends egret.DisplayObjectContainer{

    public pid: PlayAnimationLayer;

    public lineX: number = 50;
    public lineY: number = 50;
    public lineWidht: number = 700;

    public timeLine: egret.Shape;
    public startLabel: eui.Label;
    public endLabel: eui.Label;
    public currentTimeLabel:eui.Label;

    public btnReset:egret.TextField;
    public btnStartPlay: egret.TextField;
    public btnStopPlay: egret.TextField;
    public scrollBarBlock: TimeCursor;
    public blockLabel: eui.Label;

    public currentTime:number;
    public currentCommandIndex:number;
    public playState:number;
    public playSpeed:number = 1;

    public timeOnEnterFrame:number;

    constructor(posx:number,posy:number, pid:PlayAnimationLayer){
        super();
        
        this.x = posx;
        this.y = posy;
        this.pid = pid;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    }

    public onAddToStage():void{

        this.timeLine = new egret.Shape();
        this.timeLine.graphics.lineStyle(2, 0x222222);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineWidht + this.lineX, this.lineY);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX, this.lineY - 15);
        this.timeLine.graphics.moveTo(this.lineX + this.lineWidht, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX + this.lineWidht, this.lineY - 15);
        this.addChild(this.timeLine);

        this.startLabel = new eui.Label();
        this.startLabel.text = "00:00";
        this.startLabel.size = 12;
        this.startLabel.textColor = 0x000000;
        this.startLabel.anchorOffsetX += this.startLabel.width / 2;
        this.startLabel.x = this.lineX;
        this.startLabel.y = this.lineY - 30;
        this.addChild(this.startLabel);

        this.endLabel = new eui.Label();
        this.endLabel.text = "00:00";
        this.endLabel.size = 12;
        this.endLabel.textColor = 0x000000;
        this.endLabel.anchorOffsetX += this.endLabel.width / 2;
        this.endLabel.x = this.lineX + this.lineWidht;
        this.endLabel.y = this.lineY - 30;
        this.addChild(this.endLabel);

        this.currentTimeLabel = new eui.Label();
        this.currentTimeLabel.size = 12;
        this.currentTimeLabel.textColor = 0x000000;
        this.addChild(this.currentTimeLabel);

        this.btnStartPlay = new PlayButton(0-this.lineX,0,"开始",this, this.play);
        this.addChild(this.btnStartPlay);
        this.btnStopPlay = new PlayButton(0-this.lineX,0,"暂停",this, this.stop);
        this.addChild(this.btnStopPlay);
        this.btnReset = new PlayButton(0-this.lineX,this.lineY,"重置",this, this.restart);
        this.addChild(this.btnReset);
    }
    public redrawComponent():void{
        this.startLabel.text = this.pid.data.selectStartTime.getHours()+":"+this.pid.data.selectStartTime.getMinutes()+":"+this.pid.data.selectStartTime.getSeconds();
        this.endLabel.text = this.pid.data.selectEndTime.getHours()+":"+this.pid.data.selectEndTime.getMinutes()+":"+this.pid.data.selectEndTime.getSeconds();
        this.currentTime = this.pid.startTime;
        if(this.scrollBarBlock){

            this.removeChild(this.scrollBarBlock);
        }
        this.scrollBarBlock = new TimeCursor(this.lineX,this.lineY,this.lineX,this.lineX+this.lineWidht,this);
        this.addChild(this.scrollBarBlock);
        this.restart();
    }
    public playFromStartToCurrentTime():void{
        for(let i = 0;i<this.pid.btnStateBlocks.length;i++){
            this.pid.setButtonStateBlock(i,false);
        }
        let command:ButtonCommandData;
        for(let i = 0;i<this.pid.data.buttonCommands.length;i++){
            command = this.pid.data.buttonCommands[i];
            if(command.time < this.currentTime){
                this.pid.setButtonStateBlock(command.id,command.isPress);
            } else {
                this.currentCommandIndex = i;
                break;
            }
        }
    }
    public setCurrentTimeLabel():void{
        let time:Date =new Date(this.currentTime);
        this.currentTimeLabel.text = time.getHours().toString() + ":" + time.getMinutes().toString() +":"+time.getSeconds().toString()+":"+time.getMilliseconds().toString();
        this.currentTimeLabel.anchorOffsetX = this.currentTimeLabel.width / 2;
        this.currentTimeLabel.x = this.scrollBarBlock.x;
        this.currentTimeLabel.y = this.scrollBarBlock.y + 60;       
    }
    public setCurrentTimeByCursorX(x:number): void {
        this.currentTime = this.pid.startTime + (x-this.lineX) * this.pid.timeLength / this.lineWidht;
        this.setCurrentTimeLabel();
    }
    public onSelectBarChanage(x:number): void {
        console.log("buttonup")
        this.playFromStartToCurrentTime();
    }

    public restart():void{
        this.playState = 0;
        this.btnStopPlay.visible = false;
        this.btnStartPlay.visible = true;
        this.scrollBarBlock.x = this.lineX;
        this.setCurrentTimeByCursorX(this.lineX);
        this.playFromStartToCurrentTime();
    }
    public play():void{
        console.log("play");
        console.log(new Date(this.pid.startTime));
        console.log(new Date(this.currentTime));
        this.playState = 1;
        this.btnStartPlay.visible = false;
        this.btnStopPlay.visible = true;
        this.timeOnEnterFrame = egret.getTimer();
    }
    public stop():void{
        this.playState = 0;
        this.btnStartPlay.visible = true;
        this.btnStopPlay.visible = false;
    }
    public now:number;
    public pass:number;
    public onUpdate(event:egret.Event):void{
        if(this.playState == 1){
            
            this.now = egret.getTimer();
            this.pass = (this.now - this.timeOnEnterFrame)*this.playSpeed;
            this.currentTime+=this.pass;
            console.log(this.pass);
            console.log(this.currentTime);
            if(this.currentTime>this.pid.endTime){
                this.currentTime = this.pid.endTime;
                this.stop();
                return;
            }
            // 1，调整游标位置    2，绘制按钮状态
            this.scrollBarBlock.x = this.lineX + (this.currentTime-this.pid.startTime)*this.lineWidht / this.pid.timeLength;
            this.setCurrentTimeLabel();
            console.log(this.scrollBarBlock.x);
            for(let i = this.currentCommandIndex;i<this.pid.data.buttonCommands.length;i++){
                if(this.pid.data.buttonCommands[i].time < this.currentTime){
                    this.pid.setButtonStateBlock(this.pid.data.buttonCommands[i].id,this.pid.data.buttonCommands[i].isPress);
                } else {
                    this.currentCommandIndex = i;
                    break;
                }
            }
            this.timeOnEnterFrame = egret.getTimer();
        }
    }
}