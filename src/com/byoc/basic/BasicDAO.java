package com.byoc.basic;

import com.byoc.model.PageBean;

import java.io.Serializable;
import java.util.List;

/**
 * 通过DAO接口
 */
public interface BasicDAO<T> {

	/** 保存对象 */
	public void save(T entity);

	/** 以Id删除这个对象 */
	public void deleteById(Serializable id);

	/**
	 * 按自定义条件查询该对象 <br>
	 * --> 例子 : findByCustomName(" WHERE name = '?' ", String[] {"1"});
	 * 
	 * @param condition 条件
	 * @param parameters 参数数组
	 * @return 所对应的对象集合
	 */
	public List<T> findByCondition(String condition, Object[] parameters);

	/** 更新对象 */
	public void update(T entity);

	/** 查找该表中所有对象 */
	public List<T> findAll();

	/** 以Id查找该对象 */
	public T findById(Serializable id);

	/**
	 * 以分页的形式获取该对象集合<br>
	 * 例如 :<br>
	 * findPageBean(1, " WHERE id = ? AND name = ? ", String[] {"10", "安少东"}, 5); <br>
	 * 如果不需要参数, 例如 : <br>
	 * findPageBean(1, "", String[] {}, 6);
	 * 
	 * @param pageNow 当前页
	 * @param where 查询条件
	 * @param parameters 条件数值
	 * @param pageSize 每页展示多少条
	 */
	public PageBean<T> findPageBean(int pageNow, String where, Object[] parameters, int pageSize);

}
