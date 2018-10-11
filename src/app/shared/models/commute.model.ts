import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export class Commute {
    id?: string;
    origin: number[] = [];
    destination: number[] = [];
    vehicle: Vehicle;
    driver: User;
    passengers: User[] = [];
    departureTime: Date;
    arrivalTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
