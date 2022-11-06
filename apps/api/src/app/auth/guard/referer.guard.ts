import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class RefererGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private configService: ConfigService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const allows = [];
    if (this.configService.get<string>('isProd').toLocaleLowerCase() == 'true') {
      allows.push('https://daily-learning.herokuapp.com/');
      allows.push('https://nx-nest-postgre-manager.fly.dev/');
      allows.push('https://daily-learning.herokuapp.com');
      allows.push('https://nx-nest-postgre-manager.fly.dev');

      return allows.find(allow => allow === request.headers['referer']) !== undefined;
    }

    return true;
  }
}
