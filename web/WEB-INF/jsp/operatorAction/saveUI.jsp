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
<p:checkAndOutException url="operatorAction_list">

<%-- TOP --%>
<%@include file="/WEB-INF/jsp/basicAction/top.jspf" %>

<%-- LEFT --%>
<%@include file="/WEB-INF/jsp/basicAction/left.jspf" %>			

<div class="mws-panel grid_12">
	<div class="mws-panel-header">
	
		<s:if test="id == null"><span class="mws-i-24 i-plus">添加操作员</span></s:if>
		<s:if test="id != null"><span class="mws-i-24 i-pencil-edit">添加操作员</span></s:if>
		
	</div>
	<div class="mws-panel-body">
		<s:form cssClass="mws-form" action="operatorAction_%{id == null ? 'add' : 'edit' }" onsubmit="return formsubmit()" >
			<s:hidden name="id"  />
		
			<div class="mws-form-inline">                                
			
				<div class="mws-form-row">
					<label>操作员账号</label>
					<div class="mws-form-item small "  >
						<s:textfield cssClass="mws-textinput" name="username" id="username" />
						&emsp;<font color="red" id="error">${error}</font>
					</div>
				</div>
			
				<div class="mws-form-row">
					<label>操作员密码</label>
					<div class="mws-form-item small "  >
						<s:textfield cssClass="mws-textinput" name="password" id="password" />
					</div>
				</div>
				
			</div>
			<div class="mws-button-row">
				<input type="submit" value="      保存" class="mws-button gray mws-ic-16 ic-accept" style="background-position:7px 6px" />
				<s:reset  value="      重置" cssClass="mws-button gray mws-ic-16 ic-arrow-undo"  cssStyle="background-position:7px 6px"  />
				<input type="button" value="      返回" class="mws-button gray mws-ic-16 ic-arrow-left" style="background-position:7px 6px" onclick="window.location.href='operatorAction_list'" />
			</div>
		</s:form>
	</div>    	
</div>
			
<%-- BOTTOM --%>
<%@include file="/WEB-INF/jsp/basicAction/bottom.jspf" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/script/operatorAction_saveUI.js"></script>
</p:checkAndOutException>
</body>
</html>