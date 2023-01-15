import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';
import { AjouterComponent } from './models/addEmployee';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeListComponent } from './models/employeeList.component';
import { AddDepartmentComponent } from './models/addDepartment';
import { ManagerListComponent } from './models/managersList.component';
import { DepartmentService } from './services/department.service';
import { ManagerService } from './services/manager.service';
import { AddManagerComponent } from './models/addManager';
import { DepartmentListComponent } from './models/departmentList.component';
import { UpdateComponent } from './models/updateEmployee.component';
import { UpdateManager } from './models/updateManager.component';
const routes: Routes = [{path:"ajouter",component:AjouterComponent},{path:"list",component:EmployeeListComponent},{path:'updateEmployee/:id',component:UpdateComponent},
{path:"addDepartment",component:AddDepartmentComponent},{path:'listManagers',component:ManagerListComponent},{path:'addManager',component:AddManagerComponent},{path:'listDepartments',component:DepartmentListComponent},{path:'updateManager/:id',component:UpdateManager},

];


@NgModule({
  declarations: [
    AppComponent,
    AjouterComponent,
    EmployeeListComponent,
    AddDepartmentComponent,
    ManagerListComponent,
    AddManagerComponent,
    DepartmentListComponent,
    UpdateComponent,
    UpdateManager

  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
    
  ],
  providers: [EmployeeService,DepartmentService,ManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
