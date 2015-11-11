var $tree = $("#tree"); // 树菜单ID
var $role = $("#role");// 角色ID

$(function() {

	/*  初始化菜单树*/
	$($tree).treeview( {
		animated : "fast"
	});
})

/** 动态勾选 */
function autoCheck(obj) {

	/* 点击当前父类父类默认选中 */
	if (obj.checked) {
		$(obj).parent().parent().prev().prev().attr("checked", true);
	}

	/* 子类复选框跟随当前复选框状态 */
	$(obj).parent().find("ul li :checkbox").attr("checked", obj.checked);

	/* 检测兄弟节点是否被点击, 兄弟节点都被点击, 父类节点也将选中 */
	var subTop = true;
	if (obj.checked) {
		$(obj).parent().siblings().find(":checkbox").each(function(key, e) {
			if (!e.checked) {
				subTop = false;
			}
		});
		if (subTop) {
			$(obj).parent().parent().prev().prev().attr("checked", true);
		}
	}

	/* 检测兄弟节点是否被点击, 兄弟节点都没有被点击, 父类节点也将取消选中 */
	var subDown = true;
	if (!obj.checked) {
		$(obj).parent().siblings().find(":checkbox").each(function(key, e) {
			if (e.checked) {
				subDown = false;
			}
		});
		if (subDown) {
			$(obj).parent().parent().prev().prev().attr("checked", false);
		}
	}

}

/** 菜单保存 */
function saveTree() {

	/*  跳转地址*/
	var url = "privilegeAction_save?";

	/* 获取角色id */
	var roleId = $role.val();

	/* 查询有被选中的菜单 */
	$tree.find(":checkbox:checked").each(function(key, obj) {
		url += "menuId=" + $(obj).attr("id") + "&";
	});

	/* 拼接角色id */
	url += "roleId=" + roleId;

	/* 等待框 */
	load("加载中, 请稍后...");

	/* 地址跳转 */
	window.location.href = url;
}