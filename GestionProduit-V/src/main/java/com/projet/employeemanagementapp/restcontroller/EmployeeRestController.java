package com.projet.employeemanagementapp.restcontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projet.employeemanagementapp.entities.Department;
import com.projet.employeemanagementapp.entities.Employee;
import com.projet.employeemanagementapp.entities.Manager;
import com.projet.employeemanagementapp.service.IServiceDepartment;
import com.projet.employeemanagementapp.service.IServiceEmployee;
import com.projet.employeemanagementapp.service.IServiceManager;
@CrossOrigin(origins="http://localhost:4200")

@RestController
@RequestMapping ("/restapiemployee")
public class EmployeeRestController {
@Autowired IServiceEmployee se;
@Autowired IServiceDepartment sd;
@Autowired IServiceManager sm;
@GetMapping("/all")
public List<Employee> getAllEmployees(){
return se.getAllEmployees();
}
@GetMapping("/allDepartments")
public List<Department> getAllDepartments(){
return sd.allDepartments();
}

@GetMapping("/findByMC/{mc}")
public List<Employee> getEmployees(@PathVariable ("mc") String mot){
	
	return se.getEmployeesByMC(mot);
}
@GetMapping("/getEmployeeById/{id}")
public Employee getEmployee(@PathVariable ("id") int id){
	
	return se.getEmployee(id);
}
@GetMapping("/findEmployeeManagerByID/{id}")
public Manager findEmployeeManagerByID(@PathVariable ("id") int id){
	
	return se.getEmployee(id).getDepartment().getManager();
}

@GetMapping(path = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
public byte[] getImage(@PathVariable("id") int id) throws IOException {
	return se.getImage(id);
}

@PostMapping("/add")
public void saveEmployee (@RequestParam("Employee") String p, @RequestParam("file") MultipartFile mf) throws IOException{
	Employee ee = new ObjectMapper().readValue(p, Employee.class);
	se.saveEmployee(ee,mf);
	
}

@PostMapping("/addDepartment")
public void saveDepartment (@RequestParam("Department") String p) throws IOException{
	Department d = new ObjectMapper().readValue(p, Department.class);
	sd.addDepartment(d);
	
}

@DeleteMapping("/delete/{id}")
public void deleteEmployee(@PathVariable int id) throws IOException{
	se.deleteEmployees(id);
}

@DeleteMapping("/deleteDepartment/{id}")
public void deleteDepartment(@PathVariable int id) throws IOException{
	sd.deleteDepartment(id);
}
@DeleteMapping("/deleteManager/{id}")
public void deleteManager(@PathVariable int id) throws IOException{
	sm.deleteManager(id);
}
@PutMapping("/update")
public void update(@RequestParam("employee") String e, @RequestParam("file") MultipartFile mf) throws IOException {
	saveEmployee(e,mf);
}



}
