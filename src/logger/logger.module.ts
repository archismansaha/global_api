

import { Module } from '@nestjs/common';
import { MyLogger } from './logger.service';
import { LogsController } from './logger.controller';

@Module({
  providers: [MyLogger],
  controllers: [LogsController],
  exports: [MyLogger], 
})
export class LoggerModule {}
