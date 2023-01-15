package com.projet.employeemanagementapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.employeemanagementapp.entities.Manager;

@Repository

public interface ManagerRepository extends JpaRepository <Manager, Integer>{

	List<Manager> findByNameContains(String mc);

}
