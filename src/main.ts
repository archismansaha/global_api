import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import helmet from 'helmet';
import  rateLimit from 'express-rate-limit';
import { MyLogger } from './logger/logger.service';  // Import your logger
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(helmet());
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100, 
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*', 
    credentials: true,
  });

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(new MyLogger()));


  // app.useGlobalInterceptors(new LoggingInterceptor(new MyLogger()));


  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
