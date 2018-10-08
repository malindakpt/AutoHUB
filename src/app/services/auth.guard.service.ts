
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserState} from './userState';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate  {
  public authStatus: Observable<any>;
  public imageURL: string;
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (!UserState.user) {
      this.router.navigate(['login']);
      console.log('FB false');
      return false;
    }
    console.log('FB true');
    return true;
  }
}
