import { IsBoolean, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateGlobalSettingsDto {
  @IsOptional()
  @IsBoolean()
  authEnabled: boolean;

  @IsOptional()
  @IsString()
  twilio_sid: string;

  @IsOptional()
  @IsString()
  twilio_token: string;

  @IsOptional()
  @IsString()
  from_twilio_phone_no: string;
  
  @IsOptional()
  @IsString()
  to_twilio_phone_no: string;
}
