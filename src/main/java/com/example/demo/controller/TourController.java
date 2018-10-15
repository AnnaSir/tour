package com.example.demo.controller;

import com.example.demo.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TourController {

    private TourService tourService;

    @Autowired
    public void setTourService(TourService tourService) {
        this.tourService = tourService;
    }

    @RequestMapping(value = "/getAllTours")
    public String allTours(Model model) {
        model.addAttribute("tours", tourService.getAllTours());
        return "allTourInfo";
    }

    @RequestMapping(value = "/getAllTours1")
    @ResponseBody
    public String allTours1(Model model) {
        model.addAttribute("tours", tourService.getAllTours());
        return tourService.getAllTours().get(0).getName();
    }

    @RequestMapping(value = "/getAllTours2")
    public String allTours2(Model model) {
        model.addAttribute("tours", tourService.getAllTours());
        return "hello";
    }
}
