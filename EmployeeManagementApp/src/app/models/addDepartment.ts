import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { Department } from './department';
import { DepartmentService } from '../services/department.service';

@Component({  
selector: 'app-addDepartment',
templateUrl: '../templates/addDepartment.html',
styleUrls: ['../templates/addEmployee.component.css']  , 

})



export class AddDepartmentComponent implements OnInit {
constructor(private serviceDep:DepartmentService,
private router:Router) { }
   
    

  
ngOnInit() {
}

save(f:NgForm)
{
let fd:FormData=new FormData();
let department:Department=f.value

fd.append("Department",JSON.stringify(department))
this.serviceDep.addDepartment(fd).subscribe(
()=>this.router.navigate(['/list'])
)
}

}
