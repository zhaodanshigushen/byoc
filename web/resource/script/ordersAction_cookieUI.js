$(function() {

	/* 初始化特别分类{当前cookie来源, 如果不是当前租户url, 那么高亮} */
	initTypeCheck();
	
	/* 初始化时间控件 */
	initDateTools();
	
	/* 初始化导航 */
	initNavicat () ;
	
	/* 接触阴影层 */
	initShade() ;
	
})

/* 初始化特别分类{当前cookie来源, 如果不是当前租户url, 那么高亮} */
function initTypeCheck() {
	
	/* 循环地址 */
	$(".checkurlclass a").each(function (key, obj) {
		if (!$(obj).html().match(currentTenantUrl)){
		
			/* 高亮 */
			$(obj).css({
				"background":"#bbb",
				"padding-left":"5px",
				"padding-right":"5px",
				"border-radius":"15px"
			});
		} 
	});
	
}

/** 接触阴影层 */
function initShade() {
	setTimeout(function () {
		$("#shade_").fadeOut(200)	;
	}, 0)
}

/** 初始化导航 */ 
function initNavicat () {
	$(".navicat").each(function (key, obj) {
		var width = $(obj).width()-1 ; // 元素宽度
		$(obj).css("background-position",  width+"px 6px"); // 重定向位置
	});
}

/** 初始化时间控件 */
function initDateTools() {

	/* 设置皮肤 */
	laydate.skin("molv");
	
	/* 开始时间 */
	var start = {
		elem : '#begin',
		isclear : false,
		istime: true,
		max:$("#end").val(), 
		istoday: false, //是否显示今天
		format: 'YYYY-MM-DD hh时 mm分', //日期格式
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	/* 结束日期 */
	var end = {
		elem : '#end',
		isclear : false, 
		istime: true,
		min:$("#begin").val(),
		istoday: false, //是否显示今天
		format: 'YYYY-MM-DD hh时 mm分', //日期格式
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	laydate(start);
	laydate(end);

}