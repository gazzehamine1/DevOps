package com.projet.employeemanagementapp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.projet.employeemanagementapp.entities.Employee;

public interface IServiceEmployee {
	 void saveEmployee(Employee e,MultipartFile mf) throws IOException;
	  List<Employee> getAllEmployees();
	  Employee getEmployee(int id);
	  List<Employee> getEmployeesByMC(String mc);
	  void deleteEmployees(int id);
	  String saveImage(MultipartFile mf)throws IOException ;
	byte[] getImage(int id) throws IOException;

}
