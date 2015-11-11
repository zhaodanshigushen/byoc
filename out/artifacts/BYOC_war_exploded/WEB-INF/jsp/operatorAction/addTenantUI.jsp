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

<s:set var="operatorId" value="%{id}" />
<div class="mws-panel-body" style="padding: 20px 20px 0 20px;" >
	<div class="mws-panel grid_12">
		<div class="mws-panel-header">
			<span class="mws-i-24 i-table-1">所属租户</span>
		</div>
		<div class="mws-panel-body">
			<table class="mws-table">
				<thead>
					<tr>
						<th style="width: 26px;" >序号</th>
						<th style="width: 150px;" >账号</th>
						<th>名称</th>
						<th style="width: 150px;" >所属操作员</th>
						<th style="width: 27px;" >操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="myTenant" status="s" >
						<tr>
							<td>${s.count}</td>
							<td>${username}</td>
							<td>${title }</td>
							<td>${operator.username }</td>
							<td style="padding: 3px 5px 0 5px ; text-align: center;" >
								<input onclick="window.location.href='operatorAction_deleteTenant?tenantId=${id}&id=${operatorId}'" type="button" value="" tipvalue="删除租户" class="tip mws-button gray small mws-ic-16 ic-cross" style="padding-right:18px; background-position: 4px 4px;">
							</td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="mws-panel-body" style="padding: 0 20px;" >
	<div class="mws-panel grid_12">
		<div class="mws-panel-header">
			<span class="mws-i-24 i-table-1">其他租户</span>
		</div>
		<div class="mws-panel-body">
			<table class="mws-table">
				<thead>
					<tr>
						<th style="width: 26px;" >序号</th>
						<th style="width: 150px;" >账号</th>
						<th>名称</th>
						<th style="width: 150px;" >所属操作员</th>
						<th style="width: 27px;" >操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="notMyTenant" status="s" >
						<tr>
							<td>${s.count}</td>
							<td>${username}</td>
							<td>${title }</td>
							<td>
								<s:if test="status == -1"> 
									—
								</s:if>
								<s:else>
									<s:property value="operator.username" /> 
								</s:else>
							</td>
							<td style="padding: 3px 5px 0 5px ; text-align: center;" >
								<input onclick="window.location.href='operatorAction_addTenant?tenantId=${id}&id=${operatorId}'" type="button" value="" tipvalue="添加租户" class="tip mws-button gray small mws-ic-16 ic-add" style="padding-right:18px; background-position: 4px 4px;">
							</td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
		</div>
	</div>
</div>

</p:checkAndOutException>
</body>
</html>