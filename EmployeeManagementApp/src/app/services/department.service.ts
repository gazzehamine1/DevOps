import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
@Injectable({
providedIn: 'root'
})
export class DepartmentService {
host="http://localhost:8081/restapiemployee"
constructor(private client:HttpClient) {}
    public departments: Department[] = [];
public getAllDepartments():Observable<Department[]>
{return this.client.get<Department[]>(this.host+"/allDepartments")}
public addDepartment(fd:FormData):Observable<void>
{return this.client.post<void>(this.host+"/addDepartment",fd);}
public deleteDepartment(id: string):Observable<void>
{return this.client.delete<void>(this.host+"/deleteDepartment/"+id);}
/*
public getCategorie(id: number):Observable<Department>
{return this.client.get<Department>(this.host+"/categorie/"+id);}
public addCategorie(department:Department):Observable<void>
{return this.client.post<void>(this.host+"/add",department);}
public deletecategorie(idc: string):Observable<void>
{return this.client.delete<void>(this.host+"/delete/"+idc);}*/
}