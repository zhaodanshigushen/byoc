$(function() {

	/* 账号对焦 */
	$("input[name=username]").focus()

})

/* 表单提交检测 */
function formsubmit() {

	/* 获取用户输入账号密码 */
	var username = $("#username").val();
	var password = $("#password").val();

	/* 检测非空 */
	if (username.length == 0 || password.length == 0) {
		$("#error").html("账号密码不可为空!") ;
		return false;
	}

	/* 等待层 */
	load('更新中, 请稍后...')

	return true;
}