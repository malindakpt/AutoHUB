import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../../entities/vehicle';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { PopupComponent } from '../../components-sub/popup/popup.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { Entities } from '../../enum/entities.enum';

@Component({
  selector: 'app-v-add',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  public vehicle: Vehicle;
  public photoCount = ['', '', '', ''];
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
    public snackBar: MatSnackBar,
    private authService: AuthenticationService) {
    this.vehicle = new Vehicle({});
    this.vehicle.owner = this.authService.userData.id;
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
    const vehicleRef = this.fs.firestore.collection(Entities.vehicles);
    vehicleRef.doc(this.vehicle.chassisNo).set(Object.assign({}, this.vehicle)).then(function () {
      console.log('Document successfully written!');
      that.snackBar.openFromComponent(PopupComponent, {
        duration: 5000,
        data: { message: 'Vehicle adding success' },
        verticalPosition: 'top'
      });

    }).catch(function (error) {
      console.error('Error writing document: ', error);
    });
  }
}
