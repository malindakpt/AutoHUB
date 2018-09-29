import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-profile',
  templateUrl: './v-profile.component.html',
  styleUrls: ['./v-profile.component.scss']
})
export class VProfileComponent implements OnInit {

  public swiperConfig = {
    direction: 'horizontal'
  };
  
  constructor() { }

  ngOnInit() {
  }

}
