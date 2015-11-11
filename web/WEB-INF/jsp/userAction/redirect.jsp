<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/WEB-INF/jsp/basicAction/basic.jspf" %>
</head>
<body style="margin: 0 auto;">

<s:if test="#defaultMenu == null || #defaultMenu.size() == 0">
	<script type="text/javascript">
		$(function () {
			window.location.href='statisAction_globalUI';
		})
	</script>
</s:if>
<s:else>
	<script type="text/javascript">
		$(function () {
			window.location.href='<s:property value="%{#defaultMenu.get(0).url}" />';
		})
	</script>
</s:else>

<div style="text-align: center; margin-top:300px; color: gray">
	数据加载中, 请稍后...
</div>

</body>
</html>