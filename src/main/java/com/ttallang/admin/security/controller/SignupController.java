package com.ttallang.admin.security.controller;

import com.ttallang.admin.security.service.SignupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
public class SignupController {

    @GetMapping("/signup/form")
    public String signupForm() {
        return "signupForm";
    }
}
