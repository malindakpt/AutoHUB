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
  public imageURL: string;
  constructor(
    private bottomSheet: MatBottomSheet,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.authStatus.subscribe(sts => {
      
      if(sts){
        this.loginAction =  "Logout";
        this.imageURL = sts.image;
        console.log(this.imageURL);
      } else {
        this.loginAction = "Login";
      }
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
