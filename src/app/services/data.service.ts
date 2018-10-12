import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entity} from '../enum/entities.enum';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {resolve} from 'q';
import {News} from '../entities/news';
import {UserState} from '../config/userState';
import {PopupComponent} from '../components-sub/popup/popup.component';
import {MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';

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

  public myVehicles: Array<Vehicle>;

  private isNewsFetchInprogress = false;
  private lastVisibleNews = {};
  public newsList: Array<News>;

  private isVehicleNewsFetchInprogress = false;
  private lastVisibleVehicleNews = {};
  public vehicleNewsList: Array<News>;

  public vehicle: Vehicle;
  public onVehiclesUpdated: Subject<any>;

  public resetVehicleNews(): void {
    this.lastVisibleVehicleNews = {};
    this.vehicleNewsList = new Array<News>();
  }

  public getMyVehicles(): any {
    this.myVehicles = new Array<Vehicle>();
    this.requestMyVehicles(UserState.user.id);
    return this.myVehicles;
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
      news.ownerImage = UserState.user.image;
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

  public requestMyVehicles(userID: string) {
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    this.busyOn();
    this.fs.firestore.collection(Entity.vehicles).where('owner', '==', userID)

      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          myVehicles.push(new Vehicle(doc.data()));
        });
        Object.assign(that.myVehicles, myVehicles);
        that.onVehiclesUpdated.next(myVehicles);
        that.busyOff();
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
        that.busyOff();
      });
  }

  public requestNewsListForVehicle(vehicleID: string): void {
    if (this.isVehicleNewsFetchInprogress || !this.lastVisibleVehicleNews) {
      return;
    }
    this.isVehicleNewsFetchInprogress = true;
    const that = this;
    console.log('send request for get vehicle newsList');
    this.busyOn();
    this.fs.firestore.collection(Entity.news)
      .where('vehicleID', '==', vehicleID)
      .orderBy('time', 'desc')
      .startAfter(that.lastVisibleVehicleNews)
      .limit(4).get()
      .then(function (querySnapshot) {
        that.lastVisibleVehicleNews = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(function (doc) {
          that.vehicleNewsList.push(new News(doc.data()));
        });
        that.isVehicleNewsFetchInprogress = false;
        that.busyOff();
      })
      .catch(function (error) {
        that.isVehicleNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
        that.busyOff();
      });
  }

  public requestNewsList(): void {
    if (this.isNewsFetchInprogress || !this.lastVisibleNews) {
      return;
    }
    this.isNewsFetchInprogress = true;
    const that = this;
    console.log('send request for get newsList');
    this.busyOn();
    this.fs.firestore.collection(Entity.news)
      .orderBy('time', 'desc')
      .startAfter(that.lastVisibleNews)
      .limit(4).get()
      .then(function (querySnapshot) {
        that.lastVisibleNews = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(function (doc) {
          that.newsList.push(new News(doc.data()));
        });
        that.isNewsFetchInprogress = false;
        that.busyOff();
      })
      .catch(function (error) {
        that.isNewsFetchInprogress = false;
        console.log('Error getting news documents: ', error);
        that.busyOff();
      });
  }
  private uploadPhotos(imgRefArr: Array<any>, imgArr: Array<any>, id: string): Promise<any> {
   return new Promise((resolves, reject) => {
      let uploadCount = 0;
      imgArr.forEach((itm: any, idx: number) => {
          if (itm !== '') {
            const filePath = 'images/' + id + '#' + idx + '.jpg';
            const ref = this.storage.ref(filePath);
            const task = ref.putString(itm, 'data_url');
            task.snapshotChanges().pipe(
              finalize(() =>
                ref.getDownloadURL().subscribe(data => {
                  imgRefArr[idx] = data;
                  ++uploadCount;
                  if (uploadCount === imgArr.length) {
                    resolves(12);
                  }
                })
              )
            ).subscribe();
          } else {
            ++uploadCount;
            if (uploadCount === imgArr.length) {
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

