package com.projet.employeemanagementapp.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.projet.employeemanagementapp.dao.ManagerRepository;
import com.projet.employeemanagementapp.entities.Manager;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServiceManager implements IServiceManager{
	
	ManagerRepository mr;//injection de dependeance
	@Override
	public void saveManager(Manager m,MultipartFile mf)throws IOException {
		String photo;
		if(!mf.getOriginalFilename().equals("")) {
			photo=saveImage(mf);
			m.setPhoto(photo);
		}
			mr.save(m);
	}

	@Override
	public List<Manager> getAllManagers() {
		
		return mr.findAll();
	}

	@Override
	public Manager getManager(int id) {
		// TODO Auto-generated method stub
		return mr.findById(id).get();
	}

	@Override
	public List<Manager> getManagersByMC(String mc) {
		// TODO Auto-generated method stub
		return mr.findByNameContains(mc); 
	}

	@Override
	public void deleteManager(int id) {
			mr.deleteById(id);
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
		String nomImage=mr.findById(id).get().getPhoto();
		Path p = Paths.get(System.getProperty("user.dir")+"/src/main/webapp/imagesdata/",nomImage);
		return Files.readAllBytes(p);
	}
	
}
