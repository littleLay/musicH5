(function($, root) {
    //找dom节点首先获得Body
    var $scope = $(document.body);
    var curDuration;
    var frameID;
    var startTime;
    var lastPercent = 0;

    function formateTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10) {
            minute = "0" + minute;
        }
        if(second < 10) {
            second = "0" +second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration) {
        lastPercent = 0;
        curDuration = duration;
        var allTime = formateTime(duration);
        //innerText和html的区别
        $scope.find(".all-time").html(allTime);
    }
    function update(percent) {
        var curTime = percent * curDuration;
        curTime = formateTime(curTime);
        $scope.find(".cur-time").html(curTime);
        renderPro(percent);
    }

    //用来渲染当前时间
    function renderPro(percent) {
        var percentage = (percent - 1) * 100 + "%";
        $scope.find('.pro-top').css({
            transform:"translateX(" + percentage +")"
        })
    }

    function startPro(percent) {
        percent ? lastPercent = percent : lastPercent;
        cancelAnimationFrame(frameID);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (curDuration * 1000);
            if(percent < 1 && percent>= 0) {
                frameID = requestAnimationFrame(frame);
                update(percent);
                console.log(percent)
            }else if(percent<0){
                cancelAnimationFrame(frameID);
            }
        }
        frame();
    }
    function stopPro(percentage) {
        var stop = new Date().getTime();
        lastPercent = lastPercent + (stop - startTime) / (1000 * curDuration);
        cancelAnimationFrame(frameID);
    }
    root.proccessor = {
        renderAllTime: renderAllTime,
        startPro: startPro,
        stopPro: stopPro,
        update : update,
        renderPro : renderPro
    }
}(window.Zepto,window.player))