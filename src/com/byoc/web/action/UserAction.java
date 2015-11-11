package com.byoc.web.action;

import com.byoc.basic.BasicAction;
import com.byoc.basic.BasicConstants;
import com.byoc.model.Operator;
import com.byoc.model.Session;
import com.opensymphony.xwork2.ActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.util.Date;

/**
 * @Description 用户管理action
 * @date 2014-7-28 上午09:32:07
 * @author Liulz
 */
@Controller
@Scope("prototype")
public class UserAction extends BasicAction<Operator> {

	/** 用户登录页面 */
	public String loginUI() throws Exception {

		/* 如果当前用户已登陆, 跳转到统计信息, 全局效果页面 */
		if (ActionContext.getContext().getSession().get(BasicConstants.SESSION_KEY) != null) {
			return "login";
		}

		return "loginUI";
	}

	/** 用户登录 */
	public String login() throws Exception {

		/* 查询操作员对象/查询租户对象 */
		Operator operator = this.operatorService.findByUsernameAndPassowd(model.getUsername(), model.getPassword());

		/* 账号密码输入错误 */
		if (operator == null) {
			ActionContext.getContext().put("error", "username or password error");
			return "loginUI";
		}

		/* 添加到session (当前登录超级管理员) */
		if (operator != null) {
			ActionContext.getContext().getSession().put(BasicConstants.SESSION_KEY, new Session().addOperator(operator));
		}

		return "login";
	}

    public String register() throws Exception {
        Operator operator = new Operator(this.model.getUsername(), model.getPassword(), 0L, model.getName(), model.getEmail(), new Date());
        System.out.println(model.getName()+" "+model.getPassword());
        this.operatorService.save(operator);
        return "login";
    }

	/** 退出当前登录 */
	public String logout() throws Exception {
		ActionContext.getContext().getSession().remove(BasicConstants.SESSION_KEY);
		return "loginUI";
	}

}
