
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserState} from './userState';


@Injectable()
export class AuthenticationService {
    public authStatus: Observable<any>;
    public imageURL: string;
    constructor(private socialAuthService: AuthService) {
        this.authStatus =  this.socialAuthService.authState;
        this.socialAuthService.authState.subscribe(sts => {
            UserState.user =  sts;
          });
    }

    public login(): void {
        const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData: any) => {
                UserState.user = userData;
                console.log('FB sign in data : ', userData);
                this.imageURL = userData.image;
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
                UserState.user = null;
                console.log('FB logout');
            }
        );
    }
}
