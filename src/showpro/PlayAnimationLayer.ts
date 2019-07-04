class PlayAnimationLayer extends SceneBase{ 

    public data: AllData;
    public startTime: number;
    public timeLength: number;
    public endTime: number;

    public tableX: number = 100;
    public tableY: number = 100;

    public playerX: number = 80;
    public playerY: number = 520;

    public buttonTable:ButtonTable;
    public playerControll:PlayerComponent;

    constructor(x:number,y:number){
        super();
        this.data = GameMain.showStage.data;
        this.x = x;
        this.y = y;
    }

    protected onAddToStage(event: egret.Event):void{

        let bg = new egret.Shape();
        bg.graphics.lineStyle(2, 0x222222);
        bg.graphics.drawRect(0,0,900,650);
        this.addChild(bg);

        this.playerControll = new PlayerComponent(this.playerX,this.playerY,this);
        this.addChild(this.playerControll);

        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);

        this.redraw();
    }

    public redraw():void{
        this.playerControll.redrawComponent();
    }

    public updateLayer():void{
        this.startTime = this.data.selectStartTime.getTime();
        this.endTime = this.data.selectEndTime.getTime();
        this.timeLength = this.endTime - this.startTime;

        this.redraw();
    }
    protected Update():void{
        
    }
}