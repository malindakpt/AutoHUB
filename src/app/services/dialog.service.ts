import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogComponent} from '../components-sub/dialog/dialog.component';
import {DialogType} from '../enum/enums';

@Injectable()
export class DialogService {
  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  public showDialog(type: DialogType, header: string, message: string): Promise<object> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {header: header, message: message, type: type}
    });
    const promise = new Promise<object>(
      (resolve, reject) => {
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          resolve(result);
        });
      }
    );
    return promise;
  }

  public showPopup(text: string): void {
    this.snackBar.open(text, 'Dismiss', {
      duration: 5000
    });
  }
}
