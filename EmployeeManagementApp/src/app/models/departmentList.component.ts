import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee.service';
import { Manager } from './manager';
import { Department } from './department';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: '../templates/departmentList.html',
})
export class DepartmentListComponent implements OnInit {
    public departments : Department[]=[];
 

    departmentFilter : Department[]= [];

    constructor(public departmentService: DepartmentService){}
    filtrer(mot:string)
    { return this.departments.filter(x=>x.name.indexOf(mot)!=-1) }
    set texte(tt:string)
    { 
      
      this.departmentFilter=this.filtrer(tt) }


  ngOnInit(): void {
    this.getDepartments();  

  }
  public getDepartments(): void{
    this.departmentService.getAllDepartments().subscribe(
        (response: Department[])=>{
          this.departments=response;
          this.departmentFilter=this.departments;

        },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }      
  
    );
  }/*
  public getEmployeeManager(employee:Employee): any{
    this.employeeService.getEmployeeManager(employee).subscribe(
        (response: Manager)=>{
          this.manager=response;
        },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }      
  
    );
  }*/

  
  public onOpenModal(employee: Employee,mode: string,id:number):void{
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
   
 
      button.setAttribute('data-target','#deleteEmployeeModal');
  
    
    container?.appendChild(button);
    button.click();
  }



 
}   
