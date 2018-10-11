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

@Injectable()
export class DataService {
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private fs: AngularFirestore,
    public snackBar: MatSnackBar
  ) {
  }

  public myVehicles: Array<Vehicle>;
  public newsList: Array<News>;
  public vehicleNewsList: Array<News>;

  public getMyVehicles(): any {
    if (!this.myVehicles) {
      this.myVehicles = new Array<Vehicle>();
      this.requestMyVehicles(UserState.user.id);
    }
    return this.myVehicles;
  }

  public getNewsList(): Array<News> {
    this.newsList = new Array<News>();
    this.requestNewsList();
    return this.newsList;
  }

  public getVehicleNewsList(ID: string): Array<News> {
    this.vehicleNewsList = new Array<News>();
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
    ref.doc(object.ID).set(Object.assign({}, object)).then(function () {
      console.log('Document successfully written!', entity);
      that.snackBar.openFromComponent(PopupComponent, {
        duration: 1000,
        data: {message: 'Success'},
        verticalPosition: 'top'
      });

    }).catch(function (error) {
      console.error('Error writing document: ', error);
    });
  }

  public requestMyVehicles(userID: string) {
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    this.fs.firestore.collection(Entity.vehicles).where('owner', '==', userID)

      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          myVehicles.push(new Vehicle(doc.data()));
        });
        Object.assign(that.myVehicles, myVehicles);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  public requestNewsListForVehicle(vehicleID: string): void {
    const that = this;
    const newsList = [];
    console.log('send request for get vehicle newsList');
    this.fs.firestore.collection(Entity.news).where('vehicleID', '==', vehicleID).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          newsList.push(new News(doc.data()));
        });
        console.log('Data fetched');
        Object.assign(that.vehicleNewsList, newsList);
      })
      .catch(function (error) {
        console.log('Error getting news documents: ', error);
      });
  }

  public requestNewsList(): void {
    const that = this;
    const newsList = [];
    console.log('send request for get newsList');
    this.fs.firestore.collection(Entity.news).orderBy('time', 'desc').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          newsList.push(new News(doc.data()));
        });

        Object.assign(that.newsList, newsList);
      })
      .catch(function (error) {
        console.log('Error getting news documents: ', error);
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
}

