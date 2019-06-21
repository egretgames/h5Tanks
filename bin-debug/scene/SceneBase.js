var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneBase = (function (_super) {
    __extends(SceneBase, _super);
    function SceneBase() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onLoad, _this);
        return _this;
    }
    SceneBase.prototype.onLoad = function (event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    };
    SceneBase.prototype.onUpdate = function (e) {
        this.Update();
    };
    return SceneBase;
}(egret.DisplayObjectContainer));
__reflect(SceneBase.prototype, "SceneBase");
//# sourceMappingURL=SceneBase.js.map