class TimeBlock extends egret.Shape {
    public startTime: number;
    public timeLength: number;
    public buttonID: number;
    public pid: ShowButtonsLayer;
    public maxTime:number;
    public btnStartTime:number;
    public btnEndTime:number;
    public button:ButtonBlock;
    
    constructor(btnid: number, time: number,buttonStartTime:number,buttonEndTime,button:ButtonBlock, parent: ShowButtonsLayer) {
        super();
        this.buttonID = btnid;
        this.startTime = time;
        this.pid = parent;
        this.btnStartTime = buttonStartTime;
        this.btnEndTime = buttonEndTime;
        this.maxTime = buttonEndTime-buttonStartTime;
        this.button = button;
        this.touchEnabled = true;
        //this.graphics.drawRect(pidX + );
    }
    public setTimeLength(endTime: number): void {

        this.timeLength = endTime - this.startTime;
        this.graphics.beginFill(0x444444);
        let width = this.timeLength*this.button.rectWidth/this.maxTime;
        this.graphics.drawRect(0,1,Math.max(width,5),this.button.rectHeight-2);
        this.graphics.endFill();
        this.x = this.pid.tableX + this.button.x + (this.startTime-this.btnStartTime)*this.button.rectWidth/this.maxTime;
        this.y = this.pid.tableY + this.button.y;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }
    public onClick(evnet:egret.TouchEvent):void{
        this.pid.onButtonBlockClick(this.buttonID,this.startTime,this.maxTime);
    }
}
class ShowButtonsLayer extends SceneBase {

    public data: AllData;

    public fontSize: number;
    public labelX: number = 250;
    public labelY: number = 30;

    public tableX: number = 150;
    public tableY: number = 100;

    public buttonName: eui.Label;
    public startTime: eui.Label;
    public keepTime: eui.Label;

    public scrollBar: ScrollBarSelectionComponent;
    public buttonTable: ButtonTable;

    public buttonBlockList: Array<TimeBlock>;
    public timeBlockList: Array<TimeBlock>;

    constructor(x: number, y: number) {
        super();
        this.data = GameMain.showStage.data;
        this.fontSize = this.data.fontSize;
        this.x = x;
        this.y = y;
    }
    public onAddToStage(event: egret.Event): void {
        let label = new eui.Label("当前按键：                    开始时间：                         时长：           ");
        label.size = this.fontSize;
        label.x = this.labelX;
        label.y = this.labelY;
        label.textColor = 0x000000;
        this.addChild(label);

        this.buttonName = new eui.Label();
        this.buttonName.size = this.fontSize;
        this.buttonName.x = this.labelX + this.fontSize * 5;
        this.buttonName.y = this.labelY;
        this.buttonName.textColor = 0x000000;
        this.buttonName.text = "nan";
        this.addChild(this.buttonName);

        this.startTime = new eui.Label();
        this.startTime.size = this.fontSize;
        this.startTime.x = this.labelX + this.fontSize * 15;
        this.startTime.y = this.labelY;
        this.startTime.textColor = 0x000000;
        this.startTime.text = "nan";
        this.addChild(this.startTime);

        this.keepTime = new eui.Label();
        this.keepTime.size = this.fontSize;
        this.keepTime.x = this.labelX + this.fontSize * 25;
        this.keepTime.y = this.labelY;
        this.keepTime.textColor = 0x000000;
        this.keepTime.text = "nan";
        this.addChild(this.keepTime);

        this.scrollBar = new ScrollBarSelectionComponent(80, 520, this);
        this.addChild(this.scrollBar);

        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);

    }

    public drawButtonBlocks(): void {
        if (this.timeBlockList != null && this.timeBlockList.length != 0) {
            for (let i = 0; i < this.timeBlockList.length; i++) {
                this.removeChild(this.timeBlockList[i]);
            }
        }
        
        this.buttonBlockList = new Array<TimeBlock>();
        this.timeBlockList = new Array<TimeBlock>();
        let timaA = this.data.selectStartTime.getTime();
        let timeB = this.data.selectEndTime.getTime();
        let command: ButtonCommandData;
        for (let i = 0; i < this.data.buttonCommands.length; i++) {
            command = this.data.buttonCommands[i];
            if (command.time > this.data.selectStartTime.getTime() && command.time < this.data.selectEndTime.getTime()) {
                if (command.isPress) {
                    this.buttonBlockList[command.id] = new TimeBlock(command.id, command.time,this.data.selectStartTime.getTime(),this.data.selectEndTime.getTime(),this.buttonTable.buttonArray[command.id], this);
                    // console.log("add  " + command.id);
                    // console.log(this.buttonBlockList);
                } else {
                    if(this.buttonBlockList[command.id]){
                        this.buttonBlockList[command.id].setTimeLength(command.time);
                        this.timeBlockList.push(this.buttonBlockList[command.id]);
                        this.addChild(this.timeBlockList[this.timeBlockList.length-1]);
                        this.buttonBlockList[command.id] = null;
                        // console.log("remove  " + command.id);
                        // console.log(this.buttonBlockList);
                        // console.log("timeblocks  " + command.id);
                        // console.log(this.timeBlockList);
                    }else{
                        // 左游标正好移动到时间块中间的时候，时间块没有开始时间，补上一个对象，用左游标的开始时间作为开始时间
                        let block = new TimeBlock(command.id, this.data.selectStartTime.getTime(),this.data.selectStartTime.getTime(),this.data.selectEndTime.getTime(),this.buttonTable.buttonArray[command.id], this);
                        block.setTimeLength(command.time);
                        this.timeBlockList.push(block);
                        this.addChild(this.timeBlockList[this.timeBlockList.length-1]);
                    }
                }
            }
        }
        // 右游标移动到时间快中间的时候的处理
        for(let i = 0;i<this.buttonBlockList.length;i++){
            if(this.buttonBlockList[i]){
                this.buttonBlockList[i].setTimeLength(this.data.selectEndTime.getTime());
                this.timeBlockList.push(this.buttonBlockList[i]);
                this.addChild(this.timeBlockList[this.timeBlockList.length-1]);       
            }
        }
        
    }

    public onButtonBlockClick(id:number,time:number,timeLength:number):void{
        this.buttonName.text = id.toString();
        let date = new Date(time);
        console.log(time);
        console.log(date);
        this.startTime.text = date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString()+"."+(time%1000).toString();
        let hours = Math.floor(timeLength/(60*60*1000));
        let minutes =  Math.floor((timeLength-hours*60*60*1000)/(60*1000));
        let seconds = Math.floor((timeLength-hours*60*60*1000-minutes*60*1000)/1000);
        let ss = timeLength%1000;
        this.keepTime.text = hours.toString()+":"+minutes.toString()+":"+seconds.toString()+"."+ss.toString();
    }
    public onScrollBarChanageStop(): void {
        console.log("onScrollBarChanage");
        this.drawButtonBlocks();
    }
    public setData(): void {
        this.scrollBar.setData();
        this.drawButtonBlocks();
    }
    //public onSelectTime(time1:number,posy:number)
    public Update(): void {

    }

}