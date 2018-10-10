import {Component, OnInit} from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {Entity} from '../../enum/entities.enum';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  public newsArr: Array<News>;
  constructor(private dataService: DataService) { }
  public swiperConfig = {
    loop: true,
    navigation: true,
  };
  ngOnInit() {
    this.newsArr = this.dataService.getNewsList();
  }

  public addComment(id: string) {
    const news = this.newsArr.filter(value =>  value.ID === id )[0];
    news.comments.push(news.addCommnet);
    news.addCommnet = '';
    this.dataService.saveEntity(Entity.news, news);

  }
  public getDuration(snap: number): string {
    const date = moment(Number(snap));
    return date.fromNow();
  }



}
