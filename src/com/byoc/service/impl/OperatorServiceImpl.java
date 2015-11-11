package com.byoc.service.impl;

import com.byoc.dao.OperatorDao;
import com.byoc.model.Operator;
import com.byoc.model.PageBean;
import com.byoc.service.OperatorService;
import com.byoc.util.Util;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @Description 操作员服务接口实现类
 * @date 2014-7-28 下午02:43:24
 * @author Liulz
 */
@Service
@Transactional
public class OperatorServiceImpl implements OperatorService {

	/** 所需接口 */
	@Resource
	private OperatorDao dao;

	 
	public void deleteById(Serializable id) {
		dao.deleteById(id);
	}

	 
	public List<Operator> findAll() {
		return this.findByCondition("ORDER BY status DESC, time DESC ", new Object[] {});
	}

	 
	public List<Operator> findByCondition(String condition, Object[] parameters) {
		return dao.findByCondition(condition, parameters);
	}

	 
	public Operator findById(Serializable id) {
		return dao.findById(id);
	}

	 
	public PageBean<Operator> findPageBean(int pageNow, String where, Object[] parameters, int pageSize) {
		return dao.findPageBean(pageNow, where, parameters, pageSize);
	}

	 
	public void save(Operator entity) {
		dao.save(entity);
	}

	 
	public void update(Operator entity) {
		dao.update(entity);
	}

	 
	public List<Operator> findByUsername(String username) {
		return dao.findByUsername(username);
	}

	 
	public Operator findByUsernameAndPassowd(String username, String password) {

		/* 账号密码不应该是空的 */
		if (Util.isNULL(username) || Util.isNULL(password)) {
			return null;
		}

		return dao.findByUsernameAndPassowd(username, DigestUtils.md5Hex(password));

	}

	 
	public boolean saveOperator(Operator model) {

		/* 已存在 */
		if (this.findByUsername(model.getUsername()).size() != 0) {
			return false;
		}

		/* MD5加密 */
		model.setPassword(DigestUtils.md5Hex(model.getPassword() == null ? "" : model.getPassword()));

		/* 属性时间添加 */
		model.setTime(new Date());

		/* 保存到数据库中 */
		this.save(model);

		return true;
	}

	 
	public void updateOperator(Operator model) {

		/* 查询出需要修改的对象 */
		Operator operator = this.findById(model.getId());

		if (operator != null) {
			/* 更新属性 */
			operator.setPassword(DigestUtils.md5Hex(model.getPassword()));

			/* 保存对象到数据库 */
			this.update(operator);
		}

	}

	 
	public void deleteOperator(Long id) {

		/* 查询出需要删除的对象 */
		Operator operator = this.findById(id);

		if (operator != null) {

			/* 删除操作员对象 */
			this.deleteById(id);

		}

	}

}
