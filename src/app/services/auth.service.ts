
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

    public authStatus: Observable<any>;
    constructor(private socialAuthService: AuthService) {
        this.authStatus =  this.socialAuthService.authState;
    }

    public login(): void {
        let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log("FB sign in data : ", userData);
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
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