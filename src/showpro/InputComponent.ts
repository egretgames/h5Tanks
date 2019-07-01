class InputComponent extends egret.DisplayObjectContainer{

    public limitMax:number;
    public limitMin:number;
    public comWidth:number;
    public comHeight:number;
    public value:number;
    public up:egret.TextField;
    public inputBox:egret.TextField;
    public down:egret.TextField;
    public callback:any;

    public constructor(x:number, y:number, componentWidth:number, componentHeight:number, minVal:number, maxVal:number, val:number) {
        super();
        this.x = x;
        this.y = y;
        this.comWidth = componentWidth;
        this.comHeight =  componentHeight;
        this.limitMax = maxVal;
        this.limitMin = minVal;
        this.value = val;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event):void{
        this.drawComponent();
    }
    public onTouchUpBegin(event: egret.Event):void{
        this.up.scaleY = 0.9;
    }
    public onTouchUpEnd(event: egret.Event):void{
        
        this.up.scaleY = 1;
        this.value++;
        if(this.value > this.limitMax){
            this.value = this.limitMax;
        }
        this.inputBox.text = this.value.toString();
        
    }
    public onTouchDownBegin(event: egret.Event):void{
        this.down.scaleY = 0.9;
    }
    public onTouchDownEnd(event: egret.Event):void{
        this.down.scaleY = 1;
        this.value--;
        if(this.value < this.limitMin){
            this.value = this.limitMin;
        }
        this.inputBox.text = this.value.toString();
    }
    public onTextInputOver(event:egret.Event):void{
        console.log("onInputOver");
        this.value = 0;
        this.value = +this.inputBox.text;

        if(this.value>this.limitMax){
            this.value = this.limitMax;
        }
        if(this.value<this.limitMin){
            this.value = this.limitMin;
        }
    }

    public drawComponent():void{

        this.up = new egret.TextField();
        //this.up.name = "abc";
        this.up.border = true;
        this.up.borderColor = 0x000000;
        this.up.size = this.comHeight/3;
        this.up.textColor = 0x000000;
        this.up.width = this.comWidth;
        this.up.height = this.comHeight/3;
        //up.text = "↑↓";
        this.up.text = "↑";
        this.up.textAlign = "center";
        this.up.verticalAlign = "middle";
        this.up.x = 0;
        this.up.y = 0-this.up.height;
        this.addChild(this.up);
        this.up.touchEnabled = true;
        this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchUpBegin,this);
        this.up.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchUpEnd,this)
        

        this.inputBox = new egret.TextField();
        this.inputBox.type = egret.TextFieldType.INPUT;
        this.inputBox.border = true;
        this.inputBox.borderColor = 0x000000;
        this.inputBox.size = this.comHeight/3;
        this.inputBox.textColor = 0x000000;
        this.inputBox.width = this.comWidth;
        this.inputBox.height = this.comHeight/3;
        //up.text = "↑↓";
        this.inputBox.text = this.value.toString();
        this.inputBox.textAlign = "center";
        this.inputBox.verticalAlign = "middle";
        this.inputBox.x = 0;
        this.inputBox.y = 0; 
        this.addChild(this.inputBox);
        this.inputBox.touchEnabled = true;
        this.inputBox.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onTextInputOver,this);

        this.down = new egret.TextField();
        this.down.border = true;
        this.down.borderColor = 0x000000;
        this.down.size = this.comHeight/3;
        this.down.textColor = 0x000000;
        this.down.width = this.comWidth;
        this.down.height = this.comHeight/3;
        //down.text = "↑↓";
        this.down.text = "↓";
        this.down.textAlign = "center";
        this.down.verticalAlign = "middle";
        this.down.x = 0;
        this.down.y = this.down.height; 
        this.addChild(this.down);
        this.down.touchEnabled = true;
        this.down.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchDownBegin,this);
        this.down.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchDownEnd,this)
    }
}