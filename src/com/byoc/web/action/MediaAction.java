package com.byoc.web.action;

import com.byoc.basic.BasicAction;
import com.byoc.model.Media;
import com.byoc.model.Operator;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
@Scope("prototype")
public class MediaAction extends BasicAction<Media> {

	/** 列表 */
	public String list() throws Exception {
        Operator currentUser = this.getCurrentUser();
		pushContent("mediaList", this.mediaService.findByUserId(currentUser.getId()));
		return "list";
	}

	/** 添加 */
	public String add() throws Exception {

		return "toList";
	}

	/** 删除 */
	public String delete() throws Exception {
		this.mediaService.deleteById(this.model.getId());
		return "toList";
	}

}
