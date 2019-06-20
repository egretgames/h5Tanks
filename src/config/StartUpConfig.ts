class StartUpConfig {
    public currentMod: string;
    //public startSance: SceneBase;

    constructor() {
        this.currentMod = "qiufeng";
        this.setStartMod();
    }
    public setStartMod(): void {

    }
    public getStartScene(): string {
        switch (this.currentMod) {
            case "dev":
                break;
            case "qiufeng":
                return typeof QFdevScene;
            case "liyaowu":
                break;
        }
        
    }
}