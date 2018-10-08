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
}
