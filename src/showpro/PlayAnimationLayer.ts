class PlayAnimationLayer extends SceneBase{
    public tableX: number = 150;
    public tableY: number = 100;

    public buttonTable:ButtonTable;
    constructor(){
        super();
    }

    protected onAddToStage(event: egret.Event):void{
        this.buttonTable = new ButtonTable(this.tableX, this.tableY);
        this.addChild(this.buttonTable);
    }

    protected Update():void{

    }
}