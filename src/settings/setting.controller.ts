import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';

import { GlobalSettingsService } from './setting.service';
import { UpdateGlobalSettingsDto } from 'src/common/dtos/create-setting.dto';
import { GlobalSettings } from 'src/schemas/global-settings.schema';
import { Roles } from 'src/common/decorators/roles.decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';


@Controller('globalsettings')
export class GlobalSettingsController {
  constructor(private readonly globalSettingsService: GlobalSettingsService) {}

  @Get()
  async getSettings(): Promise<GlobalSettings> {
    return this.globalSettingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() updateGlobalSettingsDto: UpdateGlobalSettingsDto): Promise<GlobalSettings> {
    return this.globalSettingsService.updateSettings(updateGlobalSettingsDto);
  }
}
