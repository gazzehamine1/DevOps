package com.projet.employeemanagementapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.employeemanagementapp.entities.Employee;

@Repository

public interface EmployeeRepository extends JpaRepository <Employee, Integer>{

	List<Employee> findByNameContains(String mc);

}
