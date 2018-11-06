import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {modelGroupProvider} from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

  public onSearch(): void {
    const model = 'prem'.toUpperCase();
    this.dataService.searchVehicles(2007,  'TOYOTA', model).then(data => {
      console.log(data);
    });
  }

}
