import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth.service';
import {UserState} from '../../services/userState';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  public login(): void {
    this.authenticationService.login();
  }

}
