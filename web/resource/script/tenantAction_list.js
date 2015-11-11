/** 打开修改租户密码弹出层 */
function openEditPassword(text, id) {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : text,
		offset : [ '', '' ],
		area : [ '500px', '246px' ],
		iframe : {
			src : 'tenantAction_editPasswordUI?id=' + id,
			scrolling : 'no'
		}
	});
}

/** 添加可查看租户 */
function openAddTenant(text, id) {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : '增加 ' + text + ' 可查看的租户',
		offset : [ '', '' ],
		area : [ '1013px', '650px' ],
		iframe : {
			src : 'tenantlistAction_list?tenantId=' + id
		}
	});
}