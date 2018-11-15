import { AuthenticationService } from './services/auth.service';
import {Helper} from './util/helper';
import {Router} from '@angular/router';

export class AppInit {
    private static intv;
    public static initialize() {
      // authService.setAuthStatus();
        return (): Promise<any> => {
            return new Promise((resolve, reject) => {
              /* Helper.appInitStarted = true;
               AppInit.intv = setInterval(() => {
                 if (!Helper.user || (Helper.user && Helper.user.id.length > 2)) {
                    console.log('App started');
                    clearInterval(AppInit.intv);
                    resolve();
                 } else {
                   console.log(Helper.user);
                 }
              }, 1000);*/
              resolve();
            });
        };
    }
}
