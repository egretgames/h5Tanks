class SetDataLayer extends SceneBase {

    public data: AllData;
    // 可以调节的文字参数
    public fontSize: number = 16;
    public firstLineY: number = 50;
    public secondLineY: number = 100;
    public lineX: number = 50;
    public textColor: number = 0x000000;

    // 可变控件引用

    public matidInput: egret.TextField;
    public userName: eui.Label;
    public userPhone: eui.Label;
    public userAdress: eui.Label;


    constructor() {
        super();
        this.data = GameMain.showStage.data;
    }
    public onAddToStage(event: egret.Event): void {
        let label = new eui.Label("地垫ID：____________________ 用户：                    电话：                  地址：");
        label.size = this.fontSize;
        label.x = this.lineX;
        label.y = this.firstLineY;
        label.textColor = this.textColor;
        this.addChild(label);

        label = new eui.Label("日期：           年       月       日       时       分        获取时长：");
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
        this.userName.x = this.lineX+this.fontSize *20;
        this.userName.y = this.firstLineY;
        this.userName.textColor = this.textColor;
        this.addChild(this.userName);

        this.userPhone = new eui.Label();
        this.userPhone.size = this.fontSize;
        this.userPhone.x = this.lineX+this.fontSize *30;
        this.userPhone.y = this.firstLineY;
        this.userPhone.textColor = this.textColor;
        this.addChild(this.userPhone);

        this.userAdress = new eui.Label();
        this.userAdress.size = this.fontSize;
        this.userAdress.x = this.lineX+this.fontSize *40;
        this.userAdress.y = this.firstLineY;
        this.userAdress.textColor = this.textColor;
        this.addChild(this.userAdress);

        let com:InputComponent = new InputComponent(10,200,200,200,20,null);

        this.addChild(com);
        this.SetData();
    }

    public SetData():void{
        this.userName.text = this.data.userName;
        this.userPhone.text = this.data.userPhone;
        this.userAdress.text = this.data.userAdress;
    }

    public Update(): void {

    }
}