import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Entities } from "../enum/entities.enum";
import { DataService } from "./data.service";

@Injectable()
export class NetworkService {

    constructor(
        private fs: AngularFirestore,
        // private dataService: DataService
        ) {
        fs.firestore.settings({
            timestampsInSnapshots: true
        });
    }


}