import {Entity} from './entity';

export class News extends Entity {
  public vehicleID;
  public desc;
  public time;
  public photos = ['', '', '', ''];
  public ownerName: string;
  public ownerImage: string;
  public comments = [];
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
