class ShowButtonIsPressBlock extends egret.Shape{
    constructor(posX:number,posY:number,w:number,h:number){
        super();
        this.x = posX;
        this.y=  posY;
        this.graphics.beginFill(0x666666,1);
        this.graphics.drawRect(2,2,w-4,h-4);
        this.graphics.endFill();
        this.visible = false;
    }
    public setState(isPress:boolean){
        this.visible = isPress;
    }
}

class PlayAnimationLayer extends SceneBase{ 

    public data: AllData;
    public startTime: number;
    public timeLength: number;
    public endTime: number;

    public tableX: number = 100;
    public tableY: number = 30;

    public playerX: number = 80;
    public playerY: number = 520;

    public buttonTable:ButtonTable;
    public playerControll:PlayerComponent;
    public btnStateBlocks:Array<ShowButtonIsPressBlock>;

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

        this.btnStateBlocks = new Array<ShowButtonIsPressBlock>();
        for(let i = 0;i<this.buttonTable.buttonArray.length;i++){
            this.btnStateBlocks[i] = new ShowButtonIsPressBlock(this.tableX+this.buttonTable.buttonArray[i].x, this.tableY+this.buttonTable.buttonArray[i].y, this.buttonTable.buttonArray[i].rectWidth,this.buttonTable.buttonArray[i].rectHeight);
            this.addChild(this.btnStateBlocks[i]);
        }

    }

    // public redraw():void{
    //     this.startTime = this.data.selectStartTime.getTime();
    //     this.endTime = this.data.selectEndTime.getTime();
    //     this.timeLength = this.endTime - this.startTime;
    //     this.playerControll.redrawComponent();
    // }

    public updateLayer():void{
        this.startTime = this.data.selectStartTime.getTime();
        this.endTime = this.data.selectEndTime.getTime();
        this.timeLength = this.endTime - this.startTime;
        this.playerControll.redrawComponent();
    }
    public setButtonStateBlock(id:number,isPress:boolean):void{
        this.btnStateBlocks[id].setState(isPress);
    }
    protected Update():void{
        
    }
}