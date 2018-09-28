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

  public getDocument(){
    var docRef = this.afs.firestore.collection("cities").doc("SF");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
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


  public testAdd(){
    var citiesRef = this.afs.firestore.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });
  }
}
