package com.web.login.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Scope("prototype")
@RequestMapping(value = "/")
public class IndexController {
	
	/* 主页面 */
	@RequestMapping(value="index")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "index/index";
	}
}
