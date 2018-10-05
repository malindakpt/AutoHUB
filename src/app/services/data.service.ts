import {Injectable} from '@angular/core';
import {Vehicle} from '../entities/vehicle';
import {AuthenticationService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Entities} from '../enum/entities.enum';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {resolve} from 'q';
import {News} from '../entities/news';

@Injectable()
export class DataService {
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private fs: AngularFirestore,
  ) {
  }

  public myVehicles: Vehicle[];

  public getMyVehicles(): any {
    if (!this.myVehicles) {
      this.myVehicles = new Array<Vehicle>();
      this.requestMyVehicles(this.authService.userData.id);
    }
    return this.myVehicles;
  }

  public addNews(id: string, news: News, images: Array<string>): void {
    this.uploadPhotos(news.photos, images, id).then((status: boolean) => {
      this.addNewsBody();
    });
  }

  private addNewsBody(): void {

  }

  public requestMyVehicles(userID: string) {
    const that = this;
    const myVehicles = [];
    console.log('send request for get myVehices');
    this.fs.firestore.collection(Entities.vehicles).where('owner', '==', userID)

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
    return new Promise(() => {
      let uploadCount = 0;
      for (const [idx, itm] of imgArr) {
        const filePath = 'images/' + id + '#' + idx + '.jpg';
        const ref = this.storage.ref(filePath);
        const task = ref.putString(itm, 'data_url');
        task.snapshotChanges().pipe(
          finalize(() =>
            ref.getDownloadURL().subscribe(data => {
              imgArr[idx] = data;
              ++uploadCount;
              if (uploadCount === imgArr.length) {
                resolve(true);
              }
            })
          )
        ).subscribe();
      }
    });
  }
}
