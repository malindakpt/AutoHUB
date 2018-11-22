import {Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Vehicle} from '../../entities/vehicle';
import {News} from '../../entities/news';
import {Helper} from '../../util/helper';
import {NewsType, NewsWidgetType} from '../../enum/enums';
import {MatSnackBar} from '@angular/material';
import {BaseDirective} from '../../directives/base';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent extends BaseDirective implements OnInit, OnChanges {
  @Input() news: News;
  @Input() resetCount: string;
  @Input() widgetType: NewsWidgetType;
  @Output() closed = new EventEmitter();
  @Output() saveComplete = new EventEmitter();
  public myVehicles: Vehicle[] = [];
  public newsTypes = NewsType;
  public serviceTypes = [];
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public date;
  public selectedVehicle: Vehicle;
  public isEdit = false;

  constructor(
    private injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if ( NewsWidgetType.NEWS === this.widgetType) {
      this.serviceTypes = [
        { name: 'Discussion Item', val: NewsType.NEWS }
      ];
    } else if ( NewsWidgetType.SERVICE === this.widgetType) {
      this.serviceTypes = [
        { name: 'Normal Service', val: NewsType.SERVICE },
        { name: 'Maintenance/Upgrade', val: NewsType.MAINTENANCE },
        { name: 'Repair', val: NewsType.REPAIR },
      ];
    } else {
      this.serviceTypes = [
        { name: 'Discussion Item', val: NewsType.NEWS },
        { name: 'Normal Service', val: NewsType.SERVICE },
        { name: 'Maintenance/Upgrade', val: NewsType.MAINTENANCE },
        { name: 'Repair', val: NewsType.REPAIR },
      ];
    }
    if (Helper.user) {
      this.dataService.getMyVehicles().then(vehis => {
        this.myVehicles = vehis;
        for (const v of this.myVehicles) {
          if (v.chassisNo === this.news.vehicleID) {
            this.selectedVehicle = v;
          }
        }
      });
    } else {
      console.log('Add news init failed. no user exist');
    }
    this.date = new Date();
    if (!this.news) {
      this.news = new News({});
    } else {
      this.isEdit = true;
    }
  }

  public complete(): void {
    if (this.validate()) {
      this.news.time = this.date.getTime();
      if (!this.isEdit) {
        this.news.id = Helper.getUniqueID();
      }
      this.news.showEdit = false;
      if (this.news.type !== NewsType.NEWS ) {
       this.bindNewsParams();
      }
      this.dataService.addNews(this.news.id, this.news, this.photos, this.isEdit).then((news: News) => {
        this.saveComplete.emit(news);
      });
      console.log('News added: ' + this.news.id);
      this.close();
      this.dataService.resetVehicleNews();
    }
  }

  private bindNewsParams(): void {
    this.news.vehicleID = this.selectedVehicle.chassisNo;
    this.news.cat = this.selectedVehicle.category || 'NO-VEHI-CAT';
  }

  public close(): void {
    if (this.isEdit) {
      this.closed.emit();
    } else {
      this.news = new News({});
    }
  }

  public validate(): boolean {
    if (this.news.type === NewsType.NEWS ) {
      if (!this.news.desc) {
        this.dialogService.showPopup('Add a description');
        return false;
      }
    } else {
      if (!this.selectedVehicle) {
        this.dialogService.showPopup('Select a vehicle');
        return false;
      } else if (!this.news.odoMeter || isNaN(this.news.odoMeter)) {
        this.dialogService.showPopup('Invalid ODO meter value');
        return false;
      } else if (!this.news.cost || isNaN(this.news.cost)) {
        this.dialogService.showPopup('Invalid cost value');
        return false;
      }
    }
    console.log(this.date.getTime(), Helper.getTime());
    if (!this.date || this.date.getTime() > Helper.getTime()) {
      this.dialogService.showPopup('Invalid date');
      return false;
    }
    return true;
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.news = new News({});
  }
}
