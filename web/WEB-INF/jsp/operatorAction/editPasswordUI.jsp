<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="p" uri="/privilege-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>The Seed</title>
<%@include file="/WEB-INF/jsp/basicAction/basic.jspf" %>
</head>
<body >
<p:checkAndOutException url="operatorAction_list">

<div class="mws-panel-body">
	<s:form cssClass="mws-form" action="operatorAction_editPassword" onsubmit="return formsubmit()" >
		<s:hidden name="id" />
		<div class="mws-form-inline" style="padding: 20px;" >
			<div class="mws-form-row">
				<div class="mws-form-item large">
					输入密码&emsp;
					<input id="password" type="password" name="password" class="mws-textinput" style="width:75%"  />
					<span></span>
				</div>
			</div>
			<div class="mws-form-row">
				<div class="mws-form-item large">
					再次输入&emsp;
					<input id="repassword" type="password" class="mws-textinput" style="width:75%"   />
					<span></span>
				</div>
			</div>
		</div>
		<div class="mws-form-message info" style="cursor: default;" id="message" >
			输入新密码, 点击保存, 完成修改操作!
		</div>        
		<div class="mws-button-row">
			<input type="submit" value="      保存" class="mws-button gray mws-ic-16 ic-accept" style="background-position:7px 6px" />
			<input type="reset"  value="      重置" class="mws-button gray mws-ic-16 ic-arrow-undo"  style="background-position:7px 6px" onclick='formreset()' />
		</div>
	</s:form>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resource/script/operatorAction_editPasswordUI.js"></script>
</p:checkAndOutException>
</body>
</html>