import { AuthenticationService } from "./services/auth.service";
import {UserState} from './services/userState';

export class AppInit{
    private static intv;
    public static initialize(authService: AuthenticationService){
        return (): Promise<any> => {
            return new Promise((resolve, reject) => {

                AppInit.intv = setInterval(() => {
                 if (UserState.user) {
                    console.log('App Init logged in');
                    clearInterval(AppInit.intv);
                    resolve();
                 } else {
                    console.log('Please login');
                 }
              }, 1000);
            });
        };
    }
}
