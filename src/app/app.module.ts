import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app/app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AddNewComponent } from './components-sub/add-new/add-new.component';
import { AddUserComponent } from './components-sub/add-user/add-user.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { VProfileComponent } from './components-sub/v-profile/v-profile.component';
import { AdContainerComponent } from './components-sub/ad-container/ad-container.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { VAddComponent } from './components-sub/v-add/v-add.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCheckboxModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    SwiperModule
  ],

  declarations: [
    AppComponent,
    FileUploadComponent,
    DbAccessComponent,
    MainLayoutComponent,
    ErrorComponent,
    AddNewComponent,
    AddUserComponent,
    HeaderToolbarComponent,
    VProfileComponent,
    AdContainerComponent,
    VAddComponent
  ],

  providers: [
    AngularFirestore,[
    {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
