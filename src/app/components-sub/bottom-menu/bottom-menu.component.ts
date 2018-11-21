import {Component, Injector, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AuthenticationService} from '../../services/auth.service';
import {Settings} from '../../util/settings';
import {environment} from '../../../environments/environment.prod';
import {DialogType} from '../../enum/enums';
import {Entity} from '../../enum/entities.enum';
import {BaseDirective} from '../../directives/base';
import {Helper} from '../../util/helper';
import {Suggestion} from '../../entities/suggestion';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent extends BaseDirective implements OnInit {
  public menuOptions = Settings.MENU_OPTIONS;
  public version = environment.version;
  ngOnInit(): void {
  }
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>,
    private authenticationService: AuthenticationService,
    private injector: Injector) {
    super(injector);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
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
    this.bottomSheetRef.dismiss();
  }
}
