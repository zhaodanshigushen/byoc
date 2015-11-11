package com.byoc.web.action;

import com.byoc.basic.BasicAction;
import com.byoc.model.Operator;
import com.opensymphony.xwork2.ActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 * @Description 操作员action
 * @date 2014-9-24 上午10:36:30
 * @author Liulz
 */
@Controller
@Scope("prototype")
public class OperatorAction extends BasicAction<Operator> {

	/** 列表 */
	public String list() throws Exception {
		ActionContext.getContext().put("operatorList", this.operatorService.findAll());
		return "list";
	}

	/** 添加 */
	public String add() throws Exception {

		/* 保存失败 */
		if (!this.operatorService.saveOperator(this.model)) {
			ActionContext.getContext().put("error", "账号已存在!");
			return "saveUI";
		}

		return "toList";
	}

	/** 修改操作员密码页面 */
	public String editPasswordUI() throws Exception {
		return "editPasswordUI";
	}

	/** 修改操作员密码 */
	public String editPassword() throws Exception {
		this.operatorService.updateOperator(this.model);
		return "messagePath";
	}

	/** 添加页面 */
	public String addUI() throws Exception {
		return "saveUI";
	}

	/** 删除 */
	public String delete() throws Exception {
		this.operatorService.deleteOperator(this.model.getId());
		return "toList";
	}

}
