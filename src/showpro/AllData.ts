class ButtonCommandData {
    public id: number;
    public time: number;
    public isPress: boolean;

    public setData(id: number, time: number, isPress: boolean): void {
        this.id = id;
        this.time = time;
        this.isPress = isPress;
    }
    public addTimeOffset(timeOffset: number): void {
        this.time += timeOffset;
    }

    public objToString():string{
        return "id:"+ this.id.toString()+"    isPress:"+Number(this.isPress).toString()+"    time:"+new Date(this.time).toString()+"ss:"+(this.time%1000);
    }
}

class AllData {

    public widht: number;
    public height: number;

    //about ui
    public fontSize: number = 16;

    //for SetDataLayer
    public matid: string = "";
    public userName: string = "nan";
    public userPhone: string = "nan";
    public userAdress: string = "nan";

    // 获取时段的 开始 时长（毫秒）
    public defaultTImeLength = 2 * 60  *1000;
    public defaultStartTime = new Date(1562488080000);//2019 7 7 16:28
    public defaultTimeLengthText = "2分钟";
    public defaultMatid = "356566078241031";
    
    public userInputTime: Date;
    public userInputTimeLength: number;

    // 滑块时间的 开始，结束，时长（毫秒）
    public selectStartTime: Date;
    public selectEndTime: Date;
    public selectTimeLength: number;

    public sourceCommandList: Array<any>;
    public selectedCommandList: Array<ButtonCommandData>;

    // package 数据部分；
    public timeUnit = 50;
    public dataSource = [{ "package": "F20900B28D1F4849F20800B28D214AF20800B28D2D08F20900B28D30090AF20800B28D4148F20800B28D4849F20800B28D4D4FF20A00B28D4E0F8108F20800B28D5009", "time": 1561952738686 },
    { "package": "F20800B28A964DF20900B28A974B4CF20800B28A984AF20800B28A9F0AF20800B28AA54AF20800B28AA60DF20A00B28AA70A0B0C", "time": 1561954684733 }];
    //ButtonCommandData 是一个存放单个命令的类 结构：{id: number;    time: number;    isPress: boolean;}
    public buttonCommands: Array<ButtonCommandData>;

    

    constructor() {
    }
    public btnCommandIndex = 1;
    public getButtonsCommand(castTimeUnit: number, commandsStr: string, packageTime: number): void {
        let highParam: number;
        let lowParam: number;
        let buttonData: ButtonCommandData;
        let buttonID: number;
        for (let i = 0; i < commandsStr.length; i += 2) {

            highParam = parseInt("0x" + commandsStr[i]);
            lowParam = parseInt("0x" + commandsStr[i + 1]);
            if (Math.floor(highParam / 8) == 0) {
                buttonData = new ButtonCommandData();
                buttonData.setData(highParam % 4 * 16 + lowParam, packageTime + castTimeUnit * this.timeUnit, Boolean(Math.floor(highParam % 8 / 4)));
                this.buttonCommands.push(buttonData);
            } else {
                buttonData.addTimeOffset((highParam % 8 * 16 + lowParam) * this.timeUnit)
            }
        }
        this.buttonCommands.sort((a: ButtonCommandData, b: ButtonCommandData) => { return a.time - b.time })
    }
    public index = 1;
    public getCommands(pack: string, time: number): void {
        let commands = pack.split("F2");
        let firstComTimeUnit: number;         //上一个命令时间
        let currentComTimeUnit: number;      //当前命令时间
        let castTimeUnit: number;            //两个命令的时间差
        for (let i = 1; i < commands.length; i++) {
            currentComTimeUnit = parseInt("0x" + commands[i].substr(2, 8));
            if (i == 1) {
                firstComTimeUnit = currentComTimeUnit;
            }
            castTimeUnit = currentComTimeUnit - firstComTimeUnit;
            
            this.getButtonsCommand(castTimeUnit, commands[i].substr(10), time);
        }
        //console.log("012345".substr(1,3)); 123
    }
    public getPackage(): void {
        console.log("getPackage");
        this.buttonCommands = new Array<ButtonCommandData>();
        for (let i = 0; i < this.dataSource.length; i++) {
            this.getCommands(this.dataSource[i].package, this.dataSource[i].time);
        }
    }

    // 拉去服务器数据后 的数据处理函数
    public onGetData(): void {
        //滑块时间 设置为用户输入时间
        this.selectStartTime = this.userInputTime;
        this.selectTimeLength = this.userInputTimeLength;
        this.selectEndTime = new Date(this.selectStartTime.getTime()+this.selectTimeLength);
        this.getPackage();
        for(let i = 0;i<this.buttonCommands.length;i++){
            console.log(this.buttonCommands[i].objToString());
        }
        GameMain.showStage.onGetDataOk();
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        let jsonObj = JSON.parse(request.response);
        console.log(jsonObj);
        this.dataSource = jsonObj;
        this.onGetData();
    }
    public requestData():void{
        // 1562480880000
        // 1562488159050
        // 1562488159059
        // 1562481180000
        let request:egret.HttpRequest = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        let start = this.userInputTime.getTime().toString();
        let end = (this.userInputTime.getTime()+this.userInputTimeLength).toString();
        console.log("今天下午的测试数据的开始时间点是：Sun Jul 07 2019 16:28:00 GMT+0800----1562488159050");
        console.log("今天下午的测试数据的结束时间点是：Sun Jul 07 2019 16:28:00 GMT+0800----1562488159059");
        console.log("获取数据的开始时间是："+this.userInputTime+"----"+this.userInputTime.getTime());
        console.log("获取数据的结束时间是："+new Date(+end)+"----"+end);
        console.log("获取数据的地垫ID号是："+this.matid);
        let uri = "http://47.104.94.229:8081/sd/buttons?start="+start+"&end="+end+"&matid="+this.matid;
        console.log("获取数据的完整连接是："+uri);
        request.open(uri,egret.HttpMethod.GET);
        //request.open("https://lingyouhui.vip/main/v1/tb_tbk/material?material_id=3756&aliasId=&page_no=1&page_size=50",egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
    }
    public startGetData(): void {
        //发送请求，取数据
       //this.tempFun();
       this.requestData();
    }
}