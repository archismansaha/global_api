import { Controller, Get } from '@nestjs/common';
import { MyLogger } from './logger.service';


@Controller('logs')
export class LogsController {
  constructor(private readonly logger: MyLogger) {}

  @Get()
  getLogs(): string[] {
    return this.logger.getLogs();  
  }
}
