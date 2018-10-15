import {Entity} from './entity';
import {NewsType} from '../enum/news.-type.enum';

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
  public ownerImage: string;
  public comments = [];

  // temp variables
  public addCommnet;
  public showComment;

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
