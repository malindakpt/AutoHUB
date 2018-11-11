import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Helper} from '../../util/helper';
import {Settings} from '../../util/settings';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit {

  @Output() selectCountry = new EventEmitter();
  countryControl = new FormControl();
  filteredCountries: Observable<String[]>;
  countries: Array<string>;
  countryIds: object;

  constructor() {
    this.countries = Helper.getStringArray(Settings.COUNTRIES);
    this.countryIds = Helper.getStringMap(Settings.COUNTRIES);
  }

  ngOnInit() {
    this.filteredCountries = this.countryControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name, this.countries) : this.countries.slice())
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
    this.selectCountry.emit(this.countryIds[event.option.value]);
  }

  public onChange(event: any): void {
    this.selectCountry.emit(this.countryIds[event.target.value]);
  }
}
