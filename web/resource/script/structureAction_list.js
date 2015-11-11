/** 所需属性 */
var tid = $("#tid") ; // 租户下拉id
var globalContent = $("#globalContent") ; // 概述表格内容主体id
var button = $("#button") ; // 图标
var setting = $("#setting") ; // 图标
var point = $("#point") ; // 图标
var select = $("#startselect") ; // 图标
var search = $("#button");
var sure = $("#submit_");

$(function() {
	
	/* 初始化数据 */
	orderSearch() ;
	
})

/** 归因查询 */
function orderSearch () {
	
	/* 错误检测 */
	if (tid.val() == null || tid.val() == undefined || tid.val() == "") {
		layer.msg('当前无租户...', 1, 1);
		return ; 
	}
	tid.attr("disabled", true); // 租户选择禁用
	search.attr("disabled", true); // 租户选择禁用
	sure.attr("disabled", true); // 租户选择禁用
	
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
		url:"structureAction_search",
		data:{
			"tenantId":tid.val(), 
			"begin":"2014-01-01",
			"end":"2014-01-01"
		}, 
		success:function (e) {
			var list = e.structureVO ; // 统计
			var numberlist = e.numberList;
			/* 全局概述赋值 */
			globalHTML(list, numberlist);
			
			/* 初始化bootstrap模板 */
			initBootstrap();
			close(layerFlag);//关闭弹出层
			clearInterval(schedule) ;// 关闭时间等待提示
			tid.attr("disabled", false); // 租户选择禁用
			search.attr("disabled", false); // 租户选择禁用
			sure.attr("disabled", false); // 租户选择禁用
		}
	});
}

function save() {
	tid.attr("disabled", true); // 租户选择禁用
	search.attr("disabled", true); // 租户选择禁用
	sure.attr("disabled", true); // 租户选择禁用
	
	/* 弹出层 */
	var layerFlag = loadNotShade("数据加载中, 请稍后...") ;
	var ids = new Array();
	/* 时间等待提示 */
	var index = 1; 
	var schedule = setInterval(function () {
		layerFlag = loadNotShade("数据加载中, 请稍后... " + index ++ + "/s" ) ;
	}, 1000);
	var start = 0;
	$(setting).find(".parent:checked").each(function(key, obj) {
			start = 1;
	})
	$(globalContent).find(".parent:checked").each(function(key, obj) {
			ids.push(parseInt($(obj).attr("id")));
	})
	/* 拼接地址 */
	var url = "";
	for ( var i = 0; i < ids.length; i++) {
		url += ("ids=" + ids[i] + "&");
	}
	
	$.ajax({
		type:"post", 
		dataType:"json" ,
		url:"structureAction_save?"+url,
		data:{
			"tenantId":tid.val(), 
			"point":document.getElementById("point").value,
			"start":start
		}, 
		success:function (e) {
			close(layerFlag);//关闭弹出层
			clearInterval(schedule) ;// 关闭时间等待提示
			tid.attr("disabled", false); // 租户选择禁用
			search.attr("disabled", false); // 租户选择禁用
			sure.attr("disabled", false); // 租户选择禁用
		}
	});
	
}

/* 全局概述赋值 */
function globalHTML (map, number) {
	
	/* 数据 */
	globalContent.html("") ; // 清空元素
	globalContent.append(HTML_globalContent(number, map.index, map.order, map.detail, map.list, map.cart, map.search, map.direct, map.prompt)) ; // 赋值概述列表
	/* 设置 */
	setting.html("");
	setting.append(HTML_setting(map.point, map.start));
	
}

function HTML_setting(point, start){
	var html = '<li>营销点    : ';
	if(point == "-")
		html += "<input type='text' id='point' class='mws-textinput' placeholder=' 请输入营销点'></li>";
	else
		html += "<input type='text' id='point' class='mws-textinput' value='"+point+"'></li>";
	html += '<li>启用人群定向  : ';
	if(start == 1)
		html += "<input type='checkbox' checked='checked' class='checkbox parent' id='startselect'>";
	else
		html += "<input type='checkbox' class='checkbox parent' id='startselect'>";
	html +="</li>";
	return html;
}

function HTML_globalContent(number, indexPage, orderPage, detailPage, listPage, cartPage, searchPage, directPage, promptPage ) {
	var s1, s2, s3, s4, s5, s6, s7, s8;
	if(indexPage == 1)
		s1 = "<input type='checkbox' checked='checked' class='checkbox parent' id='1'>";
	else
		s1 = "<input type='checkbox' class='checkbox parent' id='1'>";
	if(listPage == 1)
		s2 = "<input type='checkbox' checked='checked' class='checkbox parent' id='2'>";
	else
		s2 = "<input type='checkbox' class='checkbox parent' id='2'>";
	if(orderPage == 1)
		s3 = "<input type='checkbox' checked='checked' class='checkbox parent' id='3'>";
	else
		s3 = "<input type='checkbox' class='checkbox parent' id='3'>";
	if(cartPage == 1)
		s4 = "<input type='checkbox' checked='checked' class='checkbox parent' id='4'>";
	else
		s4 = "<input type='checkbox' class='checkbox parent' id='4'>";
	if(detailPage == 1)
		s5 = "<input type='checkbox' checked='checked' class='checkbox parent' id='5'>";
	else
		s5 = "<input type='checkbox' class='checkbox parent' id='5'>";
	if(searchPage == 1)
		s6 = "<input type='checkbox' checked='checked' class='checkbox parent' id='6'>";
	else
		s6 = "<input type='checkbox' class='checkbox parent' id='6'>";
	if(promptPage == 1)
		s7 = "<input type='checkbox' checked='checked' class='checkbox parent' id='7'>";
	else
		s7 = "<input type='checkbox' class='checkbox parent' id='7'>";
	if(directPage == 1)
		s8 = "<input type='checkbox' checked='checked' class='checkbox parent' id='8'>";
	else
		s8 = "<input type='checkbox' class='checkbox parent' id='8'>";
	
	var html = ''+//
	'<tr>' +//
	'	<td>' + "首页" + '</td>' + '	<td>' + number[0] + '</td><td>' + s1 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "列表页" + '</td>' + '	<td>' + number[1] + '</td><td>' + s2 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "订单页" + '</td>' + '	<td>' + number[2] + '</td><td>' + s3 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "购物车页" + '</td>' + '	<td>' + number[3] + '</td><td>' + s4 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "商品页" + '</td>' + '	<td>' + number[4] + '</td><td>' + s5 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "搜索人群" + '</td>' + '	<td>' + number[5] + '</td><td>' + s6 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "推介人群" + '</td>' + '	<td>' + number[6] + '</td><td>' + s7 + "</td>" +
	'</tr>' +//
	'<tr>' +//
	'	<td>' + "直访人群" + '</td>' + '	<td>' + number[7] + '</td><td>' + s8 + "</td>" +
	'</tr>' +//
	''; 
	return html ;
}
