import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from 'src/app/components-sub/bottom-menu/bottom-menu.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import {UserState} from '../../config/userState';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  public user = UserState.user;
  constructor(
    private bottomSheet: MatBottomSheet,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public showMenu(): void {
    this.bottomSheet.open(
      BottomMenuComponent,
      { panelClass: 'bottom-menu' });
  }

}
