import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vehicle } from '../../entities/vehicle';
import {News} from '../../entities/news';
import {UserState} from '../../services/userState';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  public myVehicles: Vehicle[] = [];
  public news = new News({});
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.myVehicles = this.dataService.getMyVehicles();
  }

  public complete(): void {
    this.news.ID = UserState.getUniqueID();
    this.dataService.addNews(UserState.getUniqueID(), this.news, this.photos);
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

}
