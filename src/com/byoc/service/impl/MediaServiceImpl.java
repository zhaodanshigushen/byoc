package com.byoc.service.impl;

import com.byoc.dao.MediaDao;
import com.byoc.model.Media;
import com.byoc.model.PageBean;
import com.byoc.service.MediaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

@Service
@Transactional
public class MediaServiceImpl implements MediaService {

	@Resource
	private MediaDao dao;

    public void deleteById(Serializable id) {
        dao.deleteById(id);
    }


    public List<Media> findAll() {
        return this.findAll();
    }


    public List<Media> findByCondition(String condition, Object[] parameters) {
        return dao.findByCondition(condition, parameters);
    }


    public Media findById(Serializable id) {
        return dao.findById(id);
    }


    public PageBean<Media> findPageBean(int pageNow, String where, Object[] parameters, int pageSize) {
        return dao.findPageBean(pageNow, where, parameters, pageSize);
    }


    public void save(Media entity) {
        dao.save(entity);
    }


    public void update(Media entity) {
        dao.update(entity);
    }

	public List<Media> findByUserId(Long UserId) {
		return dao.findByUserId(UserId);
	}

}
