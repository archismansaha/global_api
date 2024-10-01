import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalSettingsService } from './setting.service';
import { GlobalSettingsController } from './setting.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ JwtModule.register({
    secret: process.env.JWT_SECRET || 'your_secret_key',
    signOptions: { expiresIn: '60m' }, 
  }),
   SchemasModule
  ],
  controllers: [GlobalSettingsController],
  providers: [GlobalSettingsService],
  exports: [GlobalSettingsService],
})
export class GlobalSettingsModule {}
