
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    public userData: any;
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
                this.userData = false;
                console.log("FB logout");
            }
        );
    }

    // public isLoggedIn(): Promise<any> {
    //     console.log(this.socialAuthService.authState);
    //     var promise = new Promise((resolve, reject) => {
    //         FB.getLoginStatus(function (response) {
    //             if(response.status == 'connected'){
    //                 resolve(true);
    //             } else{
    //                 resolve(false);
    //             }
    //         });
    //     });
    //     return promise;
    // }
}