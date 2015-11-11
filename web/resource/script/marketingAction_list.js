/** 所需属性 */
var tid = $("#tid") ; // 租户下拉id
var begin = $("#begin") ; // 开始时间id
var end = $("#end") ; // 结束时间id
var globalContent = $("#globalContent") ; // 概述表格内容主体id
var globalNumber = $("#globalNumber") ; // 全局概括数量
var chart = $("#chart") ; // 图标
var button = $("#button") ; // 图标

$(function() {
	
	/* 初始化时间控件 */
	initDateTools();
	
	/* 初始化数据 */
	//orderSearch() ;
	
})

/** 归因查询 */
function orderSearch () {
	
	/* 错误检测 */
	if (tid.val() == null || tid.val() == undefined || tid.val() == "") {
		layer.msg('当前无租户...', 1, 1);
		return ; 
	}
	tid.attr("disabled", true); // 租户选择禁用
	button.attr("disabled", true); // 时间选择禁用
	begin.attr("disabled", true); // 时间控件禁用
	end.attr("disabled", true); // 时间控件禁用
	
	/* 弹出层 */
	var layerFlag = loadNotShade("数据加载中, 请稍后...") ;
	
	/* 时间等待提示 */
	var index = 1; 
	var schedule = setInterval(function () {
		layerFlag = loadNotShade("数据加载中, 请稍后... " + index ++ + "/s" ) ;
	}, 1000);
	
	/* 异步加载 */
	$.ajax({
		type:"post", 
		dataType:"json" ,
		url:"marketingAction_search",
		data:{
			"tenantId":tid.val(), 
			"begin":begin.val(),
			"end":end.val()
		}, 
		success:function (e) {
			var list = e.referList ; // 统计
			/* 全局概述赋值 */
			globalHTML(list);
			
			var urlList = new Array();
			var orderList = new Array();
			var amountList = new Array();
			var visitList = new Array();
			var rateList = new Array();
			for(var i=0; i<e.referList.length; i++) {
				var refer = e.referList[i];
				if(refer.count != 0 && refer.amount != 0 && refer.visit != 0 && refer.conversionRate != 0) {
					urlList.push(refer.url);
					orderList.push(refer.count);
					var temp = refer.amount/1000;
					amountList.push([parseFloat(temp.toFixed(3))]);
					temp = refer.visit/100;
					visitList.push([parseFloat(temp.toFixed(2))]);
					rateList.push(refer.conversionRate);
				}	
			}
			//linechart
				$('#chart').highcharts({
			        chart: {
						type: 'spline' ,
			            backgroundColor : "transparent" ,
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
			        },
			        title: {
			            text: '订单总量，订单总金额*1k，访问量*100，转化率%'
			        },
			        xAxis: {
			        	title: {
			        		text:'时间段'
			        	},
			            type: 'category',
			            categories: urlList,
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
			                text: '订单总量，订单总金额*1k，访问量*100，转化率%'
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
			            name: '订单总量',
			            data: orderList
			        }, {
			            name: '订单总金额*1000',
			            data: amountList
			        }, {
			            name: '访问量*100',
			            data: visitList
			        }, {
			            name: '转化率%',
			            data: rateList
			        }]
	    		});
				
			/* 初始化bootstrap模板 */
			initBootstrap();
			close(layerFlag);//关闭弹出层
			clearInterval(schedule) ;// 关闭时间等待提示
			tid.attr("disabled", false); // 租户选择禁用
			button.attr("disabled", false); // 时间选择禁用
			begin.attr("disabled", false); // 时间控件禁用
			end.attr("disabled", false); // 时间控件禁用
						
		}
	});
	
}

/* 全局概述赋值 */
function globalHTML (map) {
	
	/* 循环json */
	var index = 0 ;
	globalContent.html("") ; // 清空元素
	for (var i=0;i<map.length;i++) {
		globalContent.append(HTML_globalContent(index, map[i].url, map[i].count, map[i].amount, map[i].visit, map[i].conversionRate)) ; // 赋值概述列表
		index ++ ;
	}
	
	/* 概述赋值 */
	globalNumber.html(index);
}

function HTML_globalContent(index, url, count, amount, visit, rate) {
	var html = ''+//
	'<tr>' +//
	'	<td style="text-align: center; width:28px" >' + (index+1) + '</td>' +//
	'	<td>' + url + '</td>' +//
	'	<td>' + count + '</td>' +//
	'	<td>' + amount + '</td>' +//
	'	<td>' + visit + '</td>' +//
	'	<td>' + rate + '%</td>' +//
	'</tr>' +//
	''; 
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