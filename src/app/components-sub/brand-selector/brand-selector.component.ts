import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {UserState} from '../../config/userState';
import {Settings} from '../../config/settings';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.scss']
})
export class BrandSelectorComponent implements OnInit {

  @Output() selectBrand = new EventEmitter();
  filteredBrands: Observable<String[]>;
  brandControl = new FormControl();
  brands: Array<string>;
  brandIds: object;

  constructor() {
    this.brands = UserState.getStringArray(Settings.VEHICLE_BRANDS);
    this.brandIds = UserState.getStringMap(Settings.VEHICLE_BRANDS);
  }

  ngOnInit() {
    this.filteredBrands = this.brandControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.brands) : this.brands.slice())
      );
  }

  displayFn(str?: string): string | undefined {
    return str ? str : undefined;
  }

  private _filter(name: string, options: Array<string>): String[] {
    const filterValue = name.toLowerCase();
    return options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public onSelectBrand(event: any): void {
    this.selectBrand.emit(this.brandIds[event.option.value]);
  }

  public onChange(event: any): void {
    this.selectBrand.emit(this.brandIds[event.target.value]);
  }
}
