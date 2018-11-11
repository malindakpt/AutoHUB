import {Directive, ElementRef} from '@angular/core';
import {Helper} from '../util/helper';

@Directive({
  selector: '[appBase]',
})

export class BaseDirective {
  helper = Helper;
}
