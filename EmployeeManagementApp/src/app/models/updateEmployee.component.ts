import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';
import { Department } from './department';
import { Employee } from './employee';

@Component({
selector: 'app-update',
templateUrl: '../templates/updateEmployee.html',
styleUrls: ['../templates/addEmployee.component.css']
})
export class UpdateComponent implements OnInit {
    formEmployee!: FormGroup;
constructor(private ar:ActivatedRoute,private service:EmployeeService,
private fb:FormBuilder,private serviceDep:DepartmentService,
private router:Router) { }
    employee!: Employee;
    departments: Department[]=[];
    id!: string;
ngOnInit() {
/* this.serviceCat.getAllCategories().subscribe(
data=>this.categories=data)*/
this.serviceDep.getAllDepartments().subscribe(
    data=>this.departments=data
    )
this.id=this.ar.snapshot.paramMap.get('id')||"";

this.service.getEmployee(parseInt(this.id)).subscribe(
data=>{this.employee=data
this.formEmployee=this.fb.group({
    name:[this.employee.name,Validators.required],
    email:[this.employee.email,Validators.required],
    phone:[this.employee.phone,Validators.required],
    job:[this.employee.job,Validators.required],
    department:[this.employee.department,Validators.required],
photo:[""]
}
)
});
}
compareDep(d:Department,dd:Department):boolean
{return d&& dd?d.id===dd.id:d===dd}
    file!: File;
selectImage(event:any)
{this.file=event.target.files[0]; }

update()
{Swal.fire({
title: 'Do you want to save the changes?',
showDenyButton: true,
showCancelButton: true,
confirmButtonText: 'Save',
denyButtonText: `Don't save`,
}).then((result) => {
/* Read more about isConfirmed, isDenied below
*/
if (result.isConfirmed) {
let fd:FormData=new FormData();
fd.append("file",this.file)
let emp:Employee=this.formEmployee.value
emp.id=parseInt(this.id)
fd.append("employee",JSON.stringify(emp))
this.service.updateEmployee(fd).subscribe(
()=>{this.router.navigateByUrl('/list')
;
}
)
Swal.fire('Saved!', '', 'success')
} else if (result.isDenied) {
Swal.fire('Changes are not saved', '',
'info')
}
})
}
}

