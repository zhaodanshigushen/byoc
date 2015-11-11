package com.byoc.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.opensymphony.xwork2.ActionContext;
import com.byoc.basic.BasicConstants;
import com.byoc.model.Session;

/** 权限自定义标签(符合权限进行向下阅读, 不符合权限忽略标签区间内容) */
public class PrivilegeTag extends TagSupport {

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

		/* 权限校验(有权限)正常显示标签区间内容 */
		if (session.getPrivilege().contains(url)) {
			return EVAL_PAGE;
		}

		/* 权限校验(无权限)忽略标签区间内容, 并且输出错误日志 */
		else {
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
