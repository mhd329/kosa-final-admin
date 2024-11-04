package com.ttallang.admin.security.controller;

import com.ttallang.admin.security.config.auth.PrincipalDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping({"", "/"})
    public String index() {
        return "redirect:/login/form";
    }

    @GetMapping("/login/form")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping(value = "/admin/branch/main")
    public String adminMainPage(Model model) {
        try {
            PrincipalDetails pds = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            model.addAttribute("username", pds.getUsername());
        } catch (Exception e) { // 관리자 로그인 실패시...
            System.out.println(e.getMessage());
            return "redirect:/login/form"; // 로그인 페이지로 리다이렉트.
        }
        return "admin/main";
    }
}
