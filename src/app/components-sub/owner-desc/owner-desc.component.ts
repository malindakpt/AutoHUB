import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-owner-desc',
  templateUrl: './owner-desc.component.html',
  styleUrls: ['./owner-desc.component.scss']
})
export class OwnerDescComponent implements OnInit {

  @Input() name;
  @Input() image;
  private _description;
  constructor() { }

  ngOnInit() {
  }


  get description() {
    return this._description;
  }

  @Input()
  set description(value) {
    this._description = value;
  }
}
