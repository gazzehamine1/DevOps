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
import com.projet.employeemanagementapp.entities.Employee;
import com.projet.employeemanagementapp.service.IServiceDepartment;
import com.projet.employeemanagementapp.service.IServiceEmployee;

import lombok.AllArgsConstructor;



@Controller
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeController {
	IServiceEmployee se;
	IServiceDepartment sd;
	DepartmentRepository dr;
	
	
	@GetMapping("/employeemc")
	public String Employeemc(@RequestParam String mc , Model m) {
		List<Employee>liste=se.getEmployeesByMC(mc);
		m.addAttribute("employee",liste);
		return "listEmployees";
	}
	@GetMapping("/delete/{id}")
	public String deleteEmployee(@PathVariable int id ) {
		se.deleteEmployees(id);
		return "redirect:/employee/all";
	}
	@GetMapping("/addemployee")
	public String addEmployee(Model m) {
		m.addAttribute("department",sd.allDepartments());
		return "addEmployee";
	}
	@PostMapping("/saveemployee")
	public String saveEmployee (@ModelAttribute Employee e,@RequestParam("file") MultipartFile mf,Model m )throws IOException  {
		Integer id =e.getId();
		se.saveEmployee(e, mf);
		if(id!=null) {
			return "redirect:/employee/all";
		}
		else
		{
			m.addAttribute("message","success");
			m.addAttribute("department",sd.allDepartments());
			return "addEmployee";
		}
	
	}
	@GetMapping("/editemployee/{idp}")
	public String editEmployee(Model m,@PathVariable("idp") int id) {
		m.addAttribute("department",sd.allDepartments());
		m.addAttribute("employee",se.getEmployee(id));
		return "addEmployee";
		
	}

	
	@GetMapping("/EmployeeByDepartment")
	public String getEmployeesByMc(@RequestParam("department") int idc,Model m)
	{
		m.addAttribute("department",sd.allDepartments());
		if (idc==0) {System.out.println("ok");
			m.addAttribute("employees",se.getAllEmployees());
			return"redirect:/employee/all";}
			else {
				m.addAttribute("employees",sd.getEmployeeByDepartment(idc));
				m.addAttribute("department",dr.findById(idc).get().getName());
				return "listEmployees";
			}
		}
	
	@GetMapping("/all")
	public String getAllEmployees(Model m)
	{
		List<Employee>list=se.getAllEmployees();
		m.addAttribute("employees",list);
		m.addAttribute("departments",dr.findAll());
		m.addAttribute("department","all departments");
		return "listEmployees";
	}
}
