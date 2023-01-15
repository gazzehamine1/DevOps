import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentService } from '../services/department.service';
import { ManagerService } from '../services/manager.service';
import { Department } from './department';
import { Manager } from './manager';

@Component({
selector: 'app-updateManager',
templateUrl: '../templates/updateManager.html',
styleUrls: ['../templates/addEmployee.component.css']
})
export class UpdateManager implements OnInit {
    formManager!: FormGroup;
constructor(private ar:ActivatedRoute,private service:ManagerService,
private fb:FormBuilder,private serviceDep:DepartmentService,
private router:Router) { }
    manager!: Manager;
    departments: Department[]=[];
    id!: string;
ngOnInit() {

this.serviceDep.getAllDepartments().subscribe(
    data=>this.departments=data
    )
this.id=this.ar.snapshot.paramMap.get('id')||"";

this.service.getManager(parseInt(this.id)).subscribe(
data=>{this.manager=data
this.formManager=this.fb.group({
    name:[this.manager.name,Validators.required],
    email:[this.manager.email,Validators.required],
    phone:[this.manager.phone,Validators.required],
    department:[this.manager.department,Validators.required],
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
let emp:Manager=this.formManager.value
emp.id=parseInt(this.id)
fd.append("Manager",JSON.stringify(emp))
this.service.updateEmployee(fd).subscribe(
()=>{this.router.navigateByUrl('/listManagers')
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

