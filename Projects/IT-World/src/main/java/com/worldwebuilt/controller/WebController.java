package com.worldwebuilt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/", "/tomorrow", "/index", "/index.html"})
    public String tomorrow(Model model) {
        model.addAttribute("activeChapter", "01");
        return "index";
    }

    @GetMapping({"/without", "/without-it", "/without-it.html"})
    public String withoutIt(Model model) {
        model.addAttribute("activeChapter", "02");
        return "without-it";
    }

    @GetMapping({"/beyond", "/beyond-it", "/beyond-it.html"})
    public String beyondIt(Model model) {
        model.addAttribute("activeChapter", "03");
        return "beyond-it";
    }
}
