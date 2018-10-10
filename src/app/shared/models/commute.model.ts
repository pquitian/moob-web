import { User } from './user.model';
import { Vehicle } from './vehicle.model';
import { Coordinates } from './misc/coordinates.model';

export class Commute {
    id?: string;
    origin: Coordinates[] = [];
    destination: Coordinates[] = [];
    vehicle: Vehicle;
    driver: User;
    passengers: User[] = [];
    departureTime: Date;
    arrivalTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
