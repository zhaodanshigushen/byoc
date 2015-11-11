package com.byoc.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.opensymphony.xwork2.ActionContext;
import com.byoc.basic.BasicConstants;
import com.byoc.model.Session;
import com.byoc.util.Util;

/** 权限自定义标签(符合权限进行向下阅读, 不符合权忽略标签区间显示, 并且打印出错误信息到JSP页面) */
public class PrivilegeTagOutput extends TagSupport {

	/** 标签属性 */
	private String url;

	@Override
	public int doStartTag() throws JspException {

		/* 获取当前登录的对象 */
		Session session = (Session) ActionContext.getContext().getSession().get(BasicConstants.SESSION_KEY);

		/* 当前登录如果是超级管理员则放行 */
		if (BasicConstants.SESSION_TYPE_OPERATOR.equals(session.getType())) {
			return EVAL_PAGE;
		}

		/* 权限校验(有权限)正常显示 */
		if (session.getPrivilege().contains(url)) {
			return EVAL_PAGE;
		}

		/* 权限校验(无权限), 忽略标签区间内容并且输出错误信息 */
		else {
			try {
				pageContext.getOut().write("<div id='mws-wrapper'><div id='mws-container' class='clearfix'><div class='container'><div id='mws-error-container'><div id='mws-error-code'><h1>sorry, 无权限<span>&nbsp;</span></h1></div><p id='mws-error-message'>对不起, 您当前没有访问权限, 请联系管理员 <a href='javascript:history.go(-1)'>返回上一步</a></p></div></div></div></div>");// 获取JSP页面的输出流 out
			} catch (Exception e) {
				Util.log.error(e + Util.getErrorInfo(e));
			}
			return SKIP_BODY;
		}

	}

	/*
	 * getter and settter
	 */

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
