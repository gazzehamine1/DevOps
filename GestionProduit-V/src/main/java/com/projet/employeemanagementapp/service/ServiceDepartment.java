package com.projet.employeemanagementapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projet.employeemanagementapp.dao.DepartmentRepository;
import com.projet.employeemanagementapp.entities.Department;
import com.projet.employeemanagementapp.entities.Employee;
import com.projet.employeemanagementapp.entities.Manager;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServiceDepartment implements IServiceDepartment  {
	DepartmentRepository dr;
	@Override
	public void addDepartment(Department d) {
		// TODO Auto-generated method stub
		dr.save(d);
	}

	@Override
	public List<Department> allDepartments() {
		// TODO Auto-generated method stub
		return dr.findAll();
	}
	public void deleteDepartment(int id) {
		dr.deleteById(id);
	}
public List<Employee> getEmployeeByDepartment(int idc){
		
return dr.getById(idc).getList();
		}
public Manager getManagerByDepartment(int idd) {
	return dr.getById(idd).getManager(); 
		}





}
