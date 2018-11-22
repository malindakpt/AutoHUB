import {AuthService, FacebookLoginProvider} from 'angular-6-social-login';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Helper} from '../util/helper';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Entity} from '../enum/entities.enum';
import {User} from '../entities/user';
import {LocalStorageKeys} from '../enum/enums';
import {DialogService} from './dialog.service';

export const users = [{
  email: 'malindakpt@yahoo.com',
  id: '2431221976918023',
  image: 'https://graph.facebook.com/2431221976918023/picture?type=normal',
  name: 'Malinda Kumarasinghe'
}, {
  email: 'gayathree1111@gmail.com',
  id: '2293860684019373',
  image: 'https://graph.facebook.com/2293860684019373/picture?type=normal',
  name: 'Gayathree Sewwandi'
}];

@Injectable()
export class AuthenticationService {

    public authStatus: Observable<any>;
    public loginSubject: Subject<any>;
    public imageURL: string;
    public devAuthSubject;
    constructor(
      public socialAuthService: AuthService,
      private dialogService: DialogService,
      private router: Router) {

      this.loginSubject = new Subject();
      if (environment.production) {
      // if (true) {
        this.authStatus = this.socialAuthService.authState;
      } else {
        const userID = Helper.getItem('userID');
        let user;
        if (userID) {
          user = users[Number(userID)];
        } else {
          user = users[0];
          Helper.setItem('userID', '0');
        }

        this.devAuthSubject = new BehaviorSubject(user);
        this.authStatus = this.devAuthSubject;
        Helper.user = user;
        console.log('Running in DEV mode');
        this.router.navigate(['secure']);
      }
    }
    private setAutoHUBUser(): void {
      // this.dataService.getEntity(Entity.users, 'id', Helper.user.id, (user: User) => {
      //   Helper.user = user;
      // });
    }

    public login(): void {
        const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (user: any) => {
              Helper.user = user;
              Helper.setItem(LocalStorageKeys.USER, user);
              this.loginSubject.next(user);
              console.log('FB sign in data : ', user);
              this.imageURL = user.image;
              this.dialogService.showPopup('Next time you will see the news which are specific to your country');
              // this.router.navigate(['secure']);
            }
        );
    }

    public logout(): void {
        this.socialAuthService.signOut().then(
            (userData) => {
                Helper.user = null;
                Helper.setItem(LocalStorageKeys.USER, null);
                this.router.navigate(['secure']);
            }
        );
    }
}
