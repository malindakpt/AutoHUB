import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entity} from '../enum/entities.enum';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {News} from '../entities/news';
import {UserState} from '../config/userState';
import {PopupComponent} from '../components-sub/popup/popup.component';
import {MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import {Settings} from '../config/settings';
import {NewsType} from '../enum/news.-type.enum';

@Injectable()
export class DataService {
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private fs: AngularFirestore,
    public snackBar: MatSnackBar
  ) {
    this.onVehiclesUpdated = new Subject();
  }

 // public myVehicles: Array<Vehicle>;
  public searchedVehicle;

  public isNewsFetchInprogress = false;
  private lastVisibleNews = {};
  public newsList: Array<News>;

  public isVehicleNewsFetchInprogress = false;
  private lastVisibleVehicleNews = {};
  public vehicleNewsList: Array<News>;

  public vehicle: Vehicle;
  public onVehiclesUpdated: Subject<any>;

  public resetVehicleNews(): void {
    this.lastVisibleVehicleNews = {};
    this.vehicleNewsList = new Array<News>();
  }

  public getMyVehicles(): Promise<any> {
    return this.requestMyVehicles(UserState.user.id);
  }

  public getSearchedVehicle(key: string, val: string): any {
    this.searchedVehicle = new Vehicle({});
    this.getEntity(Entity.vehicles, key, val, (vehi) => {
      Object.assign(this.searchedVehicle, vehi);
    });
  }

  public getVehicleInfo(id: string): Vehicle {
    this.vehicle = new Vehicle({});
    this.requestVehicle(id);
    return this.vehicle;
  }

  public getNewsList(): Array<News> {
    if (!this.newsList) {
      this.newsList = new Array<News>();
    }
    this.requestNewsList();
    return this.newsList;
  }

  public getVehicleNewsList(ID: string): Array<News> {
    if (!this.vehicleNewsList) {
      this.vehicleNewsList = new Array<News>();
    }
    this.requestNewsListForVehicle(ID);
    return this.vehicleNewsList;
  }

  public addNews(id: string, news: News, images: Array<string>): void {
    this.uploadPhotos(news.photos, images, id).then((status) => {
      news.ownerName = UserState.user.name;
      news.ownerID = UserState.user.id;
      this.saveEntity(Entity.news, news);
    });
  }

  public saveEntity(entity: Entity, object: any): void {
    const that = this;
    const ref = this.fs.firestore.collection(entity);

    this.busyOn();
    ref.doc(object.ID).set(Object.assign({}, object)).then(function () {
      console.log('Document successfully written!', entity);
      that.snackBar.openFromComponent(PopupComponent, {
        duration: 1000,
        data: {message: 'Success'},
        verticalPosition: 'top'
      });
      that.busyOff();
    }).catch(function (error) {
      console.error('Error writing document: ', error);
      that.busyOff();
    });
  }

  public getEntityDoc (entity: Entity, callBack: any) {
    const that = this;
    console.log('send request for get Entiyt');
    this.busyOn();
    this.fs.firestore.collection(entity).doc(UserState.user.id)
      .get()
      .then(function (doc) {
        console.log('entiyt info fetched');
        callBack(doc.data());
        that.busyOff();
      })
      .catch(function (error) {
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
        console.log('Error getting documents: ', error);
        callBack(null);
        that.busyOff();
      });
  }

  public requestVehicle (vID: string) {
    const that = this;
    console.log('send request for get Vehicle');
    this.busyOn();
    this.fs.firestore.collection(Entity.vehicles).where('ID', '==', vID)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          Object.assign(that.vehicle, doc.data());
          console.log('vehicle info fetched');
        });
        that.busyOff();
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
        that.busyOff();
      });
  }

  public requestMyVehicles(userID: string): Promise<any> {
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    this.busyOn();
    return new Promise((resolves, reject) => {
      this.fs.firestore.collection(Entity.vehicles).where('ownerID', '==', userID)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            myVehicles.push(new Vehicle(doc.data()));
          });
          that.onVehiclesUpdated.next(myVehicles);
          that.busyOff();
          resolves(myVehicles);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
          that.busyOff();
          resolves(null);
        });
    }
  );
  }

  public requestNewsListForVehicle(vehicleID: string): void {
    if (this.isVehicleNewsFetchInprogress || !this.lastVisibleVehicleNews) {
      return;
    }
    this.isVehicleNewsFetchInprogress = true;
    const that = this;
    this.fs.firestore.collection(Entity.news)
      .where('vehicleID', '==', vehicleID)
      .orderBy('time', 'desc')
      .startAfter(that.lastVisibleVehicleNews)
      .limit(Settings.NEWS_FETCH_COUNT).get()
      .then(function (querySnapshot) {
        that.lastVisibleVehicleNews = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(function (doc) {
          that.vehicleNewsList.push(new News(doc.data()));
        });
        that.isVehicleNewsFetchInprogress = false;
      })
      .catch(function (error) {
        that.isVehicleNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
      });
  }

  public requestNewsList(): void {
    if (this.isNewsFetchInprogress || !this.lastVisibleNews) {
      return;
    }
    this.isNewsFetchInprogress = true;
    const that = this;
    this.fs.firestore.collection(Entity.news)
      .where('type', '==', NewsType.COMMON)
      .orderBy('time', 'desc')
      .startAfter(that.lastVisibleNews)
      .limit(Settings.NEWS_FETCH_COUNT).get()
      .then(function (querySnapshot) {
        that.lastVisibleNews = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(function (doc) {
          that.newsList.push(new News(doc.data()));
        });
        that.isNewsFetchInprogress = false;
      })
      .catch(function (error) {
        that.isNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
      });
  }

  public uploadPhotos(imgURLArr: Array<any>, imgSrcArr: Array<any>, identifierID: string): Promise<any> {
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
                    resolves(12);
                  }
                })
              )
            ).subscribe();
          } else {
            ++uploadCount;
            if (uploadCount === imgSrcArr.length) {
              resolves(12);
            }
          }
        }
      );
    });
  }

  private busyOn(): void {
    document.getElementById('overlay').style.display = 'block';
  }

  private busyOff(): void {
    document.getElementById('overlay').style.display = 'none';
  }
}

