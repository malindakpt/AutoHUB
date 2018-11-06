import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScrollLoader]',
})

export class ScrollLoaderDirective {
  constructor(elr: ElementRef) {
    elr.nativeElement.style.background = 'red';
  }
}
