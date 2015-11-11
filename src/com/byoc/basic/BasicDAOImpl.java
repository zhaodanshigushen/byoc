package com.byoc.basic;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import com.byoc.model.PageBean;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.byoc.util.Util;

@SuppressWarnings("unchecked")
public class BasicDAOImpl<T> implements BasicDAO<T> {

	@Resource
	protected SessionFactory sessionFactory;
	private Class<T> clazz = Util.getCurrentClass(this.getClass());

	/** 获取Session */
	protected Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}

	/** 获取Query对象 */
	protected Query createQuery(String HQL) {
		return this.getSession().createQuery(HQL);
	}

	public void deleteById(Serializable id) {
		try {
			this.getSession().delete(this.findById(id));
		} catch (Exception e) {
			// XXX 当删除失败的时候, 不给于任何提示, 过滤掉错误信息
		}
	}

	public List<T> findAll() {
		return this.createQuery(//
				"FROM " + this.clazz.getSimpleName())//
				.list();
	}

	public T findById(Serializable id) {
		return (T) this.createQuery(//
				"FROM " + this.clazz.getSimpleName() + " WHERE id = ?")//
				.setParameter(0, id)// 
				.uniqueResult();
	}

	public void save(T entity) {
		this.getSession().save(entity);
	}

	public void update(T entity) {
		this.getSession().update(entity);
	}

	public PageBean<T> findPageBean(int pageNow, String where, Object[] parameters, int pageSize) {

		/** 查询该对象的信息 */
		Query query = this.createQuery("FROM " + this.clazz.getSimpleName() + "  " + where);

		/** WHERE参数赋值 */
		if (parameters != null && parameters.length != 0) {
			for (int i = 0; i < parameters.length; i++) {
				query.setParameter(i, parameters[i]);
			}
		}

		/** 获取一共有多少条数据 */
		Query rowCountQuery = this.createQuery("SELECT COUNT(*) FROM " + this.clazz.getSimpleName() + "  " + where);
		if (parameters != null && parameters.length != 0) {
			for (int i = 0; i < parameters.length; i++) {
				rowCountQuery.setParameter(i, parameters[i]);
			}
		}
		Long rowCount = (Long) rowCountQuery.uniqueResult();

		/** 分页数据 */
		List<T> list = query.setFirstResult(pageSize * (pageNow - 1)).setMaxResults(pageSize).list();

		/** 返回分页对象 */
		return new PageBean<T>(pageNow, pageSize, rowCount.intValue(), list);
	}

	public List<T> findByCondition(String condition, Object[] parameters) {

		/** 查询SQL */
		Query query = this.createQuery("FROM " + this.clazz.getSimpleName() + " " + condition);

		/** 赋值参数 */
		if (parameters != null && parameters.length != 0) {
			for (int i = 0; i < parameters.length; i++) {
				query.setParameter(i, parameters[i]);
			}
		}

		/** 返回查询结果 */
		return query.list();

	}

}
