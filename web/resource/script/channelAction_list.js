var tid = $("#tid") ; // 租户下拉id
var begin = $("#begin") ; // 开始时间id
var end = $("#end") ; // 结束时间id
var button = $("#button") ; // 图标

$(function() {

	/* 初始化时间控件 */
	initDateTools();
	/** 初始化图表配置参数 */
	initChartProperties();

	/** 初始化图表 */
	initChart();
})

/** 初始化图表 */
function initChart() {
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
		url:"channelAction_search",
		data:{
			"tenantId":tid.val(), 
			"begin":begin.val(),
			"end":end.val()
		}, 
		success:function (e) {

			/* 获取基本数据 */
			var obj = e.globalStatisList;
			var time = new Array();
			var click = new Array();
			var view = new Array();
			var order = new Array();
			for(var i=0;i<e.globalStatisList.length;i++){
				var temp1 = obj[i].end.split("T");
				var temp2 = temp1[0].split("-");
				
				time.push(temp2[1]+"-"+temp2[2]);
				click.push(obj[i].clickCount);
				view.push(obj[i].viewCount);
				order.push(obj[i].ltOrderCount);
			}

			charts($("#chartClick"), "点击量", time, click);
	
			/* 显示数据 */
			charts($("#chartView"), "展示量", time, view);
	
			/* 总30订单 */
			charts($("#chartOrder"), "30订单量", time, order);
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
	charts();
}

/* 初始化图标 */
function charts(id, title, key, value) {
$(id).highcharts( {
		chart : {
			backgroundColor : "transparent",
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false
		},
		title : {text : null },
		subtitle : { text : null },
		xAxis: {
		        	title: {
		        		text:'时间段'
		        	},
		            type: 'category',
		            categories: key,
            		labels: {
                		rotation: -45,
                		style: {
                    		fontSize: '13px',
                    		fontFamily: 'Verdana, sans-serif'
                		}
            		}
		        },
		yAxis : { 
			title : { text : null } ,
			labels: {
				formatter: function() {
					return this.value;
				}
			},
		},
		legend:false,
		credits : { enabled : false },
		tooltip :  {
			valueSuffix : '',
			valuePrefix : "", 
			shared: true
		},
		series: [ { name: title, data: value} ]  
	});
}

/** 初始化图表配置参数 */
function initChartProperties() {
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		return {
			radialGradient : {
				cx : 0.5,
				cy : 0.3,
				r : 0.7
			},
			stops : [ [ 0, color ], [ 1, Highcharts.Color(color).brighten(-0.3).get('rgb') ] // darken
			]
		};
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