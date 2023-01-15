package com.projet.employeemanagementapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.employeemanagementapp.entities.Department;


@Repository
public interface DepartmentRepository extends JpaRepository<Department,Integer> {


}
