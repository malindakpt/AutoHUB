import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Entity} from '../../enum/entities.enum';
import {Helper} from '../../util/helper';
import {User} from '../../entities/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public countryId;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getEntityDoc(Entity.users, (user: User) => {
      if (user) {
        this.countryId = user.countryId;
      }
    });
  }

  public save(): void {
    this.dataService.saveEntity(Entity.users, Helper.user);
  }

  public onSelectCountry(id: number): void {
    Helper.user.countryId = id;
  }

}
