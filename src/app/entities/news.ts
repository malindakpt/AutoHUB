import {Entity} from './entity';

export class News extends Entity {
  public vehicleID;
  public desc;
  public time;
  public photos = ['', '', '', ''];
  public ownerName: string;
  public ownerImage: string;
}
