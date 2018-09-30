import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(storage: AngularFireStorage, authenticationService: AuthenticationService) {
    console.log(storage.ref.name);
    // authenticationService.login();
  }
  title = 'Test 1';
}
