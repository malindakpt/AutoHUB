import { Injectable } from "@angular/core";
import { Vehicle } from "../entities/vehicle";
import { NetworkService } from "./network.service";
import { AuthenticationService } from "./auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Entities } from "../enum/entities.enum";

@Injectable()
export class DataService {
    constructor(
        private networkService: NetworkService,
        private authService: AuthenticationService,
        private fs: AngularFirestore,
        ){}
    public myVehicles: Vehicle[];

    public getMyVehicles(): any{
        if(this.myVehicles){
            return this.myVehicles;
        } else {
            this.myVehicles = new Array<Vehicle>();
            this.requestMyVehicles(this.authService.userData.id);
        }
    }



    public requestMyVehicles(userID: string) {
        const myVehicles = [];
        console.log('send request for get myVehices');
        this.fs.firestore.collection(Entities.vehicles).where('owner', '==', userID)

            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    myVehicles.push(new Vehicle(doc));
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
}