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
    public userInputTime: Date = new Date();
    public userInputTimeLength: number = 5 * 60 * 1000;

    // 滑块时间的 开始，结束，时长（毫秒）
    public selectStartTime: Date;
    public selectEndTime: Date;
    public selectTimeLength: number;

    public sourceCommandList: Array<any>;
    public selectedCommandList: Array<ButtonCommandData>;

    // package 数据部分；
    // Mon Jul 01 2019 11:45:38 GMT+0800 (中国标准时间)
    // Mon Jul 01 2019 12:18:04 GMT+0800 (中国标准时间)
    public timeUnit = 50;
    public dataSource = [{ "package": "F20900B28D1F4849F20800B28D214AF20800B28D2D08F20900B28D30090AF20800B28D4148F20800B28D4849F20800B28D4D4FF20A00B28D4E0F8108F20800B28D5009", "time": 1561952738686 },
    { "package": "F20800B28A964DF20900B28A974B4CF20800B28A984AF20800B28A9F0AF20800B28AA54AF20800B28AA60DF20A00B28AA70A0B0C", "time": 1561954684733 }];
    //ButtonCommandData 是一个存放单个命令的类 结构：{id: number;    time: number;    isPress: boolean;}
    public buttonCommands: Array<ButtonCommandData>;

    constructor() {
        //this.onGetData();
    }
    public btnCommandIndex = 1;
    public getButtonsCommand(castTimeUnit: number, buttonCommands: string, packageTime: number): void {
        let highParam: number;
        let lowParam: number;
        let buttonData: ButtonCommandData;
        let buttonID: number;
        for (let i = 0; i < buttonCommands.length; i += 2) {

            highParam = parseInt("0x" + buttonCommands[i]);
            lowParam = parseInt("0x" + buttonCommands[i + 1]);
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
            currentComTimeUnit = parseInt("0x" + commands[i].substr(2, 10));
            if (i == 1) {
                castTimeUnit = 0;
                firstComTimeUnit = currentComTimeUnit;
            }
            castTimeUnit = currentComTimeUnit - firstComTimeUnit;
            this.getButtonsCommand(castTimeUnit, commands[i].substr(10), time);
        }
        //console.log("012345".substr(1,3)); 123
    }
    public getPackage(): void {
        this.buttonCommands = new Array<ButtonCommandData>();
        for (let i = 0; i < this.dataSource.length; i++) {
            this.getCommands(this.dataSource[i].package, this.dataSource[i].time);
        }
    }

    // 拉去服务器数据后 的数据处理函数
    public onGetData(): void {
        this.getPackage();
 
        GameMain.showStage.onGetDataOk();
    }

    //假的网络请求函数
    public tempFun(): void {
        // 根据给的例子的时间
        // Mon Jul 01 2019 11:45:38 GMT+0800 (中国标准时间)
        // Mon Jul 01 2019 12:18:04 GMT+0800 (中国标准时间)
        // 假定获取数据的时间是 2019 7 1 11：30 - 12：30； ---   1561951800000 + 60×60×1000
        this.userInputTime = new Date(1561951800000);
        this.userInputTimeLength = 60 * 60 * 1000;

        this.selectStartTime = this.userInputTime;
        this.selectTimeLength = this.userInputTimeLength;
        this.selectEndTime = new Date(this.selectStartTime.getTime()+this.selectTimeLength);
        //this.dataSource = ********
        this.onGetData();
    }
    public startGetData(): void {
        //发送请求，取数据
        this.tempFun();

    }
}