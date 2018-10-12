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
    loop: true,
    navigation: true,
  };

  public myVehicles: Vehicle[] = [];
  public vehicle = new Vehicle({});
  public selectedVehicle;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMyVehicles();
    this.dataService.onVehiclesUpdated.subscribe((v) => {
      this.myVehicles = v;
      this.selectedVehicle = this.myVehicles[0].ID;
      this.vehiChanged();
    });
  }

  ngOnDestroy(): void {
    this.dataService.onVehiclesUpdated.unsubscribe();
  }

  public vehiChanged() {
    this.dataService.resetVehicleNews();
    this.vehicle = this.dataService.getVehicleInfo(this.selectedVehicle);
  }

}
