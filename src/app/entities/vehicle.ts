import {Entity} from './entity';

export class Vehicle extends Entity {
    public model: string;
    public ownerName: string;
    public ownerImage: string;
    public regNo: string;
    public fuelType: string;
    public category: string;
    public engine: string;
    public manufactYear: number;
    public manufactCountry: string;
    public photos = ['', '', '', ''];
    // Entiy ID is the chassis number
}
