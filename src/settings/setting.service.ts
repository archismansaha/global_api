import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateGlobalSettingsDto } from 'src/common/dtos/create-setting.dto';
import { GlobalSettings, GlobalSettingsDocument } from 'src/schemas/global-settings.schema';



@Injectable()
export class GlobalSettingsService {
  constructor(
   @InjectModel(GlobalSettings.name) private GlobalSettingsModel: Model<GlobalSettingsDocument>,
  ) {}


  async getSettings(): Promise<GlobalSettings> {
    return this.GlobalSettingsModel.findOne().exec();
  }


  async updateSettings(updateGlobalSettingsDto: UpdateGlobalSettingsDto): Promise<GlobalSettings> {
    return this.GlobalSettingsModel.findOneAndUpdate({}, updateGlobalSettingsDto, {
      new: true,
      upsert: true,
    }).exec();
  }
}
