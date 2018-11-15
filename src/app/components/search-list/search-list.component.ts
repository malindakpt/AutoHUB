import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Settings} from '../../util/settings';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Pair} from '../add-vehicle/add-vehicle.component';
import {Helper} from '../../util/helper';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  public categories = Settings.VEHICLE_CATEGORIES;
  public brands = Settings.VEHICLE_BRANDS;
  public filteredBrands: Observable<Pair[]>;
  public brandControl = new FormControl();

  public searchCategory;
  public searchBrand;
  public searchModel;
  public searchManufactYear;

  public vehicleList;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.filteredBrands = this.brandControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.brands) : this.brands.slice())
      );
    this.onSearch();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPosition = position + screen.height + 10;
    const fullHeight = document.documentElement.offsetHeight;
    if ( scrollPosition > fullHeight) {
      this.onSearchNext();
    }
  }

  public onSearch(): void {
    this.dataService.resetVehicleSearch();
    this.vehicleList = this.dataService.getSearchVehicleList();
    this.dataService.searchVehicles(this.searchManufactYear,  this.searchBrand, this.searchModel, this.searchCategory);
  }


  public onSearchNext(): void {
    Helper.log('loading next');
    this.vehicleList = this.dataService.getSearchVehicleList();
    this.dataService.searchVehicles(this.searchManufactYear,  this.searchBrand, this.searchModel, this.searchCategory);
  }

  public displayFn(str?: string): string | undefined {
    return str ? str : undefined;
  }

  private _filter(name: any, options: Array<Pair>): Pair[] {
    const filterValue = name.val ? name.val : name.toLowerCase();
    return options.filter(option => option.val.toLowerCase().indexOf(filterValue) === 0);
  }

  public onSelectBrand(id: string): void {
    this.searchBrand = id;
  }
}
