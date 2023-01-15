import { Department } from "./department";

export interface Manager{
    id: number;
    name: string;
    photo: string;
    email: string;
    phone: string;
    department:Department;
 
}