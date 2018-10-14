import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from 'src/app/components-sub/bottom-menu/bottom-menu.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import {UserState} from '../../config/userState';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SettingsComponent} from '../../components-sub/settings/settings.component';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  public user = UserState.user;
  constructor(
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public showSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public showMenu(): void {
    this.bottomSheet.open(
      BottomMenuComponent,
      { panelClass: 'bottom-menu' });
  }

}
