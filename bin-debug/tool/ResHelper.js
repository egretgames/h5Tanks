// // 资源加载工具
// // 预计实现，白鹭引擎的3种不同的资源加载方式
// // 提供资源加载的静态方法，提供加载事件，加载进度等回调
// class ResHelper{
//     public resConfig:ResConfig;
//     constructor(){
//         this.resConfig = new ResConfig();
//     }
//     // 1资源动态加载，按照url的实时加载
//     public lobby = "resource/assets/lobby/";
//     public resNames: string[] = [];
//     public resMap: {} = {};
//     public dynamicLoadConfig() {
//         this.resNames.push(this.lobby.concat("back.png"));
//         for (let k in this.resNames) {
//             egret.log("k = ", k, ", v = ", this.resNames[k]);
//             RES.getResByUrl(this.resNames[k], this.dynamicProcess, this);
//         }
//     }
//     public dynamicProcess(res: any, url: string): void {
//         if (!res) {
//             egret.error("error url = ", url, ",   res === null");
//         } else {
//             egret.log("ok url = ", url, ",   res not null");
//         }
//         this.resMap[url] = res;
//         if (Object.keys(this.resMap).length === Object.keys(this.resNames).length) {
//             this.dynamicLoadComplete();
//         }
//     }
//     public dynamicLoadComplete() {
//         let back = new egret.Bitmap();
//         back.texture = RES.getRes(this.lobby.concat("back.png"));
//         back.x = this.getWidth() / 2;
//         back.y = this.getHeight() / 2;
//         this.addChild(back);
//         this.createGroup();
//     }
// } 
//# sourceMappingURL=ResHelper.js.map