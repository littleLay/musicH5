(function($,root){

    //获取Body元素
    var $scope = $(document.body);
    var controlmanager;
    var $playlist = $(`<div class="list-wrapper">
        <div class="list-header">播放列表</div>
        <ul class="play-list"></ul>
        <div class="close-btn">关闭</div>
    </div>`);
    function renderList(data) {
        var html = '';
        var len = data.length;
        for(var i = 0; i < len; i++) {
            html += "<li><h3>" + data[i].song + "-<span>" +data[i].singer + "</span>"+ "</li>";
        }
        $playlist.find("ul").html(html);
        $scope.append($playlist);
        bindEvent();
    }
    function bindEvent() {
        $playlist.find(".close-btn").on("click",function(){
            $playlist.removeClass("show");
        })
        $playlist.find("li").on("click",function(){
            var index = $(this).index();
            signRed(index);
            controlmanager.index = index;
            $scope.trigger("play:change",[index,true]);
            $scope.find(".play-btn").addClass("playing");
            setTimeout(function() {
                $playlist.removeClass("show");
            },500);
        })
    }
    function show(control) {
        controlmanager = control;
        $playlist.addClass("show");
        var index = controlmanager.index;
        signRed(index);
    }
    function signRed(index) {
        $playlist.find(".showList").removeClass("showList");
        $playlist.find("li").eq(index).addClass("showList");
    }
    root.playlist = {
        renderList : renderList,
        show : show
    }
}(window.Zepto,window.player))