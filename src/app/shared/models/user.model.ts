import { Vehicle } from './vehicle.model';

export class User {
    name: string;
    email: string;
    password?: string;
    avatar: string;
    vehicles: Array<Vehicle>;
    createdAt?: Date;
    updatedAt?: Date;
}
