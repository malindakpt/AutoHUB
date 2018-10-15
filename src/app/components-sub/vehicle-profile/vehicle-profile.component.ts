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

  public subsctiption;
  public myVehicles: Vehicle[] = [];
  public vehicle = new Vehicle({});
  public selectedVehicle;
  public searchedVehicle;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((profile: Vehicle) => {
      console.log('profile', profile);
      if (profile.ID) {
        this.vehicle = profile;
        this.selectedVehicle = this.vehicle;
        this.vehiChanged();
        this.subsctiption = this.dataService.onVehiclesUpdated.subscribe((v) => {
          this.myVehicles = v;
        });
        this.dataService.getMyVehicles();
      } else {
        this.subsctiption = this.dataService.onVehiclesUpdated.subscribe((v) => {
          this.myVehicles = v;
          this.selectedVehicle = this.myVehicles[0];
          this.vehiChanged();
        });
        this.dataService.getMyVehicles();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }

  public vehiChanged() {
    this.dataService.resetVehicleNews();
    this.vehicle = this.selectedVehicle;
  }

}
