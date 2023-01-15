import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee.service';
import { Manager } from './manager';

@Component({
  selector: 'app-employee-list',
  templateUrl: '../templates/employeesList.html',
})
export class EmployeeListComponent implements OnInit {
    public employees : Employee[]=[];
    public manager!: Manager;
    public employee!: Employee;

    employeeFilter : Employee[]= [];

    constructor(public employeeService: EmployeeService){}
    filtrer(mot:string)
    { return this.employees.filter(x=>x.name.indexOf(mot)!=-1) }
    set texte(tt:string)
    { 
      
      this.employeeFilter=this.filtrer(tt) }


  ngOnInit(): void {
    this.getEmployees();  


    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      for ( this.employee of employees) {
        this.employeeService.getEmployeeManager(this.employee.id).subscribe(manager => {
          this.employee.manager = manager;
        });
      }
      this.employeeFilter=employees
    });
  
  }
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
        (response: Employee[])=>{
          this.employees=response;
          this.employeeFilter=this.employees;

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



  delete(e:Employee)
  {Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
  if (result.isConfirmed) {
  this.employeeService.deleteEmployee(e.id).subscribe(
  ()=>{
  this.employeeFilter.splice(this.employeeFilter.indexOf(e),1)
  } )
  Swal.fire(
  'Deleted!',
  'Your file has been deleted.',
  'success'
  ) } }) }
}
