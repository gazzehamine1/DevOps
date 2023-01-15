package com.projet.employeemanagementapp.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.projet.employeemanagementapp.dao.EmployeeRepository;
import com.projet.employeemanagementapp.entities.Employee;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServiceEmployee implements IServiceEmployee{
	
	EmployeeRepository er;//injection de dependeance
	@Override
	public void saveEmployee(Employee e,MultipartFile mf)throws IOException {
		String photo;
		if(!mf.getOriginalFilename().equals("")) {
			photo=saveImage(mf);
			e.setPhoto(photo);
		}
			er.save(e);
	}

	@Override
	public List<Employee> getAllEmployees() {
		
		return er.findAll();
	}

	@Override
	public Employee getEmployee(int id) {
		// TODO Auto-generated method stub
		return er.findById(id).get();
	}

	@Override
	public List<Employee> getEmployeesByMC(String mc) {
		// TODO Auto-generated method stub
		return er.findByNameContains(mc); 
	}

	@Override
	public void deleteEmployees(int id) {
			er.deleteById(id);
	}

	@Override
	public String saveImage(MultipartFile mf) throws IOException {
		String nameFile = mf.getOriginalFilename();
		String tab[] =nameFile.split("\\.");
		String fileModif=tab[0]+"_"+System.currentTimeMillis()+"."+tab[1];
		String chemin =System.getProperty("user.dir")+"/src/main/webapp/imagesdata/";
		Path p = Paths.get(chemin,fileModif);
		Files.write(p,mf.getBytes());
		return fileModif;
	}

	
	@Override
	public byte[] getImage(int id) throws IOException{
		String nomImage=er.findById(id).get().getPhoto();
		Path p = Paths.get(System.getProperty("user.dir")+"/src/main/webapp/imagesdata/",nomImage);
		return Files.readAllBytes(p);
	}
	
}
