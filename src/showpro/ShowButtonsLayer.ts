class TimeBlock extends egret.Shape {
    public timeMillisecond:number;
    constructor(data:number, pidX: number, pidY: number, selectTimeLength: number, timeLength: number, pidWidth: number) {
        super();
        this.x = pidX;
        this.y = pidY;
        this.graphics.beginFill(0x444444);
        //this.graphics.drawRect(pidX + );
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

    public scollBar:ScollBarSelectionComponent;
    public buttonTable: ButtonTable;

    constructor(x: number, y: number) {
        super();
        this.data = GameMain.showStage.data;
        this.fontSize = this.data.fontSize;
        this.x = x;
        this.y = y;
    }
    public onAddToStage(event: egret.Event): void {
        let label = new eui.Label("当前按键：                         开始时间：                            时长：           ");
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

        this.scollBar = new ScollBarSelectionComponent(80,520,this.data.userInputTime,this.data.userInputTimeLength);
        this.addChild(this.scollBar);

        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);

    }
    public setData():void{
        this.scollBar.setData();
    }
    //public onSelectTime(time1:number,posy:number)
    public Update(): void {

    }
}