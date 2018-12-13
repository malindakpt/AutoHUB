import {Component, HostListener, Injector, Input, OnChanges, OnInit, SimpleChanges, OnDestroy} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';
import {LocalStorageKeys, NewsType, NewsWidgetType} from '../../enum/enums';
import {Vehicle} from '../../entities/vehicle';
import {Helper} from '../../util/helper';
import {ActivatedRoute} from '@angular/router';
import {Settings} from '../../util/settings';
import {BaseDirective} from '../../directives/base';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent extends BaseDirective implements OnInit, OnChanges, OnDestroy {
  public swiperConfig = {
    loop: false,
    navigation: true
  };
  public newsArr = new Array<News>();
  @Input() vehicle: Vehicle;
  @Input() isSearchResult = false;
  @Input() isNewsView;
  @Input() searchByRegNo;
  @Input() placeholder = null;
  public newsTypes = NewsType;
  public resetCount;
  public addNewsType;
  public isShowOnlyMyNews = true;
  public isShowLocalNews = false;
  public lblLocalNews = 'Local News';
  public lblGlobalNews = 'Global News';
  public lblPrivateHistory = 'Private History';
  public lblPublicHistory = 'Public History';
  private subscription: Subscription;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPosition = position + screen.height + 10;
    const fullHeight = document.documentElement.offsetHeight;
    if (scrollPosition > fullHeight) {
      this.loadNews();
    }
  }

  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private injector: Injector) {
    super(injector);
    this.dataService.resetNews();
    this.resetCount = Helper.getTime();

    this.activatedRoute.params.subscribe(params => {
      if (this.isNewsView === undefined) {
        if (params.isNewsView) {
          const b = JSON.parse(params.isNewsView);
          if (b) {
            this.isNewsView = b;
          }
        }
        if (params.ref === 'isNewsView') {
          this.isNewsView = true;
        }
        if(this.isNewsView) {
          this.placeholder = 'Post something to discuss with friends';
        } else {
          this.placeholder = 'Select service type';
        }
      }
      this.isShowLocalNews = Helper.getItem(LocalStorageKeys.SHOW_LOCAL_NEWS);
      this.loadNews();
    });
  }

  public onSaveComplete(newsOld: News, newsEdited: News): void {
    if (newsOld) {
      newsOld = newsEdited;
    } else {
      this.newsArr.unshift(newsEdited);
    }
  }

  ngOnInit() {
    this.isShowLocalNews = Helper.getItem(LocalStorageKeys.SHOW_LOCAL_NEWS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isShowLocalNews = Helper.getItem(LocalStorageKeys.SHOW_LOCAL_NEWS);
    this.loadNews();

    // this.subscription = this.authenticationService.loginSubject.subscribe((dat: any) => {
    //   this.loadNews();
    // });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  public swapEditBtn(news: News) {
    news.showEdit = !news.showEdit;
  }

  public getNewsType(no: number): string {
    return NewsType[no];
  }

  public addComment(news: News) {
    const comment = Helper.user.id + Settings.COMMENT_SEPARATOR +
      Helper.user.name + Settings.COMMENT_SEPARATOR + news.addCommnet;
    news.comments.push(comment);
    news.addCommnet = '';
    news.showComment = false;
    this.dataService.saveEntity(Entity.news, news, true);
  }

  public getDuration(snap: number): string {
    const date = moment(Number(snap));
    return date.fromNow();
  }

  public formatDate(snap: number): string {
    const date = moment(Number(snap));
    return date.format('MMM Do YY');
  }

  public onToggleNewsPref(): void {
    this.isShowOnlyMyNews = !this.isShowOnlyMyNews;
    this.dataService.resetVehicleNews();
    this.loadNews();
  }

  public onToggleNewsCountryPref(): void {
    this.isShowLocalNews = !this.isShowLocalNews;
    Helper.setItem(LocalStorageKeys.SHOW_LOCAL_NEWS, this.isShowLocalNews);
    this.dataService.resetNews();
    this.loadNews();
  }

  public loadNews(): void {
    if (this.isNewsView) {
      this.addNewsType = NewsWidgetType.NEWS;
      this.newsArr = this.dataService.getNewsList(this.isShowLocalNews);
      console.log('News loaded as isNewsView');
    } else {
      if (this.vehicle && this.vehicle.id) {
        this.addNewsType = NewsWidgetType.SERVICE;
        if (this.vehicle.searchedByRegNo + '' == 'true') {
          this.newsArr = this.dataService.getVehicleNewsList(true, this.vehicle.regNo, this.isShowOnlyMyNews && !this.isSearchResult);
          console.log('News loaded as regNo');
        } else {
          this.newsArr = this.dataService.getVehicleNewsList(false, this.vehicle.chassisNo, this.isShowOnlyMyNews && !this.isSearchResult);
          console.log('News loaded as chassisNo');
        }
      } else {
        // Do nothing
      }
    }
  }


}
