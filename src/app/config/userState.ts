import {User} from '../entities/user';
import {Pair} from '../components/add-vehicle/add-vehicle.component';

export class UserState {
  public static internetDate: Date;
  public static appInitStarted = false;
  public static user: User;
  public static getUniqueID(): string {
    if (UserState.user) {
      return UserState.user.id + '#' + new Date().getTime();
    } else {
      throw new Error('Error in getUniqueID: User is null');
    }
  }

  public static getTime(): string {
    const t = new Date();
    if (UserState.internetDate) {
      t.setFullYear(UserState.internetDate.getFullYear());
      t.setMonth(UserState.internetDate.getMonth());
      t.setDate(UserState.internetDate.getDate());
    }
    return t.getTime() + '';
  }

  public static getFBProfile(id?: string): string {
    return 'https://facebook.com/profile.php?uid=' + id || UserState.user.id;
  }

  public static getFBImage(id?: string): string {
    return 'https://graph.facebook.com/' + (id || UserState.user.id) + '/picture?type=normal';
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
}
