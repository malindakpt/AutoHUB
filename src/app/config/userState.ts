import {User} from '../entities/user';

export class UserState {
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
    return new Date().getTime() + '';
  }

  public static getFBProfile(id?: string): string {
    return 'https://facebook.com/profile.php?uid=' + id || UserState.user.id;
  }

  public static getFBImage(id?: string): string {
    return 'https://graph.facebook.com/' + (id || UserState.user.id) + '/picture?type=normal';
  }
}
