import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RefererGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const allows = [
      'https://daily-learning.herokuapp.com/',
      'https://nx-nest-postgre-manager.herokuapp.com/',
      'https://daily-learning.herokuapp.com',
      'https://nx-nest-postgre-manager.herokuapp.com'
    ];

    return allows.find(allow => allow === request.headers['referer']) !== undefined;
  }
}
