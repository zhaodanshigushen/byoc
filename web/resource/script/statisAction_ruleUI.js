/** 所需属性 */
var content = $("#content"); // 规则目录ID
var tenantSelect = $("#tenantSelect");// 租户下拉框
var time = $("#time"); // 时间选择

$(function() {
	loadRuleList();
})

/**
 * 加载当前租户电商统计
 */
function loadRuleList() {
	
	/* 获取当前租户 */
	var tid = tenantSelect.val();
	var dateType = time.val() ;
	
	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return ; 
	}
	
	/* 查询时间时间区间 */
	$.ajax({
		type:"post", 
		dataType:"json",
		url:"statisAction_dateBetween",
		data:{
			"tenantId": tid ,
			"dateType": dateType
		},
		success:function (o) {
			var begin = o.begin ; // 开始时间 
			var end = o.end // 结束时间
			
			/* 禁用下拉 */
			tenantSelect.attr("disabled", true);
			var layerflag = loadNotShade("数据加载中, 请稍后...");
			
			/* 读秒 */
			var index = 2; 
			var calcS = setInterval(function () {
				layerflag = loadNotShade("数据加载中, 请稍后... " + index ++ + "/s");
			}, 1000) ;
		
			/* 异步获取数据 */
			$.ajax( {
				type : "post",
				dataType : "json",
				url : "statisAction_rule",
				data : {
					"begin" : begin,
					"end" : end,
					"tenantId" : tid
				},
				success : function(e) {
		
					/* 返回集合结果集 */
					var result = e.ruleStatiList;
					content.html("");
		
					/* 循环结果集 */
					for ( var i = 0; i < result.length; i++) {
						content.append(HTML_content(result[i]));
					}
		
					/* 初始化模板 */
					initBootstrap();
		
					/* 解除下拉菜单 */
					tenantSelect.attr("disabled", false);
					close(layerflag) ; 
					clearInterval(calcS);
		
				}
			});
		}
	});


}

/** 统计HTML集 */
function HTML_content(e) {

	var titleHtml = ''; // 标题HTML
	var valueHtml = ''; // 实际值

	/* 所需属性 */
	var rule = e.rule; // 规则标题
	var statis = e.globalStatis; // 统计信息

	/* 相隔天数 */
	if (rule.day != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="相隔天数" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.day + '天"   />';
	}

	/* 浏览时长 */
	if (rule.viewTimeLength != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="浏览时长" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.viewTimeLength + '/s+"   />';
	}

	/* 浏览次数 */
	if (rule.viewCount != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="浏览次数" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.viewCount + '/次+"   />';
	}

	/*  浏览间隔 */
	if (rule.viewSpan != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="浏览间隔" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + (rule.viewSpan/(1*60*60) >= 1 ? rule.viewSpan/(1*60*60)+"/H+" : rule.viewSpan+"/s+") +'"   />';
	}

	/* 购买次数 */
	if (rule.buyCount != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="购买次数" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.buyCount + '/次+"   />';
	}

	/* 购买间隔 */
	if (rule.buySpan != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="购买间隔" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + (rule.buySpan/(1*60*60*24) >= 1 ? rule.buySpan/(1*60*60*24)+"/D+" : rule.buySpan+"/s+") + '"  />';
	}

	/* 商品定制 */
	if (rule.customCount != '-1') {
		titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="商品定制" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.customCount + '"   />';
	}

	/* 热销 */
	if (rule.topNumber != '-1' && rule.topTypeOne != '-1' && rule.topTypeTwo != '-1') {
		titleHtml += '<input style="cursor: default; width: 142px;margin-right: 3px;" type="button" value="热销" class="mws-button gray" />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 44px;margin-right: 5px; text-align: center; " value="前' + rule.topNumber + '"  />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 44px;margin-right: 5px; text-align: center; " value="' + (rule.topTypeOne == 1 ? "全局" : "同类") + ' "  />';
		valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 44px;margin-right: 5px; text-align: center; " value="' + (rule.topTypeTwo == 1 ? "数量" : "总额") + ' "  />';
	}

	/*  权重 */
	titleHtml += '<input style="cursor: default; width: 72px;margin-right: 3px;" type="button" value="权重" class="mws-button gray" />';
	valueHtml += '<input class="mws-textinput" readonly="readonly" style="width: 72px;margin-right: 5px; text-align: center; " value="' + rule.weight + '"   />';

	/* 当前已删除 */
	if (rule.del == 1) {
		titleHtml += '<input style="cursor: default; width: 85px;margin-right: 3px;" type="button" value="当前已删除" class="mws-button red" />';
	}

	var html = '' + //
			'<div class="mws-panel grid_8">' + // 
			'' + // 
			'	<div>' + // 
			'		' + titleHtml + // 
			'	</div>' + // 
			'' + // 
			'	<form class="mws-form">' + // 
			'		<div class="mws-form-row" style="padding-left:2px;" >' + //
			'			' + valueHtml + //
			'		</div>' + // 
			'	</form>' + // 
			'' + // 
			'	<div class="mws-panel-body">' + // 
			'		<table class="mws-table" style="border-top: 1px solid #ccc" > ' + // 
			'			<thead>' + // 
			'				<tr>' + // 
			'					<th class="tip" tipvalue="广告展示次数" >展示</th>' + // 
			'					<th class="tip" tipvalue="广告点击次数" >点击</th>' + // 
			'					<th class="tip" tipvalue="广告点击UV数" >点击UV数</th>' + // 
			'					<th class="tip" tipvalue="广告到达UV数" >到达UV数</th>' + // 
			'					<th class="tip" tipvalue="订单总数量" >订单数</th>' + // 
			'					<th class="tip" tipvalue="订单总金额" >订单金额</th>' + // 
			'					<th class="tip" tipvalue="点击数 / 广告显示数" >点击率</th>' + // 
			'					<th class="tip" tipvalue="到达UV数 / 点击UV数" >到达率</th>' + // 
			'					<th class="tip" tipvalue="订单数 / 达到数" >转化率</th>' + // 
			'					<th class="tip" tipvalue="点击数 x 1.5" >广告花费</th>' + // 
			'					<th class="tip" tipvalue="订单总金额 / 广告总花费" >投资回报率</th>' + // 
			'				</tr>' + // 
			'			</thead>' + // 
			'			<tbody>' + // 
			'				<tr>' + // 
			'					<td>' + statis.viewCount + '</td>' + // 
			'					<td>' + statis.clickCount + ' </td>' + // 
			'					<td>' + statis.clickCountUV + '</td>' + // 
			'					<td>' + statis.arriveCountUV + '</td>' + // 
			'					<td>' + statis.ltOrderCount + '</td>' + // 
			'					<td>' + statis.ltOrderAmount + '</td>' + // 
			'					<td>' + statis.clickRate + '‰</td>' + // 
			'					<td>' + statis.arriveRate + '%</td>' + // 
			'					<td>' + statis.conversionRate + '%</td>' + // 
			'					<td>' + statis.adChargeRate + '</td>' + // 
			'					<td>' + statis.roiRate + '</td>' + // 
			'				</tr>' + // 
			'			</tbody>' + // 
			'		</table>' + //
			'	</div>' + // 
			'</div>' + // 
			'' + // 
			'<hr/>' + // 
			'';
	return html;
}
