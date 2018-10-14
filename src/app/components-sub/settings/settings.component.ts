import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserSettings, Settings} from '../../config/settings';
import {DataService} from '../../services/data.service';
import {Entity} from '../../enum/entities.enum';
import {UserState} from '../../config/userState';

export interface Favorite {
  name: string;
  like: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public categories = Settings.VEHICLE_CATEGORIES;
  private myDislikes = UserSettings.NON_INTERESTS;
  public categoryModel;
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const catogs = [];
    for ( let i = 0; i < this.categories.length; i++) {
      if ( this.myDislikes.includes(this.categories[i])) {
        catogs.push(false);
      } else {
        catogs.push(true);
      }
    }
    console.log('Dislikes', catogs);
    this.categoryModel = catogs;
  }

  ngOnInit() {
  }

  public onCheckInterest(event: any, item: string): void {
    if (event.checked) {
      for (let i = 0; i < this.myDislikes.length; i++) {
        if (this.myDislikes[i] === item) {
          this.myDislikes.splice(i, 1);
        }
      }
    } else {
      this.myDislikes.push(item);
    }
    console.log(this.myDislikes);
   }
  public saveInterests(): void {
    UserSettings.ID = UserState.user.id;
    this.dataService.saveEntity(Entity.settings, Object.assign({}, UserSettings));
    this.dialogRef.close();
  }

}
