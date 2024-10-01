import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GlobalSettingsService } from 'src/settings/setting.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly globalSettingsService: GlobalSettingsService, ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const globalSettings = await this.globalSettingsService.getSettings();
    if (globalSettings && globalSettings.authEnabled === false) {
      return true;
    }
    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.some(role => user.roles?.includes(role));
  }
}
