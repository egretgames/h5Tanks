class TimeButton extends egret.TextField{
    public minutes:number;
    public callback:any;
    public parent:SelectComponent;
    constructor(index:number,fontSize:number,lable:string,minutes:number,parent:SelectComponent,callback:any){
        super();
        this.minutes = minutes;
        this.border = true;
        this.borderColor = 0x000000;
        this.size = fontSize;
        this.textColor = 0x000000;
        this.width = fontSize*5;
        this.height = fontSize+4;
        this.text = lable;
        this.textAlign = "center";
        this.verticalAlign = "middle";
        this.x = 0;
        this.y = fontSize*index+index*4; 
        this.parent = parent;
        //this.parent.addChild(this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,callback,parent);
    }
    public onSelectTime(event:egret.Event){
        this.callback(event.$target);
    }
}
class SelectComponent extends egret.DisplayObjectContainer{

    public buttonCount:number = 9;
    public fontSize:number; 
    public btnText:string;
    public selectMinutes:number;
    public parent:SetDataLayer;
    constructor(x:number,y:number,fontSize:number, parent:SetDataLayer){
        super();
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        //this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.parent = parent;
        this.drawComponent();
    }
    // private onAddToStage(event: egret.Event):void{
    //     drawComponent
    // }
    public drawComponent():void{
        this.addChild(new TimeButton(0,this.fontSize,"1分钟",1,this,this.onSelectTime));
        this.addChild(new TimeButton(1,this.fontSize,"2分钟",2,this,this.onSelectTime));
        this.addChild(new TimeButton(2,this.fontSize,"5分钟",5,this,this.onSelectTime));
        this.addChild(new TimeButton(3,this.fontSize,"10分钟",10,this,this.onSelectTime));
        this.addChild(new TimeButton(4,this.fontSize,"1小时",1,this,this.onSelectTime));
        this.addChild(new TimeButton(5,this.fontSize,"2小时",2*60,this,this.onSelectTime));
        this.addChild(new TimeButton(6,this.fontSize,"5小时",5*60,this,this.onSelectTime));
        this.addChild(new TimeButton(7,this.fontSize,"12小时",12*60,this,this.onSelectTime));
        this.addChild(new TimeButton(8,this.fontSize,"24小时",24*60,this,this.onSelectTime));
    }
    
    public onSelectTime(event:egret.Event):void{
        console.log(event.$target);
        this.parent.timeLength.text = event.$target.text;
        this.parent.data.timeLength = event.$target.minutes;
        //this.selectMinutes = event.$target.minutes;
        this.parent.removeChild(this);
    }

}
