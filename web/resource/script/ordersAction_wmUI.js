$(function() {
	if(window.location.href.indexOf("download") != -1)
		alert("下载数据失败，请重新选择查询条件");
})

/** 用户在线行为 */
function onlineUI(tid, cookie) {
	openFrame("用户在线行为", "ordersAction_onlineUI?cookie=" + cookie + "&tenantId=" + tid);
}

/** 用户到达统计 */
function arriveUI(tid, cookie) {
	openFrame("用户到达统计", "ordersAction_arriveUI?cookie=" + cookie + "&tenantId=" + tid);
}

/** 商品行为 */
function productRuleUI(tid, cookie) {
	openFrame("商品规则", "ordersAction_productRuleUI?cookie=" + cookie + "&tenantId=" + tid);
}

/** 打开弹出层*/
function openFrame(text, src) {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : text,
		offset : [ '', '' ],
		area : [ '1100px', '630px' ],
		iframe : {
			src : src
		}
	});
}