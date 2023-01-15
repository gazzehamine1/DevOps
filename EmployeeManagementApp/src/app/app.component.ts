import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees : Employee[]=[];
constructor(private employeeService: EmployeeService){}
ngOnInit(){
  this.getEmployees();  
  
}
public getEmployees(): void{
  this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees=response;
      },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }      

  );
}


public onOpenModal(employee: Employee,mode: string):void{
  const container = document.getElementById("main-container");
  const button = document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode === 'add'){
    button.setAttribute('data-target','#addEmployeeModal');

  }
  if(mode === 'edit'){
    button.setAttribute('data-target','#updateEmployeeModal');

  }
  if(mode === 'delete'){
    button.setAttribute('data-target','#deleteEmployeeModal');

  }
  container?.appendChild(button);
  button.click();
}
public onOpenAddModal():void{
  const container = document.getElementById("main-container");
  const button = document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
   button.setAttribute('data-target','#addEmployeeModal');
  container?.appendChild(button);
  button.click();
}

}
