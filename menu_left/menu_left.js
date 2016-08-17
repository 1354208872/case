/**
 * Created by momo on 2016/8/2.
 */
$(function () {
    $(".submenu>li").click(function () {
        $(".submenu>li>a").removeClass("active");
        $(".part").removeClass("show");
        $(this).find("a").addClass("active");
        $($(".part")[$(this).index()]).addClass("show");
    });
});
  