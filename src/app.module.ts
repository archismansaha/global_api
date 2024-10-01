import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { LoggerModule } from './logger/logger.module';
import { RedisModule } from './redis/redis.module';
import { GlobalSettingsService } from './settings/setting.service';
import { GlobalSettingsModule } from './settings/settings.module';
import { SchemasModule } from './schemas/schemas.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MyLogger } from './logger/logger.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL||'mongodb://localhost:27017/nest'),
    RedisModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    GlobalSettingsModule,
    SchemasModule,
    NotificationsModule 
  ],
  providers: [
    MyLogger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule{}
