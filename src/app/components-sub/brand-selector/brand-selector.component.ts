import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Helper} from '../../util/helper';
import {Settings} from '../../util/settings';
import {Pair} from '../../components/add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.scss']
})
export class BrandSelectorComponent implements OnInit {

  @Input() brandId;
  @Output() selectBrand = new EventEmitter();
  filteredBrands: Observable<String[]>;
  brandControl = new FormControl();
  brands: Array<string>;
  brandIds: object;
  selectedBrandText: string;

  constructor() {
    this.brands = Helper.getStringArray(Settings.VEHICLE_BRANDS);
    this.brandIds = Helper.getStringMap(Settings.VEHICLE_BRANDS);
  }

  ngOnInit() {
    this.filteredBrands = this.brandControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.brands) : this.brands.slice())
      );

    if (this.brandId) {
      const arr = Settings.VEHICLE_BRANDS.filter(ele => ele.key === this.brandId);
      this.selectedBrandText = arr.length > 0 ? arr[0].val : '';
    }
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
