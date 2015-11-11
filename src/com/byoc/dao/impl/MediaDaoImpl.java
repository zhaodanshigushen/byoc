package com.byoc.dao.impl;

import com.byoc.basic.BasicDAOImpl;
import com.byoc.dao.MediaDao;
import com.byoc.model.Media;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@SuppressWarnings("unchecked")
public class MediaDaoImpl extends BasicDAOImpl<Media> implements MediaDao {

	public List<Media> findByUserId(Long UserId) {
		List<Media> res = (List<Media>) this.createQuery("FROM " + "Media" + " WHERE operator.id = ?")//
				.setParameter(0, UserId).list();//
		return res;
	}

}
