import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Entity} from '../../enum/entities.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss']
})
export class SearchVehicleComponent implements OnInit {
  public noResult = false;
  public chassisNo = '';
  public regNo = '';
  public searchType ;
  public searchTypes = ['Search by Reg. No.', 'Search by Chassis No.'];
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<SearchVehicleComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.searchType = this.searchTypes[0];
  }
  ngOnInit() {
  }

  public search(): void {
    this.dataService.getEntity(Entity.vehicles, 'regNo', this.regNo, (dat) => {
      if (dat) {
        this.dialogRef.close();
        this.router.navigate(['/secure/profile'], {queryParams: dat});
      } else {
        this.noResult = true;
      }
    });
  }
}
