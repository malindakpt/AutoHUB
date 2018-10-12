import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.scss']
})
export class VehicleProfileComponent implements OnInit {

  public swiperConfig = {
    loop: true,
    navigation: true,
  };

  public vehicle;
  public vehicleID = 'lkjlkj12312';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.vehicle = this.dataService.getVehicleInfo(this.vehicleID);
  }

}
