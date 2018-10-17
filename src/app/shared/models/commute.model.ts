import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export class Commute {
    id?: string;
    origin: number[] = [];
    destination: number[] = [];
    hrOrigin: string;
    hrDestination: string;
    vehicle: Vehicle;
    driver: User;
    passengers: User[] = [];
    departureTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
