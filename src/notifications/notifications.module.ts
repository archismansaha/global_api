import { Module } from '@nestjs/common';
import { GlobalSettingsModule } from 'src/settings/settings.module';
import { NotificationsService } from './notification.service';
import { NotificationsController } from './notification.controller';


@Module({
  imports: [GlobalSettingsModule], 
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
