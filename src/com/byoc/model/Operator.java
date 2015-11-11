package com.byoc.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description 操作员
 * @date 2015-10-16 上午11:39:12
 * @author zhaodan
 */
public class Operator implements Serializable {

	/** 一般属性 */
	private Date time; // 创建时间
	private String username; // 登陆账号
	private String password; // 登陆密码
	private Long status;// 角色是否为超级管理员
    private String name;
    private String email;

    /** 特殊属性 */
	private Long id;

    public Operator() {
    }

    public Operator(String username, String password, Long status, String name, String email, Date time) {
        this.username = username;
        this.password = password;
        this.status = status;
        this.name = name;
        this.email = email;
        this.time = time;
    }

	/*
	 * getter and setter
	 */

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
