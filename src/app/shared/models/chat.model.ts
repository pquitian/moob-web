import { User } from './user.model';

export class Chat {
    id?: string;
    from?: User;
    to?: User;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}
