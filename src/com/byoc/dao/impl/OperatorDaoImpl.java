package com.byoc.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.byoc.basic.BasicDAOImpl;
import com.byoc.dao.OperatorDao;
import com.byoc.model.Operator;

/**
 * @Description 操作员dao接口实现类
 * @date 2014-7-28 下午02:39:19
 * @author Liulz
 */
@Repository
@SuppressWarnings("unchecked")
public class OperatorDaoImpl extends BasicDAOImpl<Operator> implements OperatorDao {

	public Operator findByUsernameAndPassowd(String username, String password) {
		return (Operator) createQuery(//
				"FROM Operator WHERE username = ? AND password = ?")//
				.setParameter(0, username)//
				.setParameter(1, password)//
				.uniqueResult();
	}

	public List<Operator> findByUsername(String username) {
		return this.createQuery(//
				"FROM Operator WHERE username = ? ")//
				.setParameter(0, username) // 
				.list();
	}

}
