
import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    public authStatus: BehaviorSubject<any>;

    constructor(private socialAuthService: AuthService) {
        this.authStatus = new BehaviorSubject<any>(false);
    }

    public login(): void {
        let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log("FB sign in data : ", userData);
                this.authStatus.next(true);
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
                this.authStatus.next(false);
            }
        );
    }

    public isLoggedIn(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            FB.getLoginStatus(function (response) {
                if(response.status == 'connected'){
                    resolve(true);
                } else{
                    resolve(false);
                }
            });
        });
        return promise;
    }
}