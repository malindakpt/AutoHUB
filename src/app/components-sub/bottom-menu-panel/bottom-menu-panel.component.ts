import { Component, OnInit, Injector } from '@angular/core';
import { BaseDirective } from 'src/app/directives/base';
import { Settings } from 'src/app/util/settings';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Suggestion } from 'src/app/entities/suggestion';
import { Helper } from 'src/app/util/helper';
import { DialogType } from 'src/app/enum/enums';
import { Entity } from 'src/app/enum/entities.enum';

@Component({
  selector: 'app-bottom-menu-panel',
  templateUrl: './bottom-menu-panel.component.html',
  styleUrls: ['./bottom-menu-panel.component.scss']
})
export class BottomMenuPanelComponent extends BaseDirective implements OnInit {

  public menuOptions = Settings.MENU_OPTIONS;
  public version = environment.version;
  ngOnInit(): void {
  }
  constructor(
    private authenticationService: AuthenticationService,
    private injector: Injector) {
    super(injector);
  }

  public suggestion(): void {
    this.dialogService.showDialog(DialogType.TEXT_INPUT, 'We appreciate your suggestions',
      'Please let us know the issues you face').then((data: any) => {
      if (data) {
        const sug = new Suggestion({});
        sug.id = Helper.getUniqueID();
        sug.userID = Helper.user.id;
        sug.userName = Helper.user.name;
        sug.message = data;
        this.dataService.saveEntity(Entity.suggestions, sug, true);
      } else if (data === null) {
        this.dialogService.showPopup('Please add required information');
      }
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
