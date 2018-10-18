import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Vehicle} from '../../entities/vehicle';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {AngularFireStorage} from '@angular/fire/storage';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';
import {Settings} from '../../config/settings';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit, OnChanges{
  @Input() public vehicle: Vehicle;
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public uploadCount = 0;
  public fuelTypes = [ 'Petrol', 'Hybrid', 'Disel', 'Electric' ];
  public categories = Settings.VEHICLE_CATEGORIES;
  public isEdit = false;

  @ViewChild('prev') prev: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(
    private storage: AngularFireStorage,
    private dataService: DataService) {
  }

  ngOnInit() {
    if (this.vehicle) {
      this.isEdit = true;
    } else {
      this.vehicle = new Vehicle({});
    }
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  public complete(): void {
    this.dataService.uploadPhotos(this.vehicle.photos, this.photos, this.vehicle.ID).then((status) => {
      this.vehicle.ownerName = UserState.user.name;
      this.vehicle.ownerID = UserState.user.id;
      this.dataService.saveEntity(Entity.vehicles, this.vehicle);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
