package com.byoc.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/** 菜单实体 */
public class Media implements Serializable {

	/** 一般属性 */
	private String name; // 菜单名称
	private String size; // 菜单icon
	private String type; // 排序
	private Date time; // 地址
	private String status;

	/** 特殊属性 */
	private Long id; // id主键
	private Media parent; // 父类菜单
    private Operator operator;
	private Set<Media> children = new HashSet<Media>(); // 子类菜单

    public Media() {
    }

    public Media(String name, String size, String type, Date time, String status, Long id, Media parent, Operator operator) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.time = time;
        this.status = status;
        this.id = id;
        this.parent = parent;
        this.operator = operator;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Media getParent() {
        return parent;
    }

    public void setParent(Media parent) {
        this.parent = parent;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Set<Media> getChildren() {
        return children;
    }

    public void setChildren(Set<Media> children) {
        this.children = children;
    }
}
