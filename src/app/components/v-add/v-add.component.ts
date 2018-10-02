import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../../entities/vehicle';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import {PopupComponent} from '../../components-sub/popup/popup.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-v-add',
    templateUrl: './v-add.component.html',
    styleUrls: ['./v-add.component.scss']
})
export class VAddComponent implements OnInit {
    public vehicle: Vehicle;
    public vCount = ['', '', '', ''];
    public photos = ['', '', '', ''];
    public oFReader;
    public rFilter;
    public uploadCount = 0;


  public downloadURL;

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

    public onPhotoChange(idx: number, data: string): void {
      this.photos[idx] = data;
    }

    public complete(): void {
      this.uploadCount = 0;
        for (let i = 0; i < this.vehicle.photos.length; i++) {
          this.uploadPhoto(i, this.photos[i], this.vehicle.chassisNo);
        }
    }

    public uploadPhoto(idx: number, imgProp: string, chassis: string): void {
      const filePath = 'images/' + chassis + '#' + idx + '.jpg';
      const ref = this.storage.ref(filePath);
      const task = ref.putString(imgProp, 'data_url');
      task.snapshotChanges().pipe(
        finalize(() =>
          ref.getDownloadURL().subscribe(data => {
            this.vehicle.photos[idx] = data;
            ++this.uploadCount;
            if (this.uploadCount === this.photos.length) {
              this.addVehicle();
            }
          })
        )
      ).subscribe();
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
