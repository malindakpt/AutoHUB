import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ErrorComponent } from './components/error/error.component';
import { Router, RouterModule} from '@angular/router';
import { appRoutes } from '../app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatBottomSheetModule, MatListModule, MatCardModule
  , MatSnackBarModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatSlideToggleModule
} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { VehicleProfileComponent } from './components-sub/vehicle-profile/vehicle-profile.component';
import { AdContainerComponent } from './components-sub/ad-container/ad-container.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PopupComponent } from './components-sub/popup/popup.component';
import { BottomMenuComponent } from './components-sub/bottom-menu/bottom-menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NewsListComponent } from './components/news-list/news-list.component';
import { OwnerDescComponent } from './components-sub/owner-desc/owner-desc.component';




import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/auth.service';
import { PhotoUploadComponent } from './components-sub/photo-upload/photo-upload.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { AppInit } from './app.init';
import { DataService } from './services/data.service';
import { LoginComponent } from './components/login/login.component';
import {AuthGuardService} from './services/auth.guard.service';
import { SecureComponent } from './components/secure/secure.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchVehicleComponent } from './components-sub/search-vehicle/search-vehicle.component';
import { OwnershipTransferComponent } from './components-sub/ownership-transfer/ownership-transfer.component';
import {SideMenuComponent} from './components-sub/side-menu/side-menu.component';
import {CommentMsgPipe, CommentProfPicPipe, CommentUserName} from './app.pipes';
import { SearchListComponent } from './components/search-list/search-list.component';
import {ScrollLoaderDirective} from './directives/scroll-loader.directive';
import { BrandSelectorComponent } from './components-sub/brand-selector/brand-selector.component';
import { CountrySelectorComponent } from './components-sub/country-selector/country-selector.component';
import {BaseDirective} from './directives/base';
import { DialogComponent } from './components-sub/dialog/dialog.component';
import {DialogService} from './services/dialog.service';
import {CanDeactivateGuard} from './services/save.settings.service';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AdsenseModule } from 'ng2-adsense';

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
      { useHash: true, enableTracing: false, onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    ),

    AdsenseModule.forRoot({
      adClient: 'ca-pub-4540888234098240',
      adSlot: 2930227358,
    }),

    HttpClientModule,
    SocialLoginModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSlideToggleModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    SwiperModule,
    AngularFontAwesomeModule
  ],

  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderToolbarComponent,
    VehicleProfileComponent,
    AdContainerComponent,
    AddVehicleComponent,
    PopupComponent,
    BottomMenuComponent,
    NewsListComponent,
    OwnerDescComponent,
    PhotoUploadComponent,
    AddNewsComponent,
    LoginComponent,
    SecureComponent,
    SettingsComponent,
    SearchVehicleComponent,
    OwnershipTransferComponent,
    SideMenuComponent,
    CommentMsgPipe,
    CommentProfPicPipe,
    CommentUserName,
    SearchListComponent,
    ScrollLoaderDirective,
    BaseDirective,
    BrandSelectorComponent,
    CountrySelectorComponent,
    DialogComponent,
    PrivacyPolicyComponent,
  ],

  providers: [
    CanDeactivateGuard,
    AuthenticationService,
    AuthGuardService,
    DataService,
    DialogService,
    AngularFirestore, [
      {
        provide: APP_INITIALIZER,
        useFactory: AppInit.initialize,
        multi: true,
        deps: []
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
    BottomMenuComponent,
    SettingsComponent,
    SearchVehicleComponent,
    OwnershipTransferComponent,
    DialogComponent
  ],
  bootstrap: [
    AppComponent,
    //  [
    //   ROUTER_PROVIDERS,
    //   {provide: LocationStrategy, useClass: HashLocationStrategy}
    // ]
  ]
})
export class AppModule { }
