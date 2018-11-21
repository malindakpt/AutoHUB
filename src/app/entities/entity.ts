export class Entity {
  public id: string;

  constructor(obj: Object) {
    Object.assign(this, obj);
  }
}
