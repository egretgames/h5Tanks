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

    public dataSource = [{"package":"F20900B28D1F4849F20800B28D214AF20800B28D2D08F20900B28D30090AF20800B28D4148F20800B28D4849F20800B28D4D4FF20A00B28D4E0F8108F20800B28D5009","time":1561952738686},                 {"package":"F20800B28A964DF20900B28A974B4CF20800B28A984AF20800B28A9F0AF20800B28AA54AF20800B28AA60DF20A00B28AA70A0B0C","time":1561954684733}];
    
    constructor(){
        console.log(new Date(1561954684733).toString());
    }
    public onGetData():void{
        GameMain.showStage.onGetDataOk();
    }
}