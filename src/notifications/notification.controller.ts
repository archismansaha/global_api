import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notification.service';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async sendNotification(
    @Body('message') message: string
  ) {
    return this.notificationsService.sendNotification( message);
  }
}
