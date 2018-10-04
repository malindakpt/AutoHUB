import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entities} from '../enum/entities.enum';

@Injectable()
export class DataService {
  constructor(
    private authService: AuthenticationService,
    private fs: AngularFirestore,
  ) {
  }

  public myVehicles: Vehicle[];

  public getMyVehicles(): any {
    if (!this.myVehicles) {
      this.myVehicles = new Array<Vehicle>();
      this.requestMyVehicles(this.authService.userData.id);
    }
    return this.myVehicles;
  }


  public requestMyVehicles(userID: string) {
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    this.fs.firestore.collection(Entities.vehicles).where('owner', '==', userID)

      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          myVehicles.push(new Vehicle(doc.data()));
        });
        Object.assign(that.myVehicles, myVehicles);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }
}
