import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DbAccessComponent } from './db-access/db-access.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ErrorComponent } from './components/error/error.component';
import {Router, RouterModule} from '@angular/router';
import { appRoutes } from '../app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatBottomSheetModule, MatListModule, MatCardModule
  , MatSnackBarModule, MatSelectModule } from '@angular/material';
import { AddNewComponent } from './components-sub/add-new/add-new.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { VProfileComponent } from './components-sub/v-profile/v-profile.component';
import { AdContainerComponent } from './components-sub/ad-container/ad-container.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components-sub/popup/popup.component';
import { BottomMenuComponent } from './components-sub/bottom-menu/bottom-menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { OwnerDescComponent } from './components-sub/owner-desc/owner-desc.component';



import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from 'angular-6-social-login';
import { AuthenticationService } from './services/auth.service';
import { PhotoUploadComponent } from './components-sub/photo-upload/photo-upload.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { AppInit } from './app.init';
import { ProfileComponent } from './components/profile/profile.component';
import { DataService } from './services/data.service';
import { LoginComponent } from './components/login/login.component';
import {AuthGuardService} from './services/auth.guard.service';
import { SecureComponent } from './components/secure/secure.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2222140768058662')
      }
    ]
  );
  return config;
}


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),

    SocialLoginModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    SwiperModule,
    AngularFontAwesomeModule
  ],

  declarations: [
    AppComponent,
    FileUploadComponent,
    DbAccessComponent,
    MainLayoutComponent,
    ErrorComponent,
    AddNewComponent,
    HeaderToolbarComponent,
    VProfileComponent,
    AdContainerComponent,
    AddVehicleComponent,
    PopupComponent,
    BottomMenuComponent,
    NewsItemComponent,
    OwnerDescComponent,
    PhotoUploadComponent,
    AddNewsComponent,
    ProfileComponent,
    LoginComponent,
    SecureComponent
  ],

  providers: [
    AuthenticationService,
    AuthGuardService,
    DataService,
    AngularFirestore, [
      {
        provide: APP_INITIALIZER,
        useFactory: AppInit.initialize,
        multi: true,
        deps: [AuthenticationService]
      },
      {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
      },
      {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      }]
  ],

  entryComponents: [
    PopupComponent,
    BottomMenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
