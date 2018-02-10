package com.web.login.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class SessionInterceptor implements HandlerInterceptor {

	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		System.out.println(request.getRequestURI());
		HttpSession session=request.getSession(true); 
		//session中获取用户名信息 
		Object obj = session.getAttribute(LoginConst.LOGIN_NAME); 
		if (obj==null||"".equals(obj.toString())) { 
			response.sendRedirect(request.getSession().getServletContext().getContextPath()+LoginConst.LOGIN_URL);
			return false;
		}
		
		return true;
	}

	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
	}
}
