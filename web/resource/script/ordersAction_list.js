$(function() {

	/* 初始化时间控件 */
	initDateTools();
	
	/* 进行默认查询 */
	search();
})

/** 所需字段 */
var tenant = $("#tenantSelect") ; // 租户下拉菜单
var provider = $("#provider") ; // 供应商
var begin = $("#begin") ; // 开始时间
var end = $("#end") ; // 结束时间
var content = $("#content") ; // 填充内容HTML ID

/** 查询 */
function search() {
	
	/* 获取个字段属性 */
	var tid = tenant.val() ; // 租户id
	var providerName = provider.find("option:selected").text(); // 供应商那个名称
	var beginDate = begin.val() ; // 开始时间
	var endDate = end.val () ; // 结束时间
	
	/* 弹出层 */
	var layerFlag = load("查询中, 请稍后...");
	
	/* 异步获取数据 */
	$.ajax({
		type:"post" ,
		dateType:"json",
		url:"ordersAction_data",
		data :{
			"begin":beginDate ,
			"end":endDate ,
			"providerName":providerName ,
			"tenantId":tid 
		}, 
		success:function (e) {
			
			/* 获取信息集*/ 
			var data = e.orderList ;
			content.html("");

			/* 当前没数据 */
			if (data.length == 0) {
				content.html('<tr><td colspan="5" style="padding: 0" ><div class="mws-form-message info" style="border:0;background-color:#f8f8f8">	当前没有订单!</div></td></tr>') ;
			} 
			
			/* 当前有数据 */
			else {
				for (var i=0 ; i<data.length ; i++) {
					content.append(HTML_Content(i+1, data[i])) ;
				}
			}
			
			/* 初始化模板信息 */
			initBootstrap(); 
			close(layerFlag) ; // 关闭弹出层
		}
	}) ;
	
}

/** 表格HTML元素 */
function HTML_Content (i, e) {
	
	/* 获取属性 */
	var orderID = e.orderID ; //  订单编号
	var cookie = e.cookie ; // cookie value
	var amount = e.amount ; // 总额
	var time = e.time.replace("T"," ") ; // 时间
	
	var html = '' + //
	 '<tr>' + //
	 '	<td style="text-align: center;" >' + i + '</td>' + //
	 '	<td>' + orderID + '</td>' + //
	 '	<td>' + cookie + '</td>' + //
	 '	<td>' + amount + '</td>' + //
	 '	<td>' + time + '</td>' + //
	 '</tr>' + //
	 '' ;
	return html ;
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