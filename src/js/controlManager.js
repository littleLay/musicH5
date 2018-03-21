(function($,root) {
    function controlManager(len) {
        this.index = 0;
        this.length = len;
    }
    controlManager.prototype = {
        next : function() {
            return this.getIndex(1);
        },
        prev : function() {
            return this.getIndex(-1);
        },
        getIndex : function(num) {
            //前一首歌的时候减一并加长度对长度求余，
            var index = this.index;
            var length = this.length;
            var curIndex = (index + num+ length) % length;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;
}(window.Zepto,window.player))
// 调用方法来改变Index为什么比直接改变index好，我没感觉出来调用方法来改变Index为什么比直接改变index好，我没感觉出来