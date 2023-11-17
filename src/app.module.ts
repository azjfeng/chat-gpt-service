import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatTextModule } from './module/chatText/chatText.module';

@Module({
  imports: [ChatTextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
