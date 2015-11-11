/** 相关属性 */
var count = $("#count"); //cookie数量统计
var treeHTML = ""; // 树HTML
var tree = $("#tree");// 树内容目录ID
var tenant = $("#tenantId"); // 租户下拉列表

$(function() {

	/** 加载行业数据 */
	oncount();

})

/** 显示数量 */
function oncount() {
	/** 显示菜单 */
	count.addClass("tab").css("color", "#333");
	document.getElementById("sidetreecontrol").style.display="";
	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	
	/* 当前已添加的数据 */
		$.post("vlionClassify_findList", {
			"listtype" : "count",
		}, function(e) {

			/* 循环数据拼接树HTML */
			var list = e.list;

			for ( var i = 0; i < list.length; i++) {
				domainCount(list[i]);
			}
			/* 添加html到树菜单 */
			tree.html(treeHTML);
			
			/* 启动树 */
			showTree();

			/* 加载当前表格电商的数据 */
			close(layerflag);
	}, "json");
}

/* 选中的分类默认父类选中 */
function treeShowParent() {
	/* 父类递归选中 */
	tree.find(".checkbox:checked").each(function(key, obj) {
		selectModalParentShow(obj);
	})

	/* 没有选择的关闭 */
	tree.find(".checkbox:not(:checked)").each(function(key, obj) {

		/* 有子类(隐藏) */
		if ($(obj).parent().find("ul").size() > 0) {
			$(obj).parent().removeClass().addClass("expandable").addClass("lastExpandable");
			$($(obj).parent().find("div")[0]).removeClass().addClass("hitarea").addClass("expandable-hitarea").addClass("lastExpandable-hitarea");
			$(obj).parent().find("ul").hide();
		}

	})
}

/** 行业和cookie数量的递归展示 */
function domainCount(obj) {
		/* 顶级 */
		if (obj.children.length == 0) {
			treeHTML += "<li ><input type='checkbox' class='checkbox parent' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name  +" " + obj.count + " </label></li>";
		}
	
		/* 有子类 */
		else {
			treeHTML += "<li><input type='checkbox' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name + " " +obj.count + " </label>";
			treeHTML += "<ul>";
			for ( var i = 0; i < obj.children.length; i++) {
				domainCount(obj.children[i]);
			}
			treeHTML += "</ul>";
			treeHTML += "</li>";
		}
} 

/** 动态选择 */
function selectModal(obj) {

	/** 点击时, 父类状态=子类状态 */
	$(obj).parent().find(".checkbox").each(function(key, children) {
		$(children).attr("checked", obj.checked);
	});

	/** 点击时, 父类状态默认选中 */
	selectModalParentShow(obj);

	/** 点击取消的时候, 兄弟节点检测 */
	if (!obj.checked) {
		selectModalParentHide(obj);
	}
}

/** 动态取消父节点递归 */
function selectModalParentHide(obj) {

	/* 是否取消分类 */
	var siblingsFlag = true;

	/* 循环兄弟节点 */
	$(obj).parent().siblings().each(function(key, li) {

		/* 当先兄弟节点的选择状态 */
		if ($(li).children(".checkbox")[0].checked) {
			siblingsFlag = false;
		}
	})

	/* 取消父菜单选择 */
	if (siblingsFlag) {

		/* 父级分类 */
		var parent = $(obj).parent().parent().prev().prev();

		/* 父类取消选中赋值 */
		parent.attr("checked", false);

		/* 获取父类的父类 */
		var parent_parent = parent.parent().parent().prev().prev().attr("id");

		/* 递归 */
		if (parent_parent != null && parent_parent != undefined && parent_parent != "") {
			selectModalParentHide(parent);
		}

	}
}

/** 动态选择父节点递归 */
function selectModalParentShow(obj) {

	/* 获取父类 */
	var parent = $(obj).parent().parent().prev().prev();

	/* 父类默认选中赋值 */
	parent.attr("checked", true);

	/* 获取父类的父类 */
	var parent_parent = parent.parent().parent().prev().prev().attr("id");

	/* 递归 */
	if (parent_parent != null && parent_parent != undefined && parent_parent != "") {
		selectModalParentShow(parent);
	}

}

/** 显示属性菜单 */
function showTree() {
	$(tree).treeview( {
		collapsed : false,
		animated : "fast",
		control : "#sidetreecontrol",
		persist : "location"
	});
}
