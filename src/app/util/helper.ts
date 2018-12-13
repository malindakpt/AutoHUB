import {User} from '../entities/user';
import {Pair} from '../components/add-vehicle/add-vehicle.component';
import {Settings} from './settings';
import {environment} from '../../environments/environment';

export class Helper {
  public static internetDate: Date;
  public static appInitStarted = false;
  public static user: User;
  public static getUniqueID(): string {
    if (Helper.user) {
      return Helper.user.id + '#' + new Date().getTime();
    } else {
      throw new Error('Error in getUniqueID: User is null');
    }
  }

  public static getTime(): number {
    const t = new Date();
    if (Helper.internetDate) {
      t.setFullYear(Helper.internetDate.getFullYear());
      t.setMonth(Helper.internetDate.getMonth());
      t.setDate(Helper.internetDate.getDate());
    }
    return t.getTime();
  }

  public static getFBProfile(id?: string): string {
    return 'https://facebook.com/profile.php?uid=' + id || Helper.user.id;
  }

  public static getFBImage(id?: string): string {
    return 'https://graph.facebook.com/' + (id || Helper.user.id) + '/picture?type=normal';
  }

  public static getBrandStringFromID(id: number): string {
    const arr = Settings.VEHICLE_BRANDS.filter( ele => ele.key === Number(id));
    return arr && arr.length > 0 ? arr[0].val : '';
  }

  public static getCountryStringFromID(id: number): string {
    const arr = Settings.COUNTRIES.filter( ele => ele.key === Number(id));
    return arr && arr.length > 0 ? arr[0].val : '';
  }

  public static getStringArray(arr: Array<Pair>): Array<string> {
    const strs = [];
    for (const item of arr) {
      strs.push(item.val);
    }
    return strs;
  }

  public static getStringMap(arr: Array<Pair>): object {
    const map = {};
    for (const item of arr) {
      map[item.val] = item.key;
    }
    return map;
  }

  public static setItem(key: string, val: any) {
    const strVal = JSON.stringify(val);
    localStorage.setItem(key, strVal);
  }

  public static getItem(key: string): any {
    const val = localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    } else {
      return null;
    }
  }
}