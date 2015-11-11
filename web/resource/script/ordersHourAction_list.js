$(function() {
	/* 初始化时间控件 */
	initDateTools();
	//loadBarChart();
})

/** 所需字段 */
var tenant = $("#tenantSelect") ; // 租户下拉菜单
var begin = $("#begin") ; // 开始时间
var end = $("#end") ; // 结束时间
var tenantSelect = $("#tenantId") ; // 租户下拉菜单
var timeblock = $("#timeblock") ; // 时间类型下拉菜单
var SearchButton = $("#searchbutton") ; // 查询按钮
var datablock = $("#barchartdata");//表格主体

/** 初始化时间控件 */
function initDateTools() {

	/* 设置皮肤 */
	laydate.skin("molv");

	/* 开始时间 */
	var start = {
		elem : '#begin',
		isclear : false,
		istime : true,
		max : $("#end").val(),
		istoday : false, //是否显示今天
		format : 'YYYY-MM-DD hh时 mm分', //日期格式
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
		istime : true,
		min : $("#begin").val(),
		istoday : false, //是否显示今天
		format : 'YYYY-MM-DD hh时 mm分', //日期格式
		choose : function(datas) {
			/*结束日选好后，重置开始日的最大日期*/
			start.max = datas;
		}
	};

	laydate(start);
	laydate(end);
}

function loadBarChart() {

	/* 错误检测 */
	if (tenant.val() == null || tenant.val() == undefined || tenant.val() == "") {
		layer.msg('当前无租户...', 1, 1);
		return ; 
	}
	/* 弹出层 */
	var flag = loadNotShade("数据加载中, 请稍后...");
	tenant.attr("disabled", true); // 租户选择禁用
	begin.attr("disabled", true); // 时间选择禁用
	end.attr("disabled", true); // 时间选择禁用
	SearchButton.attr("disabled", true); // 提交按钮禁用

	/* 弹出层读秒 */
	var index = 2;
	var calcS = setInterval(function() {
		flag = loadNotShade("数据加载中, 请稍后... " + index++ + "/s");
	}, 1000);
	
	var tid = tenant.val() ; // 租户id
	var beginDate = begin.val() ; // 开始时间
	var endDate = end.val () ; // 结束时间
	
	/* 异步获取数据 */
	$.ajax({
		type:"post", 
		dataType:"json" ,
		url:"ordersHourAction_search",
		data :{
			"begin":beginDate ,
			"end":endDate ,
			"tenantId":tid
		},
		success:function (e) {
			var timestage = [
		                '00:00-00:59',
		                '01:00-01:59',
		                '02:00-02:59',
		                '03:00-03:59',
		                '04:00-04:59',
		                '05:00-05:59',
		                '06:00-06:59',
		                '07:00-07:59',
		                '08:00-08:59',
		                '09:00-09:59',
		                '10:00-10:59',
		                '11:00-11:59',
		                '12:00-12:59',
		                '13:00-13:59',
		                '14:00-14:59',
		                '15:00-15:59',
		                '16:00-16:59',
		                '17:00-17:59',
		                '18:00-18:59',
		                '19:00-19:59',
		                '20:00-20:59',
		                '21:00-21:59',
		                '22:00-22:59',
		                '23:00-23:59',
		            ];
			var countlist = e.countList;
			var amountlist = e.amountList;
			var averagelist = e.averageList;
			var length = 24;
			var countdata = new Array();
			var amountdata = new Array();
			for (var i=0;i<24;i++){
				countdata.push([timestage[i], countlist[i]]);
				amountdata.push([timestage[i], amountlist[i]]);
			}
			
			//第一个图
		    $('#barchartcount').highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor : "transparent" ,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
		        },
		        title: {
		            text: '不同小时段的订单数量'
		        },
		        xAxis: {
		        	title: {
		        		text:'时间段'
		        	},
		            type: 'category',
		            categories: timestage,
            		labels: {
                		rotation: -45,
                		style: {
                    		fontSize: '13px',
                    		fontFamily: 'Verdana, sans-serif'
                		}
            		}
		        },
		        yAxis: {
		            allowDecimals: false,
		            title: {
		                text: '数量'
		            }
		        },
		        tooltip: {
		            formatter: function () {
		                return '<b>' + this.point.name + ':</b><br/>' +
		                    this.point.y.toFixed(2) ;
		            }
		        },
		        series: [{
					type: 'column',
					name: '投放数量',
					data: countdata
				}]
		    });
		    
		    //第二个图
		    $('#barchartamount').highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor : "transparent" ,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
		        },
		        title: {
		            text: '不同小时段的订单金额'
		        },
		        xAxis: {
		        	title: {
		        		text:'时间段'
		        	},
		            type: 'category',
		            categories: timestage,
            		labels: {
                		rotation: -45,
                		style: {
                    		fontSize: '13px',
                    		fontFamily: 'Verdana, sans-serif'
                		}
            		}
		        },
		        yAxis: {
		            allowDecimals: false,
		            title: {
		                text: '数量'
		            }
		        },
		        tooltip: {
		            formatter: function () {
		                return '<b>' + this.point.name + ':</b><br/>' +
		                    this.point.y.toFixed(2) ;
		            }
		        },
		        series: [{
					type: 'column',
					name: '投放金额',
					data: amountdata
				}]
		    });

		    datablock.html("");
		    detaildata(timestage,countlist,amountlist,averagelist);
		    layer.close(flag); // 关闭等待层
			clearInterval(calcS); // 清空读秒
		    tenant.attr("disabled", false); // 租户选择禁用
			begin.attr("disabled", false); // 时间选择禁用
			end.attr("disabled", false); // 时间选择禁用
			SearchButton.attr("disabled", false); // 提交按钮禁用
	    }
	}) ;
}

/** 展示表格 */
function detaildata(timestage,countlist,amountlist,averagelist) {
	/* 循环订单表数据 */
	for (var i=0 ; i<amountlist.length ; i++) {
		datablock.append(HTML_content(i, timestage[i], countlist[i], amountlist[i], averagelist[i]));
	}
}

function HTML_content (i,t,c, a, av) {
	if( i %2 == 0) {
		var html = '' + //
			'<tr class="even" >' + // 
			'	<td style="text-align: center" >' + (i+1)  + '</td>' + // 
			'	<td style="text-align: center" >' + t  + '</td>' + // 
			'	<td style="text-align: center" >' + c + '</td>' + // 
			'	<td style="text-align: center">' + a + '</td>' + // 
			'	<td style="text-align: center">' + av + '</td>' + // 
			'</tr>';// 
	}
	else {
		var html = '' + //
			'<tr class="odd" >' + // 
			'	<td style="text-align: center" >' + (i+1)  + '</td>' + // 
			'	<td style="text-align: center" >' + t  + '</td>' + // 
			'	<td style="text-align: center" >' + c + '</td>' + // 
			'	<td style="text-align: center">' + a + '</td>' + // 
			'	<td style="text-align: center">' + av + '</td>' + // 
			'</tr>';// 
	}
	return html ; 
}