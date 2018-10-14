import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Vehicle} from '../../entities/vehicle';
import {News} from '../../entities/news';

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
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMyVehicles();
    this.subsctiption = this.dataService.onVehiclesUpdated.subscribe((v) => {
      this.myVehicles = v;
      this.selectedVehicle = this.myVehicles[0].ID;
      this.vehiChanged();
    });
  }

  ngOnDestroy(): void {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }

  public vehiChanged() {
    this.dataService.resetVehicleNews();
    this.vehicle = this.dataService.getVehicleInfo(this.selectedVehicle);
  }

}
