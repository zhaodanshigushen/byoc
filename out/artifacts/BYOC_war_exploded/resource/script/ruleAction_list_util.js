/** HTML序号 */
function HTMLNumber(element) {
	var number = $(element).find(".number").size() + 1;
	var html = '' + //
			'<div class="mws-dualbox-filter" style="float: left; margin-right: 4px;" >		' + //
			'	<label for="box1Filter">		' + //
			'		<input onclick="removeLine(this)" type="button" clicktipout="clicktipout" tipvalue="移除该条规则" class="tip mws-button red mws-ic-16 ic-cross" style="width:30px; text-align:left; background-position:6px 6px;" />		' + //
			'	</label>						' + //
			'	<input type="hidden" value="' + number + '" class="numberLine_ mws-button gray number " style="width:30px; color:#666  " disabled="disabled" />		' + //
			'</div>								';
	return html;
}

/** 相隔天数 */
function HTMLDay(echoDay, style) {
	var day = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	var optionHTML = substringHTML(day, echoDay, "天");
	var html = '' + //
			'<div class="xgts_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >' + //
			'	<label for="box1Filter">				' + //
			'		<input type="button" onclick="removeSon(this)" value="相隔天数" clicktipout="clicktipout" tipvalue="移除相隔天数" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + ' " />' + //
			'	</label>								' + //
			'	<select class="day" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' ">' + //
			'	' + optionHTML + //
			'	</select>								' + //
			'</div>										';
	return html;
}

/**  浏览时长 */
function HTMLViewTimeLength(viewTimeLength, style) {
	var arr = [ "1", "5", "15", "30", "45", "60" ];
	var optionHTML = substringHTML(arr, viewTimeLength, "/s+");
	var html = '' + //
			'<div class="llsc_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">					' + //
			'		<input type="button" onclick="removeSon(this)" value="浏览时长" clicktipout="clicktipout" tipvalue="移除浏览时长" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px;  ' + (style == 1 ? "border:1px dashed white" : "") + ' " />						' + //
			'	</label>									' + //
			'	<select class="viewTimeLength" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' ">							' + //
			'	' + optionHTML + //
			'	</select>									' + //
			'</div>											';
	return html;
}

/** 浏览次数 */
function HTMLViewCount(viewCount, style) {
	var option = [ "1", "5", "10", "15", "20", "25", "30" ];
	var optionHTML = substringHTML(option, viewCount, "/次+");
	var html = '' + //
			'<div class="llcs_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">						' + //
			'		<input type="button" onclick="removeSon(this)" value="浏览次数" clicktipout="clicktipout" tipvalue="移除浏览次数" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + ' " />								' + //
			'	</label>										' + //
			'	<select class="viewCount" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'		' + optionHTML + //
			'	</select>										' + //
			'</div>												';
	return html;
}

/** 浏览间隔 */
function HTMLViewSpan(viewSpan, style) {
	var arr = [
	//
			[ 1, "1/s+" ], //
			[ 3600, "1/H+" ], //
			[ 43200, "12/H+" ], //
			[ 86400, "24/H+" ], //
			[ 172800, "48/H+" ], //
			[ 259200, "72/H+" ], //
	];
	var option = substringHTMLNews(arr, viewSpan)
	var html = '' + //
			'<div class="lljg_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >' + //
			'	<label for="box1Filter">' + //
			'		<input type="button" onclick="removeSon(this)" value="浏览间隔" clicktipout="clicktipout" tipvalue="移除浏览间隔" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + ' " />' + //
			'	</label>' + //
			'	<select class="viewSpan" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >	' + //
			'		' + option + //
			'	</select>' + //
			'</div>';
	return html;
}

/** 购买次数 */
function HTMLBuyCount(buyCount, style) {
	var arr = [ "1", "5", "10", "15", "20", "30" ];
	var option = substringHTML(arr, buyCount, "/次+");
	var html = '' + // 
			'<div class="gmcs_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">										' + //
			'		<input type="button" onclick="removeSon(this)" value="购买次数" clicktipout="clicktipout" tipvalue="移除购买次数" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + '" />						' + //
			'	</label>														' + //
			'	<select class="buyCount" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >								' + //
			'' + option + //
			'	</select>														' + //
			'</div>																';
	return html;
}

/** 购买间隔 */
function HTMLBuySpan(buySpan, style) {
	var arr = [
	//
			[ 1, "1/s+" ],//
			[ 86400, "1/D+" ],//
			[ 604800, "7/D+" ],//
			[ 1209600, "14/D+" ],//
			[ 2592000, "30/D+" ], //
	];
	var option = substringHTMLNews(arr, buySpan);
	var html = '' + '																			' + //
			'<div class="gmjg_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">										' + //
			'		<input type="button" onclick="removeSon(this)" value="购买间隔" clicktipout="clicktipout" tipvalue="移除购买间隔" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + ' " />						' + //
			'	</label>														' + //
			'	<select class="buySpan" style="padding-left:6px; width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'	' + option + //
			'	</select>														' + //
			'</div>																';
	return html;
}

/** 定制 */
function HTMLCustom(customCount, style) {
	var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	var optionHTML = substringHTML(arr, customCount, "");
	var html = '' + //
			'<div class="spdz_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">											' + //
			'		<input type="button" onclick="removeSon(this)" value="商品定制" tipvalue="移除商品定制" class="tip mws-button red mws-ic-16 ic-delete" style="width:71px; text-align:left; background-position:660px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + ' " />						' + //
			'	</label>															' + //
			'	<select class="custom" style="width:71px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + '"   >							' + //
			'	' + optionHTML + //
			'	</select>															' + //
			'</div>																	';
	return html;
}

/** 热浏览 */
function HTMLViewBrowse(number, type, style) {

	/* 全局还是同类 */
	var optionHTML_qjtl = "";
	if (type == 1) {
		optionHTML_qjtl = '<option value="1" selected="selected" >全局</option><option value="2" >同类</option>';
	} else {
		optionHTML_qjtl = '<option value="1" >全局</option><option value="2" selected="selected" >同类</option>';
	}

	/* 热浏览前几名 */
	var optionHTML_topbumber = '';
	var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] == number) {
			optionHTML_topbumber += '<option value="' + arr[i] + '" selected="selected" >前 ' + arr[i] + '</option>';
		} else {
			optionHTML_topbumber += '<option value="' + arr[i] + '" >前 ' + arr[i] + '</option>';
		}
	}

	/* HTML */
	var html = '' + // 
			'<div class="sprll_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">						' + //
			'		<input type="button" onclick="removeSon(this)" value="商品热浏览" tipvalue="移除商品热浏览" class="tip mws-button red mws-ic-16 ic-delete" style="width:132px; background-position:1000px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + '" />						' + //
			'	</label>										' + //
			'	<select class="view_number" style="width:63px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'		' + optionHTML_topbumber + //
			'	</select>										' + //
			'	<select class="view_qjOrTl" style="width:65px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'		' + optionHTML_qjtl + //
			'	</select>										' + //
			'</div>												';
	return html;
}

/** 商品热销 */
function HTMLTopSale(sale_number, sale_qjORtl, style) {

	/* 全局还是同类 */
	var optionHTML_qjtl = "";
	if (sale_qjORtl == 1) {
		optionHTML_qjtl = '<option value="1" selected="selected" >全局</option><option value="2" >同类</option>';
	} else {
		optionHTML_qjtl = '<option value="1" >全局</option><option value="2" selected="selected" >同类</option>';
	}

	/* 热销前几名 */
	var optionHTML_topbumber = '';
	var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] == sale_number) {
			optionHTML_topbumber += '<option value="' + arr[i] + '" selected="selected" >前 ' + arr[i] + '</option>';
		} else {
			optionHTML_topbumber += '<option value="' + arr[i] + '" >前 ' + arr[i] + '</option>';
		}
	}

	/* HTML */
	var html = '' + // 
			'<div class="sprx_ mws-dualbox-filter " style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">						' + //
			'		<input type="button" onclick="removeSon(this)" value="商 品 热 销" tipvalue="移除商品热销" class="tip mws-button red mws-ic-16 ic-delete" style="width:132px; background-position:1000px 6px; ' + (style == 1 ? "border:1px dashed white" : "") + '" />						' + //
			'	</label>										' + //
			'	<select class="sale_number" style="width:63px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'		' + optionHTML_topbumber + //
			'	</select>										' + //
			'	<select class="sale_qjOrTl" style="width:65px; margin-top:2px; margin-left:2px; height:31px; text-align:center; ' + (style == 1 ? "border:1px dashed gray" : "") + ' "   >							' + //
			'		' + optionHTML_qjtl + //
			'	</select>										' + //
			'</div>												';
	return html;
}

/** 权重 */
function HTMLWeight(weight) {
	var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	var optionHTML = substringHTML(arr, weight, "");
	var html = '' + // 
			'<div class="mws-dualbox-filter weightDIV" style="float: left; margin-right: 4px;" >								' + //
			'	<label for="box1Filter">							' + //
			'		<input type="button" value="权重" class="mws-button gray" style="width:46px;" disabled="disabled" />						' + //
			'	</label>											' + //
			'	<select class="weight" style="padding-left:6px; width:46px; margin-top:2px; margin-left:2px; height:31px;"   >							' + //
			'' + optionHTML + //
			'	</select>											' + //
			'</div>	';
	return html;
}

/** 功能模块html */
function HTMLActionSon() {
	return '<input type="button" value="" onclick="addActionSon(this)" class="addButton_s mws-ic-16 ic-add mws-button gray" style="width:46px; background-position:14px 6px">';
}

/* ---------------------------------------------------------------------------------------------------------- */

/** 给出数组, 比对的数值, 如果数组包含比对的数值, 那么拼接下拉菜单选中HTML元素, 否则返回正常HTML元素 */
function substringHTML(arr, val, text) {
	var optionHTML = '';
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] == val)
			optionHTML += '<option value="' + arr[i] + '" selected="selected" >' + arr[i] + text + '</option>';
		else
			optionHTML += '<option value="' + arr[i] + '" >' + arr[i] + text + '</option>';
	}
	return optionHTML;
}

/** 拼接optionHTML菜单选项 */
function substringHTMLNews(arr, val) {
	var option = '';
	for ( var i = 0; i < arr.length; i++) {
		if (val == arr[i][0])
			option += '<option value="' + arr[i][0] + '" selected="selected" >' + arr[i][1] + '</option>';
		else
			option += '<option value="' + arr[i][0] + '">' + arr[i][1] + '</option>';
	}
	return option;
}

/** 检测数字, 如果为null或者undefined返回-1 */
function checkNumber(number) {
	if (number == null || number == undefined)
		return -1;
	else
		return number;
}
