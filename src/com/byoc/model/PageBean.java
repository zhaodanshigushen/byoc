package com.byoc.model;

import com.byoc.basic.BasicConstants;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页实体类
 */
public class PageBean<T> {

	/** 用户传递的 */
	private int pageNow; // 当前页
	private int pageSize; // 当前页中显示多少条数据

	/** 数据库查询的 */
	private int rowCount; // 一共有多少条数据
	private List<T> list = new ArrayList<T>(); // 当前查询中的实际数据

	/** 计算的 */
	private int beginIndex; // 开始索引
	private int endIndex; // 结束索引
	private int pageCount; // 一共有多少页

	/** 分页条, 显示多少块元素 */
	private int PAGE = BasicConstants.PAGEBEAN_PAGE_SON;

	/** 构造方法 */
	public PageBean(int pageNow, int pageSize, int rowCount, List<T> list) {
		this.pageNow = pageNow;
		this.pageSize = pageSize;
		this.rowCount = rowCount;
		this.list = list;

		/** 计算总页数 */
		this.pageCount = (rowCount - 1) / pageSize + 1;

		/** 分页起始, 结束, 索引计算 */
		if (this.pageCount <= PAGE) {
			this.beginIndex = 1;
			this.endIndex = this.pageCount;
		} else {

			/** 前四页 [当前页] 后五页 */
			this.beginIndex = this.pageNow - 4;
			this.endIndex = this.pageNow + 5;

			/** 小于第一页 */
			if (beginIndex <= 0) {
				beginIndex = 1;
				endIndex = PAGE;
			}
			/** 大于总页数 */
			else if (endIndex > pageCount) {
				endIndex = pageCount;
				beginIndex = pageCount - (PAGE - 1);
			}

		}

	}

	/*
	 * getter and setter
	 */

	public int getPageNow() {
		return pageNow;
	}

	public void setPageNow(int pageNow) {
		this.pageNow = pageNow;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public int getBeginIndex() {
		return beginIndex;
	}

	public void setBeginIndex(int beginIndex) {
		this.beginIndex = beginIndex;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

}
