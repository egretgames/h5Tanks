class SetDataLayer extends SceneBase {

    public data: AllData;
    // 可以调节的文字参数
    public fontSize: number;
    public firstLineY: number = 50;
    public secondLineY: number = 100;
    public lineX: number = 50;
    public textColor: number = 0x000000;

    // 可变控件引用
    public matidInput: egret.TextField;
    public userName: eui.Label;
    public userPhone: eui.Label;
    public userAdress: eui.Label;

    public yearCom:InputComponent;
    public monthCom:InputComponent;
    public dayCom:InputComponent;
    public hourCom:InputComponent;
    public minuteCom:InputComponent;

    public timeLength:egret.TextField;
    public selectComponent:SelectComponent;

    constructor() {
        super();
        this.data = GameMain.showStage.data;
        this.fontSize = this.data.fontSize;
    }
    public onAddToStage(event: egret.Event): void {
        let label = new eui.Label("地垫ID：____________________ 用户：                    电话：                  地址：");
        label.size = this.fontSize;
        label.x = this.lineX;
        label.y = this.firstLineY;
        label.textColor = this.textColor;
        this.addChild(label);

        label = new eui.Label("日期：             年         月         日         时         分          获取时长：");
        label.size = this.fontSize;
        label.x = this.lineX;
        label.y = this.secondLineY;
        label.textColor = this.textColor;
        this.addChild(label);

        this.matidInput = new egret.TextField();
        this.matidInput.type = egret.TextFieldType.INPUT;
        this.matidInput.size = this.fontSize;
        this.matidInput.textColor = this.textColor;
        this.matidInput.x = this.lineX + this.fontSize * 4;
        this.matidInput.y = this.firstLineY - 2
        this.matidInput.width = this.fontSize * 10;
        this.matidInput.height = this.fontSize + 2;
        this.matidInput.text = "输入地垫ID";
        //this.matidInput.skinName = textInputSkin;
        this.addChild(this.matidInput);

        this.userName = new eui.Label();
        this.userName.size = this.fontSize;
        this.userName.x = this.lineX + this.fontSize * 20;
        this.userName.y = this.firstLineY;
        this.userName.textColor = this.textColor;
        this.addChild(this.userName);

        this.userPhone = new eui.Label();
        this.userPhone.size = this.fontSize;
        this.userPhone.x = this.lineX + this.fontSize * 30;
        this.userPhone.y = this.firstLineY;
        this.userPhone.textColor = this.textColor;
        this.addChild(this.userPhone);

        this.userAdress = new eui.Label();
        this.userAdress.size = this.fontSize;5
        this.userAdress.x = this.lineX + this.fontSize * 40;
        this.userAdress.y = this.firstLineY;
        this.userAdress.textColor = this.textColor;
        this.addChild(this.userAdress);

        this.yearCom = new InputComponent(this.lineX + this.fontSize * 3, this.secondLineY, this.fontSize *4, this.fontSize * 3, 0,3000, this.data.selectDate.getFullYear());
        this.addChild(this.yearCom);
        this.monthCom = new InputComponent(this.lineX + this.fontSize * 8, this.secondLineY, this.fontSize *4, this.fontSize * 3, 1,12, this.data.selectDate.getMonth());
        this.addChild(this.monthCom);
        this.dayCom = new InputComponent(this.lineX + this.fontSize * 13, this.secondLineY, this.fontSize *4, this.fontSize * 3, 1,31, this.data.selectDate.getFullYear());
        this.addChild(this.dayCom);
        this.hourCom = new InputComponent(this.lineX + this.fontSize * 18, this.secondLineY, this.fontSize *4, this.fontSize * 3, 0,23, this.data.selectDate.getMonth());
        this.addChild(this.hourCom);
        this.minuteCom = new InputComponent(this.lineX + this.fontSize * 23, this.secondLineY, this.fontSize *4, this.fontSize * 3, 0,59, this.data.selectDate.getFullYear());
        this.addChild(this.minuteCom);

        this.timeLength = new egret.TextField();
        this.timeLength.border = true;
        this.timeLength.borderColor = 0x000000;
        this.timeLength.size = this.fontSize;
        this.timeLength.textColor = 0x000000;
        this.timeLength.width = this.fontSize*5;
        this.timeLength.height = this.fontSize+2;
        this.timeLength.text = "5分钟";
        this.timeLength.textAlign = "center";
        this.timeLength.verticalAlign = "middle";
        this.timeLength.x = this.lineX + this.fontSize * 30;
        this.timeLength.y = this.secondLineY; 
        this.addChild(this.timeLength);
        this.timeLength.touchEnabled = true;
        this.timeLength.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openSelectComponent,this);

        this.selectComponent = new SelectComponent(this.lineX + this.fontSize * 34, this.secondLineY, this.fontSize, this);
        this.SetData();
    }
    public openSelectComponent():void{
        this.addChild(this.selectComponent);
    }
    public SetData(): void {
        this.userName.text = this.data.userName;
        this.userPhone.text = this.data.userPhone;
        this.userAdress.text = this.data.userAdress;
    }
    public onSetTime():Date{
        let dateTime = new Date(this.yearCom.value,this.monthCom.value,this.dayCom.value,this.hourCom.value,this.minuteCom.value,0,0);
        return dateTime;
    }

    public Update(): void {

    }
}