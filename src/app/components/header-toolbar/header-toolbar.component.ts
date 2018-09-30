import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from 'src/app/components-sub/bottom-menu/bottom-menu.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  public loginAction = "Login";
  constructor(
    private bottomSheet: MatBottomSheet,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.authStatus.subscribe(sts => {
      this.loginAction = sts ? "Logout" : "Login";
    });
  }

  public checkLogin(): void {
    if (this.loginAction == "Login") {
      this.authenticationService.login();
    } else {
      this.authenticationService.logout();
    }
  }

  public showMenu(): void {
    this.bottomSheet.open(
      BottomMenuComponent,
      { panelClass: "bottom-menu" });
  }

}
