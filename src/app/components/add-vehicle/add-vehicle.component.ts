import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Vehicle} from '../../entities/vehicle';
import {AngularFireStorage} from '@angular/fire/storage';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';
import {Settings} from '../../config/settings';
import {DataService} from '../../services/data.service';
import {News} from '../../entities/news';
import {NewsType} from '../../enum/news.-type.enum';

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
  public autoNews;
  private isPhotosChanged = false;

  @ViewChild('prev') prev: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(
    private storage: AngularFireStorage,
    private dataService: DataService) {
  }

  ngOnInit() {
    if (this.vehicle) {
      this.isEdit = true;
      this.autoNews = new News({});
      this.autoNews.ID = UserState.getUniqueID();
      this.autoNews.vehicleID = this.vehicle.ID;
      this.autoNews.type = NewsType.COMMON;
      this.autoNews.time = UserState.getTime();
      this.autoNews.ownerID = UserState.user.id;
      this.autoNews.ownerName = UserState.user.name;
      this.autoNews.photos[0] = this.vehicle.photos[0];
      this.autoNews.photos[1] = this.vehicle.photos[1];
      this.autoNews.photos[2] = this.vehicle.photos[2];
      this.autoNews.photos[3] = this.vehicle.photos[3];
    } else {
      this.vehicle = new Vehicle({});
    }
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
    this.isPhotosChanged = true;
  }

  public complete(): void {
    if (this.isEdit && this.isPhotosChanged) {
      this.dataService.saveEntity(Entity.news, this.autoNews);
    }
    this.vehicle.photoID = UserState.getUniqueID()
    this.vehicle.regNo = this.vehicle.regNo.replace(/[^a-zA-Z0-9]/g, '');
    this.dataService.uploadPhotos(this.vehicle.photos, this.photos, this.vehicle.photoID ).then((status) => {
      this.vehicle.ownerName = UserState.user.name;
      this.vehicle.ownerID = UserState.user.id;
      this.dataService.saveEntity(Entity.vehicles, this.vehicle);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
