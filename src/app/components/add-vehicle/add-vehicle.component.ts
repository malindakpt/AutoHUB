import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Vehicle} from '../../entities/vehicle';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {AngularFireStorage} from '@angular/fire/storage';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';
import {Settings} from '../../config/settings';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-v-add',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  public vehicle: Vehicle;
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public uploadCount = 0;
  public fuelTypes = [ 'Petrol', 'Hybrid', 'Disel', 'Electric' ];
  public categories = Settings.VEHICLE_CATEGORIES;

  @ViewChild('prev') prev: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(
    private storage: AngularFireStorage,
    private dataService: DataService,
    private fs: AngularFirestore,
    public snackBar: MatSnackBar) {
    this.vehicle = new Vehicle({});
  }

  ngOnInit() {
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  public complete(): void {
    this.dataService.uploadPhotos(this.vehicle.photos, this.photos, this.vehicle.ID).then((status) => {
      this.vehicle.ownerName = UserState.user.name;
      this.vehicle.ownerImage = UserState.user.image;
      this.vehicle.ownerID = UserState.user.id;
      this.dataService.saveEntity(Entity.vehicles, this.vehicle);
    });
  }
}
