import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/schemas/user.schema';
import { SchemasModule } from 'src/schemas/schemas.module';
import { GlobalSettingsModule } from 'src/settings/settings.module';
import { GlobalSettingsService } from 'src/settings/setting.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key',
      signOptions: { expiresIn: '60m' }, 
    }),
    SchemasModule,
    GlobalSettingsModule
  ],
  providers: [UsersService,GlobalSettingsService],
  controllers: [UsersController],
  exports: [UsersService],  
})
export class UsersModule {}
