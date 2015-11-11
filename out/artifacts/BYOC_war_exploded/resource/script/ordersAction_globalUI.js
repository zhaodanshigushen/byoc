$(function() {

	/* 初始化时间控件 */
	initDateTools();
	//loadLineChart();
})

/** 所需字段 */
var tenant = $("#tenantSelect") ; // 租户下拉菜单
var provider = $("#provider") ; // 供应商
var begin = $("#begin") ; // 开始时间
var end = $("#end") ; // 结束时间
var subSearchButton = $("#button") ; // 结束时间
var all = $("#isAll") ; // 结束时间
var datablock = $("#linechartdata");//表格主体

function loadLineChart() {
	var beginDate = begin.val() ; // 开始时间
	var endDate = end.val () ; // 结束时间
	var tid = tenant.val(); // 电商id
	var isAll = all.val();
	
	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}

	/* 弹出层 */
	var flag = loadNotShade("加载曲线图中, 请稍后...");
	tenant.attr("disabled", true); // 租户选择禁用
	subSearchButton.attr("disabled", true); // 提交按钮禁用
	begin.attr("disabled", true); // 时间控件禁用
	end.attr("disabled", true); // 时间控件禁用
	all.attr("disabled", true); // 控件禁用
	/* 弹出层读秒 */
	var index = 2;
	var calcS = setInterval(function() {
		flag = loadNotShade("加载曲线图中, 请稍后... " + index++ + "/s");
	}, 1000);

	/* 查询数据 */
	$.ajax( {
		type : "post",
		dateType : "json",
		url : "ordersAction_chart",
		data : {
			"tenantId" : tid,
			"begin" : beginDate,
			"end" : endDate,
			"isAll": isAll
		},
		success : function(e) {

				var time = e.timeList;
				var count = e.countDayList;
				var amount = e.amountDayList;
				var average = e.averageAmount;
				var wmlist = e.wmlist;
				var intervalList = e.timeInterval;
				
				var daystage = new Array();
				var totalCount = new Array();
				var totalAmount = new Array();
				var averageAmount = new Array();
				var interval = new Array();
				
				for ( var i = 0; i < e.length; i++) {
					daystage.push([time[i]]);
					totalCount.push(count[i]);
					averageAmount.push(average[i]);
					var temp = amount[i]/1000;
					totalAmount.push([parseFloat(temp.toFixed(5))]);
					interval.push(parseInt(intervalList[i]));
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
			            text: '订单数，总金额*1k，平均金额，平均订单间隔s'
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
			                text: '订单数（单位1）和总金额（单位1k）'
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
			            name: '订单数总量',
			            data: totalCount
			        }, {
			            name: '平均金额',
			            data: averageAmount
			        }, {
			            name: '订单时间间隔s',
			            data: interval
			        }, {
			            name: '总金额*1k',
			            data: totalAmount
			        }]
	    		});
				
				//表格
			    datablock.html("");
		    	detaildata(wmlist,beginDate,endDate,tid);
		    
				/* 完成操作 */
				layer.close(flag); // 关闭等待层
				clearInterval(calcS); // 清空读秒
				initBootstrap();// 初始化表格
				tenant.attr("disabled", false); // 租户下来菜单启用
				subSearchButton.attr("disabled", false); // 查询按钮启用
				begin.attr("disabled", false); // 时间控件启用
				end.attr("disabled", false); // 时间控件启用
				all.attr("disabled", false);
		}
	});
}

function detaildata(wmlist,beginDate,endDate,tid) {
	/* 循环订单表数据 */
	for (var i=0 ; i<wmlist.length ; i++) {
		datablock.append(HTML_content(i+1, wmlist[i].wm, wmlist[i].orderCount, parseFloat(wmlist[i].orderAmount.toFixed(3)),beginDate,endDate,tid));
	}
}

function HTML_content (i,wm,c, a,beginDate,endDate,tid) {
	if(wm == "所有wm") {
			var html = '' + //
				'<tr class="tip">' + // 
				'	<td style="text-align: center" >' + i  + '</td>' + // 
				'	<td style="text-align: center" >' + wm  + '</td>' + // 
				'	<td style="text-align: center" >' + c + '</td>' + // 
				'	<td style="text-align: center">' + a + '</td>' + // 
				'</tr>';// 
	} else {
		if( i %2 == 0) {
			var html = '' + //
				'<tr class="tip" tipvalue="点击查看'+wm+'细节" onclick="window.location.href=\'ordersAction_wmUI?begin='+beginDate+'&end='+endDate+'&wm='+wm+'&tenantId='+tid+'\'" style="cursor: pointer;">' + // 
				'	<td style="text-align: center" >' + i  + '</td>' + // 
				'	<td style="text-align: center" >' + wm  + '</td>' + // 
				'	<td style="text-align: center" >' + c + '</td>' + // 
				'	<td style="text-align: center">' + a + '</td>' + // 
				'</tr>';// 
		}
		else {
			var html = '' + //
				'<tr class="tip" tipvalue="点击查看'+wm+'细节" onclick="window.location.href=\'ordersAction_wmUI?begin='+beginDate+'&end='+endDate+'&wm='+wm+'&tenantId='+tid+'\'" style="cursor: pointer;">' + // 
				'	<td style="text-align: center" >' + i  + '</td>' + // 
				'	<td style="text-align: center" >' + wm  + '</td>' + // 
				'	<td style="text-align: center" >' + c + '</td>' + // 
				'	<td style="text-align: center">' + a + '</td>' + // 
				'</tr>';// 
		}
	}
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
		istime : false,
		max : $("#end").val(),
		istoday : false, //是否显示今天
		format : 'YYYY-MM-DD', //日期格式
		choose : function(datas) {

			/*开始日选好后，重置结束日的最小日期*/
			end.min = datas;

			/*将结束日的初始值设定为开始日*/
			end.start = datas;
		}
	};

	/* 结束日期 */
	var end = {
		elem : '#end',
		isclear : false,
		istime : false,
		min : $("#begin").val(),
		istoday : false, //是否显示今天
		format : 'YYYY-MM-DD', //日期格式
		choose : function(datas) {
			/*结束日选好后，重置开始日的最大日期*/
			start.max = datas;
		}
	};

	laydate(start);
	laydate(end);
}
