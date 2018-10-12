import {Entity} from './entity';

export class Vehicle extends Entity {
    public model: string;
    public owner: string;
    public regNo: string;
    public fuelType: string;
    public engine: string;
    public manufactYear: number;
    public manufactCountry: string;
    public photos = ['', '', '', ''];
    // Entiy ID is the chassis number
}
