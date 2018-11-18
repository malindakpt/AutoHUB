export class Entity {
  public closed: string;

  constructor(obj: Object) {
    Object.assign(this, obj);
  }
}
