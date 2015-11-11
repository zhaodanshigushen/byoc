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
<p:checkAndOutException url="roleAction_list">

<%-- TOP --%>
<%@include file="/WEB-INF/jsp/basicAction/top.jspf" %>

<%-- LEFT --%>
<%@include file="/WEB-INF/jsp/basicAction/left.jspf" %>			


<div class="mws-panel grid_8">
	<div class="mws-panel-header">
	
		<s:if test="id == null"><span class="mws-i-24 i-plus">添加角色</span></s:if>
		<s:if test="id != null"><span class="mws-i-24 i-pencil-edit">编辑角色</span></s:if>
		
	</div>
	<div class="mws-panel-body">
		<s:form cssClass="mws-form" action="roleAction_%{id == null ? 'add' : 'edit' }">
			<s:hidden name="id"  />
		
			<div class="mws-form-inline">
				
				<div class="mws-form-row">
					<label>角色名称</label>
					<div class="mws-form-item small "  >
						<s:textfield cssClass="mws-textinput" name="name" id="name" />
					</div>
				</div>
			
			</div>
			<div class="mws-button-row">
				<input type="submit" value="      保存" class="mws-button gray mws-ic-16 ic-accept" style="background-position:7px 6px" onclick="load('更新中, 请稍后...')" />
				<input type="button" value="      返回" class="mws-button gray mws-ic-16 ic-arrow-left" style="background-position:7px 6px" onclick="window.location.href='roleAction_list'" />
			</div>
		</s:form>
	</div>    	
</div>

<%-- BOTTOM --%>
<%@include file="/WEB-INF/jsp/basicAction/bottom.jspf" %>
<script type="text/javascript">$(function(){$("#name").focus()})</script>
</p:checkAndOutException>
</body>
</html>