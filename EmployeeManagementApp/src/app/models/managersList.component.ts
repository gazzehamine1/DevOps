import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Manager } from './manager';
import Swal from 'sweetalert2';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: '../templates/managersList.html',
})
export class ManagerListComponent implements OnInit {
    public managers : Manager[]=[];
    managerFilter : Manager[]= [];
    constructor(public managerService: ManagerService){}

    filtrer(mot:string)
    { return this.managers.filter(x=>x.name.indexOf(mot)!=-1) }
    set texte(tt:string)
    { 
      
      this.managerFilter=this.filtrer(tt) }


      delete(m:Manager)
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
      this.managerService.deleteManager(m.id).subscribe(
      ()=>{
      this.managerFilter.splice(this.managerFilter.indexOf(m),1)
      } )
      Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
      ) } }) }
    
  ngOnInit(): void {
    this.getManagers();  

  }
  public getManagers(): void{
    this.managerService.getManagers().subscribe(
        (response: Manager[])=>{
          this.managers=response;
          this.managerFilter=this.managers;
        },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }      
  
    );
  }/*
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
  ) } }) }*/

  }
