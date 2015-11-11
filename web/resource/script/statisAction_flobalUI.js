/** 所需属性 */
var globalStatis = $("#globalStatis") ;// 全局统计表格HTML ID
var globalStatisList = $("#dayTable") ;// 当前天数表格HTML ID
var weekTable = $("#weekTable") ;// 当前天数表格HTML ID
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
		url : "statisAction_dateBetween",
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
				url : "statisAction_global",
				data : {
					"tenantId" : tid,
					"begin" : dateBetweenObj.begin,
					"end" : dateBetweenObj.end
				},
				success : function(e) {

				/* 全局统计HTML */
				var obj = e.globalStatis; // 值对象
				globalStatis.html(""); // 清空元素
				globalStatis.append(HTML_Global(obj.viewCount, obj.clickCount, obj.clickCountUV, obj.arriveCountUV, obj.orderCount, obj.orderAmount, obj.clickRate, obj.arriveRate, obj.conversionRate, obj.adChargeRate, obj.roiRate, obj.ltOrderCount, obj.ltOrderAmount)); // 添加元素

				/* 全局统计 */
				var objs = e.globalStatisList; // 值集合
				globalStatisList.html(""); // 情况元素
				var daystage = new Array();
				var totalCount = new Array();
				var totalAmount = new Array();
				for ( var i = e.globalStatisList.length-1; i >= 0; i--) {
					var result = e.globalStatisList[i];
					daystage.push([result.endString]);
					totalCount.push(result.orderCount);
					var temp = result.orderAmount/1000;
					totalAmount.push([parseFloat(temp.toFixed(5))]);
					globalStatisList.append(HTML_day_table(result.endString, result.viewCount, result.clickCount, result.clickCountUV, result.arriveCountUV, result.orderCount, result.orderAmount, result.clickRate, result.arriveRate, result.conversionRate, result.adChargeRate, result.roiRate, result.ltOrderCount, result.ltOrderAmount)); // 添加元素
				}
				
				//linechart
				$('#linechart').highcharts({
			        chart: {
						type: 'spline' ,
			            backgroundColor : "transparent" ,
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
			        },
			        title: {
			            text: '销售总量和销售总金额*1k'
			        },
			        xAxis: {
			        	title: {
			        		text:'时间段'
			        	},
			            type: 'category',
			            categories: daystage,
			            labels: {
	                		rotation: -45,
	                		style: {
	                    		fontSize: '13px',
	                    		fontFamily: 'Verdana, sans-serif'
	                		}
	            		}
			        },
			        yAxis: {
			            title: {
			                text: '销售总量（单位1）和销售总金额（单位1k）'
			            }
			        },
			        tooltip: {
	            		crosshairs: true,
	            		shared: true
	        		},
			        plotOptions: {
			            spline: {
	                		marker: {
	                    		radius: 4,
	                    		lineColor: '#666666',
	                    		lineWidth: 1
	                		}
	            		}
			        },
			        series: [{
			            name: '销售总量',
			            data: totalCount
			        }, {
			            name: '销售总金额*1k',
			            data: totalAmount
			        }]
	    		});
				
				//周统计
				var timestage = [
					'周一',
					'周二',
					'周三',
					'周四',
					'周五',
					'周六',
					'周日'
					];
				var weeklist = e.weekList;
				weekTable.html("");
				for (var i=0;i<e.weekList.length;i++){
					weekTable.append(HTML_week_table(timestage[i], weeklist[i]));
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

/** 周统计 */
function HTML_week_table(date, obj) {
	var html = '' + //
			'	<tr>' + //
			'		<td style="padding: 10px 11px; text-align: center; " >' + date + '</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.viewCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.clickCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.arriveCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.arriveRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + obj.conversionRate + '%</td>' + //
			'	</tr>' + //
			'';
	return html;
}

/** 全局HTML */
function HTML_Global(viewCount, clickCount, clickCountUV, arriveCountUV, orderCount, orderAmount, clickRate, arriveRate, convertRate, adCharge, roiRate, ltOrderCount, ltOrderAmount) {
	var html = '' + //
			'	<tr>' + //
			'		<td style="padding: 10px 11px" >' + viewCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCountUV + '</td>' + //
			'		<td style="padding: 10px 11px" >' + arriveCountUV + '</td>' + //
			'		<td style="padding: 10px 11px" >' + ltOrderCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + ltOrderAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + orderCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + orderAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + arriveRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + convertRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + adCharge + '</td>' + //
			'		<td style="padding: 10px 11px" >' + roiRate + '%</td>' + //
			'	</tr>' + //
			'';
	return html;
}

/** 当前天数统计表格 */
function HTML_day_table(date, viewCount, clickCount, clickCountUV, arriveCountUV, orderCount, orderAmount, clickRate, arriveRate, convertRate, adCharge, roiRate, ltOrderCount, ltOrderAmount) {

	/* 日期转换 */
	try {
		date = date.replace(/[-]+/gi, "/");
	} catch (e) {
	}

	var html = '' + //
			'	<tr>' + //
			'		<td style="padding: 10px 11px; text-align: center; " >' + date + '</td>' + //
			'		<td style="padding: 10px 11px" >' + viewCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickCountUV + '</td>' + //
			'		<td style="padding: 10px 11px" >' + arriveCountUV + '</td>' + //
			'		<td style="padding: 10px 11px" >' + ltOrderCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + ltOrderAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + orderCount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + orderAmount + '</td>' + //
			'		<td style="padding: 10px 11px" >' + clickRate + '‰</td>' + //
			'		<td style="padding: 10px 11px" >' + arriveRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + convertRate + '%</td>' + //
			'		<td style="padding: 10px 11px" >' + adCharge + '</td>' + //
			'		<td style="padding: 10px 11px" >' + roiRate + '%</td>' + //
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