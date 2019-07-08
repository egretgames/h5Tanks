class PlayButton extends egret.TextField {
    public pid: PlayerComponent;
    public callback: any;
    public fontSize: number = 20;
    constructor(x: number, y: number, text: string, pid: PlayerComponent, callback: any) {
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, pid);
    }
    public onClick(event: TouchEvent): void {
        this.callback();
    }
}
class SpeedButton extends PlayButton{
    public value:number;
    constructor(x: number, y: number, pid: PlayerComponent, callback: any, val:number){
        super(x,y,"",pid,callback);
        this.value = val;
        this.size = 16;
        this.text = val.toString()+"倍速";
        this.width = this.fontSize * 4;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    public resetButtonShowState():void{
        this.backgroundColor = 0x5c9bd3;
    }
    public setButtonShowState():void{
        this.backgroundColor = 0x555555;
    }
    public onClick(event: TouchEvent): void {
        this.pid.setPlaySpeed(this.value);
        this.setButtonShowState();
    }
}

class PlayerComponent extends egret.DisplayObjectContainer implements IhasMouseMoveEvent {

    public pid: PlayAnimationLayer;

    public speedButtonX: number = 50;
    public speedButtonW: number = 80;
    public SpeedButtonY: number = -30;

    public lineX: number = 50;
    public lineY: number = 50;
    public lineWidth: number = 700;

    public timeLine: egret.Shape;
    public startLabel: eui.Label;
    public endLabel: eui.Label;
    public currentTimeLabel: eui.Label;

    public btnReset: egret.TextField;
    public btnStartPlay: egret.TextField;
    public btnStopPlay: egret.TextField;
    public scrollBarBlock: CursorComponent;
    public blockLabel: eui.Label;

    public currentTime: number;
    public currentCommandIndex: number;
    public playState: number;
    public playSpeed: number = 1;

    public timeOnEnterFrame: number;

    public speedButton_01: SpeedButton;
    public speedButton_02: SpeedButton;
    public speedButton_05: SpeedButton;
    public speedButton_1: SpeedButton;
    public speedButton_2: SpeedButton;
    public speedButton_4: SpeedButton;
    public speedButton_8: SpeedButton;
    public speedButton_16: SpeedButton;

    constructor(posx: number, posy: number, pid: PlayAnimationLayer) {
        super();

        this.x = posx;
        this.y = posy;
        this.pid = pid;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    }

    public onAddToStage(): void {

        this.timeLine = new egret.Shape();
        this.timeLine.graphics.lineStyle(2, 0x222222);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineWidth + this.lineX, this.lineY);
        this.timeLine.graphics.moveTo(this.lineX, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX, this.lineY - 15);
        this.timeLine.graphics.moveTo(this.lineX + this.lineWidth, this.lineY);
        this.timeLine.graphics.lineTo(this.lineX + this.lineWidth, this.lineY - 15);
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
        this.endLabel.x = this.lineX + this.lineWidth;
        this.endLabel.y = this.lineY - 30;
        this.addChild(this.endLabel);

        this.currentTimeLabel = new eui.Label();
        this.currentTimeLabel.size = 12;
        this.currentTimeLabel.textColor = 0x000000;
        this.addChild(this.currentTimeLabel);

        this.btnStartPlay = new PlayButton(0 - this.lineX, 0, "开始", this, this.play);
        this.addChild(this.btnStartPlay);
        this.btnStopPlay = new PlayButton(0 - this.lineX, 0, "暂停", this, this.stop);
        this.addChild(this.btnStopPlay);
        this.btnReset = new PlayButton(0 - this.lineX, this.lineY, "重置", this, this.restart);
        this.addChild(this.btnReset);

        let interval = 5;
        this.speedButton_01 = new SpeedButton(this.speedButtonX,this.SpeedButtonY,this,this.setPlaySpeed,0.1);
        this.speedButton_02 = new SpeedButton(this.speedButtonX+this.speedButtonW*1+interval*1,this.SpeedButtonY,this,this.setPlaySpeed,0.2);
        this.speedButton_05 = new SpeedButton(this.speedButtonX+this.speedButtonW*2+interval*2,this.SpeedButtonY,this,this.setPlaySpeed,0.5);
        this.speedButton_1 = new SpeedButton(this.speedButtonX+this.speedButtonW*3+interval*3,this.SpeedButtonY,this,this.setPlaySpeed,1);
        this.speedButton_2 = new SpeedButton(this.speedButtonX+this.speedButtonW*4+interval*4,this.SpeedButtonY,this,this.setPlaySpeed,2);
        this.speedButton_4 = new SpeedButton(this.speedButtonX+this.speedButtonW*5+interval*5,this.SpeedButtonY,this,this.setPlaySpeed,4);
        this.speedButton_8 = new SpeedButton(this.speedButtonX+this.speedButtonW*6+interval*6,this.SpeedButtonY,this,this.setPlaySpeed,8);
        this.speedButton_16 = new SpeedButton(this.speedButtonX+this.speedButtonW*7+interval*7,this.SpeedButtonY,this,this.setPlaySpeed,16);
        this.addChild(this.speedButton_01);
        this.addChild(this.speedButton_02);
        this.addChild(this.speedButton_05);
        this.addChild(this.speedButton_1);
        this.addChild(this.speedButton_2);
        this.addChild(this.speedButton_4);
        this.addChild(this.speedButton_8);
        this.addChild(this.speedButton_16);
        this.speedButton_1.onClick(null);
    }
    public setPlaySpeed(val):void{
        this.speedButton_01.resetButtonShowState();
        this.speedButton_02.resetButtonShowState();
        this.speedButton_05.resetButtonShowState();
        this.speedButton_1.resetButtonShowState();
        this.speedButton_2.resetButtonShowState();
        this.speedButton_4.resetButtonShowState();
        this.speedButton_8.resetButtonShowState();
        this.speedButton_16.resetButtonShowState();
        this.playSpeed = val;
    }
    public redrawComponent(): void {
        this.startLabel.text = this.pid.data.selectStartTime.getHours() + ":" + this.pid.data.selectStartTime.getMinutes() + ":" + this.pid.data.selectStartTime.getSeconds();
        this.endLabel.text = this.pid.data.selectEndTime.getHours() + ":" + this.pid.data.selectEndTime.getMinutes() + ":" + this.pid.data.selectEndTime.getSeconds();
        this.currentTime = this.pid.startTime;
        if (this.scrollBarBlock) {

            this.removeChild(this.scrollBarBlock);
        }

        let mx = this.lineX - 80 / 2;
        let my = this.lineY - 100 / 2;
        this.scrollBarBlock = new CursorComponent(this.lineX, this.lineY+2, this.lineX, this.lineX + this.lineWidth, mx, my,this.lineWidth + 80,100, this);
        this.addChild(this.scrollBarBlock);
        this.restart();
    }
    public playFromStartToCurrentTime(): void {
        for (let i = 0; i < this.pid.btnStateBlocks.length; i++) {
            this.pid.setButtonStateBlock(i, false);
        }
        let command: ButtonCommandData;
        for (let i = 0; i < this.pid.data.buttonCommands.length; i++) {
            command = this.pid.data.buttonCommands[i];
            if (command.time < this.currentTime) {
                this.pid.setButtonStateBlock(command.id, command.isPress);
            } else {
                this.currentCommandIndex = i;
                break;
            }
        }
    }
    public setCurrentTimeLabel(): void {
        let time: Date = new Date(this.currentTime);
        this.currentTimeLabel.text = time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + ":" + time.getMilliseconds().toString();
        this.currentTimeLabel.anchorOffsetX = this.currentTimeLabel.width / 2;
        this.currentTimeLabel.x = this.scrollBarBlock.x;
        this.currentTimeLabel.y = this.scrollBarBlock.y + 60;
    }
    public onSelectBlockMove(): void {
        this.currentTime = this.pid.startTime + (this.scrollBarBlock.x - this.lineX) * this.pid.timeLength / this.lineWidth;
        this.setCurrentTimeLabel();
    }
    public onSelectBarChanageOver(): void {
        this.playFromStartToCurrentTime();
    }

    public restart(): void {
        this.playState = 0;
        this.btnStopPlay.visible = false;
        this.btnStartPlay.visible = true;
        this.scrollBarBlock.x = this.lineX;
        this.currentTime = this.pid.startTime;
        this.setCurrentTimeLabel();

        this.playFromStartToCurrentTime();
    }
    public play(): void {
        console.log("play");
        console.log(new Date(this.pid.startTime));
        console.log(new Date(this.currentTime));
        this.playState = 1;
        this.btnStartPlay.visible = false;
        this.btnStopPlay.visible = true;
        this.timeOnEnterFrame = egret.getTimer();
    }
    public stop(): void {
        this.playState = 0;
        this.btnStartPlay.visible = true;
        this.btnStopPlay.visible = false;
    }
    public now: number;
    public pass: number;
    public onUpdate(event: egret.Event): void {
        if (this.playState == 1) {

            this.now = egret.getTimer();
            this.pass = (this.now - this.timeOnEnterFrame) * this.playSpeed;
            this.currentTime += this.pass;
            //console.log(this.pass);
            //console.log(this.currentTime);
            if (this.currentTime > this.pid.endTime) {
                this.currentTime = this.pid.endTime;
                this.stop();
                return;
            }
            // 1，调整游标位置    2，绘制按钮状态
            this.scrollBarBlock.x = this.lineX + (this.currentTime - this.pid.startTime) * this.lineWidth / this.pid.timeLength;
            this.setCurrentTimeLabel();
            //console.log(this.scrollBarBlock.x);
            for (let i = this.currentCommandIndex; i < this.pid.data.buttonCommands.length; i++) {
                if (this.pid.data.buttonCommands[i].time < this.currentTime) {
                    this.pid.setButtonStateBlock(this.pid.data.buttonCommands[i].id, this.pid.data.buttonCommands[i].isPress);
                } else {
                    this.currentCommandIndex = i;
                    break;
                }
            }
            this.timeOnEnterFrame = egret.getTimer();
        }
    }
    public onMouseMove(event: egret.TouchEvent): void {
        this.onSelectBlockMove();
    }
    public onMouseButtonDown(): void {
        this.onSelectBarChanageOver();
    }
}