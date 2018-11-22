import { Component, Injector, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from 'src/app/components-sub/bottom-menu/bottom-menu.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Helper } from '../../util/helper';
import { MatDialog } from '@angular/material';
import { Entity } from '../../enum/entities.enum';
import { Settings } from '../../util/settings';
import { SearchVehicleComponent } from '../../components-sub/search-vehicle/search-vehicle.component';
import { Router } from '@angular/router';
import { BaseDirective } from '../../directives/base';
import { LocalStorageKeys } from '../../enum/enums';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent extends BaseDirective implements OnInit {
  public menuOptions = Settings.MENU_OPTIONS;
  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.authenticationService.loginSubject.subscribe((sts: any) => {
      if (sts) {
        this.dataService.getEntityDoc(Entity.users, (entry: any) => {
          if (entry && Helper.user) {
            Helper.user.countryId = entry.countryId;
            Helper.setItem(LocalStorageKeys.USER, Helper.user);
            console.log('Fetched firestore user country id: ', entry);
            if (!Helper.user.countryId) {
               this.router.navigate(['/secure/settings']);
            }
          } else {
            this.router.navigate(['/secure/settings']);
          }
        }, true);
      } else {
        console.log('Not logged in');
      }
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public login(): void {
    this.authenticationService.login();
  }

  public showSearch(): void {
    const dialogRef = this.dialog.open(SearchVehicleComponent, {
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
