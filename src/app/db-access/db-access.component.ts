import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-db-access',
  templateUrl: './db-access.component.html',
  styleUrls: ['./db-access.component.css']
})
export class DbAccessComponent {
  // private itemsCollection: AngularFirestoreCollection<Item>;
  // items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    afs.firestore.settings({
      timestampsInSnapshots: true
    });

    
  }

  public addDocument(){
    this.afs.firestore.collection("autoHub").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }
}
