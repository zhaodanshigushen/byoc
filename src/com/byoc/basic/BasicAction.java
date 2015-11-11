package com.byoc.basic;

import javax.annotation.Resource;

import com.byoc.model.Operator;
import com.byoc.model.Session;
import com.byoc.service.*;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.byoc.util.Util;
import org.apache.struts2.ServletActionContext;

/**
 * 通用的Action
 */
@SuppressWarnings("unchecked")
public class BasicAction<T> extends ActionSupport implements ModelDriven<T> {

	protected T model; // 继承本类实际对象
	protected int pageNow = 1; // 当前页
	protected int parentPageNow; // 父类当前页
	protected int pageSize = BasicConstants.PAGEBEAN_PAGE_SIZE;// 当前页中显示多少条数据

	@Resource
	protected OperatorService operatorService; // 操作员服务接口
    @Resource
    protected MediaService mediaService;

	/** 获取继承类实际类型-并生成实例 */
	public BasicAction() {
		Class<T> clazz = Util.getCurrentClass(this.getClass());
		try {
			model = clazz.newInstance();
		} catch (Exception e) {
			throw new RuntimeException("初始化basicAction失败 : " + e);
		}
	}

	/** ModelDriven实现方法 */
	public T getModel() {
		return model;
	}
    /** 将对象添加到ActionContext上下文中 **/
    protected void pushContent(String key, Object object) {
        ActionContext.getContext().put(key, object);
    }

    /** 根据key, 获取session中的对象 **/
    protected Object getSessionByKey(String key) {
        return ActionContext.getContext().getSession().get(key);
    }

    /** 将数据添加到session中 **/
    protected void pushSession(String key, Object object) {
        ActionContext.getContext().getSession().put(key, object);
    }

    /** 将数据从session中删除 **/
    protected void removeSession(String key) {
        ActionContext.getContext().getSession().remove(key);
    }

    /** 添加一个对象到action栈顶 */
    protected void pushValueStack(Object object) {
        ActionContext.getContext().getValueStack().push(object);
    }

    /** 获取当前登录用户的id */
    protected Operator getCurrentUser() {

        Session session = (Session) ServletActionContext.getRequest().getSession().getAttribute(BasicConstants.SESSION_KEY);
        Operator user = session.getOperator();
        return user;
    }

	/*
	 * getter and setter
	 */

	public int getPageNow() {
		return pageNow;
	}

	public void setPageNow(int pageNow) {
		this.pageNow = pageNow;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}
