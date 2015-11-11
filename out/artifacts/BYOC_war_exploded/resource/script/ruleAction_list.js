/** 所需属性 */
var deleteArr = new Array(); // 待删除数组.. 公共资源, 注意清空
var tenantSelect = $("#tenantSelect"); // 租户下拉菜单元素
var content = $("#content"); // 规则条件目录

$(function() {
	initOld();
})

/** 初始化新客 */
function initNew() {

	/* 清空资源 */
	deleteArr = new Array(); // 需要删除数组清空
	layer.closeAll(); // 关闭所有弹出层
	content.html(""); // 清空数据

	/* 菜单样式更换 */
	menuToggleStyle("new");

	/* 新客标记 */
	menuToggleType("new");

	/* 加载数据 */
	initDataForNewAndOld();
}

/** 初始化老客 */
function initOld() {

	/* 清空资源 */
	deleteArr = new Array(); // 需要删除数组清空
	layer.closeAll(); // 关闭所有弹出层
	content.html(""); // 清空数据

	/* 菜单样式更换 */
	menuToggleStyle("old");

	/* 老客标记 */
	menuToggleType("old");

	/* 加载数据 */
	initDataForNewAndOld();
}

/** 初始化机器学习 */
function initML() {

	/* 清空资源 */
	deleteArr = new Array(); // 需要删除数组清空
	layer.closeAll(); // 关闭所有弹出层
	content.html(""); // 清空数据

	/* 菜单样式更换 */
	menuToggleStyle("ml");

	/* 新客标记 */
	menuToggleType("ml");

	/* 加载数据 */
	initDataForNewAndOld();
}

/** 加载数据 */
function initDataForNewAndOld() {
	if($("#type").val() == "old")
		initDataForOld();
	else if($("#type").val() == "new")
		initDataForNew();
	else if($("#type").val() == "ml")
		initDataForML();
}

/** 保存更新数据 */
function dataSaveOrUpdate() {
	layer.closeAll(); // 关闭所有弹出层
	if($("#type").val() == "old")
		dataSaveOrUpdateOld();
	else if($("#type").val() == "new")
		dataSaveOrUpdateNew();
	else if($("#type").val() == "ml")
		dataSaveOrUpdateML();
}

/** 添加数据 */
function dataAdd() {
	layer.closeAll(); // 关闭所有弹出层
	$("#type").val() == "old" ? dataAddOld() : dataAddNew();
}

/**  老用户数据添加 */
function dataAddOld() {

	/* 拼接HTML */
	var html = '<div class="cf_container mws-dualbox clearfix" configId="-1" >';
	html += HTMLNumber(content); // 序号
	html += HTMLDay(null, 0); // 相隔天数
	html += HTMLViewTimeLength(null, 0); // 浏览时长
	html += HTMLViewCount(null, 0); // 浏览次数
	html += HTMLViewSpan(null, 0); // 浏览间隔
	html += HTMLBuyCount(null, 0); // 购买次数
	html += HTMLBuySpan(null, 0); // 购买间隔
	html += HTMLCustom(null, 0); // 商品定制
	html += HTMLTopSale(null, null, 0);// 商品热销
	html += HTMLViewBrowse(null, null, 0);// 商品热浏览
	html += HTMLWeight(null); // 权重
	html += "<hr/></div>";

	/* 添加 */
	content.append(html);
}

/** 新用户数据添加 */
function dataAddNew() {

	/* 拼接HTML */
	var html = '<div class="cf_container mws-dualbox clearfix" configId="-1" >';
	html += HTMLNumber(content); // 序号
	html += HTMLCustom(null, 0); // 商品定制
	html += HTMLTopSale(null, null, 0);// 商品热销
	html += HTMLViewBrowse(null, null, 0);// 商品热浏览
	html += HTMLWeight(null); // 权重
	html += "<hr/></div>";

	/* 添加 */
	content.append(html);
}

/** 保存数据或更新数据(老用户) */
function dataSaveOrUpdateOld() {

	/*  获取相关字段 */
	var tid = tenantSelect.val(); // 获取当前租户ID 
	var jsonArr = new Array(); // json 数组
	var finalJson = "["; // 最终json

	content.find(".cf_container").each(function(key, obj) {
		/* 获取配置字段 */
		var id = checkNumber($(obj).attr("configid"));
		var day = checkNumber($(obj).find(".day").val());
		var viewTimeLength = checkNumber($(obj).find(".viewTimeLength").val());
		var viewCount = checkNumber($(obj).find(".viewCount").val());
		var viewSpan = checkNumber($(obj).find(".viewSpan").val());
		var buyCount = checkNumber($(obj).find(".buyCount").val());
		var buySpan = checkNumber($(obj).find(".buySpan").val());
		var weight = checkNumber($(obj).find(".weight").val());
		var custom = checkNumber($(obj).find(".custom").val());
		var sale_number = checkNumber($(obj).find(".sale_number").val());
		var sale_qjOrTl = checkNumber($(obj).find(".sale_qjOrTl").val());
		var sale_slOrZe = checkNumber($(obj).find(".sale_slOrZe").val());
		var view_number = checkNumber($(obj).find(".view_number").val());
		var view_qjOrFl = checkNumber($(obj).find(".view_qjOrTl").val());

		/* 拼接JSON字串 */
		jsonArr.push('{"id":"' + id + '", "day":"' + day + '", "viewTimeLength":"' + viewTimeLength + '", "viewCount":"' + viewCount + '", "viewSpan":"' + viewSpan + '", "buyCount":"' + buyCount + '", "buySpan":"' + buySpan + '", "customCount":"' + custom + '", "topNumber":"' + sale_number + '", "topTypeOne":"' + sale_qjOrTl + '", "topTypeTwo":"' + sale_slOrZe + '", "weight":"' + weight + '", "tenantId":"' + tid + '", "viewNumber":"' + view_number + '", "viewTypeOne":"' + view_qjOrFl + '"}');
	});

	/* 拼接删除JSON */
	for ( var i = 0; i < deleteArr.length; i++) {
		jsonArr.push('{"id":' + deleteArr[i] + ', "isdelete":true}');
	}

	/* 拼接保存JSON */
	for ( var i = 0; i < jsonArr.length; i++) {
		i == jsonArr.length - 1 ? finalJson += jsonArr[i] : finalJson += jsonArr[i] + ",";
	}

	/* 等待层 */
	var flag = load("加载数据中, 请稍后...");

	/* 异步更新配置列表 */
	$.post("ruleAction_add", {
		"ruleJson" : finalJson + "]",
		"tenantId" : tid,
		"status" : "1"
	}, function(e) {

		/* 加载老数据 */
		initOld();
		close(flag);
		layer.msg('操作已完成...', 1, 1)

	}, "json");
}

/** 保存数据或更新数据(新用户)*/
function dataSaveOrUpdateNew() {

	/*  获取相关字段 */
	var tid = tenantSelect.val(); // 获取当前租户ID 
	var jsonArr = new Array(); // json 数组
	var finalJson = "["; // 最终json

	content.find(".cf_container").each(function(key, obj) {
		/* 获取配置字段 */
		var id = checkNumber($(obj).attr("configid"));
		var custom = checkNumber($(obj).find(".custom").val());
		var sale_number = checkNumber($(obj).find(".sale_number").val());
		var sale_qjOrTl = checkNumber($(obj).find(".sale_qjOrTl").val());
		var sale_slOrZe = checkNumber($(obj).find(".sale_slOrZe").val());
		var view_number = checkNumber($(obj).find(".view_number").val());
		var view_qjOrTl = checkNumber($(obj).find(".view_qjOrTl").val());
		var weight = checkNumber($(obj).find(".weight").val());

		/* 拼接JSON字串 */
		jsonArr.push('{"id":"' + id + '", "customCount":"' + custom + '", "topNumber":"' + sale_number + '", "topTypeOne":"' + sale_qjOrTl + '", "topTypeTwo":"' + sale_slOrZe + '", "tenantId":"' + tid + '", "weight":"' + weight + '", "viewNumber":"' + view_number + '", "viewTypeOne":"' + view_qjOrTl + '"}');
	});

	/* 拼接删除JSON */
	for ( var i = 0; i < deleteArr.length; i++) {
		jsonArr.push('{"id":' + deleteArr[i] + ', "isdelete":true}');
	}

	/* 拼接保存JSON */
	for ( var i = 0; i < jsonArr.length; i++) {
		i == jsonArr.length - 1 ? finalJson += jsonArr[i] : finalJson += jsonArr[i] + ",";
	}

	/* 等待层 */
	var flag = load("加载数据中, 请稍后...");

	/* 异步更新配置列表 */
	$.post("ruleAction_add", {
		"ruleJson" : finalJson + "]",
		"tenantId" : tid,
		"status" : "0"
	}, function(e) {

		/* 加载新客数据 */
		initNew();
		close(flag);
		layer.msg('操作已完成...', 1, 1)
	}, "json");

}

/** 保存数据或更新数据(新用户)*/
function dataSaveOrUpdateML() {
	/*  获取相关字段 */
	if(isNaN(document.getElementById("mllow").value)) {
		alert("low请输入数字");
		return;
	}
	if(isNaN(document.getElementById("mlhigh").value)) {
		alert("high请输入数字");
		return;
	}
	var tid = tenantSelect.val(); // 获取当前租户ID 
	var mllow = $("#mllow");
	var mlhigh = $("#mlhigh");
	var lowvalue = mllow.val();
	var highvalue = mlhigh.val();
	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}
	/* 异步保存 */
	var layerflag = load("数据保存中, 请稍后...")
	/* 异步获取数据 */
	$.post("ruleAction_add", {
		tenantId : tid,
		low : lowvalue,
		high : highvalue,
		status : "2"
	}, function(e) {
		/* 关闭等待层 */
		close(layerflag);
	}, "json");
}

/** 加载新客数据 */
function initDataForNew() {

	/* 获取相关字段信息 */
	var tid = tenantSelect.val();

	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}
	/* 异步获取数据 */
	$.post("ruleAction_ruleList", {
		tenantId : tid,
		status : "0"
	}, function(e) {
		/* HTML添加 */
		for (key in e.ruleList) {
			content.append(html_content_new(e.ruleList, key));
		}

		/* 模板初始化 */
		initBootstrap();
		document.getElementById("addtohide").style.display="";
	}, "json");
}

/** 加载老客数据 */
function initDataForOld() {

	/* 获取相关字段信息 */
	var tid = tenantSelect.val();

	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}

	/* 异步获取数据 */
	$.post("ruleAction_ruleList", {
		tenantId : tid,
		status : "1"
	}, function(e) {
		/* HTML添加 */
		for (key in e.ruleList) {
			content.append(html_content_old(e.ruleList, key));
		}

		/* 模板初始化 */
		initBootstrap();
		document.getElementById("addtohide").style.display="";
	}, "json");

}

/** 加载机器学习 */
function initDataForML() {

	/* 获取相关字段信息 */
	var tid = tenantSelect.val();

	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}
	/* 异步获取数据 */
	$.post("ruleAction_ruleList", {
		tenantId : tid,
		status : "2"
	}, function(e) {
		/* HTML添加 */
		var list = e.mlList;
		var treeHTML = "";
		treeHTML += 'low :  ';
			if(list[0] == 0)
				treeHTML += '<input type="text" id="mllow" class="mws-textinput" placeholder=" 请输入low" tipvalue="输入low"><br/>';
			else
				treeHTML += '<input type="text" id="mllow" class="mws-textinput" tipvalue="输入low" value="'+list[0]+'"><br/>';
			treeHTML += 'high:  ';
			if(list[1] == 0)
				treeHTML += '<input type="text" id="mlhigh" class="mws-textinput" placeholder=" 请输入high" tipvalue="输入high">';
			else
				treeHTML += '<input type="text" id="mlhigh" class="mws-textinput" tipvalue="输入high" value="'+list[1]+'">';
		content.html(treeHTML);
		document.getElementById("addtohide").style.display="none";
		/* 模板初始化 */
		initBootstrap();
	}, "json");
}

/** 加载老客数据 */
function html_content_old(e, key) {
	/* 相关字段 */
	var result = e[key]; // 规则对象
	var id = result.id; // 规则id
	var day = result.day; // 相隔天数
	var viewTimeLength = result.viewTimeLength; //浏览时长
	var viewCount = result.viewCount; //浏览次数
	var viewSpan = result.viewSpan; //浏览间隔
	var buyCount = result.buyCount; //购买次数
	var buySpan = result.buySpan; //购买间隔
	var weight = result.weight; // 权重
	var customCount = result.customCount; //商品定制
	var sale_number = result.topNumber;// 热销-前几名
	var sale_qjORtl = result.topTypeOne; // 热销-全局还是同类
	var view_number = result.viewNumber; // 商品热浏览前几名
	var view_typeone = result.viewTypeOne // 商品全局还是分类
	var html = '<div class="cf_container mws-dualbox clearfix" configId="' + id + '" >'; // html拼接

	/* HTML拼接 */
	html += HTMLNumber(content); // 序号
	day == -1 ? html += "" : html += HTMLDay(day, 0); // 相隔天数
	viewTimeLength == -1 ? html += "" : html += HTMLViewTimeLength(viewTimeLength, 0); // 浏览时长
	viewCount == -1 ? html += "" : html += HTMLViewCount(viewCount, 0); // 浏览次数
	viewSpan == -1 ? html += "" : html += HTMLViewSpan(viewSpan, 0); // 浏览间隔
	buyCount == -1 ? html += "" : html += HTMLBuyCount(buyCount, 0); // 购买次数
	buySpan == -1 ? html += "" : html += HTMLBuySpan(buySpan, 0); // 购买间隔
	customCount == -1 ? html += "" : html += HTMLCustom(customCount, 0); // 定制
	if (sale_number != -1 && sale_qjORtl != -1) { // 商品热销
		html += HTMLTopSale(sale_number, sale_qjORtl);
	}
	if (view_number != -1 && view_typeone != -1) { // 商品热浏览
		html += HTMLViewBrowse(view_number, view_typeone);
	}
	html += HTMLWeight(weight); // 权重

	/* 工具菜单 */
	if (day == -1 || viewTimeLength == -1 || viewCount == -1 || viewSpan == -1 || buyCount == -1 || buySpan == -1 || customCount == -1 || sale_number == -1 || sale_qjORtl == -1 || view_number == -1 && view_typeone == -1) {
		html += HTMLActionSon();
	}

	html += "<hr/></div>";

	return html;

}

/** 加载新客数据 */
function html_content_new(e, key) {

	/* 相关字段 */
	var result = e[key];
	var id = result.id; // 规则id
	var customCount = result.customCount; //商品定制
	var sale_number = result.topNumber;// 热销-前几名
	var sale_qjORtl = result.topTypeOne; // 热销-全局还是同类
	var weight = result.weight; // 权重
	var view_number = result.viewNumber; // 热浏览前几名
	var view_qjOrTl = result.viewTypeOne; // 全局还是同类
	var html = '<div class="cf_container mws-dualbox clearfix" configId="' + id + '" >'; // html拼接

	/* HTML拼接 */
	html += HTMLNumber(content);
	customCount == -1 ? html += "" : html += HTMLCustom(customCount, 0); // 定制
	if (sale_number != -1 && sale_qjORtl != -1) { // 热销
		html += HTMLTopSale(sale_number, sale_qjORtl);
	}
	if (view_number != -1 && view_qjOrTl != -1) { // 热浏览 
		html += HTMLViewBrowse(view_number, view_qjOrTl);
	}
	html += HTMLWeight(weight); // 权重
	if (customCount == -1 || sale_number == -1 || sale_qjORtl == -1 || view_number == -1 || view_qjOrTl == -1) {
		html += HTMLActionSon();
	}

	return html += "<hr/></div>";
}

/** 菜单样式切换 */
function menuToggleStyle(type) {
	if(type == "new") {
		$("#new").addClass("ui-tabs-selected").parent().find("#old").removeClass("ui-tabs-selected");
		$("#new").parent().find("#ml").removeClass("ui-tabs-selected");
	}
	else if(type == "old") {
		$("#new").removeClass("ui-tabs-selected").parent().find("#old").addClass("ui-tabs-selected");
		$("#new").parent().find("#ml").removeClass("ui-tabs-selected");
	}
	else if(type == "ml") {
		$("#new").removeClass("ui-tabs-selected").parent().find("#ml").addClass("ui-tabs-selected");
		$("#new").parent().find("#old").removeClass("ui-tabs-selected");
	}
}

/** 新客老客标记添加 */
function menuToggleType(type) {
	if(type == "new"){
		$("#typeInfo").html('<input id="type" type="hidden" value="new" />');
	}
	else if(type == "old"){
		$("#typeInfo").html('<input id="type" type="hidden" value="old" />');
	}
	else if(type == "ml") {
		$("#typeInfo").html('<input id="type" type="hidden" value="ml" />');
	}
}

/** 删除一块配置 */
function removeSon(obj) {

	/* 需要操作的元素 */
	var sonObj = $(obj).parent().parent();

	/* 添加工具菜单按钮 */
	if (sonObj.parent().find(".addButton_s").size() == 0) {
		setTimeout(function() {
			sonObj.parent().find(".weightDIV").after(HTMLActionSon());
		}, 150)
	}

	/* 删除 */
	sonObj.css("opacity", 0).hide(200, function() {
		$(this).remove();
	});
}

/** 删除一行规则 */
function removeLine(obj) {
	var ruleId = $(obj).parent().parent().parent().attr("configid"); // 规则ID

	/* 确定不是一条没有保存的规则被删除 */
	if (ruleId != -1) {
		deleteArr.push(ruleId); // 添加到待删除数组
	}

	/* 删除HTML */
	$(obj).parent().parent().parent().css("opacity", 0).hide(200, function() {
		$(this).remove();
	})
}

/** 添加功能模块 */
function addActionSon(obj) {
	$("#type").val() == "old" ? addActionSonOld(obj) : addActionSonNew(obj);
}

/** 新用户 */
function addActionSonNew(obj) {

	/* 父类html元素 */
	var parent = $(obj).parent();
	var html = ''; // 按钮html
	var number = $(parent.find(".numberLine_")[0]).val(); // 当期序号

	/* 商品定制*/
	parent.find(".spdz_").size() != 0 ? html += "" : html += '<input type="button" value="商品定制" onclick="addActionSonElement(\'' + number + '\', \'spdz\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/* 商品热销*/
	parent.find(".sprx_").size() != 0 ? html += "" : html += '<input type="button" value="商品热销" onclick="addActionSonElement(\'' + number + '\', \'sprx\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/* 商品热销*/
	parent.find(".sprll").size() != 0 ? html += "" : html += '<input type="button" value="商品热浏览" onclick="addActionSonElement(\'' + number + '\', \'sprll\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:100px; background-position:75px 6px; text-align:left">';

	/* 给出弹出层 */
	addActionFlag = layer.tips(html, obj, {
		guide : 2,
		closeBtn : [ 0, true ],
		maxWidth : 233,
		style : [ 'background-color:#d7d7d7; color:#fff; padding:7px 26px 7px 10px', '#d7d7d7' ]
	});
}

/** 添加功能模块老用户 */
function addActionSonOld(obj) {

	/* 父类html元素 */
	var parent = $(obj).parent();
	var html = ''; // 按钮html
	var number = $(parent.find(".numberLine_")[0]).val(); // 当期序号 

	/*  相隔天数*/
	parent.find(".xgts_").size() != 0 ? html += '' : html += '<input type="button" value="相隔天数" onclick="addActionSonElement(\'' + number + '\', \'xgts\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/*  浏览时长*/
	parent.find(".llsc_").size() != 0 ? html += '' : html += '<input type="button" value="浏览时长" onclick="addActionSonElement(\'' + number + '\', \'llsc\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/*  浏览次数*/
	parent.find(".llcs_").size() != 0 ? html += '' : html += '<input type="button" value="浏览次数" onclick="addActionSonElement(\'' + number + '\', \'llcs\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/*  浏览间隔*/
	parent.find(".lljg_").size() != 0 ? html += '' : html += '<input type="button" value="浏览间隔" onclick="addActionSonElement(\'' + number + '\', \'lljg\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/*  购买次数*/
	parent.find(".gmcs_").size() != 0 ? html += '' : html += '<input type="button" value="购买次数" onclick="addActionSonElement(\'' + number + '\', \'gmcs\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/*  购买间隔*/
	parent.find(".gmjg_").size() != 0 ? html += '' : html += '<input type="button" value="购买间隔" onclick="addActionSonElement(\'' + number + '\', \'gmjg\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/* 商品定制*/
	parent.find(".spdz_").size() != 0 ? html += "" : html += '<input type="button" value="商品定制" onclick="addActionSonElement(\'' + number + '\', \'spdz\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/* 商品热销*/
	parent.find(".sprx_").size() != 0 ? html += "" : html += '<input type="button" value="商品热销" onclick="addActionSonElement(\'' + number + '\', \'sprx\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:93px; background-position:65px 6px; text-align:left">';

	/* 商品热浏览*/
	parent.find(".sprll_").size() != 0 ? html += "" : html += '<input type="button" value="商品热浏览" onclick="addActionSonElement(\'' + number + '\', \'sprll\', this)" class="mws-ic-16 ic-add mws-button gray" style="width:98px; background-position:75px 6px; text-align:left">';

	/* 给出弹出层 */
	addActionFlag = layer.tips(html, obj, {
		guide : 2,
		closeBtn : [ 0, true ],
		maxWidth : 233,
		style : [ 'background-color:#d7d7d7; color:#fff; padding:7px 26px 7px 10px', '#d7d7d7' ]
	});

}

/** 添加具体功能模块实现 */
function addActionSonElement(number, type, e) {

	content.find(".numberLine_").each(function(key, obj) {
		if ($(obj).val() == number) {

			/* 相隔天数 */
			type == 'xgts' ? $(obj).parent().after(HTMLDay(null, 1)) : "";

			/* 浏览时长*/
			type == 'llsc' ? $(obj).parent().after(HTMLViewTimeLength(null, 1)) : "";

			/* 浏览次数*/
			type == 'llcs' ? $(obj).parent().after(HTMLViewCount(null, 1)) : "";

			/* 浏览间隔*/
			type == 'lljg' ? $(obj).parent().after(HTMLViewSpan(null, 1)) : "";

			/* 购买次数*/
			type == 'gmcs' ? $(obj).parent().after(HTMLBuyCount(null, 1)) : "";

			/* 购买间隔*/
			type == 'gmjg' ? $(obj).parent().after(HTMLBuySpan(null, 1)) : "";

			/* 商品定制*/
			type == 'spdz' ? $(obj).parent().after(HTMLCustom(null, 1)) : "";

			/* 商品热销*/
			type == 'sprx' ? $(obj).parent().after(HTMLTopSale(null, null, 1)) : "";

			/* 商品热浏览*/
			type == 'sprll' ? $(obj).parent().after(HTMLViewBrowse(null, null, 1)) : "";

			/* 当没有选项时 */
			if ($(e).parent().find(".mws-button").size() == 1) {
				close(addActionFlag);
				$(obj).parent().parent().find(".addButton_s").remove();
			}

			/* 删除已点击模块 */
			$(e).fadeOut(150);
			$(e).remove();
		}
	});

}
