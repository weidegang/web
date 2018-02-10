package com.web.login.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.login.util.LoginConst;

@Controller
@Scope("prototype")
@RequestMapping(value = "/login")
public class LoginController {
	/* 登录页面 */
	@RequestMapping
	public String userlogin(HttpServletRequest request,Model model) {
		String loginName = (String)request.getSession().getAttribute(LoginConst.LOGIN_NAME);
		if (StringUtils.isNotEmpty(loginName)){
			return "forward:/index";
		}else{
			return "login/login";
		}
	}
	
	/* 登录页面 */
	@RequestMapping(value="doLogin")
	public String doLogin(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		String loginName = (String)request.getSession().getAttribute(LoginConst.LOGIN_NAME);
		if (StringUtils.isNotEmpty(loginName)){
			return "redirect:/index";
		}else{
			String userName = request.getParameter("userName");
			String passWord = request.getParameter("passWord");
			if (StringUtils.isEmpty(userName)
				||StringUtils.isEmpty(passWord)
				||(!"admin".equals(userName))
				||(!"1".equals(passWord))){
				return "redirect:/login";
			}
			request.getSession().setAttribute("userName", userName);
			return "redirect:/index";
		}
	}
	
	/* 登录页面 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value="doLogin1")
	public Map<String, String> doLogin1(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		String loginName = (String)request.getSession().getAttribute(LoginConst.LOGIN_NAME);
		Map<String, String> retMap = new HashMap<String, String>();
		if (StringUtils.isNotEmpty(loginName)){
			retMap.put("result", "success");
			return retMap;
		}else{
			String userName = request.getParameter("userName");
			String passWord = request.getParameter("passWord");
			if (StringUtils.isEmpty(userName)
				||StringUtils.isEmpty(passWord)
				||(!"admin".equals(userName))
				||(!"1".equals(passWord))){
				retMap.put("result", "fail");
				retMap.put("reason", "用户名或密码错误！");
				return retMap;
			}
			request.getSession().setAttribute("userName", userName);
			retMap.put("result", "success");
			return retMap;
		}
		
	}
	
	
	/* 注销 */
	@RequestMapping(method = RequestMethod.GET,value="doLogout")
	public String doLogout(HttpServletRequest request, HttpServletResponse respons) {
//		request.getSession().removeAttribute("userName");        //删除session中的信息对象
		request.getSession().invalidate(); 
		return "redirect:/";
	}
}
