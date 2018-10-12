import { Component, OnInit } from '@angular/core';

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

  public vehicleID = 'lkjlkj12312';
  constructor() { }

  ngOnInit() {
  }

}
