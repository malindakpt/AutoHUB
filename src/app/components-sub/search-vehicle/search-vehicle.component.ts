import {Component, Inject, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Entity} from '../../enum/entities.enum';
import {Event} from '../../enum/event.enum';
import {Router} from '@angular/router';
import {Vehicle} from '../../entities/vehicle';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss']
})
export class SearchVehicleComponent implements OnInit {
  public noResult = false;
  public hideSearch = false;
  public topic;
  @Input()
  public vehicles: Array<Vehicle> = [];
  public chassisNo = '';
  public regNo = '';
  public searchType ;
  public searchTypes = [
    { key: 0, val: 'Search by Reg. No.' },
    { key: 1, val: 'Search by Chassis No.'}
    ];

  @ViewChild('searchBox1')
  searchBox1: any;

  @ViewChild('searchBox2')
  searchBox2: any;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<SearchVehicleComponent>,
    private router: Router,
    private renderer: Renderer,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.searchType = this.searchTypes[0].key;
    if (data) {
      this.vehicles = data.vehicles;
      this.topic = data.topic;
    }
  }
  ngOnInit() {
    if (this.vehicles && this.vehicles.length > 0) {
      this.hideSearch = true;
    }
  }

  public onKeydown(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  public search(): void {
    this.vehicles = [];
    this.noResult = false;
    const prop = this.searchType === 0 ? 'regNo' : 'chassisNo';
    let key = this.searchType === 0 ? this.regNo.replace(/[^a-zA-Z0-9]/g, '') : this.chassisNo.replace(/[^a-zA-Z0-9]/g, '');
    key = key.toUpperCase();
    this.dataService.getEntity(Entity.vehicles, prop, key, (dat) => {
      if (dat) {
        this.vehicles.push(dat);
      }
      if (this.vehicles.length === 0) {
        this.noResult = true;
      }
    });
  }

  public onVehicleSelect() {
    this.router.navigate(['/secure/profile'], {queryParams: this.vehicles[0]});
    this.dialogRef.close();
  }


  public onContinue() {
    this.dialogRef.close(Event.CONTINUE);
  }
}
