import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl,Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from './department';
import { DepartmentService } from '../services/department.service';

//import { DepartmentService } from '../services/categorie.service';
import { ManagerService } from '../services/manager.service';
import { Manager } from './manager';
import { map, switchMap } from 'rxjs';
@Component({  
selector: 'app-addManager',
templateUrl: '../templates/addManager.html',
styleUrls: ['../templates/addEmployee.component.css']  , 
})



export class AddManagerComponent implements OnInit {
constructor(private serviceDep:DepartmentService,private serviceMg:ManagerService,
private router:Router) { }
    departments: Department[] = [];
    availableDepartments: Department[] = [];

   
    

  
ngOnInit() {/*
 this.serviceDep.getAllDepartments().subscribe(
data=>this.departments=data
)
 this.departments=this.serviceDep.departments */

 this.getAllDepartments().subscribe(
    departments => this.departments = departments
  );
}

getAllDepartments() {
    return this.serviceDep.getAllDepartments().pipe(
      switchMap(departments => {
        return this.serviceMg.getManagers().pipe(
          map(managers => {
            return departments.filter(department => {
              return !managers.some(manager => manager.department.id === department.id);
            });
          })
        );
      })
    );
  }
  


save(f:NgForm)
{
let fd:FormData=new FormData();
fd.append("file",this.file)
let manager:Manager=f.value

console.log(JSON.stringify(manager.department))
fd.append("Manager",JSON.stringify(manager))
this.serviceMg.saveManager(fd).subscribe(
()=>this.router.navigate(['/listManagers'])
)
}
    file!: File;
selectimage(event:any)
{
this.file=event.target.files[0];

}
}
