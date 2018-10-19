import {Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vehicle } from '../../entities/vehicle';
import {News} from '../../entities/news';
import {UserState} from '../../config/userState';
import {NewsType} from '../../enum/news.-type.enum';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  public myVehicles: Vehicle[] = [];
  public newsTypes = NewsType;
  public serviceTypes = [
    { name: 'News', val: NewsType.COMMON },
    { name: 'Normal Service', val: NewsType.SERVICE },
    { name: 'Maintenance/Upgrade', val: NewsType.MAINTENANCE },
    { name: 'Repair', val: NewsType.REPAIR },
  ];
  public news = new News({});
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public date;
  public selectedVehicle: Vehicle;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getMyVehicles().then(vehis => {
      this.myVehicles = vehis;
    });
    this.date = new Date();
  }

  public complete(): void {
    this.news.time = UserState.getTime();
    this.news.ID = UserState.getUniqueID();
    if (this.news.type !== this.serviceTypes[0].val) {
      this.news.vehicleID = this.selectedVehicle.ID;
      this.news.cat = this.selectedVehicle.category || 'NO-VEHI-CAT';
    }
    this.dataService.addNews(UserState.getUniqueID(), this.news, this.photos);
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }
}
