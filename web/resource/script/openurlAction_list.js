$(function() {

	/* 初始化图表配置参数 */
	initChartProperties();

	/* 初始化图标 */
	initChart();
	setInterval(function() {
		initChart();
	}, 1000 * 60)

})

/* 初始化图标 */
function initChart() {
$.post("openurlActionJson_list", {}, function(e) {

		$('#chart').highcharts( {
			chart : {
				backgroundColor : "transparent",
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			},
			title : {
				text : null
			},
			subtitle : {
				text : null
			},
			xAxis : {
				categories : e.menu
			},
			yAxis : {
				title : {
					text : null
				} ,
				labels: {
                	formatter: function() {
                    	return this.value +'/ms';
                	}
				},
			},
			credits : {
				enabled : false
			},
			tooltip : {
				valueSuffix : '/ms',
				valuePrefix : "耗时"
			},
			series : e.data
		});

	}, "json");

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

/** 配置发送信息 */
function openSendUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "邮件发送配置",
		offset : [ '', '' ],
		area : [ '700px', '355px' ],
		iframe : {
			src : 'messageconfigAction_sendUrlUI',
			scrolling : 'no'
		}
	});
}

/** 系统日志 */
function syslogUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "",
		offset : [ '', '' ],
		area : [ '900px', '600px' ],
		iframe : {
			src : 'openurlAction_syslogUI',
			scrolling : 'yes'
		}
	});
}

/** 系统错误日志 */
function syslogErrorUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "",
		offset : [ '', '' ],
		area : [ '900px', '600px' ],
		iframe : {
			src : 'openurlAction_syslogErrorUI',
			scrolling : 'yes'
		}
	});
}