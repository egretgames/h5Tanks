class TimeBlock extends egret.Shape {
    constructor(x: number, y: number, ss: number, timeLength: number, pidWidth: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
class ShowButtonsState extends SceneBase {

    public data: AllData;

    public fontSize: number;
    public labelX: number = 250;
    public labelY: number = 30;

    public tableX: number = 150;
    public tableY: number = 100;

    public buttonName: eui.Label;
    public startTime: eui.Label;
    public keepTime: eui.Label;

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
        this.buttonName.text = "111";
        this.addChild(this.buttonName);

        this.startTime = new eui.Label();
        this.startTime.size = this.fontSize;
        this.startTime.x = this.labelX + this.fontSize * 15;
        this.startTime.y = this.labelY;
        this.startTime.textColor = 0x000000;
        this.startTime.text = "222";
        this.addChild(this.startTime);

        this.keepTime = new eui.Label();
        this.keepTime.size = this.fontSize;
        this.keepTime.x = this.labelX + this.fontSize * 25;
        this.keepTime.y = this.labelY;
        this.keepTime.textColor = 0x000000;
        this.keepTime.text = "333";
        this.addChild(this.keepTime);

        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);

    }

    public Update(): void {

    }
}