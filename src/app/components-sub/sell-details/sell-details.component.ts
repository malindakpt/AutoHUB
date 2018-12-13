import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.scss']
})
export class SellDetailsComponent implements OnInit {

  public vehicle
  constructor(
    public dialogRef: MatDialogRef<SellDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.vehicle = data;
    }

  ngOnInit() {
  }

  public onConfirm(): void {
    this.dialogRef.close(this.vehicle);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
