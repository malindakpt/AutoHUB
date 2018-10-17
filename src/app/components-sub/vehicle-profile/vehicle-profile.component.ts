import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Vehicle} from '../../entities/vehicle';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.scss']
})
export class VehicleProfileComponent implements OnInit, OnDestroy {

  public swiperConfig = {
    loop: false,
    navigation: true,
  };

  public myVehicles: Vehicle[] = [];
  public selectedVehicle;
  public showEdit: boolean;
  public photos = ['', '', '', ''];
  public isSearchResult;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute) { }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((profile: Vehicle) => {
      if (profile.ID) {
        this.isSearchResult = true;
        this.selectedVehicle = profile;
        this.onVehicleChange();
        this.dataService.getMyVehicles().then((vehicles) => {
          this.myVehicles = vehicles;
        });
        this.dataService.getMyVehicles();
      } else {
        this.isSearchResult = false;
        this.dataService.getMyVehicles().then((vehicles) => {
          this.myVehicles = vehicles;
          if (this.myVehicles.length > 0) {
            this.selectedVehicle = this.myVehicles[0];
            this.onVehicleChange();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
  }

  public swapEditBtn() {
    this.showEdit = !this.showEdit;
    console.log(this.selectedVehicle);
  }
  public onVehicleChange() {
    this.isSearchResult = false;
    this.dataService.resetVehicleNews();
  }

}
