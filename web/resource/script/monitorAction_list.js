/** 相关参数 */
var tenantId = $("#tenantId"); // 租户下拉菜单 
var content = $("#content"); // 表格内容

$(function() {

	/* 加载数据 */
	initData();

})

/** 获取当前选择的租户id */
function initData() {

	/* 当前选择id */
	var tid = tenantId.val();

	/* 异步获取数据 */
	$.post("monitorAction_data", {
		"tid" : tid
	}, function(e) {

		/*  结果集 */
		var value = e.monitorList;

		/* 循环结果集 */
		content.html("");
		for ( var i = 0; i < value.length; i++) {
			var val = value[i];
			content.append(HTML(i + 1, val.mkey, val.mvalue, val.tid, val.id));
		}

		/* 初始化模板 */
		initBootstrap();

	}, "json");

}

/** 表格HTML */
function HTML(i, key, value, tid, id) {
	var html = '';
	html += '<tr>';
	html += '	<td style="width: 26px;" >' + i + '</td>';
	html += '	<td>' + key + '</td>';
	html += '	<td>' + value + '</td>';
	html += '	<td style="padding:0 5px; line-height: 20px; width: 80px; " >';
	html += '		<input type="button" onclick="editObj  (' + id + ')" tipvalue="删除" value="　" class="tip mws-button gray mws-ic-16 ic-edit " style="background-position:7px 6px" />';
	html += '		<input type="button" onclick="deleteObj(' + id + ', ' + tid + ')" tipvalue="编辑" value="　" class="tip mws-button red mws-ic-16 ic-cross" style="background-position:7px 6px"  />';
	html += '	</td>';
	html += '</tr>';
	return html;
}

/** 保存一个对象 */
function addObj(tid) {
	openLayer("添加", 'monitorAction_addUI?tid=' + tid);
}

/** 编辑 */
function editObj(id) {
	openLayer("编辑", 'monitorAction_editUI?id=' + id);
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
		area : [ '500px', '207px' ],
		iframe : {
			src : src,
			scrolling : 'no'
		},
		end : function() {
			
			/* 重新加载数据 */
			initData();
		}
	});
}

/** 删除该对象 */
function deleteObj(id, tid) {
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
				$.post("monitorAction_delete", {
					"id" : id
				}, function(e) {

					/* 删除完成重新加载数据 */
					initData();
					layer.close(flah);
				});
			},
			no : function() {
			}
		}
	});
}