export class Vehicle {
    public owner: string;
    public regNo: string;
    public chassisNo: string;
    public manufactYear: number;
    public manufactCountry: string;
    public photos = ['', '', '', ''];

    constructor(obj: Object) {
        Object.assign(this, obj);
    }
}
