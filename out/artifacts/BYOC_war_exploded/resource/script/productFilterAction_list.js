/** 相关参数 */
var tenantSelect = $("#tenantId"); // 租户下拉菜单 
var filedSelect = $("#fileds"); // 商品过滤字段下拉单
var subSearchButton = $("#subSearchButton") ; // 查询按钮
var content = $("#content"); // 表格内容

$(function() {

	/* 加载数据 */
	subSearch();

})

/** 获取当前选择的租户id */
function subSearch() {

	/* 获取属性 */
	var tid = tenantSelect.val(); // 电商id 
	var filed = filedSelect.val(); // 商品过滤字段

	/* 错误检测 */
	if (tid == null || tid == undefined || tid == "") {
		layer.msg('当前无租户...', 1, 1);
		return;
	}

	/* 弹出层 */
	var flag = loadNotShade("数据加载中, 请稍后...");
	tenantSelect.attr("disabled", true); // 租户选择禁用
	filedSelect.attr("disabled", true); // 时间选择禁用
	subSearchButton.attr("disabled", true); // 提交按钮禁用

	/* 弹出层读秒 */
	var index = 2;
	var calcS = setInterval(function() {
		flag = loadNotShade("数据加载中, 请稍后... " + index++ + "/s");
	}, 1000);

	/* 查询时间时间区间 */
	$.ajax( {
		type : "post",
		dataType : "json",
		url : "productFilterAction_data",
		data : {
			"tid" : tid,
			"filed" : filed
		},
		success : function(e) {
			
				content.html(""); // 情况元素
				for ( var i = 0; i < e.productFilterList.length; i++) {
					var result = e.productFilterList[i];
					content.append(HTML(i, result.filed, result.symbol, result.bwData, result.tid, result.id)); // 添加元素
				}

				/* 完成操作 */
				layer.close(flag); // 关闭等待层
				clearInterval(calcS); // 清空读秒
				initBootstrap();// 初始化表格
				tenantSelect.attr("disabled", false); // 租户下来菜单启用
				filedSelect.attr("disabled", false); // 时间下来菜单启动
				subSearchButton.attr("disabled", false); // 查询按钮启用
		
		}
	});

}

/** 表格HTML */
function HTML(i, filed, symbol, bw, tid, id) {
	var html = '';
	html += '<tr>';
	html += '	<td style="width: 26px;" >' + i + '</td>';
	html += '	<td>' + filed + '</td>';
	html += '	<td>' + symbol + '</td>';
	html += '	<td>' + bw + '</td>';
	html += '	<td style="padding:0 5px; line-height: 20px; width: 80px; " >';
	html += '		<input type="button" onclick="editObj  (' + id + ')" tipvalue="编辑" value="　" class="tip mws-button gray mws-ic-16 ic-edit " style="background-position:7px 6px" />';
	html += '		<input type="button" onclick="deleteObj(' + id + ')" tipvalue="删除" value="　" class="tip mws-button red mws-ic-16 ic-cross" style="background-position:7px 6px"  />';
	html += '	</td>';
	html += '</tr>';
	return html;
}

/** 保存一个对象 */
function addObj(tid) {
	openLayer("添加", 'productFilterAction_addUI?tid=' + tid);
}

/** 编辑 */
function editObj(id) {
	openLayer("编辑", 'productFilterAction_editUI?id=' + id);
}

/** 弹出层 */
function openLayer(text, src) {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : text,
		offset : [ '', '' ],
		area : [ '500px', '248px' ],
		iframe : {
			src : src,
			scrolling : 'no'
		},
		end : function() {
			
			/* 重新加载数据 */
			subSearch();
		}
	});
}

/** 删除该对象 */
function deleteObj(id) {
	var flah = $.layer( {
		area : [ 'auto', 'auto' ],
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		dialog : {
			msg : "您确定要删除吗?",
			btns : 2,
			type : 4,
			btn : [ '删除', '取消' ],
			yes : function() {
				$.post("productFilterAction_delete", {
					"id" : id
				}, function(e) {

					/* 删除完成重新加载数据 */
					subSearch();
					layer.close(flah);
				});
			},
			no : function() {
			}
		}
	});
}