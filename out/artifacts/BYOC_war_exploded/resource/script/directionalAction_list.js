/** 相关属性 */
var domain = $("#domain"); // 行业 
var area = $("#area"); // 区域
var source = $("#source"); //来源
var depth = $("#depth"); //深度
var customer = $("#customer"); //客户
var count = $("#count"); //cookie数量统计
var setting = $("#setting"); //深度
var treeHTML = ""; // 树HTML
var tree = $("#tree");// 树内容目录ID
var timetype = $("#timeId");
var tenant = $("#tenantId"); // 租户下拉列表
var tableContent = $("#tableContent");// 表格htmlid

$(function() {

	/** 加载行业数据 */
	ondomain();

})

/** 显示区域 */
function onarea() {

	/* 显示菜单 */
	showMenu(area, domain);
	hideMenu(source);
	hideMenu(customer);
	hideMenu(depth);
	hideMenu(count);
	hideMenu(setting);
	document.getElementById("totaltime").style.display="none";
	document.getElementById("totaltenant").style.display="";
	document.getElementById("submit_").style.display="";
	/* 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空

	/* 加载区域数据 */
	$.post("directionalAction_findList", {
		"listtype" : "area"
	}, function(e) {

		/* 当前已添加的数据 */
		$.post("directionalAction_findByTid", {
			"dtype" : "area",
			"tid" : tenant.val()
		}, function(ex) {

			/* 已经添加的id */
			var value = ex.directionalAreaList;
			var typeArr = new Array();
			for ( var i = 0; i < value.length; i++) {
				if (value[i].directional != null && value[i].directional != undefined)
					typeArr.push(value[i].directional.id);
			}
			

			/* 循环数据拼接树HTML */
			var list = e.list;
			for ( var i = 0; i < list.length; i++) {
				searchType(list[i], typeArr, 1, 3);
			}

			/* 添加html到树菜单 */
			tree.html(treeHTML);

			/* 启动树 */
			showTree();

			/* 选中的分类默认父类选中 */
			treeShowParent();

			/* 加载当前表格电商的数据 */
			loadCurrentData("area", layerflag);
			document.getElementById("listAddedItem").style.display="none";
		}, "json");
	}, "json");
}

/** 显示行业 */
function ondomain() {

	/** 显示菜单 */
	showMenu(domain, area);
	hideMenu(depth);
	hideMenu(customer);
	hideMenu(source);
	hideMenu(setting);
	hideMenu(count);
	document.getElementById("totaltime").style.display="none";
	document.getElementById("totaltenant").style.display="";
	document.getElementById("submit_").style.display="";
	/** 加载数据 */
	var layerflag = loadNotShade("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空
	$.post("directionalAction_findList", {
		"listtype" : "domain"
	}, function(e) {

		/* 当前已添加的数据 */
		$.post("directionalAction_findByTid", {
			"dtype" : "domain",
			"tid" : tenant.val()
		}, function(ex) {

			/* 已经添加的id */
			var value = ex.directionalDomainList;
			var typeArr = new Array();
			for ( var i = 0; i < value.length; i++) {
				if (value[i].directional != null && value[i].directional != undefined)
					typeArr.push(value[i].directional.id);
			}

			/* 循环数据拼接树HTML */
			var list = e.list;

			for ( var i = 0; i < list.length; i++) {
				searchType(list[i], typeArr, 1, 3);
			}
			/* 添加html到树菜单 */
			tree.html(treeHTML);
			
			/* 启动树 */
			showTree();

			/* 选中的分类默认父类选中 */
			treeShowParent();

			/* 加载当前表格电商的数据 */
			loadCurrentData("domain", layerflag);
			document.getElementById("listAddedItem").style.display="none";
		}, "json");
	}, "json");
}

/** 显示来源 */
function onsource() {
	
	/** 显示菜单 */
	showMenu(source, area);
	/** 隐藏其他菜单 */
	hideMenu(depth);
	hideMenu(customer);
	hideMenu(setting);
	hideMenu(domain);
	hideMenu(count);
	document.getElementById("sidetreecontrol").style.display="none";
	document.getElementById("totaltime").style.display="none";
	document.getElementById("submit_").style.display="";
	document.getElementById("totaltenant").style.display="";

	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空
	$.post("directionalAction_findCustomerProperties", {
		"listtype" : "source",
		"tid" : tenant.val()
	}, function(e) {

			/* 循环数据拼接树HTML */
			var list = e.customerList;
			var desc = ["engineer", "direct", "recommended"];
			var name = ["搜索引擎","直接访问","推荐"];
			for ( var i = 0; i < list.length; i++) {
				if(list[i] == 1)
					treeHTML += "<li><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='" 
						+ i + "'/><label for='" 
						+ desc[i] + "'> " 
						+ name[i]
						+ " </label></li>";
				else 
					treeHTML += "<li><input type='checkbox' class='checkbox parent' onchange='selectModal(this)' id='" 
						+ i + "'/><label for='" 
						+ desc[i] + "'> " 
						+ name[i]
						+ " </label></li>";
			}
			/* 添加html到树菜单 */
			tree.html(treeHTML);
			/* 启动树 */
			showTree();
			/* 隐藏不用的模块 */
			document.getElementById("sidetreecontrol").style.display="none";
			document.getElementById("listAddedItem").style.display="none";
			/* 关闭等待层 */
			close(layerflag);
	}, "json");
}

/** 显示频率和页面数 */
function ondepth() {
	
	/** 显示菜单 */
	showMenu(depth, area);
	/** 隐藏其他菜单 */
	hideMenu(source);
	hideMenu(customer);
	hideMenu(setting);
	hideMenu(domain);
	hideMenu(count);
	document.getElementById("totaltime").style.display="none";
	document.getElementById("sidetreecontrol").style.display="none";
	document.getElementById("submit_").style.display="";
	document.getElementById("totaltenant").style.display="";
	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空
	$.post("directionalAction_findCustomerProperties", {
		"listtype" : "depth",
		"tid" : tenant.val()
	}, function(e) {
			/* 循环数据拼接树HTML */
			var list = e.customerList;
			treeHTML += '<li>访问频次  : ';
			if(list[0] == 0)
				treeHTML += '<input type="text" id="frequency" class="mws-textinput-upper" placeholder=" 请输入数字" tipvalue="输入访问的频次"><br/>';
			else
				treeHTML += '<input type="text" id="frequency" class="mws-textinput-upper" tipvalue="输入访问的频次" value="'+list[0]+'"><br/>';
			treeHTML += '访问页面数: ';
			if(list[1] == 0)
				treeHTML += '<input type="text" id="pagenumber" class="mws-textinput" placeholder=" 请输入数字" tipvalue="输入访问的频次">';
			else
				treeHTML += '<input type="text" id="pagenumber" class="mws-textinput" tipvalue="输入访问页面数" value="'+list[1]+'">';
			treeHTML += '</li>';

			/* 添加html到树菜单 */
			tree.html(treeHTML);

			/* 启动树 */
			showTree();

			/* 隐藏不用的模块 */
			document.getElementById("sidetreecontrol").style.display="none";
			document.getElementById("listAddedItem").style.display="none";
			/* 关闭等待层 */
			close(layerflag);
	}, "json");
}

/** 显示客户属性 */
function oncustomer() {
	
	/** 显示菜单 */
	showMenu(customer, area);
	/** 隐藏其他菜单 */
	hideMenu(depth);
	hideMenu(source);
	hideMenu(domain);
	hideMenu(setting);
	hideMenu(count);
	document.getElementById("totaltime").style.display="none";
	document.getElementById("totaltenant").style.display="";
	document.getElementById("submit_").style.display="";
	document.getElementById("sidetreecontrol").style.display="none";
	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空
	document.getElementById("sidetreecontrol").style.display="none";
	$.post("directionalAction_findCustomerProperties", {
		"listtype" : "customer",
		"tid" : tenant.val()
	}, function(e) {

			/* 循环数据拼接树HTML */
			var list = e.customerList;
			/* 新老客户 */
			if(list[0] == 1)
				treeHTML += "<li><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='" 
						+ "0" + "'/><label for='newcus'> " 
						+ "新客户"
						+ " </label></li>"
			else
				treeHTML += "<li><input type='checkbox' class='checkbox parent' onchange='selectModal(this)' id='" 
						+ "0" + "'/><label for=newcus'> " 
						+ "新客户" 
						+ " </label></li>"
			if(list[1] == 1)
				treeHTML += "<li><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='" 
					+ "1" + "'/><label for='" 
					+ "oldcus" + "'> " 
					+ "老客户"
					+ " </label></li>";
			else
				treeHTML += "<li><input type='checkbox' class='checkbox parent' onchange='selectModal(this)' id='" 
					+ "1" + "'/><label for='" 
					+ "oldcus" + "'> " 
					+ "老客户"
					+ " </label></li>";
			
			/* 是否购买 */
			treeHTML += '<li><label for="5">' + "是否购买" + ':  </label>';
			treeHTML += '<select name="isbargain" id="isbargain">';
			if(list[2] == 1) {
				treeHTML += '<option value="1">是</option>';
				treeHTML += '<option value="0">否</option>';	
			}
			if(list[2] == 0) {
				treeHTML += '<option value="0">否</option>';	
				treeHTML += '<option value="1">是</option>';
			}
			treeHTML += '</select></li>';

			/* 单价 */		
			treeHTML += '<li><label for="5">' + "购买金额" + ':  </label>';
			treeHTML += '<select name="selectBar" id="selectBar">';
			if(list[3] == 1)
				treeHTML += '<option value="1" selected="selected">任意     </option>';
			else
				treeHTML += '<option value="1"">任意     </option>';
			if(list[3] == 2)
				treeHTML += '<option value="2" selected="selected">小于200  </option>';
			else
				treeHTML += '<option value="2">小于200  </option>';
			if(list[3] == 3)
				treeHTML += '<option value="3" selected="selected">200-1000</option>';
			else
				treeHTML += '<option value="3">200-1000</option>';
			if(list[3] == 4)
				treeHTML += '<option value="4" selected="selected">大于1000 </option>';
			else
				treeHTML += '<option value="4">大于1000 </option>';
			treeHTML += '</select></li>';

			/* 添加html到树菜单 */
			tree.html(treeHTML);

			/* 启动树 */
			showTree();

			/* 选中的分类默认父类选中 */
			treeShowParent();
			document.getElementById("sidetreecontrol").style.display="none";
			document.getElementById("listAddedItem").style.display="none";
			/* 关闭等待层 */
			close(layerflag);
	}, "json");
}

/** 显示数量 */
function oncount() {
	/** 显示菜单 */
	showMenu(count, area);
	hideMenu(domain);
	hideMenu(depth);
	hideMenu(customer);
	hideMenu(source);
	hideMenu(setting);
	document.getElementById("totaltenant").style.display="none";
	document.getElementById("totaltime").style.display="";
	document.getElementById("submit_").style.display="none";
	document.getElementById("sidetreecontrol").style.display="";
	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	
	/* 当前已添加的数据 */
		$.post("directionalAction_findList", {
			"listtype" : "count",
			"timetype" : timetype.val()
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
			document.getElementById("listAddedItem").style.display="none";
	}, "json");
}

/** 显示设置 */
function onsetting() {
	
	/** 显示菜单 */
	showMenu(setting, area);
	/** 隐藏其他菜单 */
	hideMenu(source);
	hideMenu(customer);
	hideMenu(domain);
	hideMenu(count);
	hideMenu(depth);
	document.getElementById("totaltime").style.display="none";
	document.getElementById("sidetreecontrol").style.display="none";
	document.getElementById("submit_").style.display="";
	document.getElementById("totaltenant").style.display="";
	/** 加载数据 */
	var layerflag = load("数据加载中, 请稍后...");
	tree.html(""); // 树目录清空
	treeHTML = ""; // 树HTML清空
	tableContent.html("");// 表格清空
	$.post("directionalAction_findList", {
		"listtype" : "setting",
		"tid" : tenant.val()
	}, function(e) {
			/* 循环数据拼接树HTML */
			var list = e.settingList;
			treeHTML += '<li>营销点   : ';
			if(list[0] == "-") {
				treeHTML += '<input type="text" id="settingtext" class="mws-textinput-upper" placeholder=" 请输入营销点" tipvalue="输入营销点（一串数字）"><br/>';
				treeHTML += "<li><input type='checkbox' class='checkbox parent' onchange='selectModal(this)' id='settingselect'/><label for='settingselect'>启用人群定向" 
							+ " </label></li>";
			}
			else {
				treeHTML += '<input type="text" id="settingtext" class="mws-textinput-upper" tipvalue="营销点（一串数字）" value="'+list[0]+'"><br/>';

				if(list[1] == "1")
						treeHTML += "<li><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='settingselect' /><label for='settingselect'>启用人群定向"
							+ " </label></li>";
				else 
						treeHTML += "<li><input type='checkbox' class='checkbox parent' onchange='selectModal(this)' id='settingselect'/><label for='settingselect'>启用人群定向 "
							+ " </label></li>";
			}
			treeHTML += '</li>';

			/* 添加html到树菜单 */
			tree.html(treeHTML);

			/* 启动树 */
			showTree();

			/* 隐藏不用的模块 */
			document.getElementById("sidetreecontrol").style.display="none";
			document.getElementById("listAddedItem").style.display="none";
			/* 关闭等待层 */
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

/** 加载条目成下拉框 */
function selectBar(alist,pos) {
	treeHTML += '<li><label for="1">' + alist[pos].desc + ':  </label>';
	treeHTML += '<select name="selectBar" id="selectBar">';
	for ( var i = pos+1; i < alist.length; i++) {
		if(alist[i].value != 0)
			treeHTML += '<option value="' + (0-alist[i].value) +'">' + alist[i].desc +'</option>';
	}
	treeHTML += '</select></li>';
}

/** 加载当前电商的数据 */
function loadCurrentData(dtype, layerflag) {

	/* 清空数据 */
	tableContent.html("");

	/* 查询添加 */
	$.post("directionalAction_findByTid", {
		"dtype" : dtype,
		"tid" : tenant.val()
	}, function(e) {

		/* 数据集 */
		var value = "";
		if ("domain" == dtype) {
			value = e.directionalDomainList;
		} else if ("area" == dtype) {
			value = e.directionalAreaList;
		} else if ("source" == dtype) {
			value = e.directionalSourceList;
		} else if ("depth" == dtype) {
			value = e.directionalDepthList;
		} else if ("customer" == dtype) {
			value = e.directionalCustomerList;
		}

		/* 循环数据添加 */
		for ( var i = 0; i < value.length; i++) {

			/* 父类名称 */
			if (value[i].directional != null && value[i].directional != undefined) {
				var parentName = '';
				if (value[i].directional.parent == null || value[i].directional.parent == undefined) {
					parentName = '—';
				} else {
					parentName = value[i].directional.parent.name;
				}
				tableContent.append(HTML_TABLE(i + 1, value[i].directional.name, parentName));
			}
		}

		/* 关闭等待层 */
		close(layerflag);
	}, "json");

}

/** HTML表格信息 */
function HTML_TABLE(index, name, parentname) {
	html = ' <tr>';
	html += '	<td style="width:26px;" >' + index + '</td>';
	html += '	<td>' + name + ' </td>';
	html += '	<td><em>' + parentname + '</em></td>';
	html += '</tr>';
	return html;
}

/** 保存树 */
function saveTree() {

	/* 选择id数组 */
	var ids = new Array();

	/* 获取租户id */
	var tid = tenant.val();

	/* 人群定向分类 */
	var dtype = "";
	if ("tab" == area.attr("class")) {
		dtype = "area";
	} else if ("tab" == domain.attr("class")) {
		dtype = "domain";
	} else if ("tab" == source.attr("class")) {
		dtype = "source";
	} else if ("tab" == depth.attr("class")) {
		dtype = "depth";
	} else if ("tab" == customer.attr("class")) {
		dtype = "customer";
	} else if ("tab" == setting.attr("class")) {
		dtype = "setting";
	} 

	if(dtype == "area" || dtype == "domain" || dtype == "source") {
		/* 循环所有已经选中的分类 */
		$(tree).find(".parent:checked").each(function(key, obj) {
			ids.push(parseInt($(obj).attr("id")));
		})

		/* 拼接地址 */
		var url = "";
		for ( var i = 0; i < ids.length; i++) {
			url += ("ids=" + ids[i] + "&");
		}
	
		/* 异步保存 */
		var layerflag = load("数据保存中, 请稍后...")
		$.post("directionalAction_save?" + url, {
			"tid" : tid,
			"dtype" : dtype
		}, function(e) {
			if(dtype == "source")
							/* 关闭等待层 */
				close(layerflag);
			else
				/* 重新加载表格数据 */	
				loadCurrentData(dtype, layerflag);
		}, "json");
	} 
	else if(dtype == "depth") {
		if(isNaN(document.getElementById("frequency").value)) {
			alert("访问的频次请输入数字");
			return;
		}
		if(isNaN(document.getElementById("pagenumber").value)) {
			alert("访问页面数请输入数字");
			return;
		}
		/* 异步保存 */
		var layerflag = load("数据保存中, 请稍后...")
		var url ="";
		url += ("ids=" + document.getElementById("frequency").value + "&");
		url += ("ids=" + document.getElementById("pagenumber").value + "&");
		$.post("directionalAction_save?" + url, {
			"tid" : tid,
			"dtype" : dtype
		}, function(e) {
			/* 关闭等待层 */
			close(layerflag);
		}, "json");
	} 
	else if(dtype == "customer"){
		/* 异步保存 */
		var layerflag = load("数据保存中, 请稍后...")
		/* 循环所有已经选中的分类 */
		$(tree).find(".parent:checked").each(function(key, obj) {
			ids.push(parseInt($(obj).attr("id")));
		})
		
		/* 拼接地址 */
		var url = "";
		for ( var i = 0; i < ids.length; i++) {
			url += ("ids=" + ids[i] + "&");
		}

		url += ("ids=" + document.getElementById("isbargain").value + "&");
		url += ("ids=" + document.getElementById("selectBar").value + "&");
		
		$.post("directionalAction_save?" + url, {
			"tid" : tid,
			"dtype" : dtype
		}, function(e) {
			/* 关闭等待层 */
			close(layerflag);
		}, "json");
	}
	else if(dtype == "setting") {
		var text = document.getElementById("settingtext").value;
		var t = "-1";
		var url = "";
		if(isNaN(text)) {
			alert("营销点请输入数字");
			return;
		}
		if(text=="") {
			t = "-1";
		} else {
			t = parseInt(text);
		}
		url += ("ids=" + t + "&");
		/* 循环所有已经选中的分类 */

		$(tree).find(".parent:checked").each(function(key, obj) {
			url += ("ids=" + parseInt("1") + "&");
		})
		/* 异步保存 */
		var layerflag = load("数据保存中, 请稍后...")
		$.post("directionalAction_save?" + url, {
			"tid" : tid,
			"dtype" : dtype
		}, function(e) {
			/* 关闭等待层 */
			close(layerflag);
		}, "json");
	} 
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

/** 递归出所有分类 */
function searchType(obj, arr, type, flag) {

	if(type == 1) {
		/* 顶级 */
		if (obj.children.length == 0) {
	
			/* 默认选中 */
			if (arr.indexOf(obj.id) != -1) {
				treeHTML += "<li ><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label></li>";
			} else {
				treeHTML += "<li ><input type='checkbox'                   class='checkbox parent' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label></li>";
			}
		}
	
		/* 有子类 */
		else {
			treeHTML += "<li><input type='checkbox' class='checkbox' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label>";
			treeHTML += "<ul>";
			for ( var i = 0; i < obj.children.length; i++) {
				if (i == (obj.children.length -1))
					searchType(obj.children[i], arr, 1, flag);
				else {
					if (obj.children[i].children.length != 0)
						searchType(obj.children[i], arr, 1, flag);
					else if (obj.children[i+1].children.length != 0)
						searchType(obj.children[i], arr, 1, flag);
					else if((i+1)%flag==0)
						searchType(obj.children[i], arr, 1, flag);
					else
						searchType(obj.children[i], arr, 2, flag);
				}
			}
			treeHTML += "</ul>";
			treeHTML += "</li>";
		}
	} else {
		/* 顶级 */
		if (obj.children.length == 0) {
	
			/* 默认选中 */
			if (arr.indexOf(obj.id) != -1) {
				treeHTML += "<li><input type='checkbox' checked='checked' class='checkbox parent' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label></li>";
			} else {
				treeHTML += "<li><input type='checkbox'                   class='checkbox parent' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label></li>";
			}
		}
	
		/* 有子类 */
		else {
			treeHTML += "<li><input type='checkbox' class='checkbox' onchange='selectModal(this)' id='" + obj.id + "'/><label for='" + obj.id + "'> " + obj.name +" " + obj.count + " </label>";
			treeHTML += "<ul>";
			for ( var i = 0; i < obj.children.length; i++) {
				if (i == (obj.children.length -1))
					searchType(obj.children[i], arr, 1, flag);
				else {
					if (obj.children[i].children.length != 0)
						searchType(obj.children[i], arr, 1, flag);
					else if (obj.children[i+1].children.length != 0)
						searchType(obj.children[i], arr, 1, flag);
					else if((i+1)%flag==0)
						searchType(obj.children[i], arr, 1, flag);
					else
						searchType(obj.children[i], arr, 2, flag);
				}
			}
			treeHTML += "</ul>";
			treeHTML += "</li>";
		}
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

/** 显示domain菜单样式 */
function showMenu(obj, hide) {
	obj.addClass("tab").css("color", "#333");
	hide.removeClass("tab").removeAttr("style");
}

function hideMenu(hide) {
	hide.removeClass("tab").removeAttr("style");
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
