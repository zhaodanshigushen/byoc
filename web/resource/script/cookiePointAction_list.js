/** 所需属性 */
var pointDataBody = $("#pointdatabody") ;// 全局统计表格HTML ID
var selfDetermine = $("#selfDetermine");//自定义时间的HTML ID
var weekTable = $("#weekTable") ;// 当前天数表格HTML ID
var tenantSelect = $("#tenantId") ; // 租户下拉菜单
var timeSelect = $("#time") ; // 时间类型下拉菜单
var subSearchButton = $("#subSearchButton") ; // 查询按钮
var begin = $("#begin") ; // 开始时间
var end = $("#end") ; // 结束时间
var number = $("#number") ; // 营销点

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
		url : "cookiePointAction_dateBetween",
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
				url : "cookiePointAction_global",
				data : {
					"tenantId" : tid,
					"begin" : dateBetweenObj.begin,
					"end" : dateBetweenObj.end
				},
				success : function(e) {

					/* 全局统计HTML */
				var objList = e.cookiePoint; // 值对象
				pointDataBody.html(""); // 清空元素
				for(var i=0; i<objList.length; i++) {
					var obj = objList[i];
					pointDataBody.append(HTML_Global(obj.point, obj.cookieNumber, obj.viewCount, obj.clickCount, obj.clickRate, obj.arriveCount, obj.arriveRate, obj.orderCount)); // 添加元素

				}
				
				if(objList[0].point != " - ")
					weekTableSearch(objList[0].point);
				else
					weekTable.html("");
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

//周统计
function weekTableSearch(pointname) {
	if(pointname == " - ")
		return;
	var flag = loadNotShade("数据加载中, 请稍后...");
	tenantSelect.attr("disabled", true); // 租户选择禁用
	timeSelect.attr("disabled", true); // 时间选择禁用
	subSearchButton.attr("disabled", true); // 提交按钮禁用
	begin.attr("disabled", true); // 时间控件禁用
	end.attr("disabled", true); // 时间控件禁用
	
	var tid = tenantSelect.val(); // 电商id 
	var beginDate = begin.val() ; // 开始时间
	var endDate = end.val () ; // 结束时间
	var timetype = timeSelect.val(); // 时间选择类型
	number.html("");
	number.html("营销点"+pointname+"的周统计");
	var timestage = ['周一',
					'周二',
					'周三',
					'周四',
					'周五',
					'周六',
					'周日'];
	/* 查询数据 */
	$.ajax( {
		type : "post",
		dateType : "json",
		url : "cookiePointAction_weekList",
		data : {
			"tid" : tid,
			"begin" : beginDate ,
			"end" : endDate ,
			"point" : pointname,
			"timetype" : timetype
		},
		success : function(e) {
			var weeklist = e.weekList;
			weekTable.html("");
			for (var i=0;i<weeklist.length;i++){
				weekTable.append(HTML_week_table(timestage[i], weeklist[i], i));
			}
			layer.close(flag); // 关闭等待层
			initBootstrap();// 初始化表格
			tenantSelect.attr("disabled", false); // 租户下来菜单启用
			timeSelect.attr("disabled", false); // 时间下来菜单启动
			subSearchButton.attr("disabled", false); // 查询按钮启用
			begin.attr("disabled", false); // 时间控件启用
			end.attr("disabled", false); // 时间控件启用
		}
	});
}

/** 周统计 */
function HTML_week_table(date, obj, i) {
	if(i&2==0) {
		var html = '' + //
				'	<tr class="even"' + //
				'		<td style="padding: 10px 11px; text-align: center; " >' + date + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.viewCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.clickCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.clickRate + '‰</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.arriveCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.arriveRate + '%</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.orderCount + '</td>' + //
				'	</tr>' + //
				'';
	}
	else {
		var html = '' + //
				'	<tr class="odd">' + //
				'		<td style="padding: 10px 11px; text-align: center; " >' + date + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.viewCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.clickCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.clickRate + '‰</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.arriveCount + '</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.arriveRate + '%</td>' + //
				'		<td style="padding: 10px 11px" >' + obj.orderCount + '</td>' + //
				'	</tr>' + //
				'';
	}
	return html;
}

/** 全局HTML */
function HTML_Global(point, number, viewCount, clickCount, clickRate, arriveCount, arriveRate, orderCount) {
	if(point == " - ") {
		var html = '' + //
			'	<tr>' +//
			'		<td style="padding: 10px 11px">' + point + '</td>' + //
			'		<td style="padding: 10px 11px">' + number + '</td>' + //
			'		<td style="padding: 10px 11px">' + viewCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px">' + arriveCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + arriveRate + '%</td>' + //
			'		<td style="padding: 10px 11px">' + orderCount + '</td>' + //
			'	</tr>' + //
			'';
	}
	else {
		var html = '' + //
			'	<tr id = "' + point + '" class="tip" tipvalue = "点击查看营销点'+point+'的详细周统计" onclick=weekTableSearch("' + point +'") >' +//
			'		<td style="padding: 10px 11px">' + point + '</td>' + //
			'		<td style="padding: 10px 11px">' + number + '</td>' + //
			'		<td style="padding: 10px 11px">' + viewCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px">' + arriveCount + '</td>' + //
			'		<td style="padding: 10px 11px">' + arriveRate + '%</td>' + //
			'		<td style="padding: 10px 11px">' + orderCount + '</td>' + //
			'	</tr>' + //
			'';
	}
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
		istoday: true, //是否显示今天
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
		istoday: true, //是否显示今天
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

function current() {
	var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0"; 
        clock += day;
        return(clock); 
}