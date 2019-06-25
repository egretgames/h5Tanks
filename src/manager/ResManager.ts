class ResManager extends egret.EventDispatcher {

    public isResConfigReady: boolean = false;
    constructor() {
        super();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    public onConfigLoadErr(event: egret.Event): void {
        console.log("onConfigLoadErr");
    }
    public onConfigLoadComplete(event: egret.Event): void {
        console.log("onConfigLoadComplete");
        this.isResConfigReady = true;
    }

    public loadResByDynamicGroup(groupName: string, keys: Array<string>): void {
        RES.createGroup(groupName,keys);
        //todo 添加监听
    }

    public loadResByGroupName(name: string, callBack: any): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadGroupError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }

    private onResourceLoadGroupComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "icons") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadGroupError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    }


    private onResourceLoadGroupError(event: RES.ResourceEvent): void {
        console.warn("Group:" + event.groupName + " has failed to load");
        // 错误处理，记录错误次数，重新load
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
    }

    public releaseResByGroupName(name: string): void {
        if (!RES.destroyRes(name)) {
            console.warn("ReleaseResGroupByname Failed.GroupName is:" + name);
        }
    }
}