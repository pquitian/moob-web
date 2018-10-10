import { Vehicle } from './vehicle.model';

export class User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    vehicles: Array<Vehicle> = [];
    createdAt?: Date;
    updatedAt?: Date;
}
