import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vehicle } from '../../entities/vehicle';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  public  myVehicles: Vehicle[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.myVehicles = this.dataService.getMyVehicles();
  }

}
