/** 基本字段 */
var sortcontent = $("#sortcontent"); //  排序表格目录ID
var defaultTable = $("#defaulttable");// 默认表格
var sortTable = $("#sorttable"); // 排序表格

$(function() {

	/** 初始化代码 */
	$(sortcontent).sortable();
})

/** 排序提交 */
function sortSubmit() {

	/* 地址拼接 */
	var url = "menuAction_sort?parentId=" + parentId + "&";

	/* 查询所有已排序后的ID */
	sortcontent.find("tr td").each(function(key, obj) {
		url += "ids=" + $(obj).attr("id") + "&";
	});

	/* 地址转发 */
	load("保存中, 请稍后...");
	window.location.href = url;
}

/** 打开排序集 */
function openSort() {
	defaultTable.css("opacity", 1).slideUp(300);
	sortTable.css("opacity", 1).show();
}

/** 关闭排序 */
function closeSort() {
	defaultTable.css("opacity", 1).slideDown(300, function() {
		sortTable.css("opacity", 0).hide();
	});
}