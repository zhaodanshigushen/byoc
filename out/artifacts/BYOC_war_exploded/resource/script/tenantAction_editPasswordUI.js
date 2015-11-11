
/* 所需属性 */
var passwordFlag = false ; // 密码验证
var repasswordFlag = false ;  //  重复密码验证

$(function (){
	
	/* 默认焦点 */
	$("#password").focus();
	
	/* 密码输入验证 */
	$("#password").keyup(function (){
		/* 检测用户由下向上输入 */
		if (!isNULL($("#repassword").val())) {
			if ($(this).val() != $("#repassword").val()) {
				$("#repassword").next().html(HTML_ICON_ERROR());
				repasswordFlag = false ;
			} else {
				$("#repassword").next().html(HTML_ICON_OK());
				repasswordFlag = true ;
			}
		} 
		
		/* 正常检测, 只要输入便正确 */
		if (isNULL($(this).val())) {
			$(this).next().html(HTML_ICON_ERROR());
			passwordFlag = false ;
		} else {
			$(this).next().html(HTML_ICON_OK());
			passwordFlag = true;
		}
	});
	
	/* 重复密输入验证 */
	$("#repassword").keyup(function () {
		var password = $("#password").val(); // 密码
		var repassword = $(this).val() ; // 重复密码输入

		/* 进行判断两次输入是否相等 */
		if(isNULL(repassword) || repassword != password) {
			$(this).next().html(HTML_ICON_ERROR());
			repasswordFlag = false ; 
		} else {
			$(this).next().html(HTML_ICON_OK());
			repasswordFlag = true ; 
		}
	})
	
})

/** 表单提交 */
function formsubmit() {
	
	/* 提示区 */
	var message = $("#message") ; 
	
	/* 重复密码错误 */
	if(!passwordFlag || !repasswordFlag) {
		message.html("请检查输入是否正确!").removeClass("info").addClass("error");
		return false ;
	}
	
	/* 给出正确提示 */
	message.html("输入正确!").removeClass("info").removeClass("error").addClass("success");
	
	/* 等待层 */
	load("更新中, 请稍后...") ;
	
	return true;
}

/** 密码重置 */
function formreset () {
	
	/* 清空成功/错误小图标 */
	$("#password").focus().next().html(""); 
	$("#repassword").next().html("")
	
	/* 清空标记 */
	repasswordFlag = false ; 
	passwordFlag = false ;
}

/** 小图标正确 */
function HTML_ICON_OK () {
	return '&emsp;<span class="mws-ic-16 ic-accept">　　</span>';
}

/** 小图标错误 */
function HTML_ICON_ERROR () {
	return '&emsp;<span class="mws-ic-16 ic-cross">　　</span>';
}