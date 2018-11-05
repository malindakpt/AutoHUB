import {Pipe, PipeTransform} from '@angular/core';
import {Settings} from './config/settings';
import {UserState} from './config/userState';


@Pipe({ name: 'commentMsg' })
export class CommentMsgPipe implements PipeTransform {
  transform(s: string): string {
    if (s) {
      const arr = s.split(Settings.COMMENT_SEPARATOR);
      if (arr.length > 2) {
        return arr[2];
      }
    }
    return '............';
  }
}

@Pipe({ name: 'commentProfPic' })
export class CommentProfPicPipe implements PipeTransform {
  transform(s: string): string {
    if (s) {
      const arr = s.split(Settings.COMMENT_SEPARATOR);
      if (arr.length > 2) {
        return UserState.getFBImage(arr[0]);
      }
    }
    return '';
  }
}

@Pipe({ name: 'commentUserName' })
export class CommentUserName implements PipeTransform {
  transform(s: string): string {
    if (s) {
      const arr = s.split(Settings.COMMENT_SEPARATOR);
      if (arr.length > 2) {
        return arr[1];
      }
    }
    return 'VehiLIFE user';
  }
}
