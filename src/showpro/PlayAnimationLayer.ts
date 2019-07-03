class PlayAnimationLayer extends SceneBase{
    public tableX: number = 150;
    public tableY: number = 100;

    public playerX: number = 50;
    public playerY: number = 500;

    public buttonTable:ButtonTable;
    public playerControll:PlayerComponent;

    constructor(x:number,y:number){
        super();
        this.x = x;
        this.y = y;
    }

    protected onAddToStage(event: egret.Event):void{

        this.playerControll = new PlayerComponent(this.playerX,this.playerY,this);
        this.addChild(this.playerControll);

        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);
    }

    protected Update():void{
        
    }
}