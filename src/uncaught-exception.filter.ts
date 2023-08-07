import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UncaughtExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(UncaughtExceptionFilter.name, exception, host);
  }
}
