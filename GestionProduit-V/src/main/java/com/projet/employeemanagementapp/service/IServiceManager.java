package com.projet.employeemanagementapp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.projet.employeemanagementapp.entities.Manager;

public interface IServiceManager {
	 void saveManager(Manager m,MultipartFile mf) throws IOException;
	  List<Manager> getAllManagers();
	  Manager getManager(int id);
	  List<Manager> getManagersByMC(String mc);
	  void deleteManager(int id);
	  String saveImage(MultipartFile mf)throws IOException ;
	byte[] getImage(int id) throws IOException;

}
