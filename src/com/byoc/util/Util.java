package com.byoc.util;

import com.byoc.basic.BasicConstants;
import com.byoc.model.OrdersWM;
import com.opensymphony.xwork2.ActionContext;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.ParameterizedType;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * 通用工具类
 */
final public class Util {

	private Util() {
	}
	
	/**
	 * 
	 * @param title excel表格的表头
	 * @param datas excel表格的数据
	 * @return 文件保存在服务器的位置
	 */
	public static String saveExcel(List<OrdersWM> list){
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
		String targetfile = request.getSession().getServletContext().getRealPath("/")+ "data.xls";
		try {
			FileOutputStream fos = new FileOutputStream(targetfile);
		    HSSFWorkbook wb = new HSSFWorkbook();
		    HSSFSheet sheet = wb.createSheet();
		    wb.setSheetName(0, list.get(0).getWm()+"的所有订单");
			/* 表头样式 */
			HSSFCellStyle style = (HSSFCellStyle) wb.createCellStyle();
			/* 单元格样式 */
			HSSFCellStyle cellStyle = (HSSFCellStyle) wb.createCellStyle();
			style.setBorderTop((short) 1);
			style.setBorderBottom((short) 1);
			style.setBorderLeft((short) 1);
			style.setBorderRight((short) 1);
			style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			style.setFillForegroundColor(HSSFColor.RED.index);
			style.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
			style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

			
			cellStyle.setBorderTop((short) 1);
			cellStyle.setBorderBottom((short) 1);
			cellStyle.setBorderLeft((short) 1);
			cellStyle.setBorderRight((short) 1);
			cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			cellStyle.setFillForegroundColor(HSSFColor.RED.index);
			cellStyle.setFillForegroundColor(IndexedColors.YELLOW.index);
			cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
		    
		    /* 创建第一行数据 */
			Row row_1 = sheet.createRow(1);

			Cell cell_1 = row_1.createCell(1);
			cell_1.setCellValue("订单编号");
			cell_1.setCellStyle(style);

			Cell cell_2 = row_1.createCell(2);
			cell_2.setCellStyle(style);
			cell_2.setCellValue("cookie");

			Cell cell_3 = row_1.createCell(3);
			cell_3.setCellStyle(style);
			cell_3.setCellValue("总额");

			Cell cell_4 = row_1.createCell(4);
			cell_4.setCellStyle(style);
			cell_4.setCellValue("渠道");

			Cell cell_5 = row_1.createCell(5);
			cell_5.setCellStyle(style);
			cell_5.setCellValue("模板");

			Cell cell_6 = row_1.createCell(6);
			cell_6.setCellStyle(style);
			cell_6.setCellValue("DM");

			Cell cell_7 = row_1.createCell(7);
			cell_7.setCellStyle(style);
			cell_7.setCellValue("RSST");

			Cell cell_8 = row_1.createCell(8);
			cell_8.setCellStyle(style);
			cell_8.setCellValue("省份");

			Cell cell_9 = row_1.createCell(9);
			cell_9.setCellStyle(style);
			cell_9.setCellValue("城市");

			Cell cell_10 = row_1.createCell(10);
			cell_10.setCellStyle(style);
			cell_10.setCellValue("订单时间");

			/* 单元格宽度 */
			sheet.setColumnWidth(0, 500);
			sheet.setColumnWidth(1, 2500);
			sheet.setColumnWidth(2, 2500);
			sheet.setColumnWidth(3, 2500);
			sheet.setColumnWidth(4, 2500);
			sheet.setColumnWidth(5, 2500);
			sheet.setColumnWidth(6, 2500);
			sheet.setColumnWidth(7, 2500);
			sheet.setColumnWidth(8, 2500);
			sheet.setColumnWidth(9, 2500);
			sheet.setColumnWidth(10, 5000);

			/* 单元格高度 */
			row_1.setHeight((short) 400);

			/* 创建详细数据 */
			for (int i = 0; i < list.size(); i++) {

				/* 创建一行数据 */
				Row row = sheet.createRow(i + 2);

				Cell cell__1 = row.createCell(1);
				cell__1.setCellStyle(cellStyle);
				cell__1.setCellValue(list.get(i).getOrderId());

				Cell cell__2 = row.createCell(2);
				cell__2.setCellStyle(cellStyle);
				cell__2.setCellValue(list.get(i).getCookie());

				Cell cell__3 = row.createCell(3);
				cell__3.setCellStyle(cellStyle);
				cell__3.setCellValue(list.get(i).getAmount());

				Cell cell__4 = row.createCell(4);
				cell__4.setCellStyle(cellStyle);
				cell__4.setCellValue(list.get(i).getChannel());

				Cell cell__5 = row.createCell(5);
				cell__5.setCellStyle(cellStyle);
				cell__5.setCellValue(list.get(i).getTempid());

				Cell cell__6 = row.createCell(6);
				cell__6.setCellStyle(cellStyle);
				cell__6.setCellValue(list.get(i).getDm());

				Cell cell__7 = row.createCell(7);
				cell__7.setCellStyle(cellStyle);
				cell__7.setCellValue(list.get(i).getRsst());

				Cell cell__8 = row.createCell(8);
				cell__8.setCellStyle(cellStyle);
				cell__8.setCellValue(list.get(i).getProvince());

				Cell cell__9 = row.createCell(9);
				cell__9.setCellStyle(cellStyle);
				cell__9.setCellValue(list.get(i).getCity());

				Cell cell__10 = row.createCell(10);
				cell__10.setCellStyle(cellStyle);
				cell__10.setCellValue(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(list.get(i).getTime()));

				row.setHeight((short) 400);
			}
			wb.write(fos);
			fos.close();
		} catch (Exception e) {
			Util.log.error(e + Util.getErrorInfo(e));
			return "writeError";
		}
		return targetfile;

	}

	/** log4j静态变量 */
	public static Logger log = Logger.getLogger(Util.class.getName());

	/** 获取继承类的实际类型 */
	@SuppressWarnings("unchecked")
	public static Class getCurrentClass(Class clazz) {
		return (Class) ((ParameterizedType) clazz.getGenericSuperclass()).getActualTypeArguments()[0];
	}

	/** 判断一个字符串是否为空, 为空返回true, 不为空返回false */
	public static boolean isNULL(String str) {
		if (str == null || str.trim().equals("")) {
			return true;
		}
		return false;
	}

	/** 获取当前天数时间区间 */
	public static String[] getBetweenDay() {
		return new String[] { Util.convertDate(new Date(), "yyyy-MM-dd"), Util.convertDate(new Date(), "yyyy-MM-dd") };
	}

	/** 获取当前天数的前一天的时间区间 */
	public static String[] getBetweenBeforeDay() {

		/* 时间工具类 */
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());

		/* 计算前一天 */
		calendar.add(Calendar.DATE, -1);

		return new String[] { Util.convertDate(calendar.getTime(), "yyyy-MM-dd"), Util.convertDate(new Date(), "yyyy-MM-dd") };
	}

	/** 获取本周日期时间区间 */
	public static String[] getBetweenWeek() {

		/* 时间工具类 */
		Calendar calendar = Calendar.getInstance();

		/* 日期定位到最近的星期一 */
		while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
			calendar.add(Calendar.DATE, -1);
		}

		return new String[] { Util.convertDate(calendar.getTime(), "yyyy-MM-dd"), Util.convertDate(new Date(), "yyyy-MM-dd") };
	}

	/** 获取上周日期时间区间 */
	public static String[] getBetweenBeforeWeek() {

		/* 返回集合 */
		String[] result = new String[2];

		/* 时间工具类 */
		Calendar calendar = Calendar.getInstance();

		/* 日期定位到前一个星期一 */
		while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
			calendar.add(Calendar.DATE, -1);
		}
		calendar.add(Calendar.DATE, -1);
		while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
			calendar.add(Calendar.DATE, -1);
		}

		/* 上周的星期一赋值 */
		result[0] = Util.convertDate(calendar.getTime(), "yyyy-MM-dd");

		/* 日期定位到前一个星期日 */
		calendar.add(Calendar.DATE, 6);

		/* 上周的星期日赋值 */
		result[1] = Util.convertDate(calendar.getTime(), "yyyy-MM-dd");

		return result;
	}

	/** 获取本月时间区间 */
	public static String[] getBetweenMonth() {

		/* 时间工具类 */
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());

		return new String[] { calendar.get(Calendar.YEAR) + "-" + (calendar.get(Calendar.MONTH) + 1) + "-1", Util.convertDate(calendar.getTime(), "yyyy-MM-dd") };
	}

	/** 获取前30天时间区间 */
	public static String[] getBetweenLately30() {

		/* 时间工具类 */
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());

		/* 前30天 */
		for (int i = 0; i < 30; i++) {
			calendar.add(Calendar.DATE, -1);
		}

		return new String[] { Util.convertDate(calendar.getTime(), "yyyy-MM-dd"), Util.convertDate(new Date(), "yyyy-MM-dd") };
	}

	/** 时间转换字符串 */
	public static String convertDate(Date date, String reg) {
		return new SimpleDateFormat(reg).format(date);
	}

	/** 四舍五入, 保留两位小数点 */
	public static Double round2(Double d) {
		return Util.round(d, 2);
	}

	/** 四舍五入, 指定保留小数位 */
	public static Double round(Double d, int number) {
		if (d == null) {
			return d;
		} else {
			String divisor = "1";
			for (int i = 0; i < number; i++) {
				divisor += "0";
			}
			return (double) Math.round(d * Integer.parseInt(divisor)) / Integer.parseInt(divisor);
		}
	}

	/** ping ip, ping成功返回true, 失败返回false */
	public static boolean pingId(String s) {

		try {

			/* 转换byte */
			String[] sons = s.split("\\.");

			/* ip赋值 */
			byte[] ip = new byte[] { //
			(byte) Integer.parseInt(sons[0]),//
					(byte) Integer.parseInt(sons[1]),//
					(byte) Integer.parseInt(sons[2]),//
					(byte) Integer.parseInt(sons[3]) //
			};

			/* 心跳检测 */
			InetAddress inet = InetAddress.getByAddress(ip);
			for (int i = 0; i < 5; i++) {
				if (!inet.isReachable(5000)) {
					return false;
				}
			}

			return true;
		} catch (Exception e) {
			Util.log.error("Util.pingId(String s)" + Util.getErrorInfo(e));
			return false;
		}
	}

	/** 输入访问地址, 返回耗时秒数, 默认等待BasicConstants.URL_TIMEOUT, 超时显示BasicConstants.URL_TIMEOUT */
	public static Long openUrl(String openurl) {

		/* 所需字段 */
		InputStream input = null;
		Long timeout = BasicConstants.URL_TIMEOUT; // 默认等待10秒钟

		try {

			/* 当前时间 */
			Long current = System.currentTimeMillis();// 当前时间

			/* 地址检测 */
			if (openurl.indexOf("http://") != 0 && openurl.indexOf("https://") != 0) {
				openurl = "http://" + openurl;
			}

			/* 创建url */
			URL url = new URL(openurl);

			/* 连接配置 */
			HttpURLConnection connect = (HttpURLConnection) url.openConnection(); // 配置连接
			connect.setConnectTimeout(timeout.intValue());// 链接等待秒
			connect.setReadTimeout(timeout.intValue()); // 读取等待秒
			connect.connect(); // 开始连接
			input = connect.getInputStream(); // 读取流

			return System.currentTimeMillis() - current;
		} catch (Exception e) {
			Util.log.error("Util.openUrl(String openurl) " + Util.getErrorInfo(e));
			return timeout;
		} finally {
			try {
				if (input != null)
					input.close();
			} catch (Exception e) {
				Util.log.error("Util.openUrl(String openurl) close stream" + Util.getErrorInfo(e));
			}
		}
	}

	/**
	 * 获取错误详细信息
	 * 
	 * @param e Exception
	 * @return 错误信息的字符串
	 */
	public static String getErrorInfo(Exception e) {

		/** 错误概述 */
		String error = "\n\t" + e.getClass() + " " + e.getMessage();

		/** 错误详情 */
		for (StackTraceElement se : e.getStackTrace()) {
			error += "\n\t\t" + se.getClassName() + "." + se.getMethodName() + "(),\t " + se.getFileName() + " -> " + se.getLineNumber() + " ";
		}

		return error;
	}

	/** 输入的时间添加指定个小时 */
	public static Date addHour(Date date, int hour) {

		/* 日期工具类 */
		Calendar c = Calendar.getInstance();
		c.setTime(date); // 输入的时间
		c.add(Calendar.HOUR, hour); // 时间+1小时
		return c.getTime();
	}

	/** 输入的时间减少指定秒数 */
	public static Date substrationSeconds(Date date, int seconds) {

		/* 日期工具类 */
		Calendar c = Calendar.getInstance();
		c.setTime(date); // 输入的时间
		c.add(Calendar.SECOND, -seconds); // 时间+1小时
		return c.getTime();
	}

	/** 生成一个MD5随机值 */
	public static String random() {

		/* 返回值 */
		String md5 = "";

		/* 生成 */
		for (int i = 0; i < 128; i++) {
			md5 += new Random().nextLong() + "-\n";
		}

		/* 创建MD5 */
		return DigestUtils.md5Hex(md5 + new Date().getTime());
	}

}
