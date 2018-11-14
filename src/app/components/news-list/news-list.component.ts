import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';
import {NewsType, NewsWidgetType} from '../../enum/enums';
import {Vehicle} from '../../entities/vehicle';
import {Helper} from '../../util/helper';
import {ActivatedRoute} from '@angular/router';
import {Settings} from '../../util/settings';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnChanges {

  public swiperConfig = {
    loop: false,
    navigation: true
  };
  public newsArr = new Array<News>();
  @Input() vehicle: Vehicle;
  @Input() isSearchResult = false;
  @Input() isNewsView;
  public newsTypes = NewsType;
  public userState = Helper;
  public resetCount;
  public addNewsType;
  public isShowOnlyMyNews = true;

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
    private activatedRoute: ActivatedRoute) {

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
      }
      this.loadNews();
    });
  }

  ngOnInit() {
    console.log(this.isNewsView, this.isSearchResult);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadNews();
  }

  public swapEditBtn(news: News) {
    news.showEdit = !news.showEdit;
  }

  public getNewsType(no: number): string {
    return NewsType[no];
  }

  public addComment(news: News) {
    // const news = this.newsArr.filter(value =>  value.ID === id )[0];
    const comment = this.userState.user.id + Settings.COMMENT_SEPARATOR + this.userState.user.name + Settings.COMMENT_SEPARATOR + news.addCommnet;
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

  public loadNews(): void {
    if (this.isNewsView) {
      this.addNewsType = NewsWidgetType.NEWS;
      this.newsArr = this.dataService.getNewsList();
    } else {
      if (this.vehicle && this.vehicle.ID) {
        this.addNewsType = NewsWidgetType.SERVICE;
        this.newsArr = this.dataService.getVehicleNewsList(this.vehicle.chassisNo, this.isShowOnlyMyNews);
      } else {
        // Do nothing
      }
    }
  }


}
