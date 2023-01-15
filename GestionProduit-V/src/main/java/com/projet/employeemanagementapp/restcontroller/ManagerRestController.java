package com.projet.employeemanagementapp.restcontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projet.employeemanagementapp.entities.Employee;
import com.projet.employeemanagementapp.entities.Manager;
import com.projet.employeemanagementapp.service.IServiceManager;
@CrossOrigin("*")

@RestController
@RequestMapping ("/restapimanager")
public class ManagerRestController {
@Autowired IServiceManager sm;

@GetMapping("/all")
public List<Manager> getAllManagers(){
return sm.getAllManagers();
}

@GetMapping("/findByMC/{mc}")
public List<Manager> getManagers(@PathVariable ("mc") String mot){
	
	return sm.getManagersByMC(mot);
}

@GetMapping(path = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
public byte[] getImage(@PathVariable("id") int id) throws IOException {
	return sm.getImage(id);
}
@GetMapping("/getManagerById/{id}")
public Manager getManager(@PathVariable ("id") int id){
	
	return sm.getManager(id);
}

@PostMapping("/add")
public void saveManager (@RequestParam("Manager") String p, @RequestParam("file") MultipartFile mf) throws IOException{
	Manager m = new ObjectMapper().readValue(p, Manager.class);
	sm.saveManager(m,mf);
	
}

@DeleteMapping("/delete/{id}")
public void deleteManager(@PathVariable int id) throws IOException{
	sm.deleteManager(id);
}

@PutMapping("/update")
public void update(@RequestParam("Manager") String m, @RequestParam("file") MultipartFile mf) throws IOException {
	saveManager(m,mf);
}



}
