import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserSettings, Settings} from '../../util/settings';
import {DataService} from '../../services/data.service';
import {Entity} from '../../enum/entities.enum';
import {Helper} from '../../util/helper';

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
    Helper.log('Dislikes', catogs);
    Helper.log('UserSettings.NON_INTERESTS', UserSettings.NON_INTERESTS);
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
    Helper.log(this.myDislikes);
   }
  public saveInterests(): void {
    UserSettings.ID = Helper.user.id;
    this.dataService.saveEntity(Entity.settings, Object.assign({}, UserSettings));
    this.dialogRef.close();
  }

}
