
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState} from '../config/userState';
import { Router} from '@angular/router';


@Injectable()
export class AuthenticationService {
    public authStatus: Observable<any>;
    public imageURL: string;
    constructor(private socialAuthService: AuthService, private router: Router) {
      this.authStatus =  this.socialAuthService.authState;
      this.socialAuthService.authState.subscribe((sts: any) => {
        if (sts) {
          UserState.user = sts;
          this.router.navigate(['secure']);
          console.log('Already logged in : ', sts);
        } else {
          this.router.navigate(['login']);
          console.log('Not logged in : ', sts);
        }
      });
    }

    public login(): void {
        const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (sts: any) => {
                UserState.user = sts;
                console.log('FB sign in data : ', sts);
                this.imageURL = sts.image;
                this.router.navigate(['secure']);
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
                UserState.user = null;
                this.router.navigate(['login']);
            }
        );
    }
}
