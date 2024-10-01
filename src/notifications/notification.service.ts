import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalSettings, GlobalSettingsDocument } from 'src/schemas/global-settings.schema';
import { GlobalSettingsService } from 'src/settings/setting.service';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationsService {
  private twilioClient: Twilio.Twilio;

  constructor(
    private readonly globalSettingsService: GlobalSettingsService, 
  ) {}

  private async initializeTwilioClient() {
    const settings: GlobalSettings = await this.globalSettingsService.getSettings();
    this.twilioClient = Twilio(settings.twilio_sid, settings.twilio_token);
  }

  async sendNotification(message: string) {
    try {
      const settings: GlobalSettings = await this.globalSettingsService.getSettings();
      if (!this.twilioClient) {
        await this.initializeTwilioClient();
      }
  
      return this.twilioClient.messages.create({
        body: message,
        from: settings.from_twilio_phone_no,
        to:settings.to_twilio_phone_no,
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw new Error('Notification could not be sent.');
    }
  }
  
}
