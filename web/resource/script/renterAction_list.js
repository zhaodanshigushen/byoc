/** 所需属性 */
var dataBody = $("#databody") ;// 全局统计表格HTML ID
var daydata = $("#dayTable") ;// 当前天数表格HTML ID
var selfDetermine = $("#selfDetermine");//自定义时间的HTML ID
var tenantSelect = $("#tenantId") ; // 租户下拉菜单
var timeSelect = $("#time") ; // 时间类型下拉菜单
var subSearchButton = $("#subSearchButton") ; // 查询按钮
var begin = $("#begin") ; // 开始时间
var end = $("#end") ; // 结束时间

$(function() {
	/** 初始化时间控件 */
	initDateTools();
	/** 概述查询 */
	//subSearch () ; 
})

/** 查询统计 */
function subSearch() {

	/* 获取属性 */
	var tid = tenantSelect.val(); // 电商id 
	var dateType = timeSelect.val(); // 时间选择类型
	var beginDate = begin.val() ; // 开始时间
	var endDate = end.val () ; // 结束时间
	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}

	/* 弹出层 */
	var flag = loadNotShade("数据加载中, 请稍后...");
	tenantSelect.attr("disabled", true); // 租户选择禁用
	timeSelect.attr("disabled", true); // 时间选择禁用
	subSearchButton.attr("disabled", true); // 提交按钮禁用
	begin.attr("disabled", true); // 时间控件禁用
	end.attr("disabled", true); // 时间控件禁用
	
	/* 弹出层读秒 */
	var index = 2;
	var calcS = setInterval(function() {
		flag = loadNotShade("数据加载中, 请稍后... " + index++ + "/s");
	}, 1000);
	/* 查询时间时间区间 */
	$.ajax( {
		type : "post",
		dataType : "json",
		url : "renterAction_dateBetween",
		data : {
			"begindate" : beginDate ,
			"enddate" : endDate ,
			"tenantId" : tid,
			"dateType" : dateType
		},
		success : function(dateBetweenObj) {

			/* 查询数据 */
			$.ajax( {
				type : "post",
				dateType : "json",
				url : "renterAction_search",
				data : {
					"tenantId" : tid,
					"begin" : dateBetweenObj.begin,
					"end" : dateBetweenObj.end
				},
				success : function(e) {

				/* 全局统计HTML */
				var obj = e.renter; // 值对象
				dataBody.html(""); // 清空元素
				dataBody.append(HTML_Global(obj.tenantId, obj.title, obj.totalCount, obj.totalAmount, obj.averageAmount, obj.averageCount, obj.cookieCount, obj.clickCount, obj.displayCount, obj.clickRate, obj.conversionRate, obj.fluctuateRate, obj.orderRate)); // 添加元素

				/* 每天的信息 */
				var objs = e.dayList;
				daydata.html("");
				for(var i=0; i<e.dayList.length; i++){
					obj = e.dayList[i];
					daydata.append(HTML_day_Global(obj.time, obj.totalCount, obj.totalAmount, obj.averageAmount, obj.cookieCount, obj.clickCount, obj.displayCount, obj.clickRate, obj.conversionRate, obj.orderRate));
				}
				
				/* 完成操作 */
				layer.close(flag); // 关闭等待层
				clearInterval(calcS); // 清空读秒
				initBootstrap();// 初始化表格
				tenantSelect.attr("disabled", false); // 租户下来菜单启用
				timeSelect.attr("disabled", false); // 时间下来菜单启动
				subSearchButton.attr("disabled", false); // 查询按钮启用
				begin.attr("disabled", false); // 时间控件启用
				end.attr("disabled", false); // 时间控件启用
			}
			});

		}
	});
}

/** 全局HTML */
function HTML_Global(tenantId, title, totalCount, totalAmount, averageAmount, averageCount, cookieCount, clickCount, displayCount, clickRate, conversionRate, fluctuateRate, orderRate) {
	var html = '' + //
			'	<tr>' + //
			'		<td style="padding: 10px 11px" >' + tenantId + '</td>' + //
			'		<td style="padding: 10px 11px" >' + title + '</td>' + //
			'		<td style="padding: 10px 11px" >' + totalCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + totalAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + averageAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + averageCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + cookieCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + displayCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + conversionRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + fluctuateRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + orderRate + '%</td>' + //
			'	</tr>' + //
			'';
	return html;
}

/** 每天HTML */
function HTML_day_Global(time, totalCount, totalAmount, averageAmount, cookieCount, clickCount, displayCount, clickRate, conversionRate, orderRate) {
	/* 日期转换 */
	var html = '' + //
			'	<tr>' + //
			'		<td style="padding: 10px 11px" >' + time + '</td>' + //
			'		<td style="padding: 10px 11px" >' + totalCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + totalAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + averageAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + cookieCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + displayCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + conversionRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + orderRate + '%</td>' + //
			'	</tr>' + //
			'';
	return html;
}

/** 初始化时间控件 */
function initDateTools() {

	/* 设置皮肤 */
	laydate.skin("molv");
	
	/* 开始时间 */
	var start = {
		elem : '#begin',
		isclear : false,
		istime: false,
		max:$("#end").val(), 
		istoday: false, //是否显示今天
		format: 'YYYY-MM-DD', //日期格式
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	/* 结束日期 */
	var end = {
		elem : '#end',
		isclear : false, 
		istime: false,
		min:$("#begin").val(),
		istoday: false, //是否显示今天
		format: 'YYYY-MM-DD', //日期格式
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	laydate(start);
	laydate(end);
}

function getselect() {
	var obj=document.getElementById("time"); // 时间选择类型
	if(obj.value != 7) {
		document.getElementById("selfDetermine").style.display="none";
	}
	else {
		document.getElementById("selfDetermine").style.display="";
		document.getElementById("begin").value = current();
		document.getElementById("end").value = current();
	}
}