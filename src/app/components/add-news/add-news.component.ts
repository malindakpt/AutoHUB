import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Vehicle} from '../../entities/vehicle';
import {News} from '../../entities/news';
import {UserState} from '../../config/userState';
import {NewsType} from '../../enum/news.-type.enum';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit, OnChanges {
  public myVehicles: Vehicle[] = [];
  public newsTypes = NewsType;
  public serviceTypes = [
    { name: 'Discussion Item', val: NewsType.COMMON },
    { name: 'Normal Service', val: NewsType.SERVICE },
    { name: 'Maintenance/Upgrade', val: NewsType.MAINTENANCE },
    { name: 'Repair', val: NewsType.REPAIR },
  ];
  public news = new News({});
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public date;
  @Input() resetCount: string;
  public selectedVehicle: Vehicle;

  constructor(
    public snackBar: MatSnackBar,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getMyVehicles().then(vehis => {
      this.myVehicles = vehis;
    });
    this.date = new Date();
  }

  public complete(): void {
    if (this.validate()) {
      this.news.time = this.date.getTime();
      this.news.ID = UserState.getUniqueID();
      if (this.news.type !== this.serviceTypes[0].val) {
        this.news.vehicleID = this.selectedVehicle.ID;
        this.news.cat = this.selectedVehicle.category || 'NO-VEHI-CAT';
      }
      this.dataService.addNews(this.news.ID, this.news, this.photos);
      console.log('News added: ' + this.news.ID);
      this.dataService.resetVehicleNews();
    }
  }

  public validate(): boolean {
    if (this.news.type === NewsType.COMMON ) {
      if (!this.news.desc) {
        this.showError('Add a description');
        return false;
      }
    } else {
      if (!this.selectedVehicle) {
        this.showError('Select a vehicle');
        return false;
      } else if (!this.news.odoMeter) {
        this.showError('Please add ODO meter value');
        return false;
      } else if (!this.news.cost) {
        this.showError('Cost cannot be empty');
        return false;
      }
    }
    if (!this.date) {
      this.showError('Date cannot be empty');
      return false;
    }
    return true;
  }


  private showError(msg: string): void {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 5000
    });
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.news = new News({});
  }
}
