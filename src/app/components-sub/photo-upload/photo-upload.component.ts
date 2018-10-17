import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {

  public oFReader;
  public rFilter;
  @Output() imageChange = new EventEmitter();
  @Input() id;
  @Input() title;
  @Input() photo;

  ngOnInit() {
      this.oFReader = new FileReader();
      this.rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
      const that = this;
      this.oFReader.onload = function (oFREvent) {
          that.createSmallImage(oFREvent);
      };
  }

  public createSmallImage(oFREvent) {
      const temp = new Image();
      const that = this;
      temp.onload = function () {
          const oWidth = temp.width;
          const oHeight = temp.height;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (oWidth > oHeight) {

              if (oWidth > 600) {
                  canvas.width = 600;
              } else {
                  canvas.width = oWidth;
              }
              canvas.height = canvas.width * oHeight / oWidth;

          } else {
              if (oHeight > 450) {
                  canvas.height = 450;
              } else {
                  canvas.height = oHeight;
              }
              canvas.width = canvas.height * oWidth / oHeight;
          }

          ctx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, canvas.width, canvas.height);
          const imgString = canvas.toDataURL();
        (<HTMLInputElement>document.getElementById('prev' + that.id)).src = imgString;
          that.imageChange.emit(imgString);
      }
      temp.src = oFREvent.target.result;
  }

  public onFileChange() {
      const oFile = (<HTMLInputElement>document.getElementById(this.id)).files[0];
      this.oFReader.readAsDataURL(oFile);
  }

}
