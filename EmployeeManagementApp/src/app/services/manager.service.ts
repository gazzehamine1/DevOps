import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager';

@Injectable({providedIn: 'root'})
export class ManagerService {
  host="http://localhost:8081/restapimanager"

  constructor(private http: HttpClient){}

  public getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.host+"/all");
  }
  
  public getManager(id:number): Observable<Manager> {
    return this.http.get<Manager>(this.host+"/getManagerById/"+id);
  }
  public saveManager(fd:FormData):Observable<void>{
    return this.http.post<void>(this.host+"/add",fd);
    }
    public deleteManager(id:number):Observable<void>{
      return this.http.delete<void>("http://localhost:8081/restapiemployee/deleteManager/"+id);
      }
      public updateEmployee(fd:FormData): Observable<Manager> {
        return this.http.put<Manager>(this.host+"/update", fd);
      }
  
}