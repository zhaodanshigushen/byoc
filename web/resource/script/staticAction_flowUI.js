$(function() {

	/** 初始化图表配置参数 */
	initChartProperties();

	/** 初始化图表 */
	initChart();
})

/** 初始化图表 */
function initChart() {

	/* 异步获取数据 */
	$.post("statisAction_globalCharts", {}, function(e) {

		/* 获取基本数据 */
		var obj = e.globalCharts;
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

		/* 点击数据 */
		charts($("#chartClick"), "总点击", obj.key, obj.click, timestage);

		/* 显示数据 */
		charts($("#chartView"), "总展示", obj.key, obj.view, timestage);

		/* 总30订单 */
		charts($("#chartOrder"), "总30订单", obj.key, obj.order, timestage);
	}, "json");
	charts();
}

/* 初始化图标 */
function charts(id, title, key, value, time) {
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
		            categories: time,
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