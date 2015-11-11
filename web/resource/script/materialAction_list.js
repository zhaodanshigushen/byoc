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
		url:"materialAction_search",
		data :{
			"begin":beginDate ,
			"end":endDate ,
			"tenantId":tid 
		},
		success:function (e) {
			var wglist = e.wgList;
			var clicklist = e.clickRateList;
			var conversionlist = e.conversionRateList;
			var length = wglist.length;
			var clickdata = new Array();
			var conversiondata = new Array();
			for (var i=0;i<length;i++){
				clickdata.push([clicklist[i]]);
				conversiondata.push([conversionlist[i]]);
			}
			
			//第一个图
		    $('#barchartclick').highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor : "transparent" ,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
		        },
		        title: {
		            text: '素材不同宽高比的点击率和转化率统计'
		        },
		        xAxis: {
		        	title: {
		        		text:'宽高比'
		        	},
		            categories: wglist
		        },
		        yAxis: {
		            allowDecimals: false,
		            title: {
		                text: '点击率‰和转化率%'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">宽高比{point.key}:</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
		        series: [{
					name: '点击率',
					data: clickdata
				},{
					name: '转化率',
					data: conversiondata
				}]
		    });

		    datablock.html("");
		    detaildata(wglist,clicklist,conversionlist);
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
function detaildata(wglist,clicklist,conversionlist) {
	/* 循环订单表数据 */
	for (var i=0 ; i<conversionlist.length ; i++) {
		datablock.append(HTML_content(i, wglist[i], clicklist[i], conversionlist[i]));
	}
}

function HTML_content (i,t,c, a) {
	if( i %2 == 0) {
		var html = '' + //
			'<tr class="even" >' + // 
			'	<td style="text-align: center" >' + (i+1)  + '</td>' + // 
			'	<td style="text-align: center" >' + t  + '</td>' + // 
			'	<td style="text-align: center" >' + c + '‰</td>' + // 
			'	<td style="text-align: center">' + a + '%</td>' + // 
			'</tr>';// 
	}
	else {
		var html = '' + //
			'<tr class="odd" >' + // 
			'	<td style="text-align: center" >' + (i+1)  + '</td>' + // 
			'	<td style="text-align: center" >' + t  + '</td>' + // 
			'	<td style="text-align: center" >' + c + '‰</td>' + // 
			'	<td style="text-align: center">' + a + '%</td>' + // 
			'</tr>';// 
	}
	return html ; 
}