import { AuthenticationService } from './services/auth.service';
import {UserState} from './services/userState';
import {Router} from '@angular/router';

export class AppInit {
    private static intv;
    public static initialize(authService: AuthenticationService) {
      // authService.setAuthStatus();
        return (): Promise<any> => {
            return new Promise((resolve, reject) => {
              /* UserState.appInitStarted = true;
               AppInit.intv = setInterval(() => {
                 if (!UserState.user || (UserState.user && UserState.user.id.length > 2)) {
                    console.log('App started');
                    clearInterval(AppInit.intv);
                    resolve();
                 } else {
                   console.log(UserState.user);
                 }
              }, 1000);*/
              resolve();
            });
        };
    }
}
