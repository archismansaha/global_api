import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalSettings, GlobalSettingsSchema } from './global-settings.schema';
import { User, UserSchema } from './user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GlobalSettings.name, schema: GlobalSettingsSchema },
      {name:User.name,schema:UserSchema}
    ]),
  ],
  exports: [MongooseModule], 
})
export class SchemasModule {}
