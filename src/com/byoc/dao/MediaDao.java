package com.byoc.dao;

import com.byoc.basic.BasicDAO;
import com.byoc.model.Media;

import java.util.List;

public interface MediaDao extends BasicDAO<Media> {

	List<Media> findByUserId(Long UserId);

}
