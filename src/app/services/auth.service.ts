
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface UserData {
    email:  string;
    id: string;
    image: string;
    name: string;
}
@Injectable()
export class AuthenticationService {
    public userData: UserData;
    public authStatus: Observable<any>;
    public imageURL: string;
    constructor(private socialAuthService: AuthService) {
        this.authStatus =  this.socialAuthService.authState;
        this.socialAuthService.authState.subscribe(sts => {
            this.userData =  sts;
          });
    }

    public login(): void {
        let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData: any) => {
                this.userData = userData;
                console.log("FB sign in data : ", userData);
                this.imageURL = userData.image;
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
                this.userData = null;
                console.log("FB logout");
            }
        );
    }
}