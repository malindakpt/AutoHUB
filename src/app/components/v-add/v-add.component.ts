import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../../entities/vehicle';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import {PopupComponent} from '../../components-sub/popup/popup.component';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-v-add',
    templateUrl: './v-add.component.html',
    styleUrls: ['./v-add.component.scss']
})
export class VAddComponent implements OnInit {
    public vehicle: Vehicle;


    // public img;
    public img1;
    public img2;
    public img3;
    public img4;

    public simg0;
    public simg1;
    public simg2;
    public simg3;
    public simg4;

    public oFReader;
    public rFilter;

    public photo1;
  public photo2;
  public photo3;
  public photo4;

    @ViewChild('prev') prev: ElementRef;
    @ViewChild('img') img: ElementRef;



    constructor(
      private storage: AngularFireStorage,
        private fs: AngularFirestore,
        public snackBar: MatSnackBar) {
        this.vehicle = new Vehicle;
    }

    ngOnInit() {
    }

    public photo1Change(data): void {

      this.photo1 = data;
    }
  public photo2Change(data): void {
      this.photo2 = data;
  }
  public photo3Change(data): void {
    this.photo3 = data;
  }
  public photo4Change(data): void {
    this.photo4 = data;
  }

  public uploadPhotos(): void{
    const filePath = 'images2/car.jpg';
    const ref = this.storage.ref(filePath);
    ref.putString(this.photo1, 'data_url').then(function(snapshot) {
      console.log('Uploaded a base64 string!');
    });
  }

    public addVehicle() {
        const that = this;
        const citiesRef = this.fs.firestore.collection('autoHUB');
        citiesRef.doc(this.vehicle.chassisNo).set(Object.assign({}, this.vehicle)).then(function () {
            console.log('Document successfully written!');
            that.snackBar.openFromComponent(PopupComponent, {
                duration: 5000,
                data: { message: 'Vehicle Added Successfylly!' },
                verticalPosition: 'top'
            });

        }).catch(function (error) {
                console.error('Error writing document: ', error);
        });
    }
}
