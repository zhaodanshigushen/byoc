package com.byoc.util;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description 获得数据库配置文件的类
 * @date 2014-12-09 下午03:07:15
 * @author zhaodan
 */

public class DatabaseConfUtil {
	/**
	 * 
	 * @param filePath
	 * @return List[0]是dbhost，List[1]是dbuser，List[2]是dbpasswd
	 */
	public static List<String> getDatabaseParams(String filePath) {
		File file = new File(filePath);
		//System.out.println(filePath);
		if(!file.exists() || !file.isFile()){
			return null;
		}
		
		List<String> params = new ArrayList<String>();
		try {
			FileInputStream fileInputStream = new FileInputStream(file);
			InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
			BufferedReader reader = new BufferedReader(inputStreamReader);
			String lineContent = "";
			Map<String, String> paramsMap = new HashMap<String, String>();
			while ((lineContent = reader.readLine()) != null) {
				lineContent = lineContent.trim();
				if (lineContent.equals(""))
					continue;
				if (lineContent.charAt(0) == '#')
					continue;
				if (lineContent.indexOf("=") != -1) {
					String[] temp = lineContent.split("=");
					paramsMap.put(temp[0].trim(), temp[1].trim());
				}
			}
			params.add(paramsMap.get("dbhost"));
			params.add(paramsMap.get("dbuser"));
			params.add(paramsMap.get("dbpasswd"));
			fileInputStream.close();
			inputStreamReader.close();
			reader.close();
		} catch (FileNotFoundException e) {
			Util.log.error("DatabaseConfUtil getDatabaseParams fileNotFound error"+e);
			return null;
		} catch (IOException e) {
			Util.log.error("DatabaseConfUtil getDatabaseParams IOException error"+e);
			return null;
		}
		
		return params;
	}
	
	/**
	 * 
	 * @param filePath
	 * @return ip:port
	 */
	public static String getMem(String filePath) {
		File file = new File(filePath);
		if(!file.exists() || !file.isFile()){
			return null;
		}
		
		try {
			FileInputStream fileInputStream = new FileInputStream(file);
			InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
			BufferedReader reader = new BufferedReader(inputStreamReader);
			String lineContent = "";
			Map<String, String> paramsMap = new HashMap<String, String>();
			while ((lineContent = reader.readLine()) != null) {
				lineContent = lineContent.trim();
				if (lineContent.equals(""))
					continue;
				if (lineContent.charAt(0) == '#')
					continue;
				if (lineContent.indexOf("=") != -1) {
					String[] temp = lineContent.split("=");
					paramsMap.put(temp[0].trim(), temp[1].trim());
				}
			}
			String port = paramsMap.get("port");
			String ip = paramsMap.get("ip");
			fileInputStream.close();
			inputStreamReader.close();
			reader.close();
			return ip+":"+port;
		} catch (FileNotFoundException e) {
			Util.log.error("DatabaseConfUtil getMem fileNotFound error"+e);
			return null;
		} catch (IOException e) {
			Util.log.error("DatabaseConfUtil getMem IOException error"+e);
			return null;
		}
	}
//  测试用
//	public static void main(String[] args) {
//		getMem("WebRoot/resource/py_db.ini");
//	}
}
