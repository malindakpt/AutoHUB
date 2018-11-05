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
    const model = 'premio'.toUpperCase();
    this.dataService.searchVehicles(null, null, model).then(data => {
      console.log(data);
    });
  }

}
