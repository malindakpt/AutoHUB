import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../entities/vehicle';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { PopupComponent } from 'src/app/components-sub/popup/popup.component';

@Component({
  selector: 'app-v-add',
  templateUrl: './v-add.component.html',
  styleUrls: ['./v-add.component.scss']
})
export class VAddComponent implements OnInit {
  public vehicle: Vehicle;
  constructor(
    private fs: AngularFirestore,
    public snackBar: MatSnackBar) {
    this.vehicle = new Vehicle;
  }

  ngOnInit() {
  }

  public addVehicle(){
    const that = this;
    var citiesRef = this.fs.firestore.collection("autoHUB");
    citiesRef.doc(this.vehicle.chassisNo).set(Object.assign({}, this.vehicle)).then(function() {
      console.log("Document successfully written!");
      that.snackBar.openFromComponent(PopupComponent, {
        duration: 5000,
        data: {message: "Vehicle Added Successfylly!"},
        verticalPosition : 'top'
      });
     
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }

}
