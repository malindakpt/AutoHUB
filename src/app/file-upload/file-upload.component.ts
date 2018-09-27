import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(private storage: AngularFireStorage) {
    // console.log(firebase.storage());
  }

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const filePath = 'images2/space23.jpg';
        const ref = this.storage.ref(filePath);
        ref.putString(reader.result.toString(), 'data_url').then(function(snapshot) {
          console.log('Uploaded a base64 string!');
        });
      };
    }
  }

}
