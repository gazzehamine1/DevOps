package com.projet.employeemanagementapp.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.projet.employeemanagementapp.dao.DepartmentRepository;
import com.projet.employeemanagementapp.entities.Manager;
import com.projet.employeemanagementapp.service.IServiceDepartment;
import com.projet.employeemanagementapp.service.IServiceManager;

import lombok.AllArgsConstructor;



@Controller
@RequestMapping("/manager")
@AllArgsConstructor
public class ManagerController {
	IServiceManager sm;
	IServiceDepartment sd;
	DepartmentRepository dr;
	
	
	@GetMapping("/managermc")
	public String Managermc(@RequestParam String mc , Model m) {
		List<Manager>liste=sm.getManagersByMC(mc);
		m.addAttribute("manager",liste);
		return "listManagers";
	}
	@GetMapping("/delete/{id}")
	public String deleteManager(@PathVariable int id ) {
		sm.deleteManager(id);
		return "redirect:/Manager/all";
	}
	@GetMapping("/addmanager")
	public String addManager(Model m) {
		m.addAttribute("department",sd.allDepartments());
		return "addManager";
	}
	@PostMapping("/savemanager")
	public String saveManager (@ModelAttribute Manager mm,@RequestParam("file") MultipartFile mf,Model m )throws IOException  {
		Integer id =mm.getId();
		sm.saveManager(mm, mf);
		if(id!=null) {
			return "redirect:/manager/all";
		}
		else
		{
			m.addAttribute("message","success");
			m.addAttribute("department",sd.allDepartments());
			return "addManager";
		}
	
	}
	@GetMapping("/editmanager/{idp}")
	public String editManager(Model m,@PathVariable("idp") int id) {
		m.addAttribute("department",sd.allDepartments());
		m.addAttribute("manager",sm.getManager(id));
		return "addManager";
		
	}
	
	@GetMapping("/ManagerByDepartment")
	public String getManagersByMc(@RequestParam("department") int idc,Model m)
	{
		m.addAttribute("department",sd.allDepartments());
		if (idc==0) {System.out.println("ok");
			m.addAttribute("managers",sm.getAllManagers());
			return"redirect:/manager/all";}
			else {
				m.addAttribute("managers",sd.getManagerByDepartment(idc));
				m.addAttribute("department",dr.findById(idc).get().getName());
				return "listManagers";
			}
		}
	
	@GetMapping("/all")
	public String getAllManagers(Model m)
	{
		List<Manager>list=sm.getAllManagers();
		m.addAttribute("managers",list);
		m.addAttribute("departments",dr.findAll());
		m.addAttribute("department","all departments");
		return "listManagers";
	}
}
