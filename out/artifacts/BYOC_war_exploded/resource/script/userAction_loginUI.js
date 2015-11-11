$(function () {
	$("[name=username]").focus();
})

window.onload = function () {
	flag = layer.load("加载中, 请稍后...") ;
	layer.close(flag);
}