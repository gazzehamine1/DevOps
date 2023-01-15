import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl,Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from './department';
import { DepartmentService } from '../services/department.service';
import { Employee } from './employee';

//import { DepartmentService } from '../services/categorie.service';
import { EmployeeService } from '../services/employee.service';
@Component({  
selector: 'app-ajouter',
templateUrl: '../templates/addEmployee.html',
styleUrls: ['../templates/addEmployee.component.css']  , 
})



export class AjouterComponent implements OnInit {
constructor(private serviceDep:DepartmentService,private serviceEmp:EmployeeService,
private router:Router) { }
    departments: Department[] = [];
   
    

  
ngOnInit() {
 this.serviceDep.getAllDepartments().subscribe(
data=>this.departments=data
)
this.departments=this.serviceDep.departments }

save(f:NgForm)
{
let fd:FormData=new FormData();
fd.append("file",this.file)
let employee:Employee=f.value

console.log(JSON.stringify(employee.department))
fd.append("Employee",JSON.stringify(employee))
this.serviceEmp.saveEmployee(fd).subscribe(
()=>this.router.navigate(['/list'])
)
}
    file!: File;
selectimage(event:any)
{
this.file=event.target.files[0];

}
}
