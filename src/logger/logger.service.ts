import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as fs from 'fs-extra';

@Injectable()
export class MyLogger implements LoggerService {
  private logger: Logger;
  private logFilePath: string = 'log.txt';

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(), 
        new transports.File({ filename: this.logFilePath }), 
      ],
    });
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any, trace?: string) {
    this.logger.error(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.verbose(message);
  }


  getLogs(): string []{
    try {
 
      return fs.readFileSync(this.logFilePath, 'utf-8');
    } catch (error) {
      console.error('Error reading log file:', error);
      return ['Error reading log file'];
    }
  }
}
