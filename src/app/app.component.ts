import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from 'src/app/services/auth.service';
import {UserState} from './config/userState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(storage: AngularFireStorage, authenticationService: AuthenticationService) {
    console.log(storage.ref.name);

  }
  title = 'Test 1';
}
