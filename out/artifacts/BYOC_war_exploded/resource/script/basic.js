/**
 * 通用方法
 */

$(function() {

	/** 添加鼠标经过提示 */
	initTip();

	/** 初始化点击透明效果 */
	initClickOpacity();
})

/** 初始化点击透明效果 */
function initClickOpacity() {
	$(".opacity").each(function(key, obj) {
		$(obj).click(function() {
			$(obj).attr( {
				"onclick" : "",
				"href" : "javascript:;"
			}).css( {
				"opacity" : 0.4,
				"color" : "#ccc"
			});
		})
	});
}

/** 警告层  */
function confirm(text, url) {
	$.layer( {
		area : [ 'auto', 'auto' ],
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		dialog : {
			msg : text,
			btns : 2,
			type : 4,
			btn : [ '删除', '取消' ],
			yes : function() {
				load("删除中, 请稍后...");
				window.location.href = url
			},
			no : function() {
			}
		}
	});
}

/** 等待层  */
function load(text) {
	return layer.load(text);
}

/** 没有遮罩层 */
function loadNotShade(text) {
	return $.layer( {
		type : 0,
		title : false,
		closeBtn : false,
		border : [ 3, 0.4, '#000' ],
		shade : [ 0 ],
		dialog : {
			type : 16,
			msg : text
		}
	});
}

/** 关闭任何layer */
function close(obj) {
	layer.close(obj);
}

/** 添加鼠标经过提示 */
function initTip() {
	$(".tip").each(function(key, obj) {
		var clicktipout = $(obj).attr("clicktipout"); // 是否点击关闭
			var value = $(obj).attr("tipvalue"); // 需要显示的数值
			$(obj).css("cursor", "pointer"); // 鼠标经过显示手形
			var flag;// 弹出层标识

			/* 值为空, 不处理 */
			if (!isNULL(value)) {

				/* 绑定鼠标经过事件 */
				$(obj).bind("mouseover", function() {
					flag = layer.tips(value, obj, {
						guide : 2,
						style : [ 'background-color:#323232; color:#ebebeb;', '#323232' ],
						maxWidth : 700
					});
				})

				/* 绑定鼠标离开事件 */
				.bind("mouseout", function() {
					layer.close(flag);
				});

				/* 鼠标点击绑定 */
				if (clicktipout == "clicktipout") {
					$(obj).bind("click", function() {
						layer.close(flag);
					});
				}

			}

		});
}

/** Bootstrap模板初始化 */
function initBootstrap() {
	initTip();
	$(".mws-panel.mws-collapsible.mws-collapsed .mws-panel-body").css("display", "none");
	$(".mws-panel.mws-collapsible .mws-panel-header").append("<div class=\"mws-collapse-button mws-inset\"><span></span></div>").find(".mws-collapse-button span").live("click", function(event) {
		$(this).parents(".mws-panel").toggleClass("mws-collapsed").find(".mws-panel-body").slideToggle("fast")
	});
	$("div#mws-user-tools .mws-dropdown-menu a").click(function(event) {
		$(".mws-dropdown-menu.toggled").not($(this).parent()).removeClass("toggled");
		$(this).parent().toggleClass("toggled")
	});
	$('html').click(function(event) {
		if ($(event.target).parents('.mws-dropdown-menu').size() == 0) {
			$(".mws-dropdown-menu").removeClass("toggled")
		}
	});
	$(".mws-nav-tooltip").addClass("mws-inset");
	$("table.mws-table tbody tr:even").addClass("even");
	$("table.mws-table tbody tr:odd").addClass("odd");
	$("table.mws-table thead tr th, .mws-panel-toolbar ul li a, .mws-panel-toolbar ul li a span, .mws-wizard ul li a, .mws-wizard ul li span").each(function() {
	});
	if ($.fn.customFileInput) {
		$("input[type='file']").customFileInput()
	}
	if ($.fn.chosen) {
		$("select.chzn-select").chosen()
	}
	if ($.fn.tipsy) {
		var gravity = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ];
		for ( var i in gravity)
			$(".mws-tooltip-" + gravity[i]).tipsy( {
				gravity : gravity[i]
			});
		$('input[title], select[title], textarea[title]').tipsy( {
			trigger : 'focus',
			gravity : 'w'
		})
	}
	if ($.configureBoxes) {
		$.configureBoxes()
	}
	if ($.fn.placeholder) {
		$('[placeholder]').placeholder()
	}
}

/** ------------------------------------------- 通用基础方法 ---------------------------------------------- */

/** 获取项目名称的URL **/
function getRootPath() {

	/** 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp */
	var curWwwPath = window.document.location.href;

	/** 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp */
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);

	/** 获取主机地址，如： http://localhost:8083 */
	var localhostPaht = curWwwPath.substring(0, pos);

	/** 获取带"/"的项目名，如：/uimcardprj */
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

	/** 返回项目名称 */
	return (localhostPaht + projectName);
}

/** 判断字符串是否为空 , 如果为空返回true, 不为空返回false*/
function isNULL(val) {

	/** 去除字符串空格 */
	val = trim(val);

	if (val == null || val == undefined || val == "") {
		return true;
	}

	return false;
}

/** 去除字符串两端空格 */
function trim (val) {
	
	if (val == null || val == undefined) {
		return val ;
	}
	
	return val.replace(/^(\s*)|(\s*)$/gi, "") ;
}