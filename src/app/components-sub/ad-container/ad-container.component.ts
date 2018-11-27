import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ad-container',
  templateUrl: './ad-container.component.html',
  styleUrls: ['./ad-container.component.scss']
})
export class AdContainerComponent implements OnInit, AfterViewInit  {

  @Input() showAd: boolean;
  public adsbygoogle;
  constructor() { }

  ngOnInit() {
   // (this.adsbygoogle = window['adsbygoogle'] || []).push({});
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   try {
    //     (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }, 2000);
  }
}
