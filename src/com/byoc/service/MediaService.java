package com.byoc.service;

import com.byoc.basic.BasicDAO;
import com.byoc.model.Media;

import java.util.List;

public interface MediaService extends BasicDAO<Media> {

	List<Media> findByUserId(Long UserId);
}
