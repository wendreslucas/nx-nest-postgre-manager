import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
    console.log(request.originalUrl.split("/"))
      
    if (request.originalUrl.split("/").length > 3) {
      let paths = request.originalUrl.split("/");
      console.log(paths)
      if (paths[3] === "dashabard") {
        response.redirect([paths[0], paths[1], paths[2], paths[3]].join("/"))
      }
    }

    const statusCode = HttpStatus.NOT_FOUND;
    if (exception.code === 'ENOENT') {
      Logger.log(exception);
      response.status(statusCode).json({
        statusCode,
        message: `Cannot ${request.method} ${request.url}`,
        error: 'Not Found',
      });
    } else {
      response.sendStatus(status);
    }
  }
}
