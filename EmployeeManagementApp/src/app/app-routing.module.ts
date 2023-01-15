import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // import FormsModule

import { NgModel } from '@angular/forms';

import { AjouterComponent } from './models/addEmployee';
import { EmployeeListComponent } from './models/employeeList.component';
import { AddDepartmentComponent } from './models/addDepartment';
import { ManagerListComponent } from './models/managersList.component';
import { AddManagerComponent } from './models/addManager';
import { DepartmentListComponent } from './models/departmentList.component';
import { UpdateComponent } from './models/updateEmployee.component';
import { UpdateManager } from './models/updateManager.component';

const routes: Routes = [ { path: '', redirectTo: '/ajouter', pathMatch: 'full' },
{ path: 'ajouter', component: AjouterComponent },
{ path: 'list', component: EmployeeListComponent} ,
{path:'addDepartment',component:AddDepartmentComponent},
{path:'listManagers',component:ManagerListComponent},
{path:'addManager',component:AddManagerComponent},
{path:'listDepartments',component:DepartmentListComponent},
{path:'updateEmployee/:id',component:UpdateComponent},
{path:'updateManager/:id',component:UpdateManager},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
