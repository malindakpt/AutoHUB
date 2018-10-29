import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';
import {NewsType, NewsWidgetType} from '../../enum/news.-type.enum';
import {Vehicle} from '../../entities/vehicle';
import {UserState} from '../../config/userState';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit, OnChanges {

  public swiperConfig = {
    loop: false,
    navigation: true
  };
  public newsArr: Array<News>;
  @Input() vehicle: Vehicle;
  @Input() isSearchResult = false;
  @Input() isNewsView = false;
  public newsTypes = NewsType;
  public userState = UserState;
  public resetCount;
  public addNewsType;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPosition = position + screen.height + 10;
    const fullHeight = document.documentElement.offsetHeight;
    if ( scrollPosition > fullHeight) {
      this.loadNews();
    }
  }

  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.queryParams.subscribe((refresh: any) => {
    //   console.log('re ' + refresh);
    // });

    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (params.params.ref === 1) {
        this.isNewsView = true;
      }
      this.dataService.resetNews();
      this.resetCount = UserState.getTime();
      this.loadNews();
    });
  }

  ngOnInit() {
    // this.loadNews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadNews();
  }

  public getNewsType(no: number): string {
      return NewsType[no];
  }
  public addComment(id: string) {
    const news = this.newsArr.filter(value =>  value.ID === id )[0];
    news.comments.push(news.addCommnet);
    news.addCommnet = '';
    news.showComment = false;
    this.dataService.saveEntity(Entity.news, news);

  }
  public getDuration(snap: number): string {
    const date = moment(Number(snap));
    return date.fromNow();
  }

  public formatDate(snap: number): string {
    const date = moment(Number(snap));
    return date.format('MMM Do YY');
  }

  public loadNews(): void {
    if (this.isNewsView) {
      this.addNewsType = NewsWidgetType.NEWS;
      this.newsArr = this.dataService.getNewsList();
    } else {
      if (this.vehicle && this.vehicle.ID) {
        this.addNewsType = NewsWidgetType.SERVICE;
        this.newsArr = this.dataService.getVehicleNewsList(this.vehicle.chassisNo);
      } else {
        // Do nothing
      }
    }
  }




}
