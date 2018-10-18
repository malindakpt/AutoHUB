import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SearchVehicleComponent} from '../search-vehicle/search-vehicle.component';
import {DataService} from '../../services/data.service';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';

@Component({
  selector: 'app-ownership-transfer',
  templateUrl: './ownership-transfer.component.html',
  styleUrls: ['./ownership-transfer.component.scss']
})
export class OwnershipTransferComponent implements OnInit {

  public confirmStage = 0;
  public userState = UserState;
  public userName;
  public userID;
  public phoneNo;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    public dialogRef: MatDialogRef<SearchVehicleComponent>,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.userID = this.data.user.split('##')[0];
    this.userName = this.data.user.split('##')[1];
  }

  public onReject(): void {
    const v = this.data.vehicle;
    v.nextOwner = '';
    this.dataService.saveEntity(Entity.vehicles, v);
    this.dialogRef.close();
  }

  public onAccept(): void {
    this.confirmStage = 1;
  }

  public onAccept2(): void {
    this.confirmStage = 2;
    const v = this.data.vehicle;
    v.previousOwners.push(v.ownerID + '#' + v.ownerName);
    v.ownerID = this.userID;
    v.ownerName = this.userName;
    v.nextOwner = '';
    this.dataService.saveEntity(Entity.vehicles, v);
    this.dialogRef.close();
  }

}
