import { Component, OnInit } from '@angular/core';
import {News} from '../../entities/news';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  public newsArr: Array<News>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.newsArr = this.dataService.getNewsList();
    const now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
    console.log(now.fromNow());
  }

  public getDuration(snap: number): string {
    const date = moment(Number(snap));
    return date.fromNow();
  }



}
