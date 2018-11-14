import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogType} from '../../enum/enums';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public dialogType = DialogType;

  public header;
  public message;
  public type;

  public textInput;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.header = data.header;
    this.message = data.message;
    this.type = data.type;
  }

  ngOnInit() {
  }

  confirm(): void {
    switch (this.type) {
      case this.dialogType.CONFIRMATION:
        this.dialogRef.close({});
        break;
      case this.dialogType.TEXT_INPUT:
        if (this.textInput) {
          this.dialogRef.close(this.textInput);
        } else {
          this.dialogRef.close(null);
        }
        break;
    }
  }
}
