import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';
import {NewsType} from '../../enum/news.-type.enum';
import {Vehicle} from '../../entities/vehicle';

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
  public newsTypes = NewsType;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPosition = position + screen.height + 10;
    const fullHeight = document.documentElement.offsetHeight;
    if ( scrollPosition > fullHeight) {
      this.loadNews();
    }
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (!this.vehicle) {
      this.loadNews();
    }
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
    if (!this.vehicle) {
      this.newsArr = this.dataService.getNewsList();
    } else if (this.vehicle && this.vehicle.ID)  {
      this.newsArr = this.dataService.getVehicleNewsList(this.vehicle.ID);
    } else {
      // Do nothing
    }
  }




}
