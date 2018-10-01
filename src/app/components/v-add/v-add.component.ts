import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../../entities/vehicle';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-v-add',
    templateUrl: './v-add.component.html',
    styleUrls: ['./v-add.component.scss']
})
export class VAddComponent implements OnInit {
    public vehicle: Vehicle;


    // public img;
    public img1;
    public img2;
    public img3;
    public img4;

    public simg0;
    public simg1;
    public simg2;
    public simg3;
    public simg4;

    public oFReader;
    public rFilter;

    public idx;

    @ViewChild('prev') prev: ElementRef;
    @ViewChild('img') img: ElementRef;
    @ViewChild("tref", { read: ElementRef }) tref: ElementRef;



    constructor(
        private fs: AngularFirestore,
        public snackBar: MatSnackBar) {
        this.vehicle = new Vehicle;
    }

    ngOnInit() {
        this.oFReader = new FileReader()
        this.rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        const that = this;

        this.oFReader.onload = function (oFREvent) {

            that.createSmallImage(oFREvent);
            // var img = new Image();
            // img.onload = function () {
            //     var canvas = document.createElement("canvas");
            //     var ctx = canvas.getContext("2d");
            //     var oWidth = img.width;
            //     var oHeight = img.height;

            //     if (oWidth > oHeight) {

            //         if (oWidth > 600) {
            //             canvas.width = 600;
            //         } else {
            //             canvas.width = oWidth;
            //         }
            //         canvas.height = canvas.width * oHeight / oWidth;

            //     } else {
            //         if (oHeight > 450) {
            //             canvas.height = 450;
            //         } else {
            //             canvas.height = oHeight;
            //         }
            //         canvas.width = canvas.height * oWidth / oHeight;
            //     }
            //     ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            //     document.getElementById("prev" + window.idx).src = canvas.toDataURL();
            //     if (this.idx === 0) {
            //         this.img0 = canvas.toDataURL();
            //     } else if (window.idx === 1) {
            //         img1 = canvas.toDataURL();
            //     } else if (window.idx === 2) {
            //         img2 = canvas.toDataURL();
            //     } else if (window.idx === 3) {
            //         img3 = canvas.toDataURL();
            //     } else if (window.idx === 4) {
            //         img4 = canvas.toDataURL();
            //     }
            // }
            // this.img.src = oFREvent.target.result;
        };




    }


    public createSmallImage(oFREvent) {
        const temp = new Image();
        const that = this;
        temp.onload = function () {
            const oWidth = temp.width;
            const oHeight = temp.height;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

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


            // canvas.width = 80;
            // canvas.height = 60;
            
            ctx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, canvas.width, canvas.height);

            that.prev.nativeElement.src = canvas.toDataURL();
            console.log("prev:", canvas.toDataURL());
        }
        temp.src = oFREvent.target.result;
    }
    ;

    public onFileChange(event) {
        // var oFile = document.getElementById("img" ).files[0];
        const oFile = (<HTMLInputElement>document.getElementById('img')).files[0];
        this.oFReader.readAsDataURL(oFile);
    }


    public addVehicle() {
        // const that = this;
        // var citiesRef = this.fs.firestore.collection("autoHUB");
        // citiesRef.doc(this.vehicle.chassisNo).set(Object.assign({}, this.vehicle)).then(function () {
        //     console.log("Document successfully written!");
        //     that.snackBar.openFromComponent(PopupComponent, {
        //         duration: 5000,
        //         data: { message: "Vehicle Added Successfylly!" },
        //         verticalPosition: 'top'
        //     });

        // })
        //     .catch(function (error) {
        //         console.error("Error writing document: ", error);
        //     });
    }
}
