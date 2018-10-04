export class News {

  public timeStamp;
  public vehicleID;
  public desc;
  public photos = ['', '', '', ''];

  constructor(obj: Object) {
    Object.assign(this, obj);
  }
}
