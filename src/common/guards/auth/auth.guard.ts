import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from 'src/settings/setting.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, 
    private readonly globalSettingsService: GlobalSettingsService, 
    private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const globalSettings = await this.globalSettingsService.getSettings();
    if (globalSettings && globalSettings.authEnabled === false) {
      return true;
    }
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET||'your_secret_key',
      });
      request.user = payload.user;
    } catch {
      return false;
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
