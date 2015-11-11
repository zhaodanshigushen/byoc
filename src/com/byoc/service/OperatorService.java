package com.byoc.service;

import com.byoc.basic.BasicDAO;
import com.byoc.model.Operator;

import java.util.List;

/**
 * @Description 操作员服务接口
 * @date 2014-7-28 下午02:40:21
 * @author Liulz
 */
public interface OperatorService extends BasicDAO<Operator> {

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

	/**
	 * @Description 保存操作员
	 * @date 2014-9-24 下午12:57:08
	 * @author Liulz
	 * @param model JSP传递对象
	 * @return 保存完成返回true, 错误返回false
	 */
	boolean saveOperator(Operator model);

	/**
	 * @Description 更新操作员对象
	 * @date 2014-9-24 下午02:23:02
	 * @author Liulz
	 * @param model JSP传递对象
	 */
	void updateOperator(Operator model);

	/**
	 * @Description 根据id删除操作员
	 * @date 2014-9-25 上午09:55:07
	 * @author Liulz
	 * @param id
	 */
	void deleteOperator(Long id);

}
