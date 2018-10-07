import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entity} from '../enum/entities.enum';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {resolve} from 'q';
import {News} from '../entities/news';
import {UserState} from './userState';
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

  public myVehicles: Vehicle[];

  public getMyVehicles(): any {
    if (!this.myVehicles) {
      this.myVehicles = new Array<Vehicle>();
      this.requestMyVehicles(UserState.user.id);
    }
    return this.myVehicles;
  }

  public addNews(id: string, news: News, images: Array<string>): void {
    this.uploadPhotos(news.photos, images, id).then((status) => {
      this.addEntity(Entity.news, news);
    });

    // const promise1 = new Promise(function(resolve, reject) {
    //   setTimeout(function() {
    //     resolve('foo123123');
    //   }, 300);
    // });
    //
    // promise1.then(function(value) {
    //   console.log(value);
    //   // expected output: "foo"
    // });
    //
    // console.log(promise1);
  }

  private addEntity(entity: Entity, object: any): void {
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


    const p = new Promise(function(resolqweve, reject) {
      resolve("hello world");
    });
    return p;
  }
}

