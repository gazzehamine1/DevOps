import { Manager } from "./manager";

export interface Department{
    id: number;
    name: string;
    manager:Manager;
}