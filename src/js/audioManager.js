(function($, root) {
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSourse: function(src) {
            this.audio.src = src;
            //重新加载
            this.audio.load();
        },
        jumpToPlay: function(curDuration) {
            //audio的currentTime属性是设置或返回音频/视频播放的当前位置
            //移动sliderPoint后音乐没有改变的bug
            this.audio.currentTime = curDuration;
            this.play();
        }
    }
    root.audioManager = audioManager;
}(window.Zepto,window.player))