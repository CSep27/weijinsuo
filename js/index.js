/**
 * Created by wtt on 2016/8/19.
 */
$(function () {
    banner();
    initTab();
});
function banner() {
    var imgList = [
        {
            pcImg: "images/slide_01_2000x410.jpg",
            mImg: "images/slide_01_640x340.jpg"
        },
        {
            pcImg: "images/slide_02_2000x410.jpg",
            mImg: "images/slide_02_640x340.jpg"
        },
        {
            pcImg: "images/slide_03_2000x410.jpg",
            mImg: "images/slide_04_640x340.jpg"
        },
        {
            pcImg: "images/slide_04_2000x410.jpg",
            mImg: "images/slide_04_640x340.jpg"
        }
    ];
    var renderHtml = function () {
        var width = $(window).width();
        var isMobile = width <= 768 ? true : false;
        var pointStr = $("#point-template").html();
        var imageStr = $("#image-template").html();
        var pointFun = _.template(pointStr);
        var imageFun = _.template(imageStr);
        var pointHtml = pointFun({
            model: imgList
        });
        var imageHtml = imageFun({
            model: imgList,
            isMobile: isMobile
        });
        //console.log(pointHtml);
        //console.log(imageHtml);
        $(".carousel-indicators").html(pointHtml);
        $(".carousel-inner").html(imageHtml);
    };
    //renderHtml();
    /*$(window).on("resize", function () {
     renderHtml();
     });
     $(window).trigger("resize");*/
    $(window).on("resize", function () {
        renderHtml();
    }).trigger("resize");


    //移动端滑动手势效果
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    $(".wjs-banner").on("touchstart", function (e) {
        //console.log(e);
        //console.log(e.originalEvent);
        startX = e.originalEvent.touches[0].clientX;
    }).on("touchmove", function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on("touchend", function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {//上一张
                $(".carousel").carousel('prev');
            }else{
                $(".carousel").carousel('next');
            }
        }
    });
};

/*产品>wjs-product-tabs屏幕小于768时*/
function initTab() {
    //1.计算ul的宽度 设置好
    var $parentBox = $(".wjs-tabs-wrap");
    var $childBox = $(".wjs-tabs-wrap").find("ul");
    var $lis = $childBox.find("li");
    var width = 0;
    $lis && $lis.each(function (k, v) {
        width += $(this).outerWidth(true);
    });
    /*
     * width  取得是内容的宽度
     * innerWidth 取得是 内容 和 内边距
     * outerWidth 取得是 内容 和 内边距 和 边框
     * outerWidth 取得是 内容 和 内边距 和 边框 和 外边距  (传true )
     * */
    $childBox.width(width);
    itcast.iScroll({
        //取到的必须是dom对象，不能是jQuery对象
        //jQuery对象转dom对象
        //1.加索引 $li.[0]
        //2.get   $li.get(0)
        swipeDom: $parentBox.get(0),
        swipeType: "x",
        swipeDistance: "50"   //直接传数值，不需要单位
    });
}
