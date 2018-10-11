import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-profile',
  templateUrl: './v-profile.component.html',
  styleUrls: ['./v-profile.component.scss']
})
export class VProfileComponent implements OnInit {

  public swiperConfig = {
    loop: true,
    navigation: true,
  };

  public vehicleID = 'lkjlkj12312';
  constructor() { }

  ngOnInit() {
  }

}
