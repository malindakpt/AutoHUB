
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from './auth.service';
import {Helper} from '../util/helper';


@Injectable()
export class AuthGuardService implements CanActivate  {
  public authStatus: Observable<any>;
  public imageURL: string;
  private subscribed = false;
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  public canActivate(): Promise<any> {
    return new Promise((resolve) => {
      Helper.log(this.router.url);
      this.authService.authStatus.subscribe((sts: any) => {
          if (sts) {
            resolve(true);
          } else {
            resolve(false);
          }
      });
    });
  }
}
