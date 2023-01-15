package com.projet.employeemanagementapp.service;

import java.util.List;

import com.projet.employeemanagementapp.entities.Department;
import com.projet.employeemanagementapp.entities.Employee;
import com.projet.employeemanagementapp.entities.Manager;


public interface IServiceDepartment {
public void addDepartment(Department d);
public List<Department> allDepartments();
public List<Employee> getEmployeeByDepartment(int idc);
public Manager getManagerByDepartment(int idm);
public void deleteDepartment(int id);

}
