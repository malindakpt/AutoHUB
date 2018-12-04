import {Entity} from './entity';
import {NewsType} from '../enum/enums';

export class News extends Entity {
  public vehicleID;
  public odoMeter;
  public type: NewsType;
  public cat = 'NONE';
  public cost;
  public place;
  public desc;
  public time;
  public photos = ['', '', '', ''];
  public ownerName: string;
  public ownerID: string;
  public comments = [];
  public countryId: number;
  public isPrivate;

  // temp variables
  public addCommnet;
  public showComment;
  public showEdit;
  public isAd;

  constructor(obj: any) {
    super(obj);
    if (obj.photos) {
      this.photos = obj.photos;
    }
    if (obj.comments) {
      this.comments = obj.comments;
    }
  }
}
