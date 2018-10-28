import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Vehicle} from '../../entities/vehicle';
import {AngularFireStorage} from '@angular/fire/storage';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';
import {Settings} from '../../config/settings';
import {DataService} from '../../services/data.service';
import {News} from '../../entities/news';
import {NewsType} from '../../enum/news.-type.enum';
import {Event} from '../../enum/event.enum';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SearchVehicleComponent} from '../../components-sub/search-vehicle/search-vehicle.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit, OnChanges {
  @Input() public vehicle: Vehicle;
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public uploadCount = 0;
  public fuelTypes = Settings.FUEL_TYPES;
  public categories = Settings.VEHICLE_CATEGORIES;
  public isEdit = false;
  public autoNews;
  private isPhotosChanged = false;
  private unique;
  brandControl = new FormControl();
  countryControl = new FormControl();
  brands = Settings.VEHICLE_BRANDS;
  countries = Settings.COUNTRIES;
  filteredBrands: Observable<String[]>;
  filteredCountries: Observable<String[]>;
  @ViewChild('prev') prev: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(
    private storage: AngularFireStorage,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataService: DataService) {

  }

  displayFn(str?: string): string | undefined {
    return str ? str : undefined;
  }

  private _filter(name: string, options: Array<string>): String[] {
    const filterValue = name.toLowerCase();

    return options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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

    this.filteredCountries = this.countryControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.countries) : this.countries.slice())
      );
    this.filteredBrands = this.brandControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.brands) : this.brands.slice())
      );
  }

  public onPhotoChange(idx: number, data: string): void {
    if (data.length > 10) {
      this.photos[idx] = data;
      this.isPhotosChanged = true;
    }
  }

  public complete(): void {
    console.log(this.vehicle);
    if (this.validate() || !Settings.VALIDATE_ADD_VEHICLE) {
      this.unique = UserState.getUniqueID();
      if (this.isEdit) {
        if (this.isPhotosChanged) {
          this.dataService.saveEntity(Entity.news, this.autoNews);
        }
      } else {
        this.vehicle.ID = this.unique;
      }
      const vehicles = [];
      if (!this.isEdit) {
        this.dataService.getEntity(Entity.vehicles, 'chassisNo', this.vehicle.chassisNo, (data) => {
          if (data) {
            vehicles.push(data);
          } else {
            if (vehicles.length > 0) {
              this.alreadyExist(vehicles, 'There are ' + vehicles.length + ' vehicles' +
                ' with same Chassis Number. Click on it and request ownership of it');
            } else {
              this.dataService.getEntity(Entity.vehicles, 'regNo', this.vehicle.regNo, (data1) => {
                if (data1) {
                  vehicles.push(data1);
                } else {
                  if (vehicles.length === 0) {
                    this.addNewVehicle(this.unique);
                  } else {
                    this.alreadyExist(vehicles, 'There are ' + vehicles.length + ' vehicles' +
                      ' with same Registration Number. Click on it and request ownership of it');
                  }
                }
              });
            }
          }
        });
      } else {
        this.addNewVehicle(this.unique);
      }

    }
  }

  private addNewVehicle(unique: string): void {
    this.vehicle.photoID = unique;
    this.vehicle.regNo = this.vehicle.regNo.replace(/[^a-zA-Z0-9]/g, '');
    this.vehicle.regNo = this.vehicle.regNo.toUpperCase();
    this.dataService.uploadPhotos(this.vehicle.photos, this.photos, this.vehicle.photoID).then((status) => {
      this.vehicle.ownerName = UserState.user.name;
      this.vehicle.ownerID = UserState.user.id;
      this.dataService.saveEntity(Entity.vehicles, this.vehicle);
    });
  }

  validate(): boolean {
    if (!this.vehicle.category) {
      this.showError('Select the category of vehicle');
      return false;
    } else if (Settings.VEHICLE_BRANDS.indexOf(this.vehicle.brand) < 0) {
      this.showError('Invalid Brand');
      return false;
    } else if (!this.vehicle.model) {
      this.showError('Model cannot be empty');
      return false;
    } else if (!this.vehicle.chassisNo) {
      this.showError('Chassis No cannot be empty');
      return false;
    } else if (!this.vehicle.manufactYear) {
      this.showError('Manufactured year cannot be empty');
      return false;
    } else if (!this.vehicle.regNo) {
      this.showError('Registration No. cannot be empty');
      return false;
    } else if (!this.vehicle.fuelType) {
      this.showError('Select Fuel Type');
      return false;
    } else if (Settings.COUNTRIES.indexOf(this.vehicle.manufactCountry) < 0) {
      this.showError('Invalid manufactured country');
      return false;
    } else if (!this.vehicle.engine) {
      this.showError('Engine Model/CC cannot be empty');
      return false;
    } else {
      for (const p of this.photos) {
        if (!p && !this.isEdit) {
          this.showError('You should upload 4 photos from 4 sides');
          return false;
        }
      }
    }
    return true;
  }

  private showError(msg: string): void {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 5000
    });
  }

  private alreadyExist(vehicles: any, msg: string): void {
    const dat = {
      msg: msg,
      vehicles: vehicles
    };
    const dialogRef = this.dialog.open(SearchVehicleComponent, {
      data: dat
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === Event.CONTINUE) {
        console.log('Adding vehicle..');
        this.addNewVehicle(this.unique);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
