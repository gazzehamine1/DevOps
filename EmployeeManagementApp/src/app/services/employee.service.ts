import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Manager } from '../models/manager';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  host="http://localhost:8081/restapiemployee"

  constructor(private http: HttpClient){}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.host+"/all");
  }

  public getEmployee(id:number): Observable<Employee> {
    return this.http.get<Employee>(this.host+"/getEmployeeById/"+id);
  }

  getEmployeeManager(employeeId: number): Observable<Manager> {
    return this.http.get<Manager>(this.host+`/findEmployeeManagerByID/${employeeId}`);
  }


  public saveEmployee(fd:FormData):Observable<void>{
    return this.http.post<void>(this.host+"/add",fd);
    }

  public updateEmployee(fd:FormData): Observable<Employee> {
    return this.http.put<Employee>(this.host+"/update", fd);
  }

  public deleteEmployee(id:number):Observable<void>{
    return this.http.delete<void>(this.host+`/delete/${id}`);
    }
}