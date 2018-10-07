import {Entity} from './entity';

export class Vehicle extends Entity {
    public owner: string;
    public regNo: string;
    public manufactYear: number;
    public manufactCountry: string;
    public photos = ['', '', '', ''];
    // Entiy ID is the chassis number
}
