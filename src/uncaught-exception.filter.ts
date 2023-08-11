import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UncaughtExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(UncaughtExceptionFilter.name, exception, host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception['message'] ?? 'UNKNOWN',
      timestamp: new Date().toISOString(),
    });
  }
}
