import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class CsrfService {
    GetCsrfToken(@Req() req): any {
        return {
          token: req.csrfToken()
        }
    }
}
