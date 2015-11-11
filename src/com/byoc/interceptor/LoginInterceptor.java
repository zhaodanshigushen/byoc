package com.byoc.interceptor;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;
import com.byoc.basic.BasicConstants;
import com.byoc.model.Session;

/**
 * @Description 用户登录拦截器
 * @date 2014-8-7 下午01:27:17
 * @author Liulz
 */
public class LoginInterceptor extends MethodFilterInterceptor {

	@Override
	protected String doIntercept(ActionInvocation action) throws Exception {

		/* 检测用户是否已登录 */
		Session session = (Session) ActionContext.getContext().getSession().get(BasicConstants.SESSION_KEY);

		/* session未登录 */
		if (session == null) {
			return "loginUI";
		}

		/* session已登录 */
		return action.invoke();
	}
}
