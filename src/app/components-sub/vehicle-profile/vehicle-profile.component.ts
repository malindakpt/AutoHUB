import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Vehicle} from '../../entities/vehicle';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {OwnershipTransferComponent} from '../ownership-transfer/ownership-transfer.component';
import {UserState} from '../../config/userState';
import {Entity} from '../../enum/entities.enum';

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
  public userState = UserState;
  public isNew = false;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((profile: Vehicle) => {
      if (profile.ID) {
        this.isSearchResult = true;
        this.selectedVehicle = profile;
        this.refreshVehicle();
        this.dataService.getMyVehicles().then((vehicles) => {
          this.myVehicles = vehicles;
          if (this.myVehicles.length === 0) {
            this.isNew = true;
          }
        });
        this.dataService.getMyVehicles();
      } else {
        this.isSearchResult = false;
        this.dataService.getMyVehicles().then((vehicles) => {
          this.myVehicles = vehicles;
          if (this.myVehicles.length === 0) {
            this.isNew = true;
          }
          if (this.myVehicles.length > 0) {
            this.selectedVehicle = this.myVehicles[0];
            this.refreshVehicle();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
  }
  public requestOwnership(): void {
    const v = Object.assign({}, this.selectedVehicle);
    v.nextOwner = UserState.user.id + '##' + UserState.user.name;
    this.dataService.saveEntity(Entity.vehicles, v);
  }

  public swapEditBtn() {
    this.showEdit = !this.showEdit;
  }
  public onVehicleChange() {
    this.refreshVehicle();
    this.isSearchResult = false;
    this.showEdit = false;
  }

  private refreshVehicle(): void {
    this.dataService.resetVehicleNews();
    if (this.selectedVehicle.nextOwner) {
      this.showOwnershipTransferRequest();
    }
  }

  public showOwnershipTransferRequest(): void {
    const dialogRef = this.dialog.open(OwnershipTransferComponent, {
      data: {
        user: this.selectedVehicle.nextOwner,
        vehicle: this.selectedVehicle
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
