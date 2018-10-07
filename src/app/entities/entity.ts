export class Entity {
  public ID: string;

  constructor(obj: Object) {
    Object.assign(this, obj);
  }
}
