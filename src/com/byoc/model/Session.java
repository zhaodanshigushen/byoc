package com.byoc.model;

import com.byoc.basic.BasicConstants;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description 当前用户登录会话实体
 * @date 2014-8-7 下午01:03:39
 * @author Liulz
 */
public class Session implements Serializable {

	private String type; // (0=操作员)/(1=租户)
	private Operator operator; // 操作员对象
	private List<String> privilege = new ArrayList<String>(); // 权限集

	/*
	 * 方法
	 */

	/** 操作员添加 */
	public Session addOperator(Operator o) {
		this.operator = o; // 操作员对象
		this.type = BasicConstants.SESSION_TYPE_OPERATOR; // 设置类型
		return this;
	}

	/*
	 * getter and setter
	 */

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public List<String> getPrivilege() {
		return privilege;
	}

	public void setPrivilege(List<String> privilege) {
		this.privilege = privilege;
	}

}
