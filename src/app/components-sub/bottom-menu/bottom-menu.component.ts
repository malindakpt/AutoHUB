import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {AuthenticationService} from '../../services/auth.service';
import {Settings} from '../../util/settings';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit {
  public menuOptions = Settings.MENU_OPTIONS;
  ngOnInit(): void {
  }
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>,
    private authenticationService: AuthenticationService) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.bottomSheetRef.dismiss();
  }
}
