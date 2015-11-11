/** 打开修改操作员密码弹出层 */
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
			src : 'operatorAction_editPasswordUI?id=' + id,
			scrolling : 'no'
		}
	});
}

/** 打开添加租户弹出层 */
function openAddTenant(text, id) {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : text,
		offset : [ '', '' ],
		area : [ '1000px', '546px' ],
		iframe : {
			src : 'operatorAction_addTenantUI?id=' + id,
			scrolling : 'yes'
		},
		end: function(){
			window.location.reload();
		}
	});
}