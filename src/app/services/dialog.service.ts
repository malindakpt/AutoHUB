import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../components-sub/dialog/dialog.component';

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {}

  public openDialog(header: string, message: string): Promise<object> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {header: header, message: message}
    });
    const promise = new Promise<object>(
      (resolve, reject) => {
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
          if (result) {
            resolve();
          }
        });
      }
    );
    return promise;
  }
}
