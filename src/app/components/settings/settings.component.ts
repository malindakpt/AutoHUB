import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Entity} from '../../enum/entities.enum';
import {Helper} from '../../util/helper';
import {User} from '../../entities/user';
import {BaseDirective} from '../../directives/base';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseDirective implements OnInit {

  public countryId;

  ngOnInit() {
    this.dataService.getEntityDoc(Entity.users, (user: User) => {
      if (user) {
        this.countryId = user.countryId;
      }
    });
  }

  public save(): void {
    if (isNaN(Helper.user.countryId)) {
      this.dialogService.showPopup('Please select a valid country');
    } else {
      this.dataService.saveEntity(Entity.users, Helper.user);
    }
  }

  public onSelectCountry(id: number): void {
    Helper.user.countryId = id;
  }

}
