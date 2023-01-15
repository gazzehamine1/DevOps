package com.projet.employeemanagementapp.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @Entity
@AllArgsConstructor @NoArgsConstructor

public class Department {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String name;
@OneToMany(mappedBy = "department",cascade = CascadeType.ALL)
@JsonIgnore
private List<Employee>list=new ArrayList<Employee>();
@OneToOne(mappedBy = "department",cascade = CascadeType.ALL)
@JsonIgnore
private Manager manager;

}
