import {Directive, Injector} from '@angular/core';
import {DialogService} from '../services/dialog.service';
import {DataService} from '../services/data.service';
import {Helper} from '../util/helper';

@Directive({
  selector: '[appBase]',
})

export class BaseDirective {
  protected Helper = Helper;
  protected dialogService;
  public dataService;
  constructor(
    private injectorObj: Injector) {
    this.dialogService = this.injectorObj.get(DialogService);
    this.dataService = this.injectorObj.get(DataService);
}
}
