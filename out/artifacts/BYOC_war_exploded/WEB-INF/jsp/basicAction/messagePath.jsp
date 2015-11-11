<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>The Seed</title>
<%@include file="/WEB-INF/jsp/basicAction/basic.jspf" %>
</head>
<body>


<script type="text/javascript">
	var index = parent.layer.getFrameIndex(window.name);
	layer.msg('操作已完成...', 1, 1);
	setTimeout(function () {
		parent.layer.close(index);
	}, 500);
</script>


</body>
</html>