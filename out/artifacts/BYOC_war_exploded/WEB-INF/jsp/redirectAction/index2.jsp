<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="p" uri="/privilege-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>The Seed</title>
<%@include file="/WEB-INF/jsp/basicAction/basic.jspf" %>
</head>
<body>
<p:checkAndOutException url="redirectAction_index2">

<%-- TOP --%>
<%@include file="/WEB-INF/jsp/basicAction/top.jspf" %>

<%-- LEFT --%>
<%@include file="/WEB-INF/jsp/basicAction/index2.jspf" %>			

<%-- BOTTOM --%>
<%@include file="/WEB-INF/jsp/basicAction/bottom.jspf" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/script/Highcharts-4.0.3/js/highcharts.js"></script>
</p:checkAndOutException>
</body>
</html>