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
		<span class="mws-i-24 i-table-1">操作员列表(PS:超级管理员)</span>
	</div>
	<div class="mws-panel-body">
		<table class="mws-table">
			<thead>
				<tr>
					<th style="width: 026px;">序号</th>
					<th>账号</th>
					<th style="width: 117px;">更新时间</th>
					<th style="width: 090px;" >角色</th>
					<th style="width: 041px;" >操作</th>
				</tr>
			</thead>
			<tbody>
				<s:iterator value="operatorList" status="s" >
					<tr>
	
						<%-- 序号 --%>						
						<td style="text-align: center;" >${s.count } </td>
						
						<%-- 账号 --%>
						<td>${username }</td>
						
						<td><s:date name="time" format="yyyy/MM/dd HH:mm:ss" /> </td>
						
						<%-- 状态 --%>
						<td style="padding: 3px 5px 0 5px" >
							<input type="button" value="系统超级管理员" class="mws-button gray small" />
						</td>
						
						<%-- 操作 --%>
						<td style="padding: 3px 5px 0 5px" >
							<s:if test="status == 0">
								<input onclick="confirm('确定要删除 (${username}) 吗?', 'operatorAction_delete?id=${id}')" type="button" value="" tipvalue="删除操作员" class="tip mws-button gray small mws-ic-16 ic-cross" style="padding-right:18px; background-position: 4px 4px;" />
								<input onclick="openEditPassword('修改 (${username}) 密码 ', '${id}')" type="button" value="" tipvalue="修改 (${username }) 密码" class="tip mws-button gray small mws-ic-16 ic-key" style="padding-right:18px; background-position: 4px 4px;" />
								<%-- <input onclick="openAddTenant('(${username}) 添加租户', '${id}')" type="button" value="" tipvalue="(${username}) 添加租户" class="tip mws-button gray small mws-ic-16 ic-add" style="padding-right:18px; background-position: 4px 4px;" />--%>
							</s:if>
							<s:elseif test="status == 1">
								<input onclick="openEditPassword('修改 (${username}) 密码 ', '${id}')" type="button" value="" tipvalue="修改 (${username }) 密码" class="tip mws-button gray small mws-ic-16 ic-key" style="padding-right:18px; background-position: 4px 4px;" />
							</s:elseif>
						</td>
						
					</tr>
				</s:iterator>
			</tbody>
		</table>
		<%--
		<div class="mws-panel-toolbar  clearfix" style="border-top:1px solid #ccc" >
			<ul>
				<li><a href="operatorAction_addUI" class="mws-ic-16 ic-add tip" tipvalue="添加一个新的操作员"  style="background-position:15px 9px" >&nbsp;</a></li>  
			</ul>
		</div>
		 --%>
	</div>
</div>
			
<%-- BOTTOM --%>
<%@include file="/WEB-INF/jsp/basicAction/bottom.jspf" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/script/operatorAction_list.js"></script>
</p:checkAndOutException>
</body>
</html>