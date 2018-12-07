import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entity} from '../enum/entities.enum';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {News} from '../entities/news';
import {Helper} from '../util/helper';
import {MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import {Settings} from '../util/settings';
import {DialogType, NewsType} from '../enum/enums';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {VehicleStatus} from '../enum/event.enum';
import {DialogService} from './dialog.service';

@Injectable()
export class DataService {
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private router: Router,
    private fs: AngularFirestore,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private dialogService: DialogService
  ) {
    this.onVehiclesUpdated = new Subject();
    this.setInternetTime();
  }

  public searchedVehicle;

  public isNewsFetchInprogress = false;
  private lastVisibleNews = {};
  public newsList: Array<News>;

  public isVehicleNewsFetchInprogress = false;
  private lastVisibleVehicleNews = {};
  public vehicleNewsList = new Array<News>();

  public isVehicleSearchInprogress = false;
  private lastVisibleVehicleSearch = null;
  public vehicleSearchList: Array<Vehicle>;

  public vehicle: Vehicle;
  public onVehiclesUpdated: Subject<any>;

  public resetVehicleSearch(): void {
    this.lastVisibleVehicleSearch = null;
    this.vehicleSearchList = new Array<Vehicle>();
  }

  public resetVehicleNews(): void {
    this.lastVisibleVehicleNews = {};
    this.vehicleNewsList = new Array<News>();
  }

  public resetNews(): void {
    this.lastVisibleNews = {};
    this.newsList = new Array<News>();
    const news = new News({
      ownerName: 'Welcome to VehiLIFE, Select an activity type form above to discuss a topic. ',
      desc: 'Click on PROFILE in menu bar to add your vehicle maintanance history',
      ownerID: '110572676646417',
      time: 1544159221436
    });
    this.newsList.push(news);
  }

  public getMyVehicles(): Promise<any> {
    return this.requestMyVehicles();
  }

  public getSearchedVehicle(key: string, val: string): any {
    this.searchedVehicle = new Vehicle({});
    this.getEntity(Entity.vehicles, key, val, (vehi) => {
      Object.assign(this.searchedVehicle, vehi);
    });
  }

  public getNewsList(isLocal: boolean): Array<News> {
    if (!this.newsList) {
      this.newsList = new Array<News>();
    }
    this.requestNewsList(isLocal);
    return this.newsList;
  }

  public getSearchVehicleList(): Array<Vehicle> {
    if (!this.vehicleSearchList) {
      this.vehicleSearchList = new Array<Vehicle>();
    }
    return this.vehicleSearchList;
  }

  public getVehicleNewsList(id: string, isOnlyMyNews: boolean): Array<News> {
    if (!this.vehicleNewsList) {
      this.vehicleNewsList = new Array<News>();
    }
    this.requestNewsListForVehicle(id, isOnlyMyNews);
    return this.vehicleNewsList;
  }

  public addNews(id: string, news: News, images: Array<string>, skipRoute?: boolean): Promise<any> {
    if (!this.validateStatus(news)) {
      console.log('News validatino failed');
      return new Promise<any>(() => {});
    }
    return new Promise((resolves, reject) => {
      this.uploadPhotos(news.photos, images, id).then((status) => {
        news.ownerName = Helper.user.name;
        news.ownerID = Helper.user.id;
        this.saveEntity(Entity.news, news, skipRoute);
        resolves(news);
      });
    });
  }

  public saveEntity(entity: Entity, object: any, skipRouting?: boolean): void {
    if (Entity.settings !== entity && !this.validateStatus(object)) {
      return;
    }
    const that = this;
    const ref = this.fs.firestore.collection(entity);
    console.log('Saving entity: ' + entity);
    this.busyOn();
    ref.doc(object.id).set(Object.assign({}, object)).then(function () {
      console.log('Document successfully written!', entity);
      if (!skipRouting) {
        that.router.navigate(['/secure/news/' + Helper.getTime(), {isNewsView: true}]);
      }
      that.busyOff();
      that.snackBar.open('Success', 'Dismiss', {
        duration: 3000
      });
    }).catch(function (error) {
      console.error('Error writing document: ', error);
      that.showNetworkError();
      that.busyOff();
    });
  }

  public getEntityDoc (entity: Entity, callBack: any, hideBusy?: boolean) {
    if (!Helper.user) {
      console.log('No user exist. exit from get user');
      return;
    }
    const that = this;
    console.log('send request for get Entiyt');
    if (!hideBusy) {
      this.busyOn();
    }

    this.fs.firestore.collection(entity).doc(Helper.user.id)
      .get()
      .then(function (doc) {
        console.log('entiyt info fetched');
        callBack(doc.data());
        that.busyOff();
      })
      .catch(function (error) {
        that.showNetworkError();
        console.log('Error getting documents: ', error);
        that.busyOff();
      });
  }

  public getEntity (entity: Entity, key: string, val: string, callBack: any) {
    const that = this;
    console.log('send request for get Entiyt');
    this.busyOn();
    this.fs.firestore.collection(entity).where(key, '==', val)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          callBack(doc.data());
          console.log('getEntity info fetched');
        });
        callBack(null);
        that.busyOff();
      })
      .catch(function (error) {
        that.showNetworkError();
        console.log('Error getting documents: ', error);
        callBack(null);
        that.busyOff();
      });
  }

  public requestMyVehicles(): Promise<any> {
    if (!Helper.user) {
      console.log('Request my vehicles failed. No User exist');
      return new Promise(() => {});
    }
    const userID = Helper.user.id;
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    return new Promise((resolves, reject) => {
      this.fs.firestore.collection(Entity.vehicles).where('ownerID', '==', userID).where('isActive', '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            myVehicles.push(new Vehicle(doc.data()));
          });
          that.onVehiclesUpdated.next(myVehicles);
          resolves(myVehicles);
        })
        .catch(function (error) {
          that.showNetworkError();
          console.log('Error getting documents: ', error);
          resolves(null);
        });
    });
  }

  public searchVehicles(year: number, brand: string, model: string, category: string): Promise<boolean> {

    if (!this.validateStatus()) {
      return new Promise(() => {});
    }
    if (this.isVehicleSearchInprogress || this.lastVisibleVehicleSearch === -1) {
      return new Promise(() => {});
    }

    return new Promise((resolves, reject) => {
      this.isVehicleSearchInprogress = true;
      const that = this;
      const searchedVehicles = [];
      console.log('send request for search');
      let query =  this.fs.firestore.collection(Entity.vehicles).where
      ('status', '==', VehicleStatus.SELL);

      if (model && model.length > 0) {
        query = query.orderBy('model', 'desc');
        query = query.where('model', '>=', model.toUpperCase());
        query = query.where('modelStartChar', '==', model.toUpperCase().substr(0, 1));
      }
      if (year) {
        query = query.where('manufactYear', '==', year);
      }
      if (brand) {
        query = query.where('brand', '==', brand);
      }
      if (category) {
        query = query.where('category', '==', category);
      }
      query = query.where('countryId', '==', Helper.user.countryId);
      query = query.orderBy('time', 'desc');
      if (that.lastVisibleVehicleSearch) {
        query = query.startAfter(that.lastVisibleVehicleSearch);
      }
      query = query.limit(Settings.SEARCH_VEHICLE_FETCH_COUNT);
      query.get()
        .then(function (querySnapshot) {

         that.lastVisibleVehicleSearch = querySnapshot.docs[querySnapshot.docs.length - 1] || -1;
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            that.vehicleSearchList.push(new Vehicle(doc.data()));
          });
          that.isVehicleSearchInprogress = false;

          if (year && querySnapshot.docs.length < Settings.SEARCH_VEHICLE_FETCH_COUNT) {
            console.log('LESS results fetched-----------try new request');
            that.lastVisibleVehicleSearch = null;
            resolves(false);
          } else {
            resolves(true);
          }
        })
        .catch(function (error) {
          that.showNetworkError();
          console.log('Error getting documents: ', error);
        });
    });
  }

  public requestNewsListForVehicle(vehicleID: string, isOnlyMyNews: boolean): void {
    if (this.isVehicleNewsFetchInprogress || this.lastVisibleVehicleNews === -1) {
      return;
    }
    this.isVehicleNewsFetchInprogress = true;
    const that = this;
    let query = this.fs.firestore.collection(Entity.news)
      .where('vehicleID', '==', vehicleID)
      .orderBy('time', 'desc');

    if (isOnlyMyNews) {
      if (Helper.user) {
        query = query.where('ownerID', '==', Helper.user.id);
      }
    }

    query.startAfter(that.lastVisibleVehicleNews)
      .limit(Settings.NEWS_FETCH_COUNT).get()
      .then(function (querySnapshot) {
        that.lastVisibleVehicleNews = querySnapshot.docs[querySnapshot.docs.length - 1] || -1;
        querySnapshot.forEach(function (doc) {
          if (that.vehicleNewsList && that.vehicleNewsList.length % Settings.AD_FREQ_VEHICLE_NEWS === 0) {
            that.vehicleNewsList.push(new News({isAd: true}));
          }
          that.vehicleNewsList.push(new News(doc.data()));
        });
        that.isVehicleNewsFetchInprogress = false;
      })
      .catch(function (error) {
        that.showNetworkError();
        that.isVehicleNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
      });
  }

  public requestNewsList(isLocal: boolean): void {
    // Do not validate user when fetch news.
    // if (!this.validateStatus()) {
    //   return;
    // }
    if (this.isNewsFetchInprogress || this.lastVisibleNews === -1) {
      return;
    }
    this.isNewsFetchInprogress = true;
    const that = this;
    let query = this.fs.firestore.collection(Entity.news)
      .where('type', '==', NewsType.NEWS);

    if (isLocal && Helper.user && Helper.user.countryId) {
      query = query.where('countryId', '==', Helper.user.countryId);
    }
    query.orderBy('time', 'desc')
      .startAfter(that.lastVisibleNews)
      .limit(Settings.NEWS_FETCH_COUNT).get()
      .then(function (querySnapshot) {
        that.lastVisibleNews = querySnapshot.docs[querySnapshot.docs.length - 1] || -1;
        querySnapshot.forEach(function (doc) {
          if (that.newsList && that.newsList.length % Settings.AD_FREQ_NEWS === 0) {
            that.newsList.push(new News({isAd: true}));
          }
          that.newsList.push(new News(doc.data()));
        });
        that.isNewsFetchInprogress = false;
      })
      .catch(function (error) {
        that.showNetworkError();
        that.isNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
      });
  }

  public uploadPhotos(imgURLArr: Array<any>, imgSrcArr: Array<any>, identifierID: string): Promise<any> {
    this.busyOn();
   return new Promise((resolves, reject) => {
      let uploadCount = 0;
     imgSrcArr.forEach((itm: any, idx: number) => {
          if (itm !== '') {
            const filePath = 'images/' + identifierID + '#' + idx + '.jpg';
            const ref = this.storage.ref(filePath);
            const task = ref.putString(itm, 'data_url');
            task.snapshotChanges().pipe(
              finalize(() =>
                ref.getDownloadURL().subscribe(data => {
                  imgURLArr[idx] = data;
                  ++uploadCount;
                  if (uploadCount === imgSrcArr.length) {
                    resolves(true);
                  }
                })
              )
            ).subscribe();
          } else {
            ++uploadCount;
            if (uploadCount === imgSrcArr.length) {
              resolves(true);
            }
          }
        }
      );
    });
  }

  private setInternetTime(): void {
    // TODO: temporary removed time validation
    // this.http.get(Settings.TIME_URL).subscribe( (time: any) => {
    //   Helper.internetDate = new Date(time.currentDateTime);
    // });
    // setInterval(() => {
    //   this.http.get(Settings.TIME_URL).subscribe( (time: any) => {
    //     Helper.internetDate = new Date(time.currentDateTime);
    //   });
    // }, Settings.TIME_CHECK_INTERVAL);
  }

  private busyOn(): void {
    document.getElementById('overlay').style.display = 'block';
  }

  private busyOff(): void {
    document.getElementById('overlay').style.display = 'none';
  }

  private showNetworkError(): void {
    this.dialogService.showDialog(DialogType.CONFIRMATION, 'Network Error',
      'Time is too long to get the response from server. Please try again !').then(data => {
        window.location.reload();
      }
    );
  }

  public validateStatus(obj?: any): boolean {
    if (Helper.user.countryId) {
      if (obj) {
        obj.countryId = Helper.user.countryId;
      }
      return true;
    } else {
      this.dialogService.showPopup('Please set your country');
      this.router.navigate(['/secure/settings/']);
      return false;
    }
  }
}

