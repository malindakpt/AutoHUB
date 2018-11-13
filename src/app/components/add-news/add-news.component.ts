import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  public myVehicles: Vehicle[] = [];
  public newsTypes = NewsType;
  public serviceTypes = [];
  @Input()
  news: News;
  public photoCount = ['', '', '', ''];
  public photos = ['', '', '', ''];
  public date;
  @Input() resetCount: string;
  @Input() widgetType: NewsWidgetType;
  @Output() onClose = new EventEmitter();
  public selectedVehicle: Vehicle;
  public isEdit = false;

  constructor(
    public snackBar: MatSnackBar,
    private dataService: DataService,
  ) {
    super();
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
    this.dataService.getMyVehicles().then(vehis => {
      this.myVehicles = vehis;
      for (const v of this.myVehicles) {
        if (v.chassisNo === this.news.vehicleID) {
          this.selectedVehicle = v;
        }
      }
    });
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
        this.news.ID = Helper.getUniqueID();
      }
      this.news.showEdit = false;
      if (this.news.type !== NewsType.NEWS ) {
       this.bindNewsParams();
      }
      this.dataService.addNews(this.news.ID, this.news, this.photos, this.isEdit);
      console.log('News added: ' + this.news.ID);
      this.dataService.resetVehicleNews();
    }
  }

  private bindNewsParams(): void {
    this.news.vehicleID = this.selectedVehicle.chassisNo;
    this.news.cat = this.selectedVehicle.category || 'NO-VEHI-CAT';
  }

  public close(): void {
    if (this.isEdit) {
      this.onClose.emit();
    } else {
      this.news = new News({});
    }
  }

  public validate(): boolean {
    if (this.news.type === NewsType.NEWS ) {
      if (!this.news.desc) {
        this.showError('Add a description');
        return false;
      }
    } else {
      if (!this.selectedVehicle) {
        this.showError('Select a vehicle');
        return false;
      } else if (!this.news.odoMeter || isNaN(this.news.odoMeter)) {
        this.showError('Invalid ODO meter value');
        return false;
      } else if (!this.news.cost || isNaN(this.news.cost)) {
        this.showError('Invalid cost value');
        return false;
      }
    }
    console.log(this.date.getTime(), this.helper.getTime());
    if (!this.date || this.date.getTime() < this.helper.getTime()) {
      this.showError('Invalid date');
      return false;
    }
    return true;
  }

  private showError(msg: string): void {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 5000
    });
  }

  public onPhotoChange(idx: number, data: string): void {
    this.photos[idx] = data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.news = new News({});
  }
}
