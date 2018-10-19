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
  public searchTypes = [
    { key: 0, val: 'Search by Reg. No.' },
    { key: 1, val: 'Search by Chassis No.'}
    ];
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<SearchVehicleComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.searchType = this.searchTypes[0].key;
  }
  ngOnInit() {
  }

  public onKeydown(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  public search(): void {
    const prop = this.searchType === 0 ? 'regNo' : 'ID';
    const key = this.searchType === 0 ? this.regNo.replace(/[^a-zA-Z0-9]/g, '') : this.chassisNo.replace(/[^a-zA-Z0-9]/g, '');
    this.dataService.getEntity(Entity.vehicles, prop, key, (dat) => {
      if (dat) {
        this.dialogRef.close();
        this.router.navigate(['/secure/profile'], {queryParams: dat});
      } else {
        this.noResult = true;
      }
    });
  }
}
