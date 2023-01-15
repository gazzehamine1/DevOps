import { Department } from "./department";
import { Manager } from "./manager";

export interface Employee{
    id: number;
    name: string;
    photo: string;
    email: string;
    phone: string;
    job:string;
    department:Department;
    manager:Manager;
 
}