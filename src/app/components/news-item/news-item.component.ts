import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  public newsArr: Array<News>;
  @Input() vehicleID: string;

  constructor(private dataService: DataService) { }
  public swiperConfig = {
    loop: true,
    navigation: true,
  };
  ngOnInit() {
    if (this.vehicleID) {
      this.newsArr = this.dataService.getVehicleNewsList(this.vehicleID);
    } else {
      this.newsArr = this.dataService.getNewsList();
    }
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



}
