package com.byoc.basic;

/**
 * 通用的常量配置
 */
final public class BasicConstants {

	// --------------------------------------------------------------------
	// ---------------------------- |(菜单)| ------------------------------
	// -------------------------------------------------------------------
	/** 菜单状态(进入后展示Active) */
	public static final String MENU_STATUS_ACTIVE = "active";
	/** 菜单状态(默认状态) */
	public static final String MENU_STATUS_DEFAULT = "default";

	// --------------------------------------------------------------------
	// ---------------------------- |(租户)| ------------------------------
	// -------------------------------------------------------------------
	/** 租户状态(启动) */
	public static final Long TENANT_START = 1L;
	/** 租户状态(停止) */
	public static final Long TENANT_DOWM = 0L;

	// --------------------------------------------------------------------
	// -------------------------- |(人群定向)| -----------------------------
	// --------------------------------------------------------------------
	/** 人群定向分类(行业tag) */
	public static final Long DIRECTIONAL_DOMAIN = 1L; // 
	/** 人群定向分类(区域) */
	public static final Long DIRECTIONAL_AREA = 2L; // 
	/** 人群定向分类(来源) */
	public static final Long DIRECTIONAL_SOURCE = 3L; // 
	/** 人群定向分类(深度) */
	public static final Long DIRECTIONAL_DEPTH = 4L; // 
	/** 人群定向分类(新老用户) */
	public static final Long DIRECTIONAL_CUSTOMER = 5L; // 
	/** 人群定向分类(行业的cookie数量) */
	public static final Long DIRECTIONAL_COUNT = 6L; // 

	// --------------------------------------------------------------------
	// -------------------------- |(URL地址耗时)| --------------------------
	// --------------------------------------------------------------------
	/** URL地址默认耗时时间 */
	public static final Long URL_TIMEOUT = 10000L;
	/** URL状态 -> 正常状态 */
	public static final Long URL_STATUS_NOT_ERROR = 0L;
	/** URL状态 -> 异常状态 */
	public static final Long URL_STATUS_ERROR = -1L;

	// --------------------------------------------------------------------
	// -------------------------- |(PC服务器状态)| --------------------------
	// --------------------------------------------------------------------
	/** PC服务器状态->服务器正常状态 */
	public static final Long PC_STATUS_NOT_ERROR = 0L;
	/** PC服务器状态->服务器死亡状态 */
	public static final Long PC_STATUS_ERROR = -1L;

	// --------------------------------------------------------------------
	// -------------------------- |(系统日志分类)| --------------------------
	// --------------------------------------------------------------------
	/** 系统系统, 系统状态=服务器心跳监测 */
	public static final Long SYSLOG_TYPE_PC = 1L;
	/** 系统系统, 系统状态=地址耗时监测 */
	public static final Long SYSLOG_TYPE_URL = 2L;

	// --------------------------------------------------------------------
	// -------------------------- |(系统日志状态)| --------------------------
	// --------------------------------------------------------------------
	/** 系统日志, 当前状态是错误的 */
	public static final Long SYSLOG_ERROR = -1L;
	/** 系统日志, 当前状态是不是错误的 */
	public static final Long SYSLOG_NOT_ERROR = 0L;

	// --------------------------------------------------------------------
	// ------------------------- |(邮箱发送服务端)| -------------------------
	// --------------------------------------------------------------------
	/** 邮箱发送服务端状态(默认发送邮箱) */
	public static final Long MAILADMIN_STATUS_DEFAULT = 0L;
	/** 邮箱发送服务端状态(非默认发送邮箱) */
	public static final Long MAILADMIN_STATUS_NORMAL = -1L;

	// --------------------------------------------------------------------
	// --------------------- |(全局查询, 底单分类)| -------------------------
	// --------------------------------------------------------------------
	/** wm代表我们带来的订单 */
	public static final String GLOBAL_STATUS_ME = "55M75";

	// --------------------------------------------------------------------
	// --------------------- |(REC数据库, 规则配置)| ------------------------
	// --------------------------------------------------------------------
	/** REC数据库规则状态, 规则已删除 */
	public static final Long RULE_STATUS_IS_DELETE = 1L;
	/** REC数据库规则状态, 规则未删除 */
	public static final Long RULE_STATUS_IS_NOT_DELETE = 0L;
	/** REC数据库规则状态, 新客 */
	public static final Long RULE_STATUS_TYPE_NEW = 0L;
	/** REC数据库规则状态, 老客 */
	public static final Long RULE_STATUS_TYPE_OLD = 1L;

	// --------------------------------------------------------------------
	// --------------------- |(当前登录用户key)| ---------------------------
	// --------------------------------------------------------------------
	/** 当前登录的session, key */
	public static final String SESSION_KEY = "user";
	/** 当期登录的session, 类型为(租户) */
	public static final String SESSION_TYPE_TENANT = "1";
	/** 当期登录的session, 类型为(操作员) */
	public static final String SESSION_TYPE_OPERATOR = "0";
	/** 当期登录的session, 类型为(系统超级管理员) */
	@Deprecated
	public static final String SESSION_TYPE_STATUS_ADMIN = "1";
	/** 当期登录的session, 类型为(普通操作员) */
	@Deprecated
	public static final String SESSION_TYPE_STATUS_NORMAL = "0";

	// --------------------------------------------------------------------
	// --------------------- |(系统全局)| ----------------------------------
	// --------------------------------------------------------------------
	/** (后台系统分页信息) 分页信息.每页显示多少条数据 */
	public static final int PAGEBEAN_PAGE_SIZE = 20;
	/** (后台系统分页信息) 分页信息.分页中显示多少个块 */
	public static final int PAGEBEAN_PAGE_SON = 10;

	private BasicConstants() {
	}

}
