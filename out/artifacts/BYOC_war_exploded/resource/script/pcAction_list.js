/** 配置发送信息 */
function openSendUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "邮件发送配置",
		offset : [ '', '' ],
		area : [ '700px', '355px' ],
		iframe : {
			src : 'messageconfigAction_sendPCUI',
			scrolling : 'no'
		}
	});
}

/** 系统日志 */
function syslogUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "",
		offset : [ '', '' ],
		area : [ '900px', '600px' ],
		iframe : {
			src : 'pcAction_syslogUI',
			scrolling : 'yes'
		}
	});
}

/** 系统错误日志 */
function syslogErrorUI() {
	$.layer( {
		type : 2,
		maxmin : false,
		shade : [ 0.7, '#000' ],
		shadeClose : true,
		title : "",
		offset : [ '', '' ],
		area : [ '900px', '600px' ],
		iframe : {
			src : 'pcAction_syslogErrorUI',
			scrolling : 'yes'
		}
	});
}