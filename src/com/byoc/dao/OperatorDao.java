package com.byoc.dao;

import java.util.List;

import com.byoc.basic.BasicDAO;
import com.byoc.model.Operator;

/**
 * @Description 操作员dao接口
 * @date 2014-7-28 下午02:38:48
 * @author Liulz
 */
public interface OperatorDao extends BasicDAO<Operator> {

	/**
	 * @Description 通过用户密码. 查询操作员对象
	 * @date 2014-7-28 下午02:52:45
	 * @author Liulz
	 * @param username 账号
	 * @param password 密码
	 * @return 操作员
	 */
	Operator findByUsernameAndPassowd(String username, String password);

	/**
	 * @Description 通过用户名查询操作员
	 * @date 2014-8-8 下午05:49:10
	 * @author Liulz
	 * @param username 用户名
	 * @return 操作员集
	 */
	List<Operator> findByUsername(String username);

}
