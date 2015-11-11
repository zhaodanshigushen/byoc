package com.byoc.model;

import java.util.Date;

/**
 * @Description 订单wm详情统计
 * @date 2014-9-2 上午11:18:26
 * @author Liulz
 */
public class OrdersWM {

	private String orderId; // 订单编号
	private String cookie; // cooki
	private Double amount; // 总额
	private Date time; // 订单时间
	private String wm; // wm
	private String channel; // channel
	private String tempid; // tempid
	private String dm; // dm
	private String rsst; // rsst
	private String province; // province
	private String city; // city

	public OrdersWM(String orderId, String cookie, Double amount, Date time, String wm, String channel, String tempid, String dm, String rsst, String province, String city) {
		this.orderId = orderId;
		this.cookie = cookie;
		this.amount = amount;
		this.time = time;
		this.wm = wm;
		this.channel = channel;
		this.tempid = tempid;
		this.dm = dm;
		this.rsst = rsst;
		this.province = province;
		this.city = city;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getWm() {
		return wm;
	}

	public void setWm(String wm) {
		this.wm = wm;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getTempid() {
		return tempid;
	}

	public void setTempid(String tempid) {
		this.tempid = tempid;
	}

	public String getDm() {
		return dm;
	}

	public void setDm(String dm) {
		this.dm = dm;
	}

	public String getRsst() {
		return rsst;
	}

	public void setRsst(String rsst) {
		this.rsst = rsst;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
