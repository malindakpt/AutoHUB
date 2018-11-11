import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth.service';
import {Helper} from '../../util/helper';
import {Router} from '@angular/router';
import {Settings} from '../../util/settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showLogin = false;
  private timer;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.timer = setTimeout(() => {
    this.showLogin = true; }, Settings.LOGIN_TIMEOUT);
  }

  public login(): void {
    this.authenticationService.login();
  }

}
