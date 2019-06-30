class CommandData{
    public id:string;
    public time:Date;
    public command:boolean;

    constructor(id:string, time:Date, command:boolean){
        this.id = id;
        this.time = time;
        this.command = command;
    }
}

class AllData{

    public widht:number;
    public height:number;

    //about ui
    public fontSize: number = 16;

    //for SetDataLayer
    public matid:string = "";
    public userName:string = "1111";
    public userPhone:string = "2222";
    public userAdress:string = "3333";

    // 获取时段的 开始 时长（毫秒）
    public userInputTime:Date = new Date();
    public userInputTimeLength:number = 5*60*1000;

    // 滑块时间的 开始，结束，时长（毫秒）
    public selectStartTime:Date;
    public selectEndTime:Date;
    public selectTimeLength:number;

    public sourceCommandList:Array<any>;
    public selectedCommandList:Array<CommandData>;
    
    constructor(){
        
    }
    public onGetData():void{
        GameMain.showStage.onGetDataOk();
    }
}