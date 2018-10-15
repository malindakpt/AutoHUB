import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss']
})
export class SearchVehicleComponent implements OnInit {

  public chassisNo = '';
  public regNo = '';
  public searchType ;
  public searchTypes = ['Search by Reg. No.', 'Search by Chassis No.'];
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<SearchVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
this.searchType = this.searchTypes[0];
  }
  ngOnInit() {
  }

}
